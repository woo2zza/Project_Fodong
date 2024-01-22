package com.example.springjwt.repository;

import com.example.springjwt.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
    void insertUser(UserEntity user);
    boolean existsByUsername(String username);
    UserEntity getUserById(int id);
}
