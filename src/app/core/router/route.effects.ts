import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class RouterEffects {
  //   routeNavigated$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(routerNavigatedAction),
  //         map((navigated) => console.log(navigated)),
  //       ),
  //     { dispatch: false },
  //   );

  constructor(private store: Store, private actions$: Actions, private router: Router) {}
}
