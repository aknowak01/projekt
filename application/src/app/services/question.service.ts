import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionModel} from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private url = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {
  }

  getQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(this.url + '/questions');
  }

  getQuestionsForCategory(categoryId: string): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(
      this.url + '/questions/' + categoryId
    );
  }

  addQuestion(data: any): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(this.url + '/question', data);
  }

  deleteQuestion(questionId: string): Observable<QuestionModel> {
    return this.http.delete<QuestionModel>(
      this.url + '/question/' + questionId
    );
  }

  getQuestionById(questionId: string): Observable<QuestionModel> {
    return this.http.get<QuestionModel>(this.url + '/question/' + questionId);
  }
}
