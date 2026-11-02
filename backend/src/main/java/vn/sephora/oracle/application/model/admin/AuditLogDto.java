package vn.sephora.oracle.application.model.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogDto {
    private Long id;
    private Long actorUserId;
    private String actorUsername;
    private String actionType;
    private String targetType;
    private String targetId;
    private String detailText;
    private LocalDateTime createdAt;
}
