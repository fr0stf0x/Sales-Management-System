package edu.tdt.it.footcare.domain.promotion;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDate;
import java.util.List;

@RepositoryRestResource
public interface PromotionRepository extends CrudRepository<PromotionEvent, Long> {
    @Query("select case when e.startDate >= :now and e.endDate <= :now then true else false end from PromotionEvent e")
    boolean isThereAnySaleEvent(@Param("now") LocalDate now);

    @Query("select e from PromotionEvent e where e.startDate >= :now and e.endDate <= :now")
    List<PromotionEvent> getSaleOffEvents(@Param("now") LocalDate now);
}

