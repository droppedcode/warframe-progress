import { Directive, Input, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective implements OnDestroy {
  @Input('scroll')
  private target: string;

  private targetElement: HTMLElement;
  private scrollElement: HTMLElement;

  private isScrolledManually = false;

  private lastDirectiveScrollTop: number;
  private step: number;

  private cancelWrapper: () => void;

  constructor(private element: ElementRef) { }

  ngOnDestroy() {
    if (this.scrollElement) {
      this.scrollElement.removeEventListener('scroll', this.cancelWrapper);
    }
  }

  cancel() {
    if (this.lastDirectiveScrollTop === this.scrollElement.scrollTop) return;

    this.isScrolledManually = true;
  }

  scroll() {
    if (this.isScrolledManually) {
      return;
    }

    let diff = this.targetElement.offsetTop - this.scrollElement.scrollTop;
    this.lastDirectiveScrollTop = Math.floor(this.scrollElement.scrollTop + (diff < 0 ? -1 : 1) * Math.min(Math.abs(diff), this.step));
    this.scrollElement.scrollTop = this.lastDirectiveScrollTop;

    if (this.targetElement.offsetTop !== this.scrollElement.scrollTop && this.scrollElement.scrollTop === this.lastDirectiveScrollTop) {
      (<any>this.scrollElement).scrollTimeout = setTimeout(() => this.scroll(), 25);
    } else {
      this.targetElement.classList.add('scrolled');
      setTimeout(() => {
        this.targetElement.classList.remove('scrolled');
      }, 2000);
    }
  }

  @HostListener('click') scrollTo() {
    if (!this.targetElement) {
      this.targetElement = document.getElementById(this.target.substr(1));
      this.scrollElement = this.findScrollParent(this.targetElement);

      this.cancelWrapper = () => this.cancel();
      this.scrollElement.addEventListener('scroll', this.cancelWrapper);
    }

    if (this.scrollElement) {
      this.lastDirectiveScrollTop = this.scrollElement.scrollTop;
      this.isScrolledManually = false;

      let timeout = (<any>this.scrollElement).scrollTimeout;
      if (timeout) {
        clearTimeout(timeout);
      }

      this.step = Math.max(25, Math.abs(this.targetElement.offsetTop - this.scrollElement.scrollTop) / 10);

      (<any>this.scrollElement).scrollTimeout = setTimeout(() => this.scroll(), 25);
    }
  }

  findScrollParent(element: HTMLElement): HTMLElement {
    if (!element) {
      return null;
    }

    if (element.scrollHeight > element.clientHeight) {
      return element;
    }

    return this.findScrollParent(element.parentElement);
  }

}
