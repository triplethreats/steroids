import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { SessionCreateComponent } from './session-create/session-create.component';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddExerciceComponent } from './add-exercice/add-exercice.component';
import { SessionComponent } from './session/session.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { AddSeriesComponent } from './add-series/add-series.component';
import { ModifyExerciceComponent } from './modify-exercice/modify-exercice.component';

const appRoutes: Routes = [
  { path: 'sessions', component: SessionsListComponent },
  { path: 'sessions/create', component: SessionCreateComponent },
  { path: 'sessions/:id', component: SessionComponent },
  { path: 'exercices/:id', component: ExerciceComponent },
  { path: 'exercices/modify/:id', component: ModifyExerciceComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SessionsListComponent,
    SessionCreateComponent,
    AddExerciceComponent,
    SessionComponent,
    ExerciceComponent,
    AddSeriesComponent,
    ModifyExerciceComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
