import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, map, takeUntil} from 'rxjs';
import {CategoryModel} from 'src/app/models/category.model';
import {CategoryService} from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: CategoryModel[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private service: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getCategories(): void {
    this.service
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.categories = data;
      });
  }
}
