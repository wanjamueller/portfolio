import { Component, HostListener, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private router = inject(Router); // gives access to Angular's router (current URL, navigation events, route tree)

  onProject = toSignal(
    // turns the router's event stream into a signal that always holds true/false
    this.router.events.pipe(
      // router.events emits many events during every navigation (start, end, errors, …)
      filter((e) => e instanceof NavigationEnd), // keep only "navigation finished" events, when the new page is final
      map(() => {
        // turn each of those events into true/false: "is the current page a project page?"
        let route = this.router.routerState.snapshot.root; // start at the top of the route tree (the app root)
        while (route.firstChild) route = route.firstChild; // walk down to the active page, where the route's data lives
        return route.data['project'] === true; // true if this route has data: { project: true } in app.routes.ts
      }),
    ),
    { initialValue: false }, // value to use before the first navigation has finished (e.g. right after a reload)
  );

  scrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 100; // pixel after blur starts
  }
}
