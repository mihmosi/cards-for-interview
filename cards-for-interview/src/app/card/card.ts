import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../data/questions';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
})
export class Card {
  @Input() question!: Question;
  isFlipped = false;

  constructor(private progressService: ProgressService) {}

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  markAsLearned() {
    this.progressService.markAsLearned(this.question.id);
  }

  unmarkAsLearned() {
    this.progressService.unmarkAsLearned(this.question.id);
  }

  isLearned(): boolean {
    return this.progressService.isLearned(this.question.id);
  }
}
