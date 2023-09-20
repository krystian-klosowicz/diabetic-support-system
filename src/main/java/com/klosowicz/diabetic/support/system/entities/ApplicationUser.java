package com.klosowicz.diabetic.support.system.entities;


import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@Entity
@AllArgsConstructor
@RequiredArgsConstructor
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    private String name;

    private String surname;

    private String email;

    private String password;

    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

}

