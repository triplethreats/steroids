import { Component, OnInit } from '@angular/core';
import Exercice from 'src/model/Exercice';
import { PersistanceService } from '../persistance.service';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.css']
})
export class AddExerciceComponent implements OnInit {

  exercices: Exercice[];

  constructor(private persistance: PersistanceService) { }

  ngOnInit() {
    this.updateExercices();
  }

  updateExercices() {
    this.persistance.getAllExercicesTemplates().subscribe(exercices =>
      this.exercices = exercices);
  }

}
