/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RPC_URL: string;
  readonly VITE_PRIVATE_KEY: string;
  readonly VITE_ENTRYPOINT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
