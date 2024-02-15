package com.klosowicz.diabetic.support.system.requests.responses;

import com.klosowicz.diabetic.support.system.entities.model.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
    private Long chatId;
    private String firstUserName;
    private String secondUserName;
    private List<Message> messageList;
}
