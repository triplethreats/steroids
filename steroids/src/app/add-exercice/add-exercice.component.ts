import { Component, OnInit, Input } from '@angular/core';
import Exercice from 'src/model/Exercice';
import { PersistanceService } from '../persistance.service';
import Session from 'src/model/Session';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.css']
})
export class AddExerciceComponent implements OnInit {
  exerciseForm: FormGroup;

  @Input()
  session: Session;

  exercices: Exercice[];

  constructor(private persistance: PersistanceService, private fb: FormBuilder) {
    this.exerciseForm = this.fb.group({
      exerciseControl: ['', [Validators.required]],
      remarque: ['']
    })
  }

  ngOnInit() {
    this.updateExercices();
  }

  updateExercices() {
    this.persistance.getAllExercicesTemplates().subscribe(exercices => {
      this.exercices = exercices;
    });
  }

  addExercice() {
    const exerciceObject = this.exerciseForm.value.exerciseControl;
    exerciceObject.comment = this.exerciseForm.value.remarque;
    this.persistance.addExercice(exerciceObject, this.session);
  }

}
