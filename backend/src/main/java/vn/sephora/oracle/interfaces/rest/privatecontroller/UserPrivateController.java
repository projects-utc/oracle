package vn.sephora.oracle.interfaces.rest.privatecontroller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.sephora.oracle.application.common.ApiResponse;
import vn.sephora.oracle.application.model.user.UserDto;
import vn.sephora.oracle.application.service.user.UserService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/users")
public class UserPrivateController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<UserDto> getMe() {
        return ApiResponse.ok(userService.getCurrentUserDto());
    }

    @PatchMapping("/me/store")
    public ApiResponse<UserDto> updatePreferredStore(@RequestBody Map<String, Object> body) {
        Long storeId = null;
        if (body.get("storeId") != null) {
            storeId = Long.valueOf(body.get("storeId").toString());
        }
        return ApiResponse.ok("Cập nhật cửa hàng ưu tiên thành công", userService.updatePreferredStore(storeId));
    }
}
