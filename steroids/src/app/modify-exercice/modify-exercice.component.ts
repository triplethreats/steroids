import { Component, OnInit, Input } from '@angular/core';
import { PersistanceService } from '../persistance.service';
import Exercice from 'src/model/Exercice';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modify-exercice',
  templateUrl: './modify-exercice.component.html',
  styleUrls: ['./modify-exercice.component.css']
})
export class ModifyExerciceComponent implements OnInit {

  @Input()
  exercice: Exercice;

  exerciceTemplates: Exercice[];
  exerciseForm: FormGroup;

  constructor(private persistance: PersistanceService, private fb: FormBuilder) {
    this.persistance.exerciceTemplatesChanged.subscribe(templates => this.exerciceTemplates = templates);
    this.exerciseForm = this.fb.group({
      exerciseControl: '',
      remarque: ''
    });
  }

  ngOnInit() {
    this.updateExercice();
    this.updateExerciceTemplate();
  }

  updateExerciceTemplate() {
    this.persistance.getAllExercicesTemplates().subscribe(exercices => {
      this.exerciceTemplates = exercices;
    });
  }

  private updateExercice() {
    this.persistance.getExercice(this.exercice.id).subscribe(exercice => {
      this.exercice = exercice;
      this.exerciseForm.controls["remarque"].setValue(this.exercice.comment);
      this.exerciseForm.controls["exerciseControl"].setValue(this.exercice.name);
    });
  }

  modifyExercise() {
    const newName = this.exerciseForm.value.exerciseControl;

    const newRemarque = this.exerciseForm.value.remarque;
    this.persistance.updateExercice(this.exercice.id, newName, newRemarque);

    const modalCreate = document.getElementById("editExercice")
    modalCreate.classList.remove("show");
    modalCreate.setAttribute("aria-hidden","true");
    modalCreate.setAttribute("style","display: none");

    const modalBackdrop = document.getElementsByClassName("modal-backdrop");
    document.body.removeChild(modalBackdrop[0]);
  }

}
