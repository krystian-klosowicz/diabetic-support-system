package com.klosowicz.diabetic.support.system.controllers;

import com.klosowicz.diabetic.support.system.entities.Chat;
import com.klosowicz.diabetic.support.system.entities.model.Message;
import com.klosowicz.diabetic.support.system.requests.CreateChatRequest;
import com.klosowicz.diabetic.support.system.requests.responses.ChatResponse;
import com.klosowicz.diabetic.support.system.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/chats")
public class ChatController {

  private final ChatService chatService;

  @GetMapping
  public ResponseEntity<List<ChatResponse>> getAllChats() {
    return new ResponseEntity<List<ChatResponse>>(chatService.getAllChats(), HttpStatus.OK);
  }

  @GetMapping("/first-user-name/{username}")
  public ResponseEntity<List<ChatResponse>> getChatByFirstUserName(@PathVariable String username) {
    return new ResponseEntity<List<ChatResponse>>(chatService.getChatByFirstUserName(username), HttpStatus.OK);
  }

  @GetMapping("/second-user-name/{username}")
  public ResponseEntity<List<ChatResponse>> getChatBySecondUserName(@PathVariable String username) {
    return new ResponseEntity<List<ChatResponse>>(chatService.getChatBySecondUserName(username), HttpStatus.OK);
  }

  @GetMapping("/first-or-second-username/{username}")
  public ResponseEntity<List<Chat>> getChatByFirstOrSecondUserName(@PathVariable String username) {
    return new ResponseEntity<List<Chat>>(chatService.getChatByFirstUserNameOrSecondUserName(username), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ChatResponse> getChatById(@PathVariable Long id) {
    return new ResponseEntity<ChatResponse>(chatService.getChatById(id), HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<Chat> createChat(@RequestBody CreateChatRequest chatRequest) {
    return new ResponseEntity<Chat>(chatService.addChat(chatRequest), HttpStatus.CREATED);
  }

  @PutMapping("/add-message/{chatId}")
  public ResponseEntity<Message> addMessage(@RequestBody Message add, @PathVariable Long chatId) {
    return ResponseEntity.ok(chatService.addMessage(add,chatId));
  }



}
