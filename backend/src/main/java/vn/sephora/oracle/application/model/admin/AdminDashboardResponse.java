package vn.sephora.oracle.application.model.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.sephora.oracle.application.model.shopping.OrderDto;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {
    private BigDecimal totalRevenue;
    private long totalOrders;
    private long pendingOrders;
    private long completedOrders;
    private long cancelledOrders;
    private long totalProducts;
    private long lowStockProducts;
    private long totalCustomers;
    private long activePromotions;
    private long totalSubscriptions;
    private List<OrderDto> recentOrders;
    private List<AuditLogDto> recentAuditLogs;
}
