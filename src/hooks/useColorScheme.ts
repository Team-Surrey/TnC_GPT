"use client"
import React from "react";

function useColorScheme() {
  const [colorScheme, setColorScheme] = React.useState("light");
  function getTheme() {
    setColorScheme((prev) => {
      var theme = "light";

      if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
          var theme = "dark";
        }
      } else if (!window.matchMedia) {
        return theme;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {

        var theme = "dark";
      }

      if (theme == "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      }
      return theme;
    });
  }
  React.useEffect(() => {
    getTheme();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("theme", colorScheme);
    document.documentElement.setAttribute("data-theme", colorScheme);
  }, [colorScheme]);

  return [
    colorScheme,
    () => setColorScheme((prev) => (prev === "light" ? "dark" : "light")),
  ];
}

export default useColorScheme;
