import { authClient } from 'auth';
import { apiUrl } from 'app-globals/api';

/**
 * Triggers recompilation of all markdown files
	* requires admin privileges
	*/
export function recompileMarkdowns() {
	return authClient.post<void>(apiUrl + '/blogs/recompile-markdowns');
}
