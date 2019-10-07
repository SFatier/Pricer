import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Obligation} from '../obligation';
import { Observable, throwError, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';


const apiUrl = "https://localhost:44307/api/ratecurvecontroller";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ApirestService {

  constructor(private http: HttpClient) { }
  obligations: Observable <Obligation[]> ;
  newoligation: Observable <Obligation> ;


    //get
    getResultPrice(): Observable<HttpResponse<string>> {
      return this.http.get<string>('https://localhost:44307/api/ratecurvecontroller/getResult' , { observe: 'response'});
    }

    //Dessiner la courbe
    getRateCurves(): Observable<string[]> {
      return this.http.get<string[]>(apiUrl, httpOptions).pipe(
          tap(heroes => console.log('fetched curve')),
          catchError(this.handleError('getRateCurves', []))
        );
    }

      //non utilisé 
    getRateCurve(): Observable<HttpResponse<string>> {
      return this.http.get<string>('https://localhost:44307/api/ratecurvecontroller' , { observe: 'response'});
    }

    //post
    addObligation(data): Observable<string[]> {
      console.log(JSON.stringify(data));
      return this.http.post<string[]>('https://localhost:44307/api/ratecurvecontroller', JSON.stringify(data), httpOptions).pipe(
        tap(heroes => console.log('fetched curve')),
        catchError(this.handleError('getRateCurves', []))
      );
    }


    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }

    // Error handling
    private errorHandl(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }


}
