package com.klosowicz.diabetic.support.system.repositories;

import com.klosowicz.diabetic.support.system.entities.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<ApplicationUser> findByEmail(String email);

    List<ApplicationUser> findAllByRoleName(String role);
}
