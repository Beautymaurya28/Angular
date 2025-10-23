// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [], // ✅ leave empty since both are standalone
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppComponent,   // ✅ standalone here
    TodoComponent   // ✅ standalone here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
