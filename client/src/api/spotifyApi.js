
export async function getSong(filter, token) {
	if (filter) {
		return fetch(
			"https://api.spotify.com/v1/search?q=" +
				filter +
				"&type=track&limit=1&offset=0",
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			}
		)
	}
}
export function getHashParams() {
	var hashParams = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	e = r.exec(q);
	while (e) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
		e = r.exec(q);
	}
	return hashParams;
}