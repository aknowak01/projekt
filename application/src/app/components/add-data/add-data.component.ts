import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from 'src/app/services/category.service';
import {QuestionService} from 'src/app/services/question.service';
import {addCategoryForm, addQuestionForm} from './add-data.models';
import {Subject, takeUntil} from 'rxjs';
import {CategoryModel} from 'src/app/models/category.model';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  categories!: CategoryModel[];

  categoryForm: FormGroup<addCategoryForm> = this.fb.group({
    name: [''],
  });

  questionForm: FormGroup = this.fb.group({
    text: '',
    answers: this.fb.array([this.fb.control('')]),
    goodAnswer: '',
    category_id: '',
  });

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addInput() {
    this.answers.push(this.fb.control(''));
  }

  removeInput(index: number) {
    this.answers.removeAt(index);
  }

  constructor(
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitCategory(): void {
    this.categoryService
      .addCategory(this.categoryForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.getCategories();
        this.categoryForm.reset();
      });
  }

  submitQuestion(): void {
    this.questionService
      .addQuestion(this.questionForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.questionForm.reset();
      });
  }

  private getCategories(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => (this.categories = response));
  }
}
