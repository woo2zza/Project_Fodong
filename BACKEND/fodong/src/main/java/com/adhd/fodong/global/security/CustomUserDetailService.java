package com.adhd.fodong.global.security;

import com.adhd.fodong.domain.user.account.entity.AccountEntity;
import com.adhd.fodong.domain.user.account.repository.AccountRepository;
import com.adhd.fodong.global.dto.CustomUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public CustomUserDetailService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String accountEmail) throws UsernameNotFoundException {

        // DB에서 조회
        AccountEntity accountEntity = accountRepository.findByEmail(accountEmail);

        if (accountEntity != null) {
            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
            return new CustomUserDetails(accountEntity);
        }

        return null;
    }
}
