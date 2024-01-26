package com.adhd.fodong.domains.profile.service;

import com.adhd.fodong.domains.profile.entity.ProfileEntity;
import com.adhd.fodong.global.dto.AccountEmailPasswordDto;
import com.adhd.fodong.global.dto.MakeProfileDto;

import javax.swing.text.html.parser.Entity;
import java.util.List;

public interface ProfileService {

    public List<ProfileEntity> getProfiles(int accountId);

    public void makeProfile(MakeProfileDto makeProfileDto);


}
