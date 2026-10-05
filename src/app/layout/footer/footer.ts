import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  private router = inject(Router);

  // invert method to show footer in $black when background is white
  private url = toSignal(
    // creates a signal that always holds the current URL
    this.router.events.pipe(
      // router.events emits many events during every navigation (start, end, errors, …)
      filter((event) => event instanceof NavigationEnd), // keep only "navigation finished" events, when the URL is final
      map(() => this.router.url), // turn each of those events into the current URL string, e.g. "/imprint"
    ),
    { initialValue: this.router.url }, // value to use before the first navigation has finished (e.g. right after a reload)
  );

  onImprint = computed(() => this.url().startsWith('/imprint')); // true on the imprint page; recalculates automatically whenever url changes
}
