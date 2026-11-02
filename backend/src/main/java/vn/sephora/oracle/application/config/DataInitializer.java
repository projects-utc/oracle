package vn.sephora.oracle.application.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import vn.sephora.oracle.domain.user.model.User;
import vn.sephora.oracle.domain.user.persistent.UserRepository;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        java.util.Set<String> demoUsers = java.util.Set.of("admin", "guest.demo", "linh.tran", "locked.demo");
        for (String username : demoUsers) {
            userRepository.findByUsername(username).ifPresent(u -> {
                try {
                    if (!passwordEncoder.matches("123", u.getPasswordHash())) {
                        u.setPasswordHash(passwordEncoder.encode("123"));
                        userRepository.save(u);
                        log.info("Updated password hash for demo user: {}", u.getUsername());
                    }
                } catch (Exception e) {
                    u.setPasswordHash(passwordEncoder.encode("123"));
                    userRepository.save(u);
                    log.info("Reset invalid password hash for demo user: {}", u.getUsername());
                }
            });
        }
    }
}
