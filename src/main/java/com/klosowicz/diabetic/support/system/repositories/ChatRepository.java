package com.klosowicz.diabetic.support.system.repositories;

import com.klosowicz.diabetic.support.system.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByFirstUserName(String username);

    List<Chat> findBySecondUserName(String username);

    List<Chat> findByFirstUserNameAndSecondUserName(String firstUserName, String secondUserName);

    List<Chat> findBySecondUserNameAndFirstUserName(String firstUserName, String secondUserName);

    boolean existsByFirstUserNameAndSecondUserName(String firstUserName, String secondUserName);
}