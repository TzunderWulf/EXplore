import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.testDb')

const DatabaseProvider = () => {

    /**
    * When app starts up creates database with one table items.
    */
    const initDatabase = () => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT)')
        });
        console.log(`Database created!`)
    }

    const getItems = () => {

    }

    const addItem = () => {

    }

    const editItem = () => {

    }

    const deleteItem = () => {

    }

    const deleteItems = () => {

    }

}