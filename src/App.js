import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./helpers/ColorHelper";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";
const fillData = () => {
  if (!JSON.parse(window.localStorage.getItem("palettes"))[0]) {
    return seedColors;
  }
  return JSON.parse(window.localStorage.getItem("palettes"));
};
function App() {
  const [palettes, setPalettes] = useState([]);

  const findPalette = (id) => {
    return palettes.find((palette) => {
      return palette.id === id;
    });
  };
  useEffect(() => {
    setPalettes(fillData);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  const savePalette = (newPalette) => {
    setPalettes((prev) => [...prev, newPalette]);
  };

  const deletePalette = (id) => {
    setPalettes((prev) => prev.filter((palette) => palette.id !== id));
  };

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={() => (
          <NewPaletteForm palettes={palettes} savePalette={savePalette} />
        )}
      />
      <Route
        exact
        path="/"
        render={() => (
          <PaletteList palettes={palettes} deletePalette={deletePalette} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={(routeProps) => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />

      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
}

export default React.memo(App);
