package com.adhd.fodong.domain.user.account.service;

import com.adhd.fodong.domain.user.account.entity.AccountEntity;
import com.adhd.fodong.domain.user.account.repository.AccountRepository;
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

        if (accountEmail == null || accountEmail.isBlank()) {
            throw new RuntimeException("회원가입요청 : 비어있는 email");
        }

        if (isExist) {
            throw new RuntimeException("이미 있는 사용자임");
        }

        AccountEntity accountEntity = new AccountEntity();

        accountEntity.setAccountEmail(accountEmail);
        accountEntity.setAccountPwd(bCryptPasswordEncoder.encode(accountPwd));

        accountRepository.save(accountEntity);
    }


    @Override
    public AccountEntity findEmailByAccountId(AccountEntity accountEntity) {
        return accountRepository.findById(accountEntity.getAccountId());
    }

}
