package com.skillswap.repository;

import com.skillswap.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.skills s WHERE s.id IN :skillIds AND u.id <> :userId")
    List<User> findMatchingUsers(Long userId, List<Long> skillIds);
    List<User> findByNameContainingIgnoreCase(String name);
}