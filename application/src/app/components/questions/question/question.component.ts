import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionModel } from 'src/app/models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() questionData!: QuestionModel;
  @Input() index!: number;
  @Output() userResponse: EventEmitter<{ answer: string; questionId: number }> =
    new EventEmitter();
  checkedAnswer!: number;

  constructor() {}

  ngOnInit(): void {}

  checkAnswer(answer: string, answerId: number): void {
    this.checkedAnswer = answerId;

    const userResponse: { answer: string; questionId: number } = {
      answer,
      questionId: this.index,
    };
    this.userResponse.emit(userResponse);
  }
}
