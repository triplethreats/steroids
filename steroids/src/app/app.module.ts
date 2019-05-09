import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { SessionCreateComponent } from './session-create/session-create.component';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddExerciceComponent } from './add-exercice/add-exercice.component';
import { SessionComponent } from './session/session.component';

const appRoutes: Routes = [
  { path: 'sessions',         component: SessionsListComponent },
  { path: 'sessions/create',  component: SessionCreateComponent },
  { path: 'sessions/:id',     component: SessionComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SessionsListComponent,
    SessionCreateComponent,
    AddExerciceComponent,
    SessionComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
