package vn.sephora.oracle.application.service.audit;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import vn.sephora.oracle.domain.audit.model.AuditLog;
import vn.sephora.oracle.domain.audit.persistent.AuditLogRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void record(Long actorUserId, String actorUsername, String actionType, String targetType, String targetId, String detailText) {
        try {
            AuditLog logEntry = AuditLog.builder()
                    .actorUserId(actorUserId)
                    .actorUsername(actorUsername != null ? actorUsername : "ANONYMOUS")
                    .actionType(actionType)
                    .targetType(targetType)
                    .targetId(targetId)
                    .detailText(detailText)
                    .build();
            auditLogRepository.save(logEntry);
        } catch (Exception e) {
            log.warn("Failed to write audit log: {}", e.getMessage());
        }
    }
}
