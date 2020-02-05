import { url, headers } from "./constants";

export async function fetchClubs(){
    
    try {
        let club = await fetch(`${url}competitions/2014/teams`,{ headers: headers })    
        let clubList = await club.json()
        return clubList.teams
    } catch (error) {
        return []
    }
}

export async function fetchFixtures(teamId){
    
    try {

        let fixture = await fetch(`${url}teams/${teamId}/matches?dateFrom=2020-02-03&dateTo=2020-02-30`,{ headers: headers })    
        let fixtureList = await fixture.json()
        //console.warn(fixtureList.matches)
        return fixtureList.matches
    } catch (error) {
        console.warn(error.message)
        return []
    }
}