import { Component, OnInit, Input } from '@angular/core';
import { PersistanceService } from '../persistance.service';
import { ActivatedRoute } from '@angular/router';
import Exercice from 'src/model/Exercice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-exercice',
  templateUrl: './modify-exercice.component.html',
  styleUrls: ['./modify-exercice.component.css']
})
export class ModifyExerciceComponent implements OnInit {

  exerciceId: string;
  @Input()
  exercice: Exercice;

  exerciceTemplates: Exercice[];
  exerciseForm: FormGroup;

  constructor(private persistance: PersistanceService, private fb: FormBuilder, private router: ActivatedRoute) {
    this.persistance.exerciceTemplatesChanged.subscribe(templates => this.exerciceTemplates = templates);
    this.exerciseForm = this.fb.group({
      exerciseControl: '',
      remarque: ''
    });
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.exerciceId = params.id;
      this.updateExercice();
    });
    this.updateExerciceTemplate();

  }

  updateExerciceTemplate() {
    this.persistance.getAllExercicesTemplates().subscribe(exercices => {
      this.exerciceTemplates = exercices;
    });
  }

  private updateExercice() {
    this.persistance.getExercice(this.exerciceId).subscribe(exercice => {
      this.exercice = exercice;
      this.exerciseForm.controls["remarque"].setValue(this.exercice.comment);
      this.exerciseForm.controls["exerciseControl"].setValue(this.exercice.name);
    });
  }

  modifyExercise() {
    const newName = this.exerciseForm.value.exerciseControl;

    const newRemarque = this.exerciseForm.value.remarque;
    // ici appeler fonction update avec comme parame ancien id, newName, newRemarque
  }

}
