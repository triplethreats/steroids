import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {

  sessions =
  [
    {
      id: 1,
      name: 'Pec',
      date: Date.now,
      exercices: [
        {
          id: 1,
          name: 'Développé couché',
          series: [],
          comment: 'RAS'
        }
      ]
    },
    {
      id: 2,
      name: 'Dos',
      date: Date.now,
      exercices: [
        {
          id: 2,
          name: 'Poulie',
          series: [],
          comment: 'Ce n\'était pas aisé...'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
