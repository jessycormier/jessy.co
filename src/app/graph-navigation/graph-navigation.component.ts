import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import cytoscape from 'cytoscape';
import { GraphDataService } from './graph-data.service';

@Component({
  selector: 'app-graph-navigation',
  templateUrl: './graph-navigation.component.html',
  styleUrls: ['./graph-navigation.component.css'],
  standalone: true,
})
export class GraphNavigationComponent implements AfterViewInit {
  @ViewChild('graphContainer') graphContainer!: ElementRef;

  constructor(private router: Router, private graphDataService: GraphDataService) {}

  ngAfterViewInit(): void {
    this.initializeGraph();
  }

  initializeGraph(): void {
    this.graphDataService.getGraphData().subscribe((elements) => {
      const cy = cytoscape({
        container: this.graphContainer.nativeElement,
        elements: elements,
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#fff',
              'border-color': '#fff',
              'border-width': 2,
              label: 'data(label)',
              color: '#fff',
              'text-valign': 'center',
              'font-size': '12px',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 1,
              'line-color': '#fff',
              'curve-style': 'bezier',
            },
          },
        ],
        layout: {
          name: 'cose', // Compound Spring Embedder for organic layout
          animate: true,
          animationDuration: 500,
        },
        zoom: 1,
        minZoom: 0.5,
        maxZoom: 2,
      });

      // Handle node clicks to navigate
      cy.on('tap', 'node', (event) => {
        const node = event.target;
        const url = node.data('url');
        if (url) {
          this.router.navigate([url]);
        }
      });
    });
  }

  getGraphData(): any[] {
    // This method is no longer used, data is fetched from the service.
    return [];
  }
}
