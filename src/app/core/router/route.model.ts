import { Params, Route } from '@angular/router';

export interface RouteCustomModel extends Route {
  data?: RouteDataModel;
}

export interface RouteDataModel {
  [name: string]: any;
  title?: string;
  description?: string;
  breadcrumbs?: RouteDataBreadcrumbModel[];
}

export interface RouteDataBreadcrumbModel {
  title: string;
  url: string;
  disabled?: boolean;
  titleType: BreadcrumbTitleType;
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data?: RouteDataModel;
}

export enum BreadcrumbTitleType {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  STORE = 'store',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  I18N = 'i18n',
}
