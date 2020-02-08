import React, { useState, useEffect } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {widthPercentageToDP as w} from 'react-native-responsive-screen'
import { useNavigationParam } from 'react-navigation-hooks';
import { fetchFixtures } from '../config/databank';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FixturePane } from '../components/fixturePane';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { sendNotif } from '../config/notif';

let a = 5
export function ClubDetail() {

    const detailsString = useNavigationParam('clubDetails')
    const details = JSON.parse(detailsString)
    const theme = useNavigationParam('color')
    const [fixtures, setFixtures] = useState([])

    async function getFixtures() {
        let newFixtures = await fetchFixtures(details.id)
        //console.warn(details)
        setFixtures(newFixtures)
    }

    useEffect(()=> {
        getFixtures()
    }, [a])

    return(
        
            <LinearGradient style={styles.linGradient} colors={[theme,theme, theme]} >
                {/* <ImageBackground 
                    resizeMode="contain" 
                    style={styles.imgBackground} 
                    source={{uri:'https://cnet3.cbsistatic.com/img/BVKdjSoub2ddhRxqDC5KNu8_4FM=/1600x610/filters:blur(6)/2019/09/16/003d15f2-1f6b-4f88-9861-e9c83779c18f/apple-iphone-11-8.jpg'}} >    
                </ImageBackground> */}
                <Text style={[styles.fixtureText, styles.header, {width: null}]} >{details.shortName} Fixtures</Text>
                <FlatList
                    data={fixtures}
                    keyExtractor={item=> `${item.id}`}
                    renderItem={({item,index})=>
                            <FixtureBox item={item} theme={theme} />
                                               
                    }
                />
            </LinearGradient>
    )
}

function FixtureBox(props) {
    
    let {item, theme} = props
    let date = new Date(item.utcDate)
    let mom = moment(date)
    let match = `${item.homeTeam.name} vs ${item.awayTeam.name}`
    return(
        <View style={styles.itemView} >
<Text style={[styles.time, {color: theme}]} >{mom.format("dddd, Do MMMM, h:mm a")}</Text>
    <Text style={[styles.time, {color: theme}, styles.competitionName]} >{item.competition.name}</Text>
            <View style={styles.fixturePane} >
                <Text style={[styles.fixtureText, {color: theme}]} >{item.homeTeam.name}</Text>
                <Text>vs</Text>
                <Text style={[styles.fixtureText, {color: theme}]} >{item.awayTeam.name}</Text>
            </View>    
            
            <Icon containerStyle={styles.reminder} onPress={()=> sendNotif(date, match)} type="font-awesome" name= "bell-o" color={theme} />
        </View>
    )
}

const styles = StyleSheet.create({
    imgBackground: {
        flex:1,
        opacity:0.3

    },
    linGradient: {
        flex: 1,
        marginTop: w(10)
    },
    itemView:{
        width: w(100),
        justifyContent:"space-around",
        alignItems: "center",
        paddingHorizontal: w(4),
        paddingVertical: w(8),
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginVertical: w(3)
    },
    fixtureText:{
        fontSize: w(4),
        textAlign: "center",
        color: "#fff",
        width: w(40),
        marginHorizontal: w(2),
        marginVertical: w(3)
    },
    fixturePane:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'baseline'
    },
    header:{
        fontSize: w(5.8)
    },
    reminder:{
        fontSize: w(3),
        position: 'absolute',
        bottom: w(2),
        right: w(2),
    },
    time: {
        fontSize: w(3.5),
        textAlign: 'left',
        alignSelf: 'flex-start',
        position: 'absolute',
        bottom: w(2),
        left: w(2)
    },
    competitionName: {
        right: w(1),
        //width: w(30),
        left: null,
        bottom: null,
        top: w(2),
        marginRight: w(2)
    }
})