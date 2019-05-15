import { Component, OnInit, Input } from '@angular/core';
import { PersistanceService } from '../persistance.service';
import Session from 'src/model/Session';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {

  @Input()
  sessions: Session[];

  constructor(private persistance: PersistanceService) {
    this.persistance.sessionsChanged.subscribe(sessions => this.sessions = sessions);
  }

  ngOnInit() {
    this.updateSessions();
  }

  delete(idSession: string, nameSession: string) {
    if(confirm("Are you sure to delete the session : " + nameSession)) {
      this.persistance.deleteSession(idSession);
      this.updateSessions();
    }
  }
  updateSessions() {
    this.persistance.getAllSessions().subscribe(
      sessions => this.sessions = sessions);
  }

}
