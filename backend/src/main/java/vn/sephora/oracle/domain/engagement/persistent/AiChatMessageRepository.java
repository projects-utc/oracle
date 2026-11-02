package vn.sephora.oracle.domain.engagement.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.engagement.model.AiChatMessage;

import java.util.List;

@Repository
public interface AiChatMessageRepository extends JpaRepository<AiChatMessage, Long> {
    List<AiChatMessage> findAllBySessionKeyOrderByCreatedAtAsc(String sessionKey);
}
