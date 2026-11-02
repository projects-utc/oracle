package vn.sephora.oracle;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import vn.sephora.oracle.domain.catalog.persistent.CategoryRepository;
import vn.sephora.oracle.domain.catalog.persistent.ProductRepository;
import vn.sephora.oracle.domain.user.persistent.UserRepository;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class SephoraOracleIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    @DisplayName("Verify Spring Boot context loads, Flyway seeds users, products, and categories")
    void contextLoadsAndSeedDataVerified() {
        assertTrue(userRepository.existsByUsername("admin"), "Admin user should exist from seed");
        assertTrue(userRepository.existsByUsername("guest.demo"), "Demo guest user should exist from seed");

        long productCount = productRepository.count();
        assertTrue(productCount >= 50, "At least 50 unique products should be seeded in Oracle DB");

        long categoryCount = categoryRepository.count();
        assertTrue(categoryCount >= 11, "All 11 MegaNav categories should be seeded in Oracle DB");
    }
}
