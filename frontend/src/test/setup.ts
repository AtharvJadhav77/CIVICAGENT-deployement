// Node.js 25+ defines experimental `localStorage` / `sessionStorage` globals
// that shadow the implementations provided by the jsdom test environment and
// are `undefined` unless the process starts with `--localstorage-file`.
//
// Vitest's jsdom environment aliases `window` to `globalThis`, so the Node
// getter hides jsdom's own storage even through `window`. Provide a small
// in-memory Storage implementation when the runtime did not give us one.
// On runtimes where the globals work (browser, Node 20/22 with jsdom) this is
// a no-op.

class MemoryStorage implements Storage {
  private readonly store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

for (const key of ["localStorage", "sessionStorage"] as const) {
  if (typeof globalThis[key] === "undefined") {
    Object.defineProperty(globalThis, key, {
      value: new MemoryStorage(),
      configurable: true,
      writable: true,
    });
  }
}
