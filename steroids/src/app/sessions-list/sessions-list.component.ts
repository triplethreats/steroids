import { Component, OnInit } from '@angular/core';
import { PersistanceService } from '../persistance.service';
import Session from 'src/model/Session';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {

  sessions: Session[];

  constructor(private persistance: PersistanceService) { }

  ngOnInit() {
    this.updateSessions();
  }

  updateSessions() {
    this.persistance.getAllSessions().subscribe(
      sessions => this.sessions = sessions);
  }

}
