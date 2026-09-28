import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { References } from './references/references';
import { Contact } from './contact/contact';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, Hero, About, Skills, Projects, References, Contact],
  selector: 'app-main',
  styleUrl: './main.scss',
  templateUrl: './main.html',
})
export class Main {}
