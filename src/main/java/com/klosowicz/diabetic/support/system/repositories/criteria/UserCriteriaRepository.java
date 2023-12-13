package com.klosowicz.diabetic.support.system.repositories.criteria;

import com.klosowicz.diabetic.support.system.entities.Doctor;
import com.klosowicz.diabetic.support.system.entities.Patient;
import com.klosowicz.diabetic.support.system.entities.User;
import com.klosowicz.diabetic.support.system.entities.criteria.UserSearchCriteria;
import com.klosowicz.diabetic.support.system.entities.page.UserPage;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

@Repository
public class UserCriteriaRepository {

  private final EntityManager entityManager;
  private final CriteriaBuilder criteriaBuilder;

  public UserCriteriaRepository(EntityManager entityManager) {
    this.entityManager = entityManager;
    this.criteriaBuilder = entityManager.getCriteriaBuilder();
  }

  public Page<User> findAllWithFilters(UserPage userPage, UserSearchCriteria userSearchCriteria) {
    CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
    Root<User> userRoot = criteriaQuery.from(User.class);
    Predicate predicate = getPredicate(userSearchCriteria, criteriaQuery, userRoot);
    criteriaQuery.where(predicate);
    if (isSortableField(userPage.getSortBy())) {
      setOrder(userPage, criteriaQuery, userRoot);
    }

    TypedQuery<User> typedQuery = entityManager.createQuery(criteriaQuery);
    typedQuery.setFirstResult(userPage.getPageNumber() * userPage.getPageSize());
    typedQuery.setMaxResults(userPage.getPageSize());
    Pageable pageable = getPageable(userPage);
    long usersCount = getUsersCount(predicate);

    return new PageImpl<>(typedQuery.getResultList(), pageable, usersCount);
  }

  private Predicate getPredicate(
      UserSearchCriteria userSearchCriteria,
      CriteriaQuery<User> criteriaQuery,
      Root<User> userRoot) {
    List<Predicate> predicates = new ArrayList<>();
    if (Objects.nonNull(userSearchCriteria.getRole())) {
      predicates.add(criteriaBuilder.equal(userRoot.get("role"), userSearchCriteria.getRole()));
    }
    if (Objects.nonNull(userSearchCriteria.getFirstName())) {
      predicates.add(
          criteriaBuilder.like(
              userRoot.get("firstName"), "%" + userSearchCriteria.getFirstName() + "%"));
    }
    if (Objects.nonNull(userSearchCriteria.getLastName())) {
      predicates.add(
          criteriaBuilder.like(
              userRoot.get("lastName"), "%" + userSearchCriteria.getLastName() + "%"));
    }
    if (Objects.nonNull(userSearchCriteria.getEmail())) {
      predicates.add(
          criteriaBuilder.like(userRoot.get("email"), "%" + userSearchCriteria.getEmail() + "%"));
    }

    if (Objects.nonNull(userSearchCriteria.getPhoneNumber())) {
      predicates.add(
          criteriaBuilder.equal(userRoot.get("phoneNumber"), userSearchCriteria.getPhoneNumber()));
    }

    if (Objects.nonNull(userSearchCriteria.getDiabetesType())) {
      Subquery<Long> subquery = criteriaQuery.subquery(Long.class);
      Root<Patient> patientSubqueryRoot = subquery.from(Patient.class);
      subquery
          .select(criteriaBuilder.literal(1L))
          .where(
              criteriaBuilder.and(
                  criteriaBuilder.equal(patientSubqueryRoot, userRoot),
                  criteriaBuilder.equal(
                      patientSubqueryRoot.get("diabetesType"),
                      userSearchCriteria.getDiabetesType())));
      predicates.add(criteriaBuilder.exists(subquery));
    }

    if (Objects.nonNull(userSearchCriteria.getPwzNumber())) {
      Subquery<Long> subquery = criteriaQuery.subquery(Long.class);
      Root<Doctor> doctorSubqueryRoot = subquery.from(Doctor.class);
      subquery
          .select(criteriaBuilder.literal(1L))
          .where(
              criteriaBuilder.and(
                  criteriaBuilder.equal(doctorSubqueryRoot, userRoot),
                  criteriaBuilder.equal(
                      doctorSubqueryRoot.get("pwzNumber"), userSearchCriteria.getPwzNumber())));
      predicates.add(criteriaBuilder.exists(subquery));
    }
    return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
  }

  private void setOrder(UserPage userPage, CriteriaQuery<User> criteriaQuery, Root<User> userRoot) {
    if (userPage.getSortDirection().equals(Sort.Direction.ASC)) {
      criteriaQuery.orderBy(criteriaBuilder.asc(userRoot.get(userPage.getSortBy())));
    } else {
      criteriaQuery.orderBy(criteriaBuilder.desc(userRoot.get(userPage.getSortBy())));
    }
  }

  private long getUsersCount(Predicate predicate) {
    CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
    Root<User> countRoot = countQuery.from(User.class);
    countQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
    return entityManager.createQuery(countQuery).getSingleResult();
  }

  private Pageable getPageable(UserPage userPage) {
    Sort sort = Sort.by(userPage.getSortDirection(), userPage.getSortBy());
    return PageRequest.of(userPage.getPageNumber(), userPage.getPageSize(), sort);
  }

  private boolean isSortableField(String sortBy) {
    Class<?> userClass = User.class;

    List<String> userFields =
        Arrays.stream(userClass.getDeclaredFields())
            .map(Field::getName)
            .collect(Collectors.toList());

    return userFields.contains(sortBy);
  }
}
