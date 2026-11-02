package vn.sephora.oracle.interfaces.rest.publiccontroller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import vn.sephora.oracle.application.common.ApiResponse;
import vn.sephora.oracle.application.model.auth.AuthResponse;
import vn.sephora.oracle.application.model.auth.LoginRequest;
import vn.sephora.oracle.application.model.auth.RegisterRequest;
import vn.sephora.oracle.application.service.auth.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthPublicController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ApiResponse.ok("Đăng ký tài khoản thành công", response);
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ApiResponse.ok("Đăng nhập thành công", response);
    }
}
