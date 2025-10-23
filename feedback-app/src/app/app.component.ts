import { Component } from '@angular/core';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FeedbackFormComponent],
  template: `
    <h1>Student Feedback Form</h1>
    <app-feedback-form></app-feedback-form>
  `,
})
export class AppComponent {}
