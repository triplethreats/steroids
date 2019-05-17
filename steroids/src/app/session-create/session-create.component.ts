import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersistanceService } from '../persistance.service';

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.css']
})
export class SessionCreateComponent implements OnInit {
  sessionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private persistance: PersistanceService)
  {
    this.sessionForm = this.fb.group({
      name: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  createSession() {
    const formModel = this.sessionForm.value;
    this.persistance.createSession(formModel.name).subscribe();

    const modalCreate = document.getElementById("createSession")
    modalCreate.classList.remove("show");
    modalCreate.setAttribute("aria-hidden","true");
    modalCreate.setAttribute("style","display: none");

    const modalBackdrop = document.getElementsByClassName("modal-backdrop");
    document.body.removeChild(modalBackdrop[0]);
  }

}
