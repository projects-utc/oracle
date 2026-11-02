package vn.sephora.oracle.domain.store.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sep_stores")
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class StoreLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(name = "state_code", nullable = false, length = 50)
    private String stateCode;

    @Column(name = "zip_code", nullable = false, length = 20)
    private String zipCode;

    @Column(name = "distance_label", nullable = false, length = 50)
    private String distanceLabel;

    @Column(name = "hours_label", nullable = false, length = 100)
    private String hoursLabel;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Integer isActive = 1;
}
