import { Injectable } from '@angular/core';
import {BlueprintsService, BpCatalogResponse} from './blueprints-service';
import { HttpClient} from '@angular/common/http';
import {Blueprint} from './blueprint';

@Injectable()
export class LocalBlueprintsService implements BlueprintsService {

  constructor(private http: HttpClient) { }

  async getBlueprints(): Promise<BpCatalogResponse> {
    const bpCatalog = await this.http.get(
      'assets/mock-catalog.json'
    ).toPromise() as BpCatalogResponse
    
    const bpCatalogWithIcons = {} as BpCatalogResponse

    // Load the actual icon from provided icon-URI
    const bpCatalogValues = Object.entries(bpCatalog)
    for(let i = 0; i < bpCatalogValues.length; i++) {
      const [bpId, bp] = bpCatalogValues[i]
      
      const icon = await this.http.get(
        bp.icon,
        {responseType: 'text'}
      ).toPromise()
  
      const bpIconBase64 = "data:image/svg+xml;base64," + btoa(icon)
  
      bpCatalogWithIcons[bpId] = {
        ...bp,
        id: bpId,
        icon: bpIconBase64
      }
    }

    return bpCatalogWithIcons
  }
}
