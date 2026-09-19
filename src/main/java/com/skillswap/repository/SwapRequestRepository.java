package com.skillswap.repository;

import com.skillswap.SwapRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SwapRequestRepository extends JpaRepository<SwapRequest, Long> {

    Optional<SwapRequest> findBySenderIdAndReceiverIdAndStatus(
            Long senderId,
            Long receiverId,
            String status
    );
}