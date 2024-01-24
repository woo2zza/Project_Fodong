package com.adhd.fodong.domains.account.service;

import com.adhd.fodong.domains.account.entity.AccountEntity;
import com.adhd.fodong.domains.account.repository.AccountRepository;
import com.adhd.fodong.global.dto.AccountEmailPasswordDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void joinProcess(AccountEmailPasswordDto accountEmailPasswordDto) {
        // 회원가입

        String accountEmail = accountEmailPasswordDto.getAccountEmail();
        String accountPwd = accountEmailPasswordDto.getAccountPwd();

        boolean isExist = accountRepository.existsByEmail(accountEmail);

        if (isExist) {
            throw new RuntimeException("이미 있는 사용자임");
        }


        AccountEntity accountEntity = new AccountEntity();

        accountEntity.setAccountEmail(accountEmail);
        accountEntity.setAccountPwd(bCryptPasswordEncoder.encode(accountPwd));

        accountRepository.save(accountEntity);


    }
}
