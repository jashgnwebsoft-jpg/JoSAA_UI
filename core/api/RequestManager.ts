// Request manager for tracking active requests
export class RequestManager {
  private activeRequests: Map<string, AbortController> = new Map();
  private correlationMap: Map<string, string> = new Map();

  add(key: string, controller: AbortController, correlationId: string): void {
    // Cancel existing request with same key if exists
    this.cancel(key);
    this.activeRequests.set(key, controller);
    this.correlationMap.set(key, correlationId);
  }

  remove(key: string): void {
    this.activeRequests.delete(key);
    this.correlationMap.delete(key);
  }

  cancel(key: string): void {
    const controller = this.activeRequests.get(key);
    if (controller) {
      controller.abort();
      this.activeRequests.delete(key);
      this.correlationMap.delete(key);
    }
  }

  cancelAll(): void {
    this.activeRequests.forEach(controller => controller.abort());
    this.activeRequests.clear();
    this.correlationMap.clear();
  }

  has(key: string): boolean {
    return this.activeRequests.has(key);
  }

  getCorrelationId(key: string): string | undefined {
    return this.correlationMap.get(key);
  }
}
