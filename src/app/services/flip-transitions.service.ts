import { Injectable } from '@angular/core';
import { SearchControllerService } from './search-controller.service';
@Injectable({
  providedIn: 'root'
})
export class FlipTransitionsService {

  constructor(private controllerService: SearchControllerService) { }

  Dasflip(toggleState, firstEl, getLastEl = () => firstEl, attribute) {
    const firstRect = this.getRect(firstEl);
    // console.log('is there a first rectangle?', firstRect);
    requestAnimationFrame(() => {
      this.toggleView();

      let lastEl = getLastEl();
      const lastRect = this.getRect(lastEl);

      // console.log('is there a last rectangle?', lastRect);
      //Invert
      const dx = lastRect.x - firstRect.x;
      const dy = lastRect.y - firstRect.y;
      const dw = lastRect.width / firstRect.width;
      const dh = lastRect.height / firstRect.height;

      console.log({ dx, dy, dw, dh });

      // lastEl.dataset.attribute = attribute;

      Object.defineProperty(lastEl, attribute, {
        value: true,
        writable: false
      });
      // `lastEl.dataset.attribute` = true;
      // console.log('lastEL', lastEl);

      lastEl.style.setProperty('--dx', dx);
      lastEl.style.setProperty('--dy', dy);
      lastEl.style.setProperty('--dw', dw);
      lastEl.style.setProperty('--dh', dh);

      requestAnimationFrame(() => {
        delete lastEl.dataset.attribute;
      });
    });
  }

  toggleView(){
    this.controllerService.toggleView();
  }
  getRect(el) {
    return el.getBoundingClientRect();
  }
}
