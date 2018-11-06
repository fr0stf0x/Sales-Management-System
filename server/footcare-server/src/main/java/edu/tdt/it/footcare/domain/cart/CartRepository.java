package edu.tdt.it.footcare.domain.cart;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface CartRepository extends CrudRepository<Cart, Long> {
    Cart findByCreatedBy(long customerId);
    boolean existsByCreatedBy(long customerId);
}
