import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  server='https://booksfs.herokuapp.com/api/v1/'
  // server = 'http://127.0.0.1:8000/api/v1/'


  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(this.server + 'books', { headers: { Accept: ' application/json' } });
  }
  getBook(id: string) {
    return this.http.get(this.server + 'books/' + id, { headers: { Accept: ' application/json' } });
  }
  getCharacters(filter:any) {
    let url=this.server + 'characters?';
    for(let [key,value] of Object.entries(filter)){
      if(value!=''){
        url+=key+'='+value+'&'
      }
    }
    url=url.slice(0,-1);
    console.log(url)
    return this.http.get(url, { headers: { Accept: ' application/json' } });
  }
  getComments(bookId: string) {
    const url = this.server + 'books/' + bookId + '/comments'
    return this.http.get(url, { headers: { Accept: ' application/json' } });
  }
  addComment(bookId: string, comment: any) {
    const url = this.server + 'books/' + bookId + '/comments'
    return this.http.post(url, comment, { headers: { Accept: ' application/json' } })
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteComment(bookId: string, commentId: string) {
    const url = this.server + 'books/' + bookId + '/comments/' + commentId;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    );
    
  }
  updateComment(bookId: string, commentId: string, comment: any) {
    const url = this.server + 'books/' + bookId + '/comments/' + commentId
    return this.http.patch(url, comment, { headers: { Accept: ' application/json' } });
  }
  getComment(bookId: string, commentId: string) {
    const url = this.server + 'books/' + bookId + '/comments/' + commentId
    return this.http.get(url, { headers: { Accept: ' application/json' } });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      alert(error.error.message)
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
