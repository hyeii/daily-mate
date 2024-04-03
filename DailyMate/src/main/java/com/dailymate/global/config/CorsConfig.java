package com.dailymate.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * https://letsmakemyselfprogrammer.tistory.com/89#---%--%EC%BB%A-%ED%-A%B-%EB%A-%A-%EB%-F%AC%EC%--%--%EC%--%-C%--%EC%--%A-%EC%A-%--%ED%--%--%EB%-A%--%--%EB%B-%A-%EB%B-%--
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(false);
//        config.addAllowedOrigin("*");
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
