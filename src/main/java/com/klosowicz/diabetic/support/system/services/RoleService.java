package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.entities.Role;
import com.klosowicz.diabetic.support.system.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Role findByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow();
    }
}
