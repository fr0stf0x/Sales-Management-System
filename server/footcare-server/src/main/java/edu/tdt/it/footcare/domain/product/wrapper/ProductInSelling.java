package edu.tdt.it.footcare.domain.product.wrapper;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class ProductInSelling extends ProductWrapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public ProductInSelling() {
        super();
    }
}