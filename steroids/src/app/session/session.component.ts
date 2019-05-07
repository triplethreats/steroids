import { Component, OnInit } from '@angular/core';
import Session from 'src/model/Session';
import { PersistanceService } from '../persistance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  session: Session;
  constructor(private persistanceService: PersistanceService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(param => {
      this.persistanceService.getSession(Number(param.id))
        .subscribe(session => this.session = session);
    });

  }
}
