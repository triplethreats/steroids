import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersistanceService } from '../persistance.service';
import Exercice from 'src/model/Exercice';
import Series from 'src/model/Series';

@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styleUrls: ['./add-series.component.css']
})
export class AddSeriesComponent implements OnInit {
  seriesForm: FormGroup;

  @Input()
  exercice: Exercice;

  constructor(private persistance: PersistanceService, private fb: FormBuilder) {
    this.seriesForm = this.fb.group({
      repetitions: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      rating: ['']
    });
  }

  ngOnInit() {
  }

  addSeries() {
    const repetition = this.seriesForm.value.repetitions;
    const weight = this.seriesForm.value.weight;
    const rating = this.seriesForm.value.rating;
    this.persistance.addSerie(this.exercice.id, repetition, weight, rating).subscribe();

    const modalCreate = document.getElementById("addSerie")
    modalCreate.classList.remove("show");
    modalCreate.setAttribute("aria-hidden","true");
    modalCreate.setAttribute("style","display: none");

    const modalBackdrop = document.getElementsByClassName("modal-backdrop");
    document.body.removeChild(modalBackdrop[0]);
    
  }
}
