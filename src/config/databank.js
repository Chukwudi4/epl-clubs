import { url, headers } from "./constants";

export async function fetchClubs(){
    
    try {
        let club = await fetch(`${url}competitions/2021/teams`,{ headers: headers })    
        let clubList = await club.json()
        return clubList.teams
    } catch (error) {
        return []
    }
}