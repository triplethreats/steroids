import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersistanceService } from '../persistance.service';
import Session from 'src/model/Session';

@Component({
  selector: 'app-modify-session',
  templateUrl: './modify-session.component.html',
  styleUrls: ['./modify-session.component.css']
})
export class ModifySessionComponent implements OnInit {

  sessionForm: FormGroup;

  @Input()
  session: Session;

  constructor(
    private fb: FormBuilder,
    private persistance: PersistanceService) {
    this.sessionForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.updateSession();
  }

  private updateSession() {
    this.persistance.getSession(this.session.id).subscribe(session => {
      this.session = session;
      this.sessionForm.controls["name"].setValue(this.session.name);
    });
  }

  modifySession() {
    const newName = this.sessionForm.value.name;
    this.persistance.updateSession(this.session.id, newName);

    const modalCreate = document.getElementById("editSession")
    modalCreate.classList.remove("show");
    modalCreate.setAttribute("aria-hidden","true");
    modalCreate.setAttribute("style","display: none");

    const modalBackdrop = document.getElementsByClassName("modal-backdrop");
    document.body.removeChild(modalBackdrop[0]);
  }
}
