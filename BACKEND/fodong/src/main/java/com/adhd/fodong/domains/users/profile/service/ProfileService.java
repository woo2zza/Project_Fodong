package com.adhd.fodong.domains.users.profile.service;

import com.adhd.fodong.domains.users.profile.dto.UpdateProfile;
import com.adhd.fodong.domains.users.profile.entity.ProfileEntity;
import com.adhd.fodong.domains.users.profile.dto.MakeProfile;

import java.util.List;

public interface ProfileService {

    public List<ProfileEntity> getProfiles(int accountId);

    public void makeProfile(MakeProfile makeProfile);

    public void updateProfile(UpdateProfile updateProfile);

    public void deleteProfile(int profileId);

}
