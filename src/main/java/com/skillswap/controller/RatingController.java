package com.skillswap.controller;

import com.skillswap.Rating;
import com.skillswap.repository.RatingRepository;
import com.skillswap.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;

    public RatingController(RatingRepository ratingRepository,
                            UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Rating> addRating(@RequestBody Rating rating) {

        if (!userRepository.existsById(rating.getReviewerId()) ||
                !userRepository.existsById(rating.getReviewedUserId())) {

            return ResponseEntity.notFound().build();
        }

        if (rating.getRating() == null ||
                rating.getRating() < 1 ||
                rating.getRating() > 5) {

            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ratingRepository.save(rating));
    }

    @GetMapping("/user/{userId}")
    public List<Rating> getUserRatings(@PathVariable Long userId) {
        return ratingRepository.findByReviewedUserId(userId);
    }

    @GetMapping
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }
}