import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateUrl } from '../route.model';

export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    return {
      url: routerState.url,
      params: this.mergeRouteParams(routerState.root, (r) => r.params),
      queryParams: this.mergeRouteParams(routerState.root, (r) => r.queryParams),
      data: this.mergeRouteData(routerState.root),
    };
  }

  mergeRouteParams(route: ActivatedRouteSnapshot, getter: (r: ActivatedRouteSnapshot) => Params): Params {
    if (!route) {
      return {};
    }
    const currentParams = getter(route);
    const primaryChild =
      route.children.find((c) => c.outlet === 'primary') || (route.firstChild as ActivatedRouteSnapshot);
    return { ...currentParams, ...this.mergeRouteParams(primaryChild, getter) };
  }

  mergeRouteData(route: ActivatedRouteSnapshot): Data {
    if (!route) {
      return {};
    }

    const currentData = route.data;
    const primaryChild =
      route.children.find((c) => c.outlet === 'primary') || (route.firstChild as ActivatedRouteSnapshot);
    return { ...currentData, ...this.mergeRouteData(primaryChild) };
  }
}
