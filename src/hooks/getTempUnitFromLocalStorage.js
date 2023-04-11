import React from "react";

const getTempUnitFromLocalStorage = async () => {
  const currentFavorites = await JSON.parse(localStorage.getItem("tempUnit"));

  return <div>getTempUnitFromLocalStorage</div>;
};

export default getTempUnitFromLocalStorage;
