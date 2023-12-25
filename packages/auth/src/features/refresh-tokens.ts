import { refresh } from "../backend";
import { AccessToken } from "../domain/access-token";
import { authHandler, authState } from "../locals";

export async function refreshTokens(refreshToken: string) {
  try {
    const result = await refresh(refreshToken);

		authState.update(state => {
			if (!state) {
				authHandler.redirectLogin();
				return state;
			}

			state.refreshToken = result.data.refreshToken;
			const accessToken = AccessToken.fromToken(result.data.token);

			if (!accessToken) {
				authHandler.redirectLogin();
				return state;
			}

			state.accessToken = accessToken;

			return state;
		})
  } catch (_) {
    authHandler.redirectLogin();
  }
}
