package com.dailymate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DailyMateApplication {

	public static void main(String[] args) {
		SpringApplication.run(DailyMateApplication.class, args);
	}

}
