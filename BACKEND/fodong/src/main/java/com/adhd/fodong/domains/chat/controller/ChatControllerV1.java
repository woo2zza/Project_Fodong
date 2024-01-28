//package com.adhd.fodong.domains.chat.controller;
//
//import com.adhd.fodong.domains.chat.dto.ChatRoomV1;
//import com.adhd.fodong.domains.chat.service.ChatServiceV1;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@Slf4j
//@RequiredArgsConstructor
////@RequestMapping("/chat")
//public class ChatControllerV1 {
//
//    private final ChatServiceV1 chatServiceV1;
//
//    @PostMapping
//    public ChatRoomV1 createRoom(@RequestParam String name) {
//        return chatServiceV1.createRoom(name);
//    }
//
//    @GetMapping
//    public List<ChatRoomV1> findAllRooms() {
//        return chatServiceV1.findAllRoom();
//    }
//}
