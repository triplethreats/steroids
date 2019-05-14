import { Component, OnInit, Input } from '@angular/core';
import Exercice from 'src/model/Exercice';
import { PersistanceService } from '../persistance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent implements OnInit {

  exerciceId: string;
  @Input()
  exercice: Exercice;

  constructor(private persistance: PersistanceService, private router: ActivatedRoute) {
    this.persistance.sessionsChanged.subscribe(_ => this.updateExercice());
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.exerciceId = params.id;
      this.updateExercice();
    });
  }

  delete(idSerie: string) {
    this.persistance.deleteSerie(idSerie);
    this.updateExercice();

  }

  private updateExercice() {
    this.persistance.getExercice(this.exerciceId).subscribe(exercice => {
      this.exercice = exercice;
    });
  }
}
