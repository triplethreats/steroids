import { Component, OnInit, Input, Output } from '@angular/core';
import { PersistanceService } from '../persistance.service';
import Session from 'src/model/Session';
import Exercice from 'src/model/Exercice';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {

  @Input()
  sessions: Session[];

  sessionSelected: Session;
  sessiontoEdit: Session;

  constructor(private persistance: PersistanceService) {
    this.persistance.sessionsChanged.subscribe(sessions => this.sessions = sessions);
  }

  ngOnInit() {
    this.updateSessions();
  }

  delete(idSession: string, nameSession: string) {
    if(confirm('Are you sure to delete the session: ' + nameSession + '?')) {
      this.persistance.deleteSession(idSession);
      this.updateSessions();
    }
  }

  setSession(sessionClicked: Session) {
    this.sessionSelected = sessionClicked;
  }

  getSessiontoEdit(session: Session) {
    this.sessiontoEdit = session;
  }

  updateSessions() {
    this.persistance.getAllSessions().subscribe(
      sessions => this.sessions = sessions);
  }

}
