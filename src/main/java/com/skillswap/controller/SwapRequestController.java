package com.skillswap.controller;

import com.skillswap.SwapRequest;
import com.skillswap.repository.SwapRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class SwapRequestController {

    private final SwapRequestRepository swapRequestRepository;

    public SwapRequestController(SwapRequestRepository swapRequestRepository) {
        this.swapRequestRepository = swapRequestRepository;
    }

    @PostMapping
    public SwapRequest sendRequest(@RequestBody SwapRequest request) {

        request.setStatus("PENDING");

        return swapRequestRepository.save(request);
    }

    @GetMapping
    public List<SwapRequest> getAllRequests() {
        return swapRequestRepository.findAll();
    }
    @PutMapping("/{requestId}/status")
    public SwapRequest updateRequestStatus(
            @PathVariable Long requestId,
            @RequestParam String status) {

        SwapRequest request =
                swapRequestRepository.findById(requestId).orElse(null);

        if (request == null) {
            return null;
        }

        request.setStatus(status.toUpperCase());

        return swapRequestRepository.save(request);
    }
}