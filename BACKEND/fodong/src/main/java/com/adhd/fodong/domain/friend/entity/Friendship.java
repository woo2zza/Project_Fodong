package com.adhd.fodong.domain.friend.entity;

import lombok.Data;

import java.util.List;

@Data
public class Friendship {

    private int friendshipId;
    private int fromProfileId;
    private int toProfileId;
    private Status status;
}
