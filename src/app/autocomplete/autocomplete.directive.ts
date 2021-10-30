import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  ConnectionPositionPair,
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';import { TemplatePortal } from '@angular/cdk/portal';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { NgControl } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';

interface I {
  Name: string,
  Symbol: string
}
@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective {

  @Input() appAutocomplete: AutocompleteComponent;
  private overlayRef: OverlayRef;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef,
    private overlay: Overlay
  ) {}

  get control() {
    return this.ngControl.control;
  }

  ngOnInit() {
    fromEvent(this.origin, 'focus')
    .subscribe((yo) => {
      if (!!this.origin.value) {
          this.origin.select();
          // fromEvent(this.origin, '')

        }

          this.openDropdown();
          this.appAutocomplete
            .optionsClick()
            .pipe(takeUntil(this.overlayRef.detachments()))
            .subscribe((value: I) => {
              console.log('val from autoDirective:', value);

              this.control.setValue(value);
              this.close();
            });

        // console.log('the master origin', !!this.origin.value);
      });
  }

  openDropdown() {
    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(
      this.appAutocomplete.rootTemplate,
      this.vcr
    );
    this.overlayRef.attach(template);

    overlayClickOutside(this.overlayRef, this.origin).subscribe(() =>
      this.close()
    );
  }

  ngOnDestroy() {}

  private close() {
    this.overlayRef.detach();
    this.overlayRef = null;
  }

  private getOverlayPosition() {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' }
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  get origin() {
    return this.host.nativeElement;
  }
}

export function overlayClickOutside(
  overlayRef: OverlayRef,
  origin: HTMLElement
) {
  return fromEvent<MouseEvent>(document, 'click').pipe(
    filter(event => {
      const clickTarget = event.target as HTMLElement;
      const notOrigin = clickTarget !== origin; // the input
      const notOverlay =
      !!overlayRef &&
      overlayRef.overlayElement.contains(clickTarget) === false; // the autocomplete
      return notOrigin && notOverlay;
    }),
    tap(i => console.log(`listening for clickEvent in overlackClickOutside ${i}`)),
    takeUntil(overlayRef.detachments())
  );
}
