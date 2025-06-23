import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GraphDataService {
  getGraphData(): Observable<any[]> {
    // Simulate fetching from markdown or API
    return of([
      { data: { id: 'home', label: 'Home', url: '/' } },
      { data: { id: 'now', label: 'Now', url: '/now' } },
      { data: { id: 'projects', label: 'Projects', url: '/projects' } },
      { data: { id: 'games', label: 'Games Beaten', url: '/games' } },
      { data: { id: 'post1', label: 'Side Project', url: '/posts/side-project' } },
      { data: { id: 'tag-projects', label: 'Tag: Projects', url: '/tags/projects' } },
      { data: { id: 'e1', source: 'home', target: 'now' } },
      { data: { id: 'e2', source: 'home', target: 'projects' } },
      { data: { id: 'e3', source: 'projects', target: 'post1' } },
      { data: { id: 'e4', source: 'post1', target: 'tag-projects' } },
    ]);
  }
}
