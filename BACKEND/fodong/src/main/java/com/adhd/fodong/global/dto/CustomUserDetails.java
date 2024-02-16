package com.adhd.fodong.global.dto;

import com.adhd.fodong.domain.user.account.entity.AccountEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final AccountEntity accountEntity;

    public CustomUserDetails(AccountEntity accountEntity) {
        this.accountEntity = accountEntity;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 우린 role 없어서 구현안했음 일단
        return null;
    }

    @Override
    public String getPassword() {
        return accountEntity.getAccountPwd();
    }


    @Override
    public String getUsername() {
    // Principal 지정
        return accountEntity.getAccountEmail();
    }

    public int getAccountId() {
        return accountEntity.getAccountId();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
