package com.adhd.fodong.domain.user.account.repository;

import com.adhd.fodong.domain.user.account.entity.AccountEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {

    // Account 저장
    void save(AccountEntity accountEntity);

    // Account Id로 단일 객체 조회
    AccountEntity findById(int accountId);

    // Account Email로 단일 객체 조회
    AccountEntity findByEmail(String accountEmail);

    // Account 업데이트
    void update(AccountEntity accountEntity);

    // Account 삭제
    void delete(int accountId);

    // email로 존재하는 데이터인지 확인
    boolean existsByEmail(String accountEmail);

    boolean existsByAccountId(int accountId);


}
