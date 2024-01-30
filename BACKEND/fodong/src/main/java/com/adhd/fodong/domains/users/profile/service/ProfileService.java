package com.adhd.fodong.domains.users.profile.service;

import com.adhd.fodong.domains.users.profile.entity.ProfileEntity;
import com.adhd.fodong.domains.users.profile.dto.ProfileDetails;

import java.util.List;

public interface ProfileService {

    public List<ProfileEntity> getProfiles(int accountId);

    public void makeProfile(int accountId, ProfileDetails profileDetails);

    public void updateProfile(int profileId, ProfileDetails profileDetails);

    public void deleteProfile(int profileId);

}
