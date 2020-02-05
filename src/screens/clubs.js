import React, { useState, useEffect } from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {widthPercentageToDP as w} from 'react-native-responsive-screen'
import { fetchClubs } from '../config/databank'
import { colors } from '../config/constants'
import { useNavigation } from 'react-navigation-hooks'
export function Clubs() {

    const [clubList, setClubList] = useState([])
    const {navigate} = useNavigation()
    let a = 1
 
    async function getClubList(){
        let clubList = await fetchClubs()
        setClubList(clubList)
    }

    useEffect(()=>{
        getClubList()
    }, [a])

    return (
    <View style={styles.view} >
        <FlatList 
            data={clubList}
            keyExtractor={item=> item.name}
            renderItem={({item, index})=> 
                <TouchableOpacity 
                    activeOpacity={0.9} 
                    style={[styles.flatItem, {backgroundColor: colors[index% colors.length]}]}
                    onPress={()=> navigate('ClubDetail', {color:colors[index% colors.length], clubDetails: JSON.stringify(item)})}
                    >
                    <Text style={styles.clubName} >{item.name}</Text>
                </TouchableOpacity>
            }
        />
    </View>
    )
}

const styles = StyleSheet.create({
    flatItem: {
        width: w(100),
        height: w(40),
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems:"center"
    },
    clubName: {
        fontSize: w(8),
        color: 'white',
        textAlign:'center'
    },
    view:{
        flex: 1,
        paddingTop: w(10)
    }
})