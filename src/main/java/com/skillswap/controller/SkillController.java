package com.skillswap.controller;

import com.skillswap.Skill;
import com.skillswap.repository.SkillRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
}
