import {
  ApplicationRef,
  ChangeDetectorRef,
  ErrorHandler,
  Injectable,
  Injector,
} from '@angular/core';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
  errorCount = 0;

  constructor(protected injector: Injector) {
    super();
  }

  override handleError(error: any): void {
    let increment = 5;
    let max = 50;

    let debugCtx = error['ngDebugContext'];
    let changeDetectorRef =
      debugCtx && debugCtx.injector.get(ChangeDetectorRef);
    if (changeDetectorRef) changeDetectorRef.detach();

    this.errorCount = this.errorCount + 1;
    if (this.errorCount % increment === 0) {
      console.log(' ');
      console.log(`errorHandler() was called ${this.errorCount} times.`);
      console.log(' ');
      super.handleError(error);

      if (this.errorCount === max) {
        console.log(' ');
        console.log(
          `Preventing recursive error after ${this.errorCount} recursive errors.`
        );
        console.log(' ');

        let appRef = this.injector.get(ApplicationRef);
        appRef.tick();
      }
    } else if (this.errorCount === 1) {
      super.handleError(error);
    }
  }
}
