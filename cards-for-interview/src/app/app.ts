import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from './card/card';
import { QuestionsService } from './services/questions.service';
import { ProgressService } from './progress.service';
import { Question } from './data/questions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Card],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  questions: Question[] = [];
  filteredQuestions: Question[] = [];
  categories: string[] = [];
  selectedCategory = 'Все';

  constructor(
    private questionsService: QuestionsService,
    private progressService: ProgressService
  ) {}

  ngOnInit() {
    this.questions = this.questionsService.getQuestions();
    this.categories = this.questionsService.getCategories();
    this.filteredQuestions = this.questions;
  }

  filterByCategory() {
    if (this.selectedCategory === 'Все') {
      this.filteredQuestions = this.questions;
    } else {
      this.filteredQuestions = this.questionsService.getQuestionsByCategory(this.selectedCategory);
    }
  }

  getLearnedCount(): number {
    return this.questions.filter(q => this.progressService.isLearned(q.id)).length;
  }

  getTotalCount(): number {
    return this.questions.length;
  }
}
