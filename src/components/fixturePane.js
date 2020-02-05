import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import moment from 'moment'
import {widthPercentageToDP as w} from 'react-native-responsive-screen'

export function FixturePane(props) {
    console.warn("entered")
    let {item, theme} = props
    let date = new Date(item.utcDate)
    let mom = moment(date) 
    return(
        <View style={styles.itemView} >
<Text style={[styles.time, {color: theme}]} >{mom.hour}:{mom.minutes} {mom.date}</Text>
            <View style={styles.fixturePane} >
                <Text style={[styles.fixtureText, {color: theme}]} >{item.homeTeam.name}</Text>
                <Text>vs</Text>
                <Text style={[styles.fixtureText, {color: theme}]} >{item.awayTeam.name}</Text>
            </View>    
            <Text style={[styles.reminder, {color: theme}]} onPress={()=> alert(`${item.homeTeam.name}`)}>REMIND ME</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    fixtureText:{
        fontSize: w(4),
        textAlign: "center",
        color: "#fff",
        width: w(40),
        marginHorizontal: w(2)
    },
    fixturePane:{
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    reminder:{
        fontSize: w(3),
        position: 'absolute',
        bottom: w(2),
        right: w(2),
    },
})