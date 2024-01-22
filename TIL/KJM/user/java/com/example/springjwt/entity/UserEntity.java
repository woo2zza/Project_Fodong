package com.example.springjwt.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserEntity {

    private int id;
    private String username;
    private String password;
    private String role;
}