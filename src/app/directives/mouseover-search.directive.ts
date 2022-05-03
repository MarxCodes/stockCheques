import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[appMouseoverSearch]'
})
export class MouseoverSearchDirective implements OnInit{
  @HostBinding('style.backgroundColor') backgroundColor: string;
  constructor(private el: ElementRef,
    private renderer: Renderer2) { }

    ngOnInit(): void {
        this.renderer.addClass(this.el.nativeElement, '')
    }

    @HostListener('mouseover') mouseover(event: Event) {
      this.renderer.addClass(this.el.nativeElement, 'hover-mouse');
    }

    @HostListener('mouseleave') mouseleave(event: Event) {
      this.renderer.removeClass(this.el.nativeElement, 'hover-mouse');
    }
}
