export type ApiOptionalHeadersModel =
  | {
      authorization?: string;
    }
  | {
      [header: string]: string | string[];
    };
