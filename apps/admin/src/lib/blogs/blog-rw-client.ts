import { buildWs } from '$lib/backend/api';

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
	type: 'html' | 'content';
	value: string;
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
	private readonly socket = buildWs();

	onHtml(): AsyncStream<string> {
		const subscribe = (callback: (value: string) => void) => {
			const onMessage = (e: MessageEvent) => {
				const message: MessageResult = JSON.parse(e.data);
				if (message.type === 'ok' && message.value.type === 'html') {
					callback(message.value.value);
				}
			};

			this.socket.addEventListener('message', onMessage);

			return () => this.socket.removeEventListener('message', onMessage);
		};

		return {
			subscribe
		}
	}

	getContent(): Promise<string> {
		const message: WRequest = {
			type: 'getContent'
		};
		this.socket.send(JSON.stringify(message));

		return new Promise((resolve, reject) => {
			const self = this;

			function onMessage(e: MessageEvent) {
				const message: MessageResult = JSON.parse(e.data);
				if (message.type === 'err') reject(message.value);
				if (message.type === 'ok' && message.value.type === 'content') {
					self.socket.removeEventListener('message', onMessage);
					resolve(message.value.value);
				}
			}

			this.socket.addEventListener('message', onMessage);
		});
	}

	close() {
		this.socket.close();
	}
}
