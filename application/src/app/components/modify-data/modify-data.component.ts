import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {CategoryModel} from 'src/app/models/category.model';
import {QuestionModel} from 'src/app/models/question.model';
import {CategoryService} from 'src/app/services/category.service';
import {QuestionService} from 'src/app/services/question.service';

@Component({
  selector: 'app-modify-data',
  templateUrl: './modify-data.component.html',
  styleUrls: ['./modify-data.component.scss'],
})
export class ModifyDataComponent implements OnInit, OnDestroy {
  categoryList!: CategoryModel[];
  questionsList!: QuestionModel[];
  destroy$: Subject<void> = new Subject<void>();
  categoryOfQuestion: string = '';

  constructor(
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => (this.categoryList = response));
  }

  onChange(id: string): void {
    this.questionService
      .getQuestionsForCategory(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => (this.questionsList = response));
  }

  onModify(type: string, id: string) {
    if (type === 'category') {
      this.router.navigateByUrl('update-category/' + id);
    } else {
      this.router.navigateByUrl('update-question/' + id);
    }
  }

  onDelete(type: string, id: string) {
    if (type === 'category') {
      this.categoryService
        .deleteCategory(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => this.getCategories());
    } else {
      this.questionService
        .deleteQuestion(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => this.onChange(this.categoryOfQuestion));
    }
  }
}
