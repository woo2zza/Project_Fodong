package com.adhd.fodong.domains.chat.controller;

import com.adhd.fodong.domains.chat.dto.ChatDtoV2;
import com.adhd.fodong.domains.chat.dto.ChatRoomV2;
import com.adhd.fodong.domains.chat.service.ChatServiceV2;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.gson.GsonProperties;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatControllerV2 {
    private final ChatServiceV2 chatServiceV2;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    //////////////////////// 채팅방 설정 ////////////////////////////////////////////////
    //채팅 리스트 화면
    // 요청이 들어오면 전체 채팅룸 리스트를 담아서 return
    @GetMapping
    public String goChatRoom(Model model) {

        model.addAttribute("list", chatServiceV2.findAllRoom());
        log.info("SHOW ALL ChatList {}", chatServiceV2.findAllRoom());
        return "roomlist";   // roomlist.html 호출
    }

    // 채팅방 생성
    // 채팅방 생성 후 다시 전체 채팅리스트로 return
    @PostMapping("/createroom")
    public String createRoom(@RequestParam String roomName, RedirectAttributes redirectAttributes) {
        ChatRoomV2 chatRoom = chatServiceV2.createChatRoom(roomName);
        log.info("CREATE Chat Room {}", chatRoom);
        redirectAttributes.addFlashAttribute("roomName", chatRoom);
        return "redirect:/chat";
    }

    // 채팅방 입장 화면
    // 파라미터로 넘어오는 roomId 를 확인후 해당 roomId 를 기준으로
    // 채팅방을 찾아서 클라이언트를 chatroom 으로 보낸다.
    @GetMapping("/room")
    public String roomDetail(Model model, String roomId) {
        log.info("roomId {}", roomId);
        model.addAttribute("room", chatServiceV2.findRoomById(roomId));
        return "chatroom";   // chatroom.html 호출
    }

    /////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// 채팅방 STMOP 통신 ///////////////////////////////////////

    // MessageMapping 을 통해 webSocket 로 들어오는 메시지를 발신 처리한다.
    // 이때 클라이언트에서는 /pub/chat/message 로 요청하게 되고 이것을 controller 가 받아서 처리한다.
    // 처리가 완료되면 /sub/chat/room/roomId 로 메시지가 전송된다.
    @MessageMapping("/enteruser")
    public void enterUser(@Payload ChatDtoV2 chatDtoV2, SimpMessageHeaderAccessor headerAccessor) {

        // 채팅방 유저 +1
        chatServiceV2.plusUserCnt(chatDtoV2.getRoomId());

        // 채팅방에 유저 추가 및 UserUUID 반환
        String userUUID = chatServiceV2.addUser(chatDtoV2.getRoomId(), chatDtoV2.getSender());

        // 반환 결과를 socket session 에 userUUID로 저장
        headerAccessor.getSessionAttributes().put("userUUID", userUUID);
        headerAccessor.getSessionAttributes().put("roomId", chatDtoV2.getRoomId());

        chatDtoV2.setMessage(chatDtoV2.getSender() + " 님 입장!");
        simpMessageSendingOperations.convertAndSend("/sub/chat/room/" + chatDtoV2.getRoomId(), chatDtoV2);
    }

    // 해당 유저
    @MessageMapping("/sendmessage")
    public void sendMessage(@Payload ChatDtoV2 chatDtoV2) {
        log.info("CHAT {}", chatDtoV2);
        chatDtoV2.setMessage(chatDtoV2.getMessage());
        simpMessageSendingOperations.convertAndSend("/sub/chat/room/" + chatDtoV2.getRoomId(), chatDtoV2);
    }

    // 유저 퇴장시에는 EventListener를 통해서 유저 퇴장을 확인
    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("DisConnEvnet {}", event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // stomp 세션에 있던 uuid 와 roomId 를 확인해서 채팅방 유저 리스트와 room 에서 해당 유저를 삭제
        String userUUID = (String) headerAccessor.getSessionAttributes().get("userUUID");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        log.info("headAccessor {}", headerAccessor);

        // 채팅방 유저 -1
        chatServiceV2.minusUserCnt(roomId);

        // 채팅방 유저 리스트에서 UUID 조회 및 리스트에서 삭제
        String userName = chatServiceV2.getUserName(roomId, userUUID);
        chatServiceV2.delUser(roomId, userName);

        if (userName != null) {
            log.info("User Diconnected : " + userName);

            ChatDtoV2 chatDtoV2 = ChatDtoV2.builder()
                    .type(ChatDtoV2.MessageType.LEAVE)
                    .sender(userName)
                    .message(userName + " 님 퇴장!!")
                    .build();

            simpMessageSendingOperations.convertAndSend("/sub/chat/room/" + roomId, chatDtoV2);
        }
    }

    // 채팅에 참여한 유저 리스트 반환
    @GetMapping("/userlist")
    @ResponseBody
    public ArrayList<String> userList(String roomId) {
        return chatServiceV2.getUserList(roomId);
    }

    // 채팅에 참여한 유저 닉네임 중복 확인
    @GetMapping("/duplicatename")
    @ResponseBody
    public String isDuplicateName(@RequestParam("roomId") String roomId,
                                  @RequestParam("username") String username) {
        //유저 이름 확인
        String userName = chatServiceV2.isDuplicateName(roomId, username);
        log.info("동작확인 {}", userName);

        return userName;
    }


}
