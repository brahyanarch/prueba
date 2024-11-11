// global.d.ts
export {};

declare global {
  interface Window {
    initMap: () => void;
  }
}
