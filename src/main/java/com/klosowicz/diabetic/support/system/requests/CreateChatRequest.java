package com.klosowicz.diabetic.support.system.requests;

import lombok.Getter;

@Getter
public class CreateChatRequest {
    private String firstUserName;
    private String secondUserName;
}
