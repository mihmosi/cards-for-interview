import { Injectable } from '@angular/core';
import { Question, questions } from '../data/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questions: Question[] = questions;

  getQuestions(): Question[] {
    return this.questions;
  }

  getCategories(): string[] {
    return [...new Set(this.questions.map(q => q.category))];
  }

  getQuestionsByCategory(category: string): Question[] {
    return this.questions.filter(q => q.category === category);
  }
}