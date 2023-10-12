package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.entities.ApplicationUser;
import com.klosowicz.diabetic.support.system.repositories.ApplicationUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplicationUserService {

    private final ApplicationUserRepository applicationUserRepository;

    public Page<ApplicationUser> findAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<ApplicationUser> pharmacyUserPage = applicationUserRepository.findAll(pageable);

        return pharmacyUserPage;
    }

}
