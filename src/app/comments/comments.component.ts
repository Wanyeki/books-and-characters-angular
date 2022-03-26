import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../api-request.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(private apiService: ApiRequestService,
    private route: ActivatedRoute
  ) { }

  bookId = ''
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.bookId = params.id.split('/').pop()
      this.getData();
    })

  }
  comments:any = []
  getData() {
    try {
      const result = this.apiService.getComments(this.bookId);
      result.subscribe(dt=>{
        this.comments=dt;
      })
    } catch (error) {

    }
  }

  deleteComment(commentId: number) {
    const result = this.apiService.deleteComment(this.bookId, commentId.toString());
    result.subscribe(d => {
      this.getData()
      alert('deleted');
    })

  }

}
