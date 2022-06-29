import React, { useState, createContext, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { darkMode } from "./available-themes/darkMode";
import { lightMode } from "./available-themes/lightMode";

const ThemesContext = createContext();

const ThemesProvider = ({ children }) => {
    const [theme, setTheme] = useState(darkMode);
    const [isLoadingTheme, setLoading] = useState(true);

    /**
    * Find the active theme.
    */
    const findThemeAsync = async () => {
        const themeMode = await AsyncStorage.getItem("themeMode");

        // If no theme is set, set it to the default theme: dark mode
        // (who uses light mode, pls put an end to that suffering)
        if (themeMode !== null) {
            themeMode === "default" ? setTheme(darkMode) : setTheme(lightMode);
            setLoading(false);
        }

        setLoading(false);
    }

    /**
    * Function to update the theme.
    */
    const updateTheme = (currentTheme) => {
        // See what theme needs to be the new
        const newTheme = currentTheme === "default" ? lightMode : darkMode;
        setTheme(newTheme);

        // Store the current theme in AsyncStorage for later reference
        AsyncStorage.setItem("themeMode", newTheme.themeMode);
    }

    useEffect(() => {
        findThemeAsync();
    }, []);

    return (
        <ThemesContext.Provider value={{ theme, isLoadingTheme, updateTheme }}>
            {children}
        </ThemesContext.Provider>
    );
}

export const useTheme = () => useContext(ThemesContext);

export default ThemesProvider;