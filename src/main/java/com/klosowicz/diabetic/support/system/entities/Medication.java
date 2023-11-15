package com.klosowicz.diabetic.support.system.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double dosage;

    private int freq_per_day;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
