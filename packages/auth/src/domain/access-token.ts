import { deserializeJwt } from '../shared/deserialize';
import type { Role } from './role';

export class AccessToken {
	private readonly exp: number;
	public readonly id: string;
	public readonly role: Role;
	public readonly token: string;

	private constructor({
		exp,
		id,
		role,
		token
	}: {
		exp: number;
		id: string;
		role: Role;
		token: string;
	}) {
		this.exp = exp;
		this.id = id;
		this.role = role;
		this.token = token;
	}

	static fromToken(token: string): AccessToken | null {
		try {
			const { exp, id, role } = deserializeJwt<{ exp: number; id: string; role: Role }>(token);

			return new AccessToken({
				exp,
				id,
				role,
				token
			});
		} catch {
			return null;
		}
	}

	isExpired() {
		return Date.now() >= this.exp * 1000;
	}
}
