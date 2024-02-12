package com.adhd.fodong.domain.user.profile.service;

import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import com.adhd.fodong.domain.user.profile.dto.ProfileDetails;

import java.util.List;

public interface ProfileService {

    public List<ProfileEntity> getProfiles(int accountId);

    public ProfileEntity getProfile(int profileId);

    public void makeProfile(int accountId, ProfileDetails profileDetails);

    public void updateProfile(int profileId, ProfileDetails profileDetails);

    public void deleteProfile(int profileId);

}
