export async function getFavourites(database){
  return database
    .ref()
    .once("value")
}

export function saveTrack(database, track){
	database.ref("songs").push().set(track);
}
