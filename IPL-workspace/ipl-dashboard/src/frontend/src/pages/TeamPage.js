import { React, useEffect, useState } from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";
import { useParams } from 'react-router-dom';

export const TeamPage = () => {

    const [team, setTeam] = useState({matches:[]});
    const { teamName } = useParams(); //uses all Path Parameters and assigns to the variable

    //useEffect is a function(side effects) that runs when the component is loaded
    // since we cannot directly use async with useEffect we are defining and calling another async function(fetchMatches) inside it
    useEffect(
        () => {
            //To understand async and await keyword https://www.youtube.com/watch?v=li7FzDHYZpc
            const fetchMatches= async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json() //fetches team data and 4 latest matches
                setTeam(data)

            };
            fetchMatches();


        },[teamName]
    )
    if(!team || !team.teamName){
        return <h1>Team not found</h1>
    }
    return (
        <div className="TeamPage">
            <h1>{team.teamName}</h1>
            {/*bigger tile has the first latest match*/}
            <MatchDetailCard teamName = {team.teamName} match = {team.matches[0]}/>
            {/*small tiles have the other 3 matchs*/}
            {team.matches.slice(1).map(match => <MatchSmallCard teamName = {team.teamName} match = {match}/>)}
        </div>
    );
}
