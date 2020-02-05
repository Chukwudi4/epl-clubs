import {Notifications} from 'expo'
import * as Perm from 'expo-permissions'
import { reminderChannelId } from './constants'

async function getPerm(){
    let {status} = await Perm.getAsync(Perm.NOTIFICATIONS)

    if(status!="granted"){
        var askSync = await Perm.askAsync(Perm.NOTIFICATIONS)    
        
    }

    return askSync.status == "granted"
}

function reminderChannel(){
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
    let perm = await getPerm()
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
                time: time
            }
        )

        return notifId
    }

    return 0
}