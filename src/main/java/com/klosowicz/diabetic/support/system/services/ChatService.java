package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.entities.Chat;
import com.klosowicz.diabetic.support.system.entities.model.Message;
import com.klosowicz.diabetic.support.system.repositories.ChatRepository;
import com.klosowicz.diabetic.support.system.repositories.MessageRepository;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.requests.CreateChatRequest;
import com.klosowicz.diabetic.support.system.requests.responses.ChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
  private final ChatRepository chatRepository;
  private final UserRepository userRepository;
  private final MessageRepository messageRepository;


  public Chat addChat(CreateChatRequest chatRequest) {
    if(!validateUsersAndChatExists(chatRequest.getFirstUserName(), chatRequest.getSecondUserName())){
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error when creating a chat.");
    }
    Chat chat =
        Chat.builder()
            .firstUserName(chatRequest.getFirstUserName())
            .secondUserName(chatRequest.getSecondUserName())
            .build();
    return chatRepository.save(chat);
  }

  public Message addMessage(Message message, Long chatId) {
      Chat chat = chatRepository.findById(chatId).orElseThrow();
      message.setChatId(chatId);
      return messageRepository.save(message);
  }

  public List<ChatResponse> getAllChats() {
      List<Chat> chats = chatRepository.findAll();

      return chats.stream()
              .map(chat -> mapToChatResponse(chat))
              .collect(Collectors.toList());
  }

  public List<ChatResponse> getChatByFirstUserName(String username) {
      List<Chat> chats = chatRepository.findByFirstUserName(username);
      if(chats.isEmpty()){
          throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat not found.");
      }
      return chats.stream()
              .map(chat -> mapToChatResponse(chat))
              .collect(Collectors.toList());
  }

    public List<ChatResponse> getChatBySecondUserName(String username) {
      List<Chat> chats = chatRepository.findBySecondUserName(username);
      if(chats.isEmpty()) {
          throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat not found.");
      }
        return chats.stream()
                .map(chat -> mapToChatResponse(chat))
                .collect(Collectors.toList());
    }

    public List<Chat> getChatByFirstUserNameOrSecondUserName(String username) {
        List<Chat> chats = chatRepository.findByFirstUserName(username);
        List<Chat> chats1 = chatRepository.findBySecondUserName(username);

        chats1.addAll(chats);
        if(chats1.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat not found.");
        }
//           return chats1.stream()
//                .map(chat -> mapToChatResponse(chat))
//                .collect(Collectors.toList());
        return chats1;
    }

    public ChatResponse getChatById(Long id) {
        Chat chat = chatRepository.findById(id).orElseThrow();
        return ChatResponse.builder().chatId(chat.getChatId())
                .firstUserName(chat.getFirstUserName())
                .secondUserName(chat.getSecondUserName())
                .messageList(messageRepository.findAllByChatId(chat.getChatId()))
                .build();
    }

    private boolean validateUsersAndChatExists(String firstUser, String secondUser) {
        return userRepository.existsByEmail(firstUser)
                && userRepository.existsByEmail(secondUser)
                && !firstUser.equals(secondUser)
                && !chatRepository.existsByFirstUserNameAndSecondUserName(firstUser, secondUser);
    }

    private ChatResponse mapToChatResponse(Chat chat) {
        return ChatResponse.builder().chatId(chat.getChatId())
                .firstUserName(chat.getFirstUserName())
                .secondUserName(chat.getSecondUserName())
                .messageList(messageRepository.findAllByChatId(chat.getChatId()))
                .build();
    }
}
