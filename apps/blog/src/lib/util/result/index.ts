import type { AxiosError, AxiosResponse } from 'axios';

type MatchProp<T, TR, U, UR> = {
	ok: (value: T) => TR;
	err: (error: U) => UR;
};

export const enum ResultKind {
	Ok = 1,
	Err
}

export type ResultType<T, E> =
	| {
			kind: ResultKind.Ok;
			value: T;
	  }
	| {
			kind: ResultKind.Err;
			error: E;
	  };

export class Result<T, E> {
	constructor(private readonly result: ResultType<T, E>) {}

	match<R>({ ok, err }: MatchProp<T, R, E, R>): R;
	match<TR, UR>({ ok, err }: MatchProp<T, TR, E, UR>): TR | UR;
	match<TR, UR>({ ok, err }: MatchProp<T, TR, E, UR>): TR | UR {
		switch (this.result.kind) {
			case ResultKind.Ok:
				return ok(this.result.value);
			case ResultKind.Err:
				return err(this.result.error);
		}
	}

	inner(): ResultType<T, E> {
		return this.result;
	}

	unwrap(): T {
		if (this.result.kind === ResultKind.Ok) {
			return this.result.value;
		} else {
			throw this.result.error;
		}
	}

	isOk(): boolean {
		return this.result.kind === ResultKind.Ok;	
	}

	isErr(): boolean {
		return this.result.kind === ResultKind.Err;
	}
}

export const ok = <T>(value: T): Result<T, never> => new Result({ kind: ResultKind.Ok, value });
export const err = <E>(error: E): Result<never, E> => new Result({ kind: ResultKind.Err, error });

export const fromPromise = <T, E>(promise: Promise<T>): Promise<Result<T, E>> => {
	return promise.then(ok<T>).catch(err<E>);
};

export const fromCallback = <T, E>(callback: () => T): Result<T, E> => {
	try {
		return ok(callback());
	} catch (e) {
		return err(e as E);
	}
};

export const fromAxios = <T>(axios: Promise<AxiosResponse<T>>): Promise<Result<T, AxiosError>> => {
	return axios.then((data) => ok(data.data)).catch(err<AxiosError>);
};
