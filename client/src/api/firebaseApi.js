export async function getFavourites(database){
  return database
    .ref()
    .once("value")
}
