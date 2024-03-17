import { ClassProvider, FactoryProvider, InjectionToken } from '@angular/core';

export function _window(): Window & typeof globalThis {
  return window;
}
export const WINDOW = new InjectionToken('WindowToken');
export abstract class WindowRef {
  get nativeWindow(): Window {
    throw new Error('Not implemented.');
  }
}
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }
  override get nativeWindow(): Window & typeof globalThis {
    return _window();
  }
}
const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: _window,
  deps: [],
};
export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
