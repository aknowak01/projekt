import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {CategoryService} from 'src/app/services/category.service';
import {QuestionService} from 'src/app/services/question.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss'],
})
export class UpdateDataComponent implements OnInit {
  destroy$: Subject<void> = new Subject<void>();
  categories!: any[];
  questionData: any;

  questionForm: FormGroup = this.fb.group({
    text: '',
    answers: this.fb.array([]),
    goodAnswer: '',
    category_id: '',
  });

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addInput() {
    this.answers.push(this.fb.control(''));
  }

  addInputWithValue(text: string) {
    this.answers.push(this.fb.control(text));
  }

  removeInput(index: number) {
    this.answers.removeAt(index);
  }

  constructor(
    private questionService: QuestionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    const questionId = this.route.snapshot.params['id'];
    this.getQuestion(questionId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitQuestion(): void {
    const data = {
      ...this.questionForm.value,
      id: this.questionData.id,
    };
    this.questionService
      .addQuestion(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.router.navigateByUrl('/modify');
      });
  }

  private getCategories(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => (this.categories = response));
  }

  getQuestion(questionId: string): void {
    this.questionService
      .getQuestionById(questionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.questionData = response;
        this.setFormFields(response);
      });
  }

  setFormFields(data: any): void {
    this.questionForm.get('text')?.setValue(data.text);
    this.questionForm.get('goodAnswer')?.setValue(data.goodAnswer);
    this.questionForm.get('category_id')?.setValue(data.category_id);
    data.answers.forEach((element: string) => {
      this.addInputWithValue(element);
    });
  }
}
