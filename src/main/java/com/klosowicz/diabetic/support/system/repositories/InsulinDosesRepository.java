package com.klosowicz.diabetic.support.system.repositories;

import com.klosowicz.diabetic.support.system.entities.InsulinDoses;
import com.klosowicz.diabetic.support.system.entities.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsulinDosesRepository extends JpaRepository<InsulinDoses, Long> {

    List<InsulinDoses> findAllByUser(User user);

}
