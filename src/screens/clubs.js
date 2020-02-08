import React, { useState, useEffect } from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {widthPercentageToDP as w} from 'react-native-responsive-screen'
import { fetchClubs } from '../config/databank'
import { colors } from '../config/constants'
import { useNavigation } from 'react-navigation-hooks'
import { TextInput } from 'react-native'
export function Clubs(props) {

    const [clubList, setClubList] = useState([])
    const [result, updateResult]  = useState([])
    const [term, updateTerm] = useState('')
    const {navigate} = useNavigation()
    let a = 1
 
    async function getClubList(){
        let clubList = await fetchClubs(props.compId)
        setClubList(clubList)
    }

    useEffect(()=>{
        getClubList()
    }, [a])

    function search() {
        if(term.length > 1) {
            let newResult = clubList.filter((club)=>{
                //console.warn(club.name)
                return club.name.indexOf(term) != -1
            })

            updateResult(newResult)
        }
    }

    return (
    <View style={styles.view} >
        <TextInput 
            style={styles.input} 
            placeholder="Search Clubs" 
            numberOfLines={10}
            onChangeText={text=> {
                updateTerm(text)
                search()
            }}
            placeholderTextColor="#fff" />
        {
            term.length>3?
            <FlatList 
            data={result}
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
            :
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
        />}
    </View>
    )
}

export function EPL(){
    return(
        <Clubs compId="2021" />
    )
}

export function LaLiga(){
    return(
        <Clubs compId="2014" />
    )
}

export function Bundesliga(){
    return(
        <Clubs compId="2002" />
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
    },
    input: {
        width: w(100),
        height: w(10),
        fontSize: w(4.5),
        backgroundColor: colors[0],
        color: "#fff",
        paddingHorizontal: w(2)
    }
})