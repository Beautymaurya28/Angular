import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="form-wrapper">
      <div class="neon-card">
        <h2 class="neon-title">Course Feedback Catalyst ✨</h2>
        <p class="subtitle">Your insights fuel our continuous improvement.</p>
        
        <form [formGroup]="feedbackForm" (ngSubmit)="onSubmit()">

          <!-- Full Name -->
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input id="fullName" type="text" formControlName="fullName" placeholder="Enter your full name" />
            <div class="error-message" *ngIf="feedbackForm.get('fullName')?.touched && feedbackForm.get('fullName')?.invalid">
              <span class="error-icon">⚠️</span> Full name is required.
            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email">Email Address</label>
            <input id="email" type="email" formControlName="email" placeholder="e.g., yourname@example.com" />
            <div class="error-message" *ngIf="feedbackForm.get('email')?.touched && feedbackForm.get('email')?.errors?.['required']">
              <span class="error-icon">⚠️</span> Email is required.
            </div>
            <div class="error-message" *ngIf="feedbackForm.get('email')?.touched && feedbackForm.get('email')?.errors?.['email']">
              <span class="error-icon">⚠️</span> Please enter a valid email format.
            </div>
          </div>

          <!-- Rating: IMPROVED LAYOUT -->
          <div class="form-group">
            <label>Rate Your Experience</label>
            <div class="rating-options">
              <label *ngFor="let option of ratingOptions" 
                     class="radio-label"
                     [class.checked]="feedbackForm.get('rating')?.value === option.value">
                <input type="radio" formControlName="rating" [value]="option.value" />
                {{ option.label }}
              </label>
            </div>
            <div class="error-message" *ngIf="feedbackForm.get('rating')?.touched && feedbackForm.get('rating')?.invalid">
              <span class="error-icon">⚠️</span> Please select a rating.
            </div>
          </div>

          <!-- Comments -->
          <div class="form-group">
            <label for="comments">Constructive Comments (Optional)</label>
            <textarea id="comments" formControlName="comments" rows="4" placeholder="Share any thoughts, suggestions, or specific praises..."></textarea>
          </div>

          <!-- Confirmation Checkbox -->
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="confirm" />
              I confirm the information provided is honest and genuine.
            </label>
            <div class="error-message" *ngIf="feedbackForm.get('confirm')?.touched && feedbackForm.get('confirm')?.invalid">
              <span class="error-icon">⚠️</span> Confirmation is required to submit.
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" [disabled]="feedbackForm.invalid" class="submit-button">
            Submit Feedback <span class="arrow-icon">→</span>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* Color Variables */
    :root {
      --neon-pink: #FF00FF;
      --neon-blue: #00FFFF;
      --neon-green: #39FF14;
      --neon-shadow: 0 0 8px rgba(0, 255, 255, 0.5), 0 0 15px var(--neon-blue); /* Stronger glow */
      --input-shadow: 0 0 5px var(--neon-pink);
      --error-color: var(--neon-pink);
      --dark-background: #0D0D19;
    }

    /* Wrapper to center content and provide a dark background */
    .form-wrapper {
      background-color: var(--dark-background);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    /* Main Card Styling */
    .neon-card {
      width: clamp(300px, 90%, 550px); /* Responsive width */
      padding: 30px;
      background-color: #111; /* Dark background for neon contrast */
      border: 3px solid var(--neon-blue);
      border-radius: 15px; /* Slightly more rounded */
      box-shadow: var(--neon-shadow); /* Glow effect */
      font-family: 'Arial', sans-serif;
      color: #fff;
    }

    .neon-title {
      text-align: center;
      color: var(--neon-green);
      text-shadow: 0 0 7px var(--neon-green);
      margin-bottom: 5px;
      font-size: 1.8rem;
      letter-spacing: 1.5px;
    }
    
    .subtitle {
      text-align: center;
      color: #ccc;
      margin-bottom: 25px;
      font-style: italic;
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: var(--neon-blue);
      text-shadow: 0 0 3px var(--neon-blue);
      font-size: 0.95rem;
    }

    input[type="text"], input[type="email"], textarea {
      width: 100%;
      padding: 12px;
      background-color: #222;
      color: #fff;
      border: 1px solid #555;
      border-radius: 8px;
      transition: border-color 0.3s, box-shadow 0.3s;
      box-sizing: border-box;
      font-size: 1rem; /* Ensure text is visible */
    }

    input:focus, textarea:focus {
      border-color: var(--neon-pink);
      outline: none;
      box-shadow: var(--input-shadow);
    }

    /* --- IMPROVED RATING STYLES --- */
    .rating-options {
      display: flex;
      flex-wrap: wrap; /* Allows wrapping on small screens */
      gap: 10px; /* Reduced gap for better fit */
      background-color: #1A1A1A; /* Subtle background for the option box */
      padding: 10px;
      border-radius: 8px;
    }

    .radio-label {
      flex: 1 1 45%; /* Allows 2 items per row on mobile, 4 on desktop */
      text-align: center;
      padding: 12px 5px;
      border: 1px solid var(--neon-blue);
      border-radius: 6px;
      cursor: pointer;
      font-weight: normal;
      color: #fff;
      background-color: #222;
      transition: all 0.2s ease-in-out;
      display: block; /* Make the label the full block */
    }

    .radio-label:hover {
      background-color: #333;
      box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    }
    
    .radio-label.checked {
      background-color: var(--neon-pink);
      border-color: var(--neon-pink);
      color: #111; /* Dark text for contrast */
      font-weight: bold;
      box-shadow: 0 0 10px var(--neon-pink);
    }

    .radio-label input[type="radio"] {
      display: none; /* Hide native radio button to use custom styling */
    }
    /* --- END RATING STYLES --- */

    /* Checkbox Styles */
    .checkbox-group {
      margin-top: 25px;
      padding-top: 15px;
      border-top: 1px dashed #333; /* Visual separation for footer */
    }

    .checkbox-label {
      font-weight: normal;
      color: #fff;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .checkbox-label input[type="checkbox"] {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 2px solid var(--neon-blue);
      border-radius: 4px;
      margin-right: 10px;
      position: relative;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      flex-shrink: 0;
    }

    .checkbox-label input[type="checkbox"]:checked {
      border-color: var(--neon-green);
      background-color: var(--neon-green);
      box-shadow: 0 0 5px var(--neon-green);
    }
    
    .checkbox-label input[type="checkbox"]:checked::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 14px;
      color: #111; 
      font-weight: bold;
    }

    /* Error Message */
    .error-message {
      color: var(--error-color);
      text-shadow: 0 0 2px var(--error-color);
      font-size: 0.85rem;
      margin-top: 5px;
      display: flex;
      align-items: center;
    }

    .error-icon {
      margin-right: 5px;
      font-size: 0.9rem;
    }

    /* Submit Button */
    .submit-button {
      width: 100%;
      margin-top: 30px;
      padding: 14px;
      background-color: var(--neon-blue);
      color: #111; 
      font-weight: 700;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: background-color 0.3s, box-shadow 0.3s, transform 0.1s;
      box-shadow: 0 0 10px var(--neon-blue);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .submit-button:hover:not(:disabled) {
      background-color: var(--neon-green);
      color: #111;
      box-shadow: 0 0 15px var(--neon-green);
      transform: translateY(-2px);
    }

    .submit-button:disabled {
      background-color: #333;
      color: #777;
      box-shadow: none;
      cursor: not-allowed;
      transform: none;
    }

    .arrow-icon {
      margin-left: 10px;
      font-size: 1.2rem;
    }
  `]
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm!: FormGroup;

  // Data for cleaner template iteration
  ratingOptions = [
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Good', label: 'Good' },
    { value: 'Average', label: 'Average' },
    { value: 'Poor', label: 'Poor' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rating: ['', Validators.required],
      comments: [''],
      confirm: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      // In a real application, you'd send this data to a backend API
      console.log('Feedback Data Submitted:', this.feedbackForm.value);
      alert('🌟 Thank you! Your valuable feedback has been submitted successfully.');
      this.feedbackForm.reset({
        // Keep inputs pristine after reset
        fullName: '', email: '', rating: '', comments: '', confirm: false
      });
      // Mark controls as untouched after reset for better UX on re-submission
      Object.keys(this.feedbackForm.controls).forEach(key => {
        this.feedbackForm.get(key)?.setErrors(null);
        this.feedbackForm.get(key)?.markAsPristine();
        this.feedbackForm.get(key)?.markAsUntouched();
      });
    }
  }
}