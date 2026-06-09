package com.example.cards.controller;

import com.example.cards.entity.Question;
import com.example.cards.service.QuestionService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return questionService.findAllCategoryNames();
    }

    @GetMapping("/questions")
    public List<Question> getQuestions(@RequestParam(value = "category", required = false) String category) {
        return questionService.findQuestionsByCategory(category);
    }
}
