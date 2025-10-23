import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  tasks = [{ id: 1, title: 'Sample task' }];
  newTitle = '';

  addTask() {
    if (this.newTitle.trim()) {
      this.tasks.push({ id: Date.now(), title: this.newTitle });
      this.newTitle = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
