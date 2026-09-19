package com.skillswap.controller;

import com.skillswap.Skill;
import com.skillswap.User;
import com.skillswap.repository.SkillRepository;
import com.skillswap.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public UserController(UserRepository userRepository,
                          SkillRepository skillRepository) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User loginUser) {

        Optional<User> user =
                userRepository.findByEmail(loginUser.getEmail());

        if (user.isPresent() &&
                user.get().getPassword().equals(loginUser.getPassword())) {
            return user.get();
        }

        return null;
    }

    @PostMapping("/{userId}/skills/{skillId}")
    public User addSkillToUser(@PathVariable Long userId,
                               @PathVariable Long skillId) {

        User user = userRepository.findById(userId).orElse(null);
        Skill skill = skillRepository.findById(skillId).orElse(null);

        if (user == null || skill == null) {
            return null;
        }

        user.getSkills().add(skill);

        return userRepository.save(user);
    }

    @PostMapping("/{userId}/want-to-learn/{skillId}")
    public User addWantToLearnSkill(@PathVariable Long userId,
                                    @PathVariable Long skillId) {

        User user = userRepository.findById(userId).orElse(null);
        Skill skill = skillRepository.findById(skillId).orElse(null);

        if (user == null || skill == null) {
            return null;
        }

        user.getWantToLearn().add(skill);

        return userRepository.save(user);
    }
    @GetMapping("/{userId}/matches")
    public List<User> getMatchingUsers(@PathVariable Long userId) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return List.of();
        }

        List<Long> skillIds = user.getWantToLearn()
                .stream()
                .map(Skill::getId)
                .toList();

        return userRepository.findMatchingUsers(userId, skillIds);
    }
    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setBio(updatedUser.getBio());

        return userRepository.save(user);
    }
}