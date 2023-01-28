import { React, useEffect, useState } from "react";
import './HomePage.scss';
import {TeamTile} from "../components/TeamTile";

export const HomePage = () => {

    const[teams,setTeams] = useState([]);
    useEffect(
        () => {
            //To understand async and await keyword https://www.youtube.com/watch?v=li7FzDHYZpc
            const fetchAllTeams=  async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`);
                const data = await response.json() //fetches team data and 4 latest matches
                setTeams(data)

            };
            fetchAllTeams();


        },[]
    )

    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className = "app-name">IPL DASHBOARD</h1>
            </div>
            <div className="team-grid">
                { teams.map(team => <TeamTile key = {team.id} teamName={team.teamName}/>)}
            </div>
        </div>
            );
}
