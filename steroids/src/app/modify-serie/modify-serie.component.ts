import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersistanceService } from '../persistance.service';
import Series from 'src/model/Series';

@Component({
  selector: 'app-modify-serie',
  templateUrl: './modify-serie.component.html',
  styleUrls: ['./modify-serie.component.css']
})
export class ModifySerieComponent implements OnInit {

  seriesForm: FormGroup;

  @Input()
  serie: Series;

  constructor(private persistance: PersistanceService, private fb: FormBuilder) {
    this.seriesForm = this.fb.group({
      repetitions: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      rating: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.updateSerie();
  }

  private updateSerie() {
    this.persistance.getSerie(this.serie.id).subscribe(serie => {
      this.serie = serie;
      this.seriesForm.controls["repetitions"].setValue(this.serie.repetition);
      this.seriesForm.controls["weight"].setValue(this.serie.weight);
      this.seriesForm.controls["rating"].setValue(this.serie.rating);
    });
  }

  modifySeries() {
    const newRepet = this.seriesForm.value.repetitions;
    const newWeight = this.seriesForm.value.weight;
    const newRating = this.seriesForm.value.rating;
    this.persistance.updateSerie(this.serie.id, newRepet, newWeight, newRating);

    const modalCreate = document.getElementById("editSerie")
    modalCreate.classList.remove("show");
    modalCreate.setAttribute("aria-hidden","true");
    modalCreate.setAttribute("style","display: none");

    const modalBackdrop = document.getElementsByClassName("modal-backdrop");
    document.body.removeChild(modalBackdrop[0]);
  }

}
