import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import FavoriteCity from "../FavoriteCity/FavoriteCity";
import SearchLocation from "../SearchLocation/SearchLocation";
import "./Menu.css";

const Menu = () => {
  const { existingFavorites, setExistingFavorites } = useContext(AppContext);
  // const [existingFavorites, setExistingFavorites] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setExistingFavorites(
      JSON.parse(window.localStorage.getItem("Favorite")) ?? []
    );
  }, []);

  return (
    <>
      <div className={`Menu${isMenuOpen ? " Open" : ""}`}>
        <button onClick={handleMenu} className="MenuButtonInner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            >
              <path d="M5 5L19 5">
                <animate
                  fill="freeze"
                  attributeName="d"
                  begin="0.2s"
                  dur="0.4s"
                  values="M5 5L19 5;M5 5L19 19"
                />
              </path>
              <path d="M5 12H19">
                <animate
                  fill="freeze"
                  attributeName="d"
                  dur="0.4s"
                  values="M5 12H19;M12 12H12"
                />
                <set attributeName="opacity" begin="0.4s" to="0" />
              </path>
              <path d="M5 19L19 19">
                <animate
                  fill="freeze"
                  attributeName="d"
                  begin="0.2s"
                  dur="0.4s"
                  values="M5 19L19 19;M5 19L19 5"
                />
              </path>
            </g>
          </svg>
        </button>
        <div className="DefaultLocation Spacing">
          <h2>Favorite location</h2>
          <div className="MenuItemFavorite">
            {/* <TempUnitSelector /> */}
            {existingFavorites &&
              existingFavorites
                .filter((favorite) => favorite.mainLocation)
                .map((favorite) => (
                  <FavoriteCity
                    key="mainLocation"
                    className="MenuItem"
                    setIsMenuOpen={setIsMenuOpen}
                    {...favorite}
                  />
                ))}
          </div>
          <div className="MenuSeparator"></div>
        </div>
        <div className="FavoriteLocations Spacing">
          {existingFavorites &&
            existingFavorites
              .filter((favorite) => !favorite.mainLocation)
              .map((favorite, index) => {
                return (
                  <FavoriteCity
                    key={index}
                    className="MenuItem"
                    setIsMenuOpen={setIsMenuOpen}
                    {...favorite}
                  />
                );
              })}
        </div>
      </div>
      <div className="MenuBar">
        <button onClick={handleMenu} className="MenuButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            />
          </svg>
        </button>
        <SearchLocation />
      </div>
    </>
  );
};

export default Menu;
