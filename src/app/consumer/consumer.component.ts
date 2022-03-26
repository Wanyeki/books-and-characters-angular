import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../api-request.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {

  constructor(
    private apiService: ApiRequestService
  ) { }

  ngOnInit(): void {
    this.getBooks()
  }
  books = new Observable<any>()
  getBooks() {
    try {
      this.books = this.apiService.getBooks()
    } catch (error) {

    }
  }

}
