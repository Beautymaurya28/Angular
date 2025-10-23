import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly storageKey = 'todo_tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this.tasksSubject.asObservable();

  private idCounter = 1;

  constructor() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Task[];
        this.tasksSubject.next(parsed);
        this.idCounter = parsed.reduce((m, t) => Math.max(m, t.id), 0) + 1;
      } catch {
        localStorage.removeItem(this.storageKey);
      }
    }
  }

  private persist(tasks: Task[]) {
    this.tasksSubject.next([...tasks]);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  addTask(title: string) {
    title = title.trim();
    if (!title) return;
    const newTask: Task = { id: this.idCounter++, title, completed: false };
    const current = this.tasksSubject.getValue();
    this.persist([...current, newTask]);
  }

  deleteTask(id: number) {
    const current = this.tasksSubject.getValue();
    this.persist(current.filter(t => t.id !== id));
  }

  // small utility if needed later
  getTasksSnapshot(): Task[] {
    return this.tasksSubject.getValue();
  }
}
