import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {Markdown} from '@xprng/markdown';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import getItems from './items';

const BASE = 'https://raw.githubusercontent.com/ziv/medium/refs/heads/main';
const README = `${BASE}/README.md`;

@Component({
  selector: 'app-root',
  imports: [Markdown],
  template: `<main class="container"><xpr-markdown [src]="src()"/></main>`
})
export default class Blog {
  private readonly items = getItems();
  private readonly base = 'https://raw.githubusercontent.com/ziv/medium/refs/heads/main';
  private readonly params = toSignal(inject(ActivatedRoute).params);

  protected readonly src = computed(() => {
    const id = this.params()?.['id'];
    if (!id) {
      return README;
    }
    const item = this.items.find(item => item.id == id);
    if (!item) {
      return README;
    }
    return `${BASE}/${item.path}.md`;
  });
}
