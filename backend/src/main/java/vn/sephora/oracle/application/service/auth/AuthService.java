package vn.sephora.oracle.application.service.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import vn.sephora.oracle.application.common.exception.ForbiddenException;
import vn.sephora.oracle.application.common.exception.UnauthorizedException;
import vn.sephora.oracle.application.common.util.TextNormalizer;
import vn.sephora.oracle.application.model.auth.AuthResponse;
import vn.sephora.oracle.application.model.auth.LoginRequest;
import vn.sephora.oracle.application.model.auth.RegisterRequest;
import vn.sephora.oracle.application.model.user.UserDto;
import vn.sephora.oracle.application.service.audit.AuditLogService;
import vn.sephora.oracle.domain.user.model.User;
import vn.sephora.oracle.domain.user.persistent.UserRepository;
import vn.sephora.oracle.infrastructure.security.JwtTokenProvider;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuditLogService auditLogService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String username = request.getUsername().trim().toLowerCase();
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Tên đăng nhập đã tồn tại trên hệ thống");
        }

        String email = TextNormalizer.blankToNull(request.getEmail());
        if (email != null && userRepository.existsByEmail(email.toLowerCase())) {
            throw new IllegalArgumentException("Email này đã được sử dụng");
        }

        String phone = TextNormalizer.blankToNull(request.getPhone());

        User user = User.builder()
                .username(username)
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName().trim())
                .email(email != null ? email.toLowerCase() : null)
                .phone(phone)
                .userRole("CUSTOMER")
                .accountStatus("ACTIVE")
                .loyaltyTier("INSIDER")
                .pointsBalance(100) // 100 welcome loyalty points
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        User saved = userRepository.save(user);
        auditLogService.record(saved.getId(), saved.getUsername(), "REGISTER", "USER", saved.getId().toString(), "Đăng ký tài khoản mới thành công");

        String token = jwtTokenProvider.generateToken(saved);
        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(toUserDto(saved))
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String username = request.getUsername().trim().toLowerCase();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("Tên đăng nhập hoặc mật khẩu không chính xác"));

        if (!"ACTIVE".equalsIgnoreCase(user.getAccountStatus())) {
            throw new ForbiddenException("Tài khoản này đang bị khóa bởi Quản trị viên");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Tên đăng nhập hoặc mật khẩu không chính xác");
        }

        String token = jwtTokenProvider.generateToken(user);
        auditLogService.record(user.getId(), user.getUsername(), "LOGIN", "USER", user.getId().toString(), "Đăng nhập hệ thống thành công");

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(toUserDto(user))
                .build();
    }

    public UserDto toUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getUserRole())
                .status(user.getAccountStatus())
                .loyaltyTier(user.getLoyaltyTier())
                .pointsBalance(user.getPointsBalance())
                .preferredStoreId(user.getPreferredStoreId())
                .build();
    }
}
