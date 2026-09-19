package com.skillswap.repository;

import com.skillswap.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    List<Rating> findByReviewedUserId(Long reviewedUserId);

}