package com.adhd.fodong.domain.user.account.service;

import com.adhd.fodong.domain.user.account.entity.AccountEntity;
import com.adhd.fodong.global.dto.AccountEmailPasswordDto;

public interface AccountService {

    public void joinProcess(AccountEmailPasswordDto accountEmailPasswordDto);

    public AccountEntity findEmailByAccountId(AccountEntity accountEntity);

}
