package com.example.springjwt.repository;

import com.example.springjwt.entity.AccountEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
    void insertAccount(AccountEntity account);
    boolean existsByAccountEmail(String email);
    AccountEntity getAccountById(int id);
}