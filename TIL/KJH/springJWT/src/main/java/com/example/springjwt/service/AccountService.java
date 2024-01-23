package com.example.springjwt.service;

import com.example.springjwt.entity.AccountEntity;

import java.util.Optional;

public interface AccountService {
    public Optional<AccountEntity> findByEmail(String userEmail){

    }
}
