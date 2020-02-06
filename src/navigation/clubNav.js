import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import Consts from 'expo-constants'
import { Bundesliga, EPL, LaLiga } from '../screens/clubs'
import { ClubDetail } from '../screens/clubDetail'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'

const ClubTab = createMaterialTopTabNavigator()

function OurTabs() {
    return(
        <NavigationContainer>
        <ClubTab.Navigator
            tabBarOptions={{
                tabStyle:{
                    marginTop: Consts.statusBarHeight
                }
            }}
            screenOptions={({ route }) =>({
                
            })}
        >
            <ClubTab.Screen name = "Epl" component={EPL} />
            <ClubTab.Screen name="La Liga" component={LaLiga}/>
            <ClubTab.Screen name="Bundesliga" component={Bundesliga}/>
        </ClubTab.Navigator>
        </NavigationContainer>
    )
}

export const ClubStack = createStackNavigator({
    Clubs: {
        screen: OurTabs
    },
    ClubDetail: {
        screen: ClubDetail
    }
},{
    headerMode: "none"
})