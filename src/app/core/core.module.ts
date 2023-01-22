/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { RouterEffects } from './router/route.effects';
import { CustomRouterSerializer } from './router/serializer/router.serializer';
import { BoardEffects } from './store/board/board.effects';
import { metaReducers, reducers } from './store/store.reducers';

@NgModule({
  imports: [
    // ngrx
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterSerializer,
    }),
    EffectsModule.forRoot([RouterEffects, BoardEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: environment.APP_NAME,
        }),
  ],
})
export class CoreModule {
  /**
   * Constructor
   */
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }
  }
}
