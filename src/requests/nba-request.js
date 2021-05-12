import React, { Component } from "react";
import dayjs from 'dayjs';
import Card from "../components/Card";

const seasonYear = new Date().getFullYear() - 1;
const currentDay = dayjs().format('YYYY-MM-DD');
// const seasonYear = 2019;
const standingUrl = `https://api-nba-v1.p.rapidapi.com/standings/standard/${seasonYear}`;
const gamesUrl = `https://api-nba-v1.p.rapidapi.com/games/date/${currentDay}`;

export default class NbaRequest extends Component{

    constructor(props){
        super(props);
        this.state = {
            teams: "",
            isLoaded: false,
            standings: [],
            games: [],
        }
    }

    async getGames(){
        await fetch(gamesUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "7b0347931fmshd041067ab6852c4p16223fjsne634a8cfd5a7",
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                games: data.api.games,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    /**  Fetches and returns Object containg the current NBA Standings, find a team by teamID 
     * @returns NBA Standings
    */
    async getStandings(){
        await fetch(standingUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "7b0347931fmshd041067ab6852c4p16223fjsne634a8cfd5a7",
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                standings: data.api.standings,
            })
        })
        .catch(err => {
            console.log(err)
        });
        //  league, teamID, win, loss, gamesBehind, lastTenWin, lastTenLoss, streak, seasonYear 
        //  {conference: name, rank, win, loss};{division: name, rank, win, loss, gamesBehind} 
        //  winPercentage, lossPercentage, home-win/loss, away-win/loss, winStreak, tieBreakerPoints
    }

    // Fetches Object containing data about all NBA teams and stores it in the state
    async componentDidMount(){
        fetch("https://api-nba-v1.p.rapidapi.com/teams/league/standard", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "7b0347931fmshd041067ab6852c4p16223fjsne634a8cfd5a7",
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
        }})
        .then(res => res.json())
        .then(data => {
            this.setState({
                isLoaded: true,
                teams: data.api.teams,
            })
        })
        .catch(err => {
            console.log(err)
        });

        await this.getStandings();
        await this.getGames();
        // city, fullName, teamID, nickname, logo, shortName {leagues:{standard:confName, divName}}
    }

    /** Returns true if a team is a NBA franchise
     * @param team An NBA team object
     * @returns True if NBA team False if is not
     */
	isNbaTeam(team){
		if(team.nbaFranchise == 1){
			return true;
		}
        return false;
	}

    render(){
        const { isLoaded, teams, standings, games } = this.state;
        // tests the object being fetched
        console.log(games)

		if(!isLoaded){
			return(null);
		} else{
			return(
				<div className="container-fluid">
                    <h2 className="text-center">Today {new Date().toLocaleDateString()}</h2>
					<ul className="row row-cols-4 list-unstyled mt-3">
					{ teams.map(team =>(this.isNbaTeam(team) && team.teamId != 37 &&
						<li key={team.teamId} >
                            { standings.map(rank =>(team.teamId == rank.teamId &&
						<Card team={team.teamId}  fullName={team.fullName} shortName={team.shortName} logo={team.logo} nickname={team.nickname} 
                        conference={team.leagues.standard.confName} division={team.leagues.standard.divName} win={rank.win} loss={rank.loss} rank={rank.conference.rank}
                        games={games}/>
                        )) }
						<span></span>
						</li>
					))}
					</ul>
				</div>

			);
		}
    }
}