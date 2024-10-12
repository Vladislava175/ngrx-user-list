import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { appConfig } from './app.config';
import { ItemService } from './services/item.service';
import { appEffects, appStore } from './store/store';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideStore(appStore),
    provideEffects(appEffects),
    ItemService,
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
