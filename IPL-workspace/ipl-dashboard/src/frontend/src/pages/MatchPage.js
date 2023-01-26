import { React, useEffect, useState } from "react";
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";
import './MatchPage.scss';
import { useParams } from 'react-router-dom';
import {YearSelector} from "../components/YearSelector";

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


        },[teamName, year]
    )

    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {matches.map(match => <MatchDetailCard teamName = {teamName} match = {match}/>)}
            </div>
            </div>
    );
}
