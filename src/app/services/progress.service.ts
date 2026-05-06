import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private storageKey = 'cards-progress';

  getProgress(): Set<number> {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  }

  markAsLearned(id: number): void {
    const progress = this.getProgress();
    progress.add(id);
    localStorage.setItem(this.storageKey, JSON.stringify([...progress]));
  }

  unmarkAsLearned(id: number): void {
    const progress = this.getProgress();
    progress.delete(id);
    localStorage.setItem(this.storageKey, JSON.stringify([...progress]));
  }

  isLearned(id: number): boolean {
    return this.getProgress().has(id);
  }
}