package com.adhd.fodong.domain.friend.entity;

import lombok.Data;

@Data
public class FriendShip {

    private int friendshipId;
    private int fromProfileId;
    private int toProfileId;
    private boolean areWeFriend;
}
