package com.dailymate.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * https://letsmakemyselfprogrammer.tistory.com/89#---%--%EC%BB%A-%ED%-A%B-%EB%A-%A-%EB%-F%AC%EC%--%--%EC%--%-C%--%EC%--%A-%EC%A-%--%ED%--%--%EB%-A%--%--%EB%B-%A-%EB%B-%--
 */
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080")
                .allowedMethods("*")
                .allowCredentials(false)
                .maxAge(3000);
    }

}
