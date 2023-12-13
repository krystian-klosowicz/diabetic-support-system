package com.klosowicz.diabetic.support.system.services;

import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.entities.criteria.UserSearchCriteria;
import com.klosowicz.diabetic.support.system.entities.page.UserPage;
import com.klosowicz.diabetic.support.system.repositories.UserRepository;
import com.klosowicz.diabetic.support.system.repositories.criteria.UserCriteriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserCriteriaRepository userCriteriaRepository;

  public Page<User> getUsers(UserPage userPage, UserSearchCriteria userSearchCriteria) {
    return userCriteriaRepository.findAllWithFilters(userPage, userSearchCriteria);
  }


//  public List<User> getUsers() {
//    return userRepository.findAll();
//  }

  //  public Page<UserDto> findAllUsers(UserPage userPage) {
  //    Pageable pageable = PageRequest.of(userPage.getPageNumber(), userPage.getPageSize());
  //
  //    Page<User> pharmacyUserPage = applicationUserRepository.findAll(pageable);
  //
  //    return pharmacyUserPage.map(
  //        user ->
  //            new UserDto(
  //                user.getId(),
  //                user.getRole(),
  //                user.getAddress(),
  //                user.getFirstName(),
  //                user.getLastName(),
  //                user.getEmail(),
  //                user.getPhoneNumber()));
  //  }
}
