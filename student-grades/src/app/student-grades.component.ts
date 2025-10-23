import { Component } from '@angular/core';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css']
})
export class StudentGradesComponent {
  students: any[] = [];

  constructor() {
    // initialize 10 students with 5 subjects marks empty
    for (let i = 0; i < 10; i++) {
      this.students.push({
        id: i + 1,
        marks: [0, 0, 0, 0, 0],
        average: 0,
        grade: ''
      });
    }
  }

  calculateGrade(student: any) {
    let total = student.marks.reduce((a: number, b: number) => a + Number(b), 0);
    student.average = total / student.marks.length;

    if (student.average >= 90) {
      student.grade = 'A+';
    } else if (student.average >= 75) {
      student.grade = 'A';
    } else if (student.average >= 60) {
      student.grade = 'B';
    } else {
      student.grade = 'C';
    }
  }

  calculateAll() {
    this.students.forEach(s => this.calculateGrade(s));
  }
}
