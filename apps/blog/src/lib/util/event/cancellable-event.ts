export class CancellableEvent<T> {
	private _cancelled = false;

	constructor(public readonly data: T) {}

	public isCancelled(): boolean {
		return this._cancelled;
	}

	public cancel(): void {
		this._cancelled = true;
	}
}
