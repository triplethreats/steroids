import { Component, OnInit, Input } from '@angular/core';
import Session from 'src/model/Session';
import { PersistanceService } from '../persistance.service';
import Exercice from 'src/model/Exercice';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  private _session: Session;

  get session() {
    return this._session;
  }

  @Input()
  set session(session: Session) {
    if (session !== this._session) {
      this.exerciceSelected = undefined;
    }
    this._session = session;
  }

  exerciceSelected: Exercice;
  exercicetoEdit: Exercice;

  constructor(private persistanceService: PersistanceService) {
    this.persistanceService.sessionsChanged.subscribe(_ => {
      this.updateSession();
    });
  }

  ngOnInit() {
  }

  setExercise(exercice: Exercice) {
    this.exerciceSelected = exercice;
  }

  getexercicetoEdit(exercice: Exercice) {
    this.exercicetoEdit = exercice;
  }

  delete(idExercise: string, nameExercise: string) {
    if(confirm("Are you sure to delete the exercise : " + nameExercise + " ?")) {
      this.persistanceService.deleteExercice(idExercise);
      this.updateSession();
    }
  }

  private updateSession() {
    if (this.session) {
      this.persistanceService.getSession(this.session.id)
        .subscribe(session => this.session = session);
    }
  }
}
