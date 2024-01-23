package com.example.springjwt.mapper;

import com.example.springjwt.entity.AccountEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface AccountMapper {
    Optional<AccountEntity> findByEmail(String accountEmail);
}
