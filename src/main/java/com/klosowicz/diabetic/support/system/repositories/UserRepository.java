package com.klosowicz.diabetic.support.system.repositories;

import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.entities.criteria.UserSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  boolean existsByEmail(String email);

  boolean existsByPhoneNumber(String phoneNumber);

  Optional<User> findByEmail(String email);
}
