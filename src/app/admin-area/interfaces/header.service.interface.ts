
export interface HeaderServiceInterface {
  checkUrlParams(): void;

  checkNotification(): void;

  getNewNotification(): void;

  getExplodeLink(): void;

  getUrlPath(): void;

  unsubscribe(): void;
}
