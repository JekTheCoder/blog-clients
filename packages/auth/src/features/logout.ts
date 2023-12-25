import { authState } from "../locals";

export function logout() {
	authState.set(null);
}
