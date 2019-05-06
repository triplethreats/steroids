import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { SessionCreateComponent } from './session-create/session-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionsListComponent,
    SessionCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
