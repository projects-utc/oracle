package vn.sephora.oracle.application.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.sephora.oracle.application.common.exception.ResourceNotFoundException;
import vn.sephora.oracle.application.model.user.UserDto;
import vn.sephora.oracle.application.service.auth.AuthService;
import vn.sephora.oracle.domain.user.model.User;
import vn.sephora.oracle.domain.user.persistent.UserRepository;
import vn.sephora.oracle.infrastructure.security.SecurityUtil;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    @Transactional(readOnly = true)
    public UserDto getCurrentUserDto() {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin người dùng"));
        return authService.toUserDto(user);
    }

    @Transactional
    public UserDto updatePreferredStore(Long storeId) {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin người dùng"));
        user.setPreferredStoreId(storeId);
        user.setUpdatedAt(LocalDateTime.now());
        User saved = userRepository.save(user);
        return authService.toUserDto(saved);
    }
}
