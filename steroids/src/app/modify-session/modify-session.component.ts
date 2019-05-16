import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersistanceService } from '../persistance.service';
import { Router, ActivatedRoute } from '@angular/router';
import Session from 'src/model/Session';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modify-session',
  templateUrl: './modify-session.component.html',
  styleUrls: ['./modify-session.component.css']
})
export class ModifySessionComponent implements OnInit {

  sessionForm: FormGroup;
  sessionId: string;

  @Input()
  session: Session;

  constructor(
    private fb: FormBuilder,
    private persistance: PersistanceService,
    private router: ActivatedRoute, private location: Location) {
    this.sessionForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.sessionId = params.id;
      this.updateSession();
    });
  }

  private updateSession() {
    this.persistance.getSession(this.sessionId).subscribe(session => {
      this.session = session;
      this.sessionForm.controls["name"].setValue(this.session.name);
    });
  }

  modifySession() {
    const newName = this.sessionForm.value.name;
    //ici appeler la fonction update avec l ancien id et le nouveau nom
    this.persistance.updateSession(this.sessionId, newName);
    this.location.back();
  }

}
