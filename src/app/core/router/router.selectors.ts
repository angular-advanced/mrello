import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './route.model';

export const selectRouter = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const selectRouterState = createSelector(selectRouter, (router) => router && router.state);
export const selectRouteUrl = createSelector(selectRouterState, (routerState) => routerState && routerState.url);
export const selectRouteParams = createSelector(selectRouterState, (routerState) => routerState && routerState.params);
export const selectRouteQueryParams = createSelector(
  selectRouterState,
  (routerState) => routerState && routerState.queryParams,
);
export const selectRouteData = createSelector(selectRouterState, (routerState) => routerState && routerState.data);
