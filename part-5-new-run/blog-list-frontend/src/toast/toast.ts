let toastFn: (msg: string) => void = () => {
  console.warn("ToastProvider is not mounted yet.");
};

export function setToastFn(fn: (msg: string) => void) {
  toastFn = fn;
}

export function toast(msg: string) {
  toastFn(msg);
}
