package com.klosowicz.diabetic.support.system.entities;

import com.klosowicz.diabetic.support.system.entities.model.Message;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;
    private String firstUserName;
    private String secondUserName;

}
