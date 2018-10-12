export async function getFavourites(database, userId){
	return database.ref(`users/${userId}/songs`)
  		.once('value');
}

export function saveTrack(database, track, userId){
	database.ref(`users/${userId}/songs`).child(track.uri).set(track);
}

export const DB_CONFIG = {
    apiKey: "AIzaSyCXpgjhg65zXQQ1OqslmonNlhvVwHvJoDE",
    authDomain: "spotifywebapp.firebaseapp.com",
    databaseURL: "https://spotifywebapp.firebaseio.com",
    projectId: "spotifywebapp",
    storageBucket: "spotifywebapp.appspot.com",
    messagingSenderId: "896064864334"
  };
