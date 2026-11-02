package vn.sephora.oracle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class SephoraOracleApplication {
    public static void main(String[] args) {
        SpringApplication.run(SephoraOracleApplication.class, args);
    }
}
