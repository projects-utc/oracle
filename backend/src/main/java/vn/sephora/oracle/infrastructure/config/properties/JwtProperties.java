package vn.sephora.oracle.infrastructure.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {
    private String secret = "sephoraOracleJwtSecretKey2026MustBeAtLeast32BytesLong!";
    private long expirationMs = 86400000L;
}
