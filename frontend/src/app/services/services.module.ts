import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BLUEPRINT_SERVICE} from './blueprints/blueprints-service';
import {LocalBlueprintsService} from './blueprints/local-blueprints.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    {provide: BLUEPRINT_SERVICE, useClass: LocalBlueprintsService}
  ],
  bootstrap: []
})
export class ServicesModule { }
