// Lightweight React type fallback so this prototype can keep package.json dependency-light.
// The app intentionally avoids depending on @types/react; projects that prefer the full
// React type surface can add @types/react and @types/react-dom later without changing app code.
declare namespace JSX {
  type Element = unknown;

  interface IntrinsicAttributes {
    key?: string | number;
  }

  interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>;
  }
}

declare module 'react' {
  export type CSSProperties = Record<string, string | number | undefined>;
  export type ReactNode = unknown;
  export function StrictMode(props: { children?: ReactNode }): JSX.Element;
  export function useEffect(effect: () => void | (() => void) | undefined, dependencies?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, dependencies: readonly unknown[]): T;
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((previous: T) => T)) => void];
}

declare module 'react/jsx-runtime' {
  export function jsx(type: unknown, props: Record<string, unknown>, key?: string): JSX.Element;
  export function jsxs(type: unknown, props: Record<string, unknown>, key?: string): JSX.Element;
  export const Fragment: unique symbol;
}

declare module 'react-dom/client' {
  import type { ReactNode } from 'react';

  export function createRoot(container: Element | DocumentFragment): {
    render(children: ReactNode): void;
  };
}


declare module '*.css';

declare module 'vite' {
  export function defineConfig(config: Record<string, unknown>): Record<string, unknown>;
}

declare module '@vitejs/plugin-react' {
  export default function react(): unknown;
}
