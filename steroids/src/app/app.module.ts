import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { SessionCreateComponent } from './session-create/session-create.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'sessions', component: SessionsListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SessionsListComponent,
    SessionCreateComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
