package com.example.springjwt.repository;

import com.example.springjwt.entity.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
    void insertUser(UserEntity user);
    boolean existsByUsername(String username);
    UserEntity getUserById(int id);

    //username을 받아 DB 테이블에서 회원을 조회하는 메소드 작성
    UserEntity findByUsername(String username);
}
