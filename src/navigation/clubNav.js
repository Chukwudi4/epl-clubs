import {createStackNavigator} from 'react-navigation-stack'
import { Clubs } from '../screens/clubs'
import { ClubDetail } from '../screens/clubDetail'

export const ClubStack = createStackNavigator({
    Clubs: {
        screen: Clubs
    },
    ClubDetail: {
        screen: ClubDetail
    }
},{
    headerMode: "none"
})