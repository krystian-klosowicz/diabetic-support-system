package com.klosowicz.diabetic.support.system.entities.model;

import com.klosowicz.diabetic.support.system.entities.Chat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String senderEmail;
    private Date createdTime = new Date(System.currentTimeMillis());
    private String replyMessage;

    private Long chatId;
}
