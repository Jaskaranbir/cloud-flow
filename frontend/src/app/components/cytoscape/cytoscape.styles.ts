// Stylesheet for Cytoscape. More info:
// https://js.cytoscape.org/#selectors
// https://js.cytoscape.org/#style

import {Stylesheet} from "cytoscape"

export const cyParams = {
  nodeWidth: 200,
  nodeHeight: 100,
  layout: 'cola',
  gridColor: '#e4e4e4',
  gridLineWidth: 2,
  minZoom: 0.5,
  maxZoom: 3,
  zoom: 1,
  // Determines where to put bend-adjustment
  // points for edges of connected nodes
  edgebendEditingWeights: 0.5,
  edgebendEditingDistances: 0.5
}

export const cyStylesheet: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      width: cyParams.nodeWidth,
      height: cyParams.nodeHeight,
      shape: 'roundrectangle',
      color: 'black',
      'background-color': 'white',
      'overlay-opacity': 0,
    }
  },

  {
    selector: 'edge',
    style: {
      'curve-style': 'straight',
      width: 2,
      'line-color': 'black',
    }
  },

  {
    selector: '.eh-handle',
    style: {
      'background-color': 'white',
      width: 15,
      height: 15,
      shape: 'ellipse',
      'border-color': 'black',
      'overlay-opacity': 0,
      'border-width': 2,
      'border-opacity': 1,
    }
  },

  {
    selector: '.eh-source',
    style: {
      'border-width': 3,
      'border-color': 'black',
    }
  },

  {
    selector: '.eh-target, :selected',
    style: {
      'overlay-opacity': 0.2
    }
  },

  {
    selector: '.eh-preview, .eh-ghost-edge',
    style: {
      'line-color': 'black',
      'target-arrow-color': 'black',
      'source-arrow-color': 'black'
    }
  },

  {
    selector: '.eh-preview',
    style: {
      opacity: 0.3
    }
  }
]
