import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryModel} from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = 'http://localhost:3001';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.url + '/api/categories');
  }

  addCategory(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/api/category', data);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(this.url + '/api/category/' + categoryId);
  }

  getCategory(categoryId: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(
      this.url + '/api/category/' + categoryId
    );
  }
}
