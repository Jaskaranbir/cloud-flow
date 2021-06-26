import {InjectionToken} from "@angular/core";
import {Blueprint} from "./blueprint";

export const BLUEPRINT_SERVICE = new InjectionToken<BlueprintsService>("blueprint.service");

export type BpCatalogResponse = {[key: string]: Blueprint}

export interface BlueprintsService {
  getBlueprints(): Promise<BpCatalogResponse>
}
