/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BLOG_WORKSPACE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
