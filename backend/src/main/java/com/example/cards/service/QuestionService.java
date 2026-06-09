package com.example.cards.service;

import com.example.cards.entity.Category;
import com.example.cards.entity.Question;
import com.example.cards.repository.CategoryRepository;
import com.example.cards.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final CategoryRepository categoryRepository;

    public QuestionService(QuestionRepository questionRepository, CategoryRepository categoryRepository) {
        this.questionRepository = questionRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<String> findAllCategoryNames() {
        return categoryRepository.findAll()
                .stream()
                .map(Category::getName)
                .collect(Collectors.toList());
    }

    public List<Question> findAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> findQuestionsByCategory(String categoryName) {
        if (categoryName == null || categoryName.trim().isEmpty()) {
            return findAllQuestions();
        }
        return questionRepository.findByCategoryName(categoryName);
    }
}
