package com.adhd.fodong.domains.account.service;

import com.adhd.fodong.global.dto.AccountEmailPasswordDto;
import org.springframework.stereotype.Service;

public interface AccountService {

    public void joinProcess(AccountEmailPasswordDto accountEmailPasswordDto);
}
