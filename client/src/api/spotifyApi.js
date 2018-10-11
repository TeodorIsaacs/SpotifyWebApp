export async function getSong(filter, token) {
	const data = await fetch(
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

	const json = await data.json();

	if (json.error) { return json; }

	const track = json.tracks.items[0];

	return ({name: track.name, uri: track.uri});
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
