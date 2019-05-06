import { Component, OnInit } from '@angular/core';
import Session from 'src/model/Session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  session: Session = {
    id: 1,
    name: 'Pec',
    date: new Date(),
    exercices: [
      {
        id: 1,
        name: 'Développé couché',
        series: [
          {
            id: 3,
            repetition: 3,
            weight: 4,
            rating: 5,
          }],
        comment: 'Ce n\'était pas aisé...'
      }
    ]
  }
  constructor() { }

  ngOnInit() {
  }

}
