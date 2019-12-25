import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IntoPipeModule } from '@sedeh/into-pipes';

import { AppComponent } from './app.component';
import { TaggerModule } from './tagger/tagger.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IntoPipeModule,
    TaggerModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
