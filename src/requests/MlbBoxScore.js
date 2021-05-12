import React, { Component } from 'react';
import BoxScoreBatters from './BoxScoreBatters';
import BoxScorePitchers from './BoxScorePitchers';
import MlbBoxScoreBox from './MlbBoxScoreBox';

export default class MlbBoxScore extends Component{

    constructor(props){
        super(props)
        this.state = {
            gameData:{},
            lineScore:{},
            homeGameData:{},
            awayGameData:{},
            isLoaded:false
        }
    }

    async componentDidMount(){
        this.getGame(this.props.gameID)
    }

    async getGame(gameID){
        const url = `http://statsapi.mlb.com/api/v1.1/game/${gameID}/feed/live`
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    lineScore: data.liveData.linescore,
                    gameData: data.gameData,
                    homeGameData: data.liveData.boxscore.teams.home,
                    awayGameData: data.liveData.boxscore.teams.away
                })
            })
    }

    render(){
        const { homeGameData, awayGameData, lineScore, isLoaded, gameData } = this.state
        if(!isLoaded){
            return null
        } else{
            return(
                <>
                    <div className='row row-cols-2' style={{ fontSize:'12px' }}>
                        <BoxScoreBatters players={homeGameData.players} shortName={gameData.teams.home.shortName} />
                        <BoxScoreBatters players={awayGameData.players} shortName={gameData.teams.away.shortName} />
                        <BoxScorePitchers players={homeGameData.players} shortName={gameData.teams.home.shortName} />
                        <BoxScorePitchers players={awayGameData.players} shortName={gameData.teams.away.shortName} />
                    </div>
                    <div className='row mt-3'>
                        <MlbBoxScoreBox gameStatus={gameData.status.abstractGameState} currentInning={lineScore.currentInningOrdinal} awayTeamName={gameData.teams.away.teamName} homeTeamName={gameData.teams.home.teamName} innings={lineScore.innings} homeTeam={homeGameData.teamStats} awayTeam={awayGameData.teamStats} awayTeamID={gameData.teams.away.id} homeTeamID={gameData.teams.home.id} />
                    </div>
                </>
            )
        }
    }
}