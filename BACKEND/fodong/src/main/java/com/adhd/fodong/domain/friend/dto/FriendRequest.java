package com.adhd.fodong.domain.friend.dto;

import lombok.Data;

@Data
public class FriendRequest {

    private int friendshipId;
    private int fromProfileId;
    private int toProfileId;
    private String action;
}
