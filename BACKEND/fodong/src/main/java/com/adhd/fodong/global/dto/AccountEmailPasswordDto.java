package com.adhd.fodong.global.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "계정 DTO")
public class AccountEmailPasswordDto {
    @Schema(description = "계정 email", example = "test@test")
    private String accountEmail;

    @Schema(description = "게정 비밀번호")
    private String accountPwd;
}
