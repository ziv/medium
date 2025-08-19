import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {setItems} from './items';

export const appConfig: ApplicationConfig = {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes, withHashLocation()),
      provideHttpClient(withFetch()),
      provideAppInitializer(async () => {
        // const res = await fetch('http://localhost:4200/items.json');
        // location at server
        const res = await fetch('https://ziv.github.io/medium/items.json');
        const items = await res.json();
        setItems(items);
      }),
    ]
  }
;
