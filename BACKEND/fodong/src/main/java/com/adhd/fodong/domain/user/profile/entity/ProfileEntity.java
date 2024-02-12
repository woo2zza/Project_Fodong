package com.adhd.fodong.domain.user.profile.entity;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileEntity {

    private int profileId;
    private int accountId;
    private String accountEmail;
    private String nickname;
}
