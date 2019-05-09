import { Component, OnInit, Input } from '@angular/core';
import Exercice from 'src/model/Exercice';
import { PersistanceService } from '../persistance.service';
import Session from 'src/model/Session';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.css']
})
export class AddExerciceComponent implements OnInit {

  @Input()
  session: Session;

  exercices: Exercice[];
  selectedExercice: Exercice;

  constructor(private persistance: PersistanceService) { }

  ngOnInit() {
    this.updateExercices();
  }

  updateExercices() {
    this.persistance.getAllExercicesTemplates().subscribe(exercices => {
      this.exercices = exercices;
      this.selectedExercice = exercices.length > 0 ? exercices[0] : undefined;
    });
  }

  addExercice() {
    this.persistance.addExercice(this.selectedExercice, this.session);
  }

}
