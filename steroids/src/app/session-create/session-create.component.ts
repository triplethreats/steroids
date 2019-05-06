import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Exercice from 'src/model/Exercice';
import { PersistanceService } from '../persistance.service';

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.css']
})
export class SessionCreateComponent implements OnInit {
  sessionForm : FormGroup;

  constructor(private fb: FormBuilder, private persistance: PersistanceService) {
    this.sessionForm = this.fb.group({
      name: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  createSession(){
    const formModel = this.sessionForm.value;
    const newSession = {
      name: formModel.name,
      date: Date.now
    }
  }

}
