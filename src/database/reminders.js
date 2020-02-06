import * as dbGuy from 'expo-sqlite'
import { dbName } from '../config/constants'

function getDb() {
    let db = dbGuy.openDatabase(dbName)
    return db;    
}

function createTable(){
    let db = getDb()
    db.transaction(tx=> {
        tx.executeSql(
            'create table if not exists reminders (matchId integer primary key not null, notifId int);'
        )
    })
    return db
}

function addReminder(id, notifId){
    let db = createTable()

    db.transaction(tx => {
        tx.executeSql("insert into reminders (id, notifId) values (?, ?)", [id, notifId]);
        tx.executeSql("select * from reminders", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
    })
}