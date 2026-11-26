import { Component, DOCUMENT, effect, HostListener, inject, signal } from '@angular/core';
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
  private document = inject(DOCUMENT); // Angular's safe access to the page's document

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
  menuOpen = signal(false); // true = mobile menu is visible
  pressing = signal(false); // true = show the hand-drawn version of the current icon

  constructor() {
    // lock the page behind the menu so it can't scroll while the menu is open
    effect(() => {
      this.document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });

    // close the menu after each navigation, e.g. after a click on "Skills"
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  toggleMenu() {
    if (this.pressing()) return; // ignore double taps during the animation

    this.pressing.set(true); // 1. show the yellow strokes (☰) or the yellow X (✕)

    setTimeout(() => {
      this.pressing.set(false); // 2. back to the plain icon …
      this.menuOpen.update((open) => !open); // … and only now open/close the menu
    }, 500); // how long the drawn icon stays visible, in ms
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 100; // pixel after blur starts
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenu(); // keyboard users can close the menu with Esc
  }
}
