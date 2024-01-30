package com.adhd.fodong.domains.users.account.service;

import com.adhd.fodong.global.dto.AccountEmailPasswordDto;

public interface AccountService {

    public void joinProcess(AccountEmailPasswordDto accountEmailPasswordDto);
}
