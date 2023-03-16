import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClassesListComponent } from './classes/classes-list/classes-list.component';
import { ClientDialogComponent } from './shared/dialogs/client-dialog/client-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassDialogComponent } from './shared/dialogs/class-dialog/class-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    ClientsListComponent,
    ClassesListComponent,
    ClientDialogComponent,
    ClassDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
