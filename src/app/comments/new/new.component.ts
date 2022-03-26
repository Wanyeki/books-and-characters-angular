import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/api-request.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiRequestService,
    private router: Router) { }
  bookId = ''
  edit = false;
  commentId = ''
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.bookId = params.id
      this.commentId = params.commentId
      if (this.commentId) {
        this.edit = true;
        const comment = this.apiService.getComment(this.bookId, this.commentId);
        comment.subscribe((cm: any) => {
          console.log('............', cm)
          this.comment.comment = cm.comment;
          this.comment.commenterName = cm.commenterName;
        })
      }
    })
  }
  comment = {
    commenterName: '',
    comment: ''
  }
  addComment($event: any) {
    $event.preventDefault();
    try {
      let result = new Observable
      if (!this.edit) {
        result = this.apiService.addComment(this.bookId, this.comment);
      } else {
        result = this.apiService.updateComment(this.bookId, this.commentId, this.comment)
      }
      result.subscribe(dd => {
        console.log(dd);
        alert('comment saved');
      })

      this.router.navigate(['/consume/comments'], { queryParams: { id: this.bookId } });

    } catch (error) {
      alert('error occured')
    }

  }

}
