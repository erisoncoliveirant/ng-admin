import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SidebarService } from './sidebar.service';
import { MatchMediaService } from '../../services/match-media.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  // Name
  @Input()
  name: string | undefined;

  // right
  @Input()
  @HostBinding('class.position-right')
  right: boolean | undefined;

  // Open
  @HostBinding('class.open')
  opened: boolean | undefined;

  @HostBinding('class.sidebar-locked-open')
  sidebarLockedOpen: boolean | undefined;

  //mode
  @HostBinding('class.is-over')
  isOver: boolean | undefined;

  private backdrop: HTMLElement | null = null;

  private lockedBreakpoint = 'gt-sm';
  private unsubscribeAll: Subject<any>;

  constructor(
    private matchMediaService: MatchMediaService,
    private mediaObserver: MediaObserver,
    private sidebarHelperService: SidebarService,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.sidebarHelperService.setSidebar(this.name, this);

    if (this.mediaObserver.isActive(this.lockedBreakpoint)) {
      this.sidebarLockedOpen = true;
      this.opened = true;
    } else {
      this.sidebarLockedOpen = false;
      this.opened = false;
    }

    this.matchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        // console.log("medua sub");
        if (this.mediaObserver.isActive(this.lockedBreakpoint)) {
          this.sidebarLockedOpen = true;
          this.opened = true;
        } else {
          this.sidebarLockedOpen = false;
          this.opened = false;
        }
      });
  }

  open() {
    this.opened = true;
    if (!this.sidebarLockedOpen && !this.backdrop) {
      this.showBackdrop();
    }
  }

  close() {
    this.opened = false;
    this.hideBackdrop();
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  showBackdrop() {
    this.backdrop = this._renderer.createElement('div');
    this.backdrop?.classList.add('sidebar-overlay');

    this._renderer.appendChild(
      this._elementRef.nativeElement.parentElement,
      this.backdrop
    );

    // Close sidebar onclick
    this.backdrop?.addEventListener('click', () => {
      this.close();
    });

    this.cdr.markForCheck();
  }

  hideBackdrop() {
    if (this.backdrop) {
      this.backdrop.parentNode?.removeChild(this.backdrop);
      this.backdrop = null;
    }

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(1);
    this.unsubscribeAll.complete();
    this.sidebarHelperService.removeSidebar(this.name);
  }
}

@Directive({
  selector: '[sidebarToggler]',
})
export class SidebarTogglerDirective {
  @Input('SidebarToggler')
  public id: any;

  constructor(private sidebarHelperService: SidebarService) {}

  @HostListener('click')
  onClick() {
    this.sidebarHelperService.getSidebar(this.id).toggle();
  }
}
