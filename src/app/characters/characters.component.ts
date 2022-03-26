import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../api-request.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  constructor(  private apiService: ApiRequestService
    ) { }
  
    ngOnInit(): void {
      this.getCharacters()
    }
    filter={
      sortBy:'',
      gender:'',
      order:'',
      name:''
    }
    characters:any=[]
    getCharacters() {
      console.log(this.filter)
      try {
        const result = this.apiService.getCharacters(this.filter);
        result.subscribe((r:any)=>{
          this.characters=r.characters;
        })

      } catch (error) {
  
      }
    }
}
