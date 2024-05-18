import { buildWs, getContent } from './blog-create';

export type MessageResult =
	| {
			type: 'ok';
			value: MessageResponse;
	  }
	| {
			type: 'err';
			value: MessageError;
	  };

export type MessageResponse = {
	type: 'content';
	value: ParsedContent;
};

export type ParsedContent = {
	content: string;
	preview: string | null;
	title: string;
};

export type MessageError = {
	type: 'messageUnexpected';
};

export type WRequest = {
	type: 'getContent';
};

interface AsyncStream<T> {
	subscribe(callback: (value: T) => void): () => void;
}

export class BlogRwClient {
	private readonly socket: WebSocket;

	constructor(
		private readonly workspaceId: string,
		blogId?: string,
	) {
		this.socket = buildWs(workspaceId, blogId);
	}

	onHtml(): AsyncStream<string> {
		const subscribe = (callback: (value: string) => void) => {
			const onMessage = (e: MessageEvent) => {
				const message: MessageResult = JSON.parse(e.data);
				if (message.type === 'ok' && message.value.type === 'content') {
					callback(message.value.value.content);
				}
			};

			this.socket.addEventListener('message', onMessage);

			return () => this.socket.removeEventListener('message', onMessage);
		};

		return {
			subscribe,
		};
	}

	getContent(): Promise<string> {
		return getContent(this.workspaceId) as any;
	}

	close() {
		this.socket.close();
	}
}
