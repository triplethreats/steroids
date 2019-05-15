import { Component, OnInit, Input } from '@angular/core';
import Session from 'src/model/Session';
import { PersistanceService } from '../persistance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  private sessionId: string;

  @Input()
  session: Session;

  constructor(private persistanceService: PersistanceService, private router: ActivatedRoute) {
    this.persistanceService.sessionsChanged.subscribe(_ => {
      this.updateSession();
    });
  }

  ngOnInit() {
    this.router.params.subscribe(param => {
      this.sessionId = param.id;
      this.updateSession();
    });
  }

  delete(idExercise: string, nameExercise: string) {
    if(confirm("Are you sure to delete the exercise : " + nameExercise)) {
      this.persistanceService.deleteExercice(idExercise);
      this.updateSession();
    }
  }

  private updateSession() {
    this.persistanceService.getSession(this.sessionId)
      .subscribe(session => this.session = session);
  }
}
