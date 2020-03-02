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
        let y = new Date().getFullYear()
        let month = new Date().getUTCMonth() + 1
        let m = month > 9 ? `${month}` : `0${month}`
        console.warn(y)
        let daysInMonth = new Date(y, month, 0).getDate()
        let fixture = await fetch(`${url}teams/${teamId}/matches?dateFrom=${y}-${m}-01&dateTo=${y}-${m}-${daysInMonth}`,{ headers: headers })    
        let fixtureList = await fixture.json()
        //console.warn(fixtureList.matches)
        return fixtureList.matches
    } catch (error) {
        console.warn(error.message)
        return []
    }
}