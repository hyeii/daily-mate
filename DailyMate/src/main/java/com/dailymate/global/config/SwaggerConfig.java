package com.dailymate.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("데일리메이트 API Document")
                .version("v0.0.1")
                .description("데일리메이트 API 명세서입니다.");

        // JWT Authorize 인증 버튼 추가
        // 시큐리티 적용 후 추가 예정 https://happy-jjang-a.tistory.com/165

        return new OpenAPI()
                .components(new Components())
                .info(info);
    }

}
