import {Notifications} from 'expo'
import * as Perm from 'expo-permissions'
import { reminderChannelId } from './constants'
import { Alert } from 'react-native'

async function getPerm(){
    let {status} = await Perm.getAsync(Perm.NOTIFICATIONS)

    if(status!="granted"){
        var askSync = await Perm.askAsync(Perm.NOTIFICATIONS)    
        return askSync.status =="granted"
    }

    return status == "granted"
}

async function reminderChannel(){
    await Notifications.createChannelAndroidAsync(
        reminderChannelId,
        {
            name: "Reminder Notification",
            sound: true,
            description: "This is the channel to remind you of the matches you saved",
            badge: false
        }
    )
}

export async function sendNotif(time, match){
    try {
        let perm = await getPerm()
        let date = new Date(time).getTime()
    if(perm){
        reminderChannel()
        let notifId = await Notifications.scheduleLocalNotificationAsync(
            {
                title: "This match starts in 30 minutes",
                body: `${match} is about to start`,
                android:{
                    channelId: reminderChannelId,
                    color: '#1d2951'
                }
            },
            {
                time: date
            }
        )

        let notifNow = await Notifications.scheduleLocalNotificationAsync(
            {
                title: "You'll be reminded about this match",
                body: `${match}`,
                android:{
                    channelId: reminderChannelId,
                    color: '#1d2951'
                }
            },
            {
                time: new Date().getTime()
            }
        )

        return notifId
    }
    } catch (error) {
        alert(error.message)
        return 0        
    }
    

    return 0
}