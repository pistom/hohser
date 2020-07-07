export class ResizeObserver {
  private observables;
  private boundCheck;
  private callback;
  constructor (callback) {
    this.observables = [];
    this.boundCheck = this.check.bind(this);
    this.boundCheck();
    this.callback = callback;
  }

  observe (el) {
    if (this.observables.some((observable) => observable.el === el)) {
      return;
    }
    const newObservable = {
      el: el,
      size: {
        height: el.clientHeight,
        width: el.clientWidth
      }
    };
    this.observables.push(newObservable);
  }

  unobserve (el) {
    this.observables = this.observables.filter((obj) => obj.el !== el);
  }

  disconnect () {
    this.observables = [];
  }

  check () {
    const changedEntries = this.observables.filter((obj) => {
      const currentHeight = obj.el.clientHeight;
      const currentWidth = obj.el.clientWidth;
      if (obj.size.height !== currentHeight || obj.size.width !== currentWidth) {
        obj.size.height = currentHeight;
        obj.size.width = currentWidth;
        return true;
      };
      return false;
    }).map((obj) => obj.el);
    if (changedEntries.length > 0) {
      this.callback(changedEntries);
    }
    window.requestAnimationFrame(this.boundCheck);
  }
}
