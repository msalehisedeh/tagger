import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStorageModule } from '@sedeh/wizard-storage';

import { taggerComponent, TaggerDirective } from './tagger.directive';
import { TaggerService } from './tagger.service';

@NgModule({
  imports: [
    CommonModule,
    WizardStorageModule
  ],
  declarations: [
	  taggerComponent,
    TaggerDirective
  ],
  exports: [
    TaggerDirective
  ],
  entryComponents: [
    taggerComponent
  ],
  providers: [
    TaggerService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TaggerModule {}
