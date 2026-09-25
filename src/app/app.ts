import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './layout/hero/hero';
import { Header } from './layout/header/header';
import { About } from './layout/about/about';
import { Skills } from './layout/skills/skills';
import { Projects } from './layout/projects/projects';

@Component({
  imports: [RouterOutlet, Hero, Header, About, Skills, Projects],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('portfolio');
}
