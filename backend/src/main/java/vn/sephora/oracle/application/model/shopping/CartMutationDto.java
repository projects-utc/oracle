package vn.sephora.oracle.application.model.shopping;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class CartMutationDto {

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class ItemRequest {
        @NotBlank(message = "Mã SKU không được để trống")
        private String skuId;
        @Builder.Default
        private int quantity = 1;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class QuantityRequest {
        private int quantity;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class SyncRequest {
        private List<ItemRequest> items;
    }
}
