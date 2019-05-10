import { Component, OnInit } from '@angular/core';
import Exercice from 'src/model/Exercice';
import { PersistanceService } from '../persistance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent implements OnInit {

  exercice: Exercice;

  constructor(private persistanceService: PersistanceService, private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.params.subscribe(param => {
      this.persistanceService.getSeries(1)
        .subscribe(exercic => {
          console.log(exercic);
          this.exercice = exercic;
        });
    });
  }

}
