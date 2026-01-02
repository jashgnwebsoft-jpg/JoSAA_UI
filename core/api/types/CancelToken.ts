// CancelToken implementation
export class CancelToken {
  private abortController: AbortController;
  private cancelPromise: Promise<void>;
  private cancelResolve?: () => void;

  constructor() {
    this.abortController = new AbortController();
    this.cancelPromise = new Promise(resolve => {
      this.cancelResolve = resolve;
    });
  }

  get signal(): AbortSignal {
    return this.abortController.signal;
  }

  cancel(reason?: string): void {
    this.abortController.abort(reason);
    this.cancelResolve?.();
  }

  get isCancelled(): boolean {
    return this.abortController.signal.aborted;
  }

  throwIfCancelled(): void {
    if (this.isCancelled) {
      throw new Error('Request cancelled');
    }
  }

  static source(): { token: CancelToken; cancel: (reason?: string) => void } {
    const token = new CancelToken();
    return {
      token,
      cancel: (reason?: string) => token.cancel(reason),
    };
  }
}
