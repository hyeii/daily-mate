package com.dailymate.global.common.jwt;

import com.dailymate.global.common.jwt.constant.JwtTokenExpiration;
import com.dailymate.global.common.security.UserDetailsImpl;
import com.dailymate.global.common.security.UserDetailsServiceImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

/**
 * Spring Security와 JWT Token을 사용하여 인증(Authentication)과 권한부여(Authorization)을 처리하는 클래스
 * 유저 정보로 JWT 토큰을 만들거나, 토큰을 바탕으로 유저 정보를 가져옴!
 *
 * jwtUtil
 *
 * JWT 토큰의 생성, 복호화, 검증 기능
 */
@Slf4j
@Component
public class JwtTokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_PREFIX = "Bearer ";
    private final Key key;
    private final UserDetailsServiceImpl userDetailsService;

    /**
     * application.yml에서 secret값 가져와서 key에 저장
     */
    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey, UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 유저 정보를 가지고 토큰을 생성하는 메서드
     */
    public JwtTokenDto generateToken(Authentication authentication) {
        log.info("[generateToken] 토큰 생성 입장 : {}", authentication.getName());

        // 권한들 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // 권한에서 유저 정보 가져오기
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        log.info("[generateToken] UserDetailsImpl 변환 성공 !! {} : {}", userPrincipal.getUserId(), userPrincipal.getUsername());

        long now = (new Date()).getTime();

        // accessToken 생성 - 인증된 사용자의 권한 정보와 만료 시간을 담고 있음
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())                       // payload "sub": "name"
                .claim("userId", userPrincipal.getUserId())           // userId를 뽑아오기 위해 저장 추가!!!!
                .claim(AUTHORITIES_KEY, authorities)                        // payload "auth": "ROLE_USER"
                .setExpiration(new Date(now + JwtTokenExpiration.ACCESS_TOKEN_EXPIRATION_TIME.getTime()))    // payload "exp": 151621022(ex)
                .signWith(key, SignatureAlgorithm.HS256)                    // header "alg": "HS256"
                .compact();

        // refreshToken 생성 - accessToken의 갱신을 위해 사용 : 갱신용이라 사용자 정보는 아무것도 담지않았음
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + JwtTokenExpiration.REFRESH_TOKEN_EXPIRATION_TIME.getTime()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return JwtTokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    /**
     * JWT Token을 복호화하여 토큰에 들어있는 정보(사용자의 인증 정보)를 꺼내는 메서드
     * 토큰의 Claims에서 권한 정보를 추출하고, User객체를 생성하여 Authentication 객체로 반환
     * https://suddiyo.tistory.com/entry/Spring-Spring-Security-JWT-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-2
     * 
     * 위의 메서드와 암호화 <-> 복호화로 생각
     */
    public Authentication getAuthentication(String accessToken) { // Bearer 토큰형태
        accessToken = resolveToken(accessToken);
        log.info("[JwtTokenProvider] getAuthentication 입장 : {}", accessToken);

        // JWT 토큰 복호화
        Claims claims = parseClaims(accessToken);

        if(claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication return
//        UserDetails principal = new User(claims.getSubject(), "", authorities);
        UserDetails principal = userDetailsService.loadUserByUsername(claims.getSubject()); // UserDetails를 UserDetailsImpl로 가져와야 나중에 캐스팅해서 userId를 뽑아올 수 있음,,
        log.info("principal : {}", principal);
        log.info("===========================================");

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    /**
     * ACCESS TOKEN의 권한 정보에서 로그인 사용자의 userId를 추출함
     */
    public Long getUserId(String accessToken) {
        accessToken = resolveToken(accessToken);
        
        Claims claims = parseClaims(accessToken);
        if(claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        log.info("[getUserId] userId : {}", claims.get("userId"));
        return (long) (int) claims.get("userId");
    }

    /**
     * 토큰 정보를 검증하는 메서드
     */
    public Boolean validateToken(String token) { // Bearer없는 토큰 형태
        log.info("[validateToken] token : {}", token);
        token = resolveToken(token);

        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token - 잘못된 JWT 서명입니다.", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token - 만료된 JWT 토큰입니다.", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token - 지원되지 않는 JWT 토큰입니다.", e);
        } catch (IllegalArgumentException e) {
            // 토큰이 올바른 형식이 아니거나, 클레임이 비어있는 경우 등에 발생
            log.info("JWT claims string is empty - JWT 토큰이 잘못되었습니다.", e);
        }

        return false;
    }

    /**
     * accessToken 복호화
     *
     *      클레임(Claims) : 토큰에서 사용할 정보의 조각
     */
    private Claims parseClaims(String token) { // 접두사가 지워진 토큰형태
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            // 만료된 토큰의 경우에도 Claims를 반환
            return e.getClaims();
        }
    }

    /**
     * 토큰의 prefix 가 존재한다면
     * 토큰 접두사를 제외한 토큰 추출해준다.(테스트용임)
     */
    private String resolveToken(String token) {
        if(StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
            return token.substring(7);
        }

        return token;
    }

}
