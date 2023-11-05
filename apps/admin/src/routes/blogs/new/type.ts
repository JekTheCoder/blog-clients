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
