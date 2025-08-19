import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import getItems from './items';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  host: {
    "(document:keydown.Esc)": "showAbout.set(false)",
  },
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      height: 100%;
    }

    a {
      cursor: pointer;
    }

    aside, main {
      padding: 1rem;
    }

    aside {
      width: 20%;
    }
  `,
  template: `
    @if (showAbout()) {
      <dialog open>
        <article>
          <header>
            <button aria-label="Close" rel="prev" (click)="showAbout.set(false)"></button>
            <h6>XPR Medium Archive</h6>
          </header>
        </article>
      </dialog>
    }
    <main class="container">
      <nav>
        <ul>
          <li routerLink="/"><a><strong>XPR</strong></a></li>
        </ul>
        <ul>
          <li><a (click)="showAbout.set(true)" class="secondary">About</a></li>
          <li>
            <details class="dropdown">
              <summary>
                Posts
              </summary>
              <ul dir="rtl">
                @for (item of items; track item.path) {
                  <li>
                    <a [routerLink]="['blog', item.id, item.title]">{{ item.title }}</a>
                  </li>
                }
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  items = getItems();
  showAbout = signal(false);
}
