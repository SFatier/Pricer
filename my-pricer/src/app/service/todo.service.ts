import { Injectable } from '@angular/core';
import { Todo } from '../Todo';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, tap, map  } from 'rxjs/operators';

const apiUrl = "https://localhost:44307/api/todo";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(apiUrl, httpOptions).pipe(
        tap(heroes => console.log('fetched todos')),
        catchError(this.handleError('getTodos', []))
      );
  }

  getTodo(id: number): Observable<Todo> {
    const url = apiUrl + '/' + id;
    return this.http.get<Todo>(url).pipe(
      tap(_ => console.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  addTodo(todo): Observable<Todo> {
    console.log(todo);
    return this.http.post<Todo>(apiUrl, todo, httpOptions).pipe(
      tap((todo: Todo) => console.log(`added todo w/ id=${todo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  updateTodo(id, todo): Observable<any> {
    const url = apiUrl + '/' + id;
    return this.http.put(url, todo, httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  deleteTodo(id): Observable<Todo> {
    const url = apiUrl + '/' + id;
    return this.http.delete<Todo>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deletetodo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
