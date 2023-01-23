import { React, useEffect, useState } from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";
import { useParams } from 'react-router-dom';

export const MatchPage = () => {

    const[matches,setMatches] = useState([]);
    const { teamName, year } = useParams();
    useEffect(
        () => {
            //To understand async and await keyword https://www.youtube.com/watch?v=li7FzDHYZpc
            const fetchMatches= async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json() //fetches team data and 4 latest matches
                setMatches(data)

            };
            fetchMatches();


        },[]
    )

    return (
        <div className="MatchPage">
            <h1>Match Page</h1>
            {matches.map(match => <MatchDetailCard teamName = {teamName} match = {match}/>)}
            </div>
    );
}
