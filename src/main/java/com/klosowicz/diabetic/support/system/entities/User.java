package com.klosowicz.diabetic.support.system.entities;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Builder
@Getter
@Setter
@Entity
@Table(name = "_user")
@AllArgsConstructor
@RequiredArgsConstructor
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  private Role role;

  @NotBlank
  private String firstName;

  @NotBlank
  private String lastName;

  @NotBlank
  private String email;

  @NotBlank
  private String password;

  @NotNull
  private LocalDate dateOfBirth;

  @NotBlank
  private String phoneNumber;

  @OneToOne
  @JoinColumn(name = "address_id")
  private Address address;

  @Column(name = "created_at", nullable = false, updatable = false)
  @CreatedDate
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  @LastModifiedDate
  private LocalDateTime updatedAt;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
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

  @PrePersist
  protected void onCreate() {
    createdAt = updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }
}
