import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Blueprint} from 'src/app/services/blueprints/blueprint';
import {BlueprintsService, BLUEPRINT_SERVICE} from 'src/app/services/blueprints/blueprints-service';

@Component({
  selector: 'app-sidebar-catalog',
  templateUrl: './sidebar-catalog.component.html',
  styleUrls: ['./sidebar-catalog.component.scss']
})
export class SidebarCatalogComponent implements OnInit {

  bpCatalog: Blueprint[]

  isExpanded = true

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(BLUEPRINT_SERVICE)
    private blueprintsSvc: BlueprintsService,
  ) {
    this.bpCatalog = []
  }

  async ngOnInit(): Promise<void> {
    const bpCatalog = await this.blueprintsSvc.getBlueprints()
    this.bpCatalog = [
      ...this.bpCatalog,
      ...Object.values(bpCatalog)
    ]
  }

  allowDropBp(e: DragEvent) {
    e.preventDefault()
  }
  
  dragBp(e: DragEvent, bpData: any) {
    e.dataTransfer?.setData("bp", JSON.stringify(bpData))
  }

  dropBp(e: DragEvent) {
    e.preventDefault()
  }
}
