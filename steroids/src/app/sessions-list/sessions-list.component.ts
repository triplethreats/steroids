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
      name: 'Pec',
      date: Date.now,
      exercices: [
        {
          name: 'Développé couché',
          series: [],
          comment: 'RAS'
        }
      ]
    },
    {
      name: 'Dos',
      date: Date.now,
      exercices: [
        {
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
