import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersistanceService } from '../persistance.service';
import Exercice from 'src/model/Exercice';
import Serie from 'src/model/Serie';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.component.html',
  styleUrls: ['./add-serie.component.css']
})
export class AddSerieComponent implements OnInit {
  serieForm: FormGroup;

  @Input()
  exercice: Exercice;

  constructor(private persistance: PersistanceService, private fb: FormBuilder) {
    this.serieForm = this.fb.group({
      repetitions: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      rating: ['']
    });
  }

  ngOnInit() {
  }

  addSerie() {
    const repetition = this.serieForm.value.repetitions;
    const weight = this.serieForm.value.weight;
    const rating = this.serieForm.value.rating;
    this.persistance.addSerie(this.exercice.id, repetition, weight, rating).subscribe();
  }
}
