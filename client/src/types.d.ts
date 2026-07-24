declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      behavior?: string;
      direction?: string;
      scrollamount?: string;
    };
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Type declaration for vite-plugin-pwa virtual module
declare module 'virtual:pwa-register' {
  export type RegisterSWOptions = {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
    onRegistrationError?: (error: unknown) => void
  }
  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => void
}
