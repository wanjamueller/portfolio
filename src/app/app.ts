import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './layout/hero/hero';
import { Header } from './layout/header/header';
import { About } from './layout/about/about';

@Component({
  imports: [RouterOutlet, Hero, Header, About],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('portfolio');
}
