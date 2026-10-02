import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  scrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 100; // pixel after blur starts
  }
}
