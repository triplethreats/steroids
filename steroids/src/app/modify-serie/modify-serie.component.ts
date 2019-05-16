import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Exercice from 'src/model/Exercice';
import { PersistanceService } from '../persistance.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Series from 'src/model/Series';

@Component({
  selector: 'app-modify-serie',
  templateUrl: './modify-serie.component.html',
  styleUrls: ['./modify-serie.component.css']
})
export class ModifySerieComponent implements OnInit {

  seriesForm: FormGroup;
  serieId: string;

  @Input()
  serie: Series;

  constructor(private persistance: PersistanceService, private fb: FormBuilder, private router: ActivatedRoute, private location: Location) {
    this.seriesForm = this.fb.group({
      repetitions: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      rating: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.serieId = params.id;
      this.updateSerie();
    });
  }

  private updateSerie() {
    this.persistance.getSerie(this.serieId).subscribe(serie => {
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
    // ici appeler fonction update avec comme parame ancien id, newRepet, newWeight, newRating
    this.location.back();

  }

}
