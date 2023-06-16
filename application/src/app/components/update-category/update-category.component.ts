import {Component, OnDestroy, OnInit} from '@angular/core';
import {addCategoryForm} from '../add-data/add-data.models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from 'src/app/services/category.service';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryModel} from 'src/app/models/category.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent implements OnInit, OnDestroy, OnDestroy {
  categoryForm: FormGroup<addCategoryForm> = this.fb.group({
    name: [''],
  });
  destroy$: Subject<void> = new Subject<void>();
  categoryId: string = '';
  categoryData!: CategoryModel;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const cateogryId = this.route.snapshot.params['id'];
    this.getCategory(cateogryId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCategory(categoryId: string): void {
    this.categoryService
      .getCategory(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.categoryData = response;
        this.setValueForForm(response);
      });
  }

  submitCategory(): void {
    const data = {
      ...this.categoryData,
      name: this.categoryForm.controls.name.value,
    };
    this.categoryService
      .addCategory(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.router.navigateByUrl('/modify');
      });
  }

  setValueForForm(value: any): void {
    this.categoryForm.controls.name.setValue(value.name);
  }
}
