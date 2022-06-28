import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import { Koulen_400Regular } from '@expo-google-fonts/koulen';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator } from "react-native";

import { TabNavigation } from "./navigation/TabNavigation";
import ThemesProvider from './themes/themesProvider';

const db = SQLite.openDatabase('db.testDb')

export default function App() {
  /**
   * Create initial table if that doesn't exist yet.
   */
  const initDatabase = () => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT)')
    });
  }

  useEffect(() => {
    initDatabase();
  }, [])

  let [fontsLoaded, error] = useFonts({
    Ubuntu_500Medium,
    Koulen_400Regular
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#DC143C" />
  } else {
    return (
      <ThemesProvider>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </ThemesProvider>
    );
  }
}