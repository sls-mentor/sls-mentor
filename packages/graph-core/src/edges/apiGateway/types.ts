export const RestApiWarnings = {
  RestApiNoAuthorizer: 'RestApiNoAuthorizer',
} as const;

export type RestApiWarnings =
  (typeof RestApiWarnings)[keyof typeof RestApiWarnings];

export const HttpApiWarnings = {
  HttpApiNoAuthorizer: 'HttpApiNoAuthorizer',
} as const;

export type HttpApiWarnings =
  (typeof HttpApiWarnings)[keyof typeof HttpApiWarnings];
