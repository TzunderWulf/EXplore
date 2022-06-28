import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';

import { TabNavigation } from "./navigation/TabNavigation";

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

  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}