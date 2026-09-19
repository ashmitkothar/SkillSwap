package com.skillswap.controller;

import com.skillswap.Message;
import com.skillswap.repository.MessageRepository;
import org.springframework.web.bind.annotation.*;
import com.skillswap.repository.UserRepository;
import com.skillswap.repository.SwapRequestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final SwapRequestRepository swapRequestRepository;

    public MessageController(MessageRepository messageRepository,
                             UserRepository userRepository,
                             SwapRequestRepository swapRequestRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.swapRequestRepository = swapRequestRepository;
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {

        if (!userRepository.existsById(message.getSenderId()) ||
                !userRepository.existsById(message.getReceiverId())) {

            return ResponseEntity.notFound().build();
        }

        boolean accepted =
                swapRequestRepository
                        .findBySenderIdAndReceiverIdAndStatus(
                                message.getSenderId(),
                                message.getReceiverId(),
                                "ACCEPTED"
                        )
                        .isPresent()
                        ||
                        swapRequestRepository
                                .findBySenderIdAndReceiverIdAndStatus(
                                        message.getReceiverId(),
                                        message.getSenderId(),
                                        "ACCEPTED"
                                )
                                .isPresent();

        if (!accepted) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        message.setSentAt(java.time.LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(messageRepository.save(message));
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(
            @RequestParam Long user1,
            @RequestParam Long user2) {

        boolean accepted =
                swapRequestRepository
                        .findBySenderIdAndReceiverIdAndStatus(
                                user1,
                                user2,
                                "ACCEPTED"
                        )
                        .isPresent()
                        ||
                        swapRequestRepository
                                .findBySenderIdAndReceiverIdAndStatus(
                                        user2,
                                        user1,
                                        "ACCEPTED"
                                )
                                .isPresent();

        if (!accepted) {
            return List.of();
        }

        return messageRepository.findConversation(user1, user2);
    }
    @DeleteMapping("/{messageId}")
    public void deleteMessage(
            @PathVariable Long messageId,
            @RequestParam Long userId) {

        Message message = messageRepository.findById(messageId).orElse(null);

        if (message == null) {
            return;
        }

        if (!message.getSenderId().equals(userId)) {
            return;
        }

        messageRepository.deleteById(messageId);
    }

    @PutMapping("/{messageId}")
    public ResponseEntity<Message> editMessage(
            @PathVariable Long messageId,
            @RequestParam Long userId,
            @RequestBody Message updatedMessage) {

        Message message = messageRepository.findById(messageId).orElse(null);

        if (message == null) {
            return ResponseEntity.notFound().build();
        }

        if (!message.getSenderId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        message.setContent(updatedMessage.getContent());

        return ResponseEntity.ok(messageRepository.save(message));
    }
}