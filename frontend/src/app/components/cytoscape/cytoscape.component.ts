import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, HostListener, Injector, ViewChild} from '@angular/core';
import cytoscape, {EventObject} from 'cytoscape';
import cola from 'cytoscape-cola';
import edgeEditing from 'cytoscape-edge-editing';
import edgehandles from 'cytoscape-edgehandles';
import gridGuide from 'cytoscape-grid-guide';
import Layers, {LayersPlugin} from 'cytoscape-layers';
import panzoom from 'cytoscape-panzoom';
import undoRedo from 'cytoscape-undo-redo';
import jquery from 'jquery';
import konva from 'konva';
import {Blueprint} from "src/app/services/blueprints/blueprint";
import {BlueprintType} from "src/app/shared/blueprint-type";
import {NodeComponent} from "../node/node.component";
import {cyParams, cyStylesheet} from './cytoscape.styles'

@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.scss']
})
export class CytoscapeComponent implements AfterViewInit {

  private cy!: cytoscape.Core
  
  @ViewChild('cy')
  private cyDiv!: ElementRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    // Register Cytoscape-extensions
    cytoscape.use(Layers as any)
    cytoscape.use(cola)
    cytoscape.use(edgehandles as any)
    undoRedo(cytoscape)
    edgeEditing(cytoscape, jquery, konva);
    gridGuide(cytoscape)
    panzoom(cytoscape)
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    const undoRedo = (this.cy as any).undoRedo()

    if (e.ctrlKey && e.key == 'z') {
      undoRedo.undo()
    }
    else if (e.ctrlKey && e.key == 'y') {
      undoRedo.redo()
    }
  }

  allowDropBp(e: DragEvent) {
    e.preventDefault();
  }

  dropBp(e: DragEvent) {
    e.preventDefault();
    const data = e.dataTransfer?.getData("bp");
    const bp: Blueprint = JSON.parse(data!)

    this.cy.add({
      group: 'nodes',
      data: {
        id: `${bp.id}_${Date.now().toString()}`,
        bp: bp
      },
      position: {
        x: (e.clientX - this.cy.pan().x) / this.cy.zoom(),
        y: (e.clientY - this.cy.pan().y) / this.cy.zoom()
      }
    })
    this.cy.trigger('bp-added', [bp])
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape({
      container: this.cyDiv.nativeElement,
      layout: {
        name: cyParams.layout
      },
      boxSelectionEnabled: true,
      maxZoom: cyParams.maxZoom,
      minZoom: cyParams.minZoom,
      zoom: cyParams.zoom,
      style: cyStylesheet
    });

    // Need extended/open-interface to use extensions
    const customCy: any = this.cy

    customCy.gridGuide({
      snapToGridDuringDrag: true,
      distributionGuidelines: true,
      geometricGuideline: true,
      centerToEdgeAlignment: true,
      panGrid: true,
      guidelinesStackOrder: 1,
      guidelinesTolerance: 7,
      gridColor: cyParams.gridColor,
      lineWidth: cyParams.gridLineWidth
    })

    customCy.panzoom({
      minZoom: cyParams.minZoom,
      maxZoom: cyParams.maxZoom
    })

    customCy.undoRedo()

    customCy.edgeEditing({
      undoable: true,
      initAnchorsAutomatically: false,
      enableCreateAnchorOnDrag: true,
      zIndex: 1
    })

    this.cy.edgehandles({
      snap: true,
      loopAllowed: () => false
    })

    customCy.on('bp-added', this.onBpAdded);

    // When new edge is created
    customCy.on('ehcomplete',
      (_1: Event,
        _2: cytoscape.NodeSingular,
        _3: cytoscape.NodeSingular,
        addedEles: cytoscape.EdgeSingular
      ) => {
        // Configs provided by EdgeEditing extension
        addedEles.addClass('edgebendediting-hasbendpoints')
        addedEles.data(
          'cyedgebendeditingWeights',
          [cyParams.edgebendEditingWeights])
        addedEles.data(
          'cyedgebendeditingDistances',
          [cyParams.edgebendEditingDistances])
      }
    )
  }

  private onBpAdded = async (event: EventObject, _extraParams?: any): Promise<void> => {
    const factory = this.resolver.resolveComponentFactory(NodeComponent)
    const layers = (event.cy as any).layers() as LayersPlugin
    layers.nodeLayer.moveFront()

    // Add our custom nodes to Cytoscape's node-container
    layers.renderPerNode(layers.append('html'), () => { }, {
      init: (elem: HTMLElement, node: cytoscape.NodeSingular) => {
        const bpNode = node.data('bp') as Blueprint
        if (!bpNode) {
          return
        }
        console.log(node.id(), bpNode)

        const component = factory.create(this.injector);

        component.instance.width = cyParams.nodeWidth
        component.instance.height = cyParams.nodeHeight
        component.instance.blueprint = {
          id: bpNode.id,
          icon: (bpNode.icon as any).changingThisBreaksApplicationSecurity,
          name: bpNode.name,
          type: BlueprintType.Frontend
        }
        component.changeDetectorRef.detectChanges();

        elem.insertAdjacentElement(
          'beforeend',
          component.location.nativeElement
        )
      },
      uniqueElements: true,
      checkBounds: true
    });
  }
}
