const getFavoritesFromLocalStorage = async () => {
  const currentFavorites = await JSON.parse(localStorage.getItem("Favorite"));

  if (!currentFavorites?.length) return [];
  return currentFavorites;
};

export default getFavoritesFromLocalStorage;
