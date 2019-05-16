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

  @Input()
  exercice: Exercice;

  constructor(private persistance: PersistanceService, private router: ActivatedRoute) {
    this.persistance.sessionsChanged.subscribe(_ => this.updateExercice());
  }

  ngOnInit() {
  }

  delete(idSerie: string) {
    if(confirm("Are you sure to delete this serie ?")) {
      this.persistance.deleteSerie(idSerie);
      this.updateExercice();
    }
  }

  private updateExercice() {
    this.persistance.getExercice(this.exercice.id).subscribe(exercice => {
      this.exercice = exercice;
    });
  }
}
