import { url, headers } from "./constants";

export async function fetchClubs(compId){
    
    try {
        let club = await fetch(`${url}competitions/${compId}/teams`,{ headers: headers })    
        let clubList = await club.json()
        return clubList.teams
    } catch (error) {
        return []
    }
}

export async function fetchFixtures(teamId){
    
    try {
        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let daysInMonth = new Date(year, month, 0).getDate()
        let fixture = await fetch(`${url}teams/${teamId}/matches?dateFrom=2020-02-01&dateTo=2020-02-${daysInMonth}`,{ headers: headers })    
        let fixtureList = await fixture.json()
        //console.warn(fixtureList.matches)
        return fixtureList.matches
    } catch (error) {
        console.warn(error.message)
        return []
    }
}