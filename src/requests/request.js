import React, { Component } from "react";
import dayjs from 'dayjs';

export default class Request extends Component{
    
    constructor(props){
        super(props);
    }

    async getSchedule(){
        // let url = 'https://api.collegefootballdata.com/games?year=2020&seasonType=regular'
        // await fetch(url, {
        //     headers: new Headers({
        //         'Accept':'application/json',
        //         'Authorization':'Bearer Fx62JYFVPy2Ls805di9LVXaAnBsS79BiRAwLs4iabuEoy7sNy5ZzeyXzJlOj2F8Y'
        //     })
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
    }

    async componentDidMount(){
        await this.getSchedule()
    }

    render(){
        const data = require('./cfbSchedule.json')
        data.sort((a,b) => (a.start_date < b.start_date) ? 1 : -1)
        
        return(
            <div className='container-fluid w-75'>
                <div className='row row-cols-3'>
                    { data.map( game =>
                        <Scoreboard game={game}/>
                    )}
                </div>
            </div>
        );
    }

}

const Scoreboard = (game) => {
    game = game.game
    const records = require('./cfbRecords.json')
    const teamInfo = require('./cfbTeams.json')
    const rank = require('./cfbRankings.json')
    const lines = require('./cfbLines.json')
    const media = require('./cfbGamesMedia.json')

    function showChannel(media){
        return media.find(x => x.id === game.id).outlet
    }

    function showSpread(lines){
        return lines.find(x => x.id === game.id).lines[0].formattedSpread
    }

    function showOver(lines){
        return lines.find(x => x.id === game.id).lines[0].overUnder
    }

    function showRank(team){
        let teamRank = rank[0].polls[0].ranks.find(x => x.school === team)
        return (teamRank !== undefined ? '#' + teamRank.rank : '') 
    }

    function showDate(date){
        return dayjs(date).format('MMM/DD/YYYY  h:mm A')
    }

    function showRecord(team){
        let record = records.find(x => x.team === team).total
        return '(' + record.wins + '-' + record.losses + ')'
    }

    const awayBold = game.away_points > game.home_points ? 'font-weight-bold' : ''
    const homeBold = game.home_points > game.away_points ? 'font-weight-bold' : ''
    let awayTeam = teamInfo.find(x => x.school === game.away_team)
    const awayLogo = <img src={awayTeam.logos[0]} height='20px' width='20px' loading='eager' />
    let homeTeam = teamInfo.find(x => x.school === game.home_team)
    const homeLogo = <img src={homeTeam.logos[0]} height='20px' width='20px' loading='eager' />

    return(
        <div className='col'>
            <div className='card border-dark m-1'>
                <div className='card-header rounded-0'>
                {/* style={{ backgroundColor:awayTeam.color }} */}
                    { showDate(game.start_date) } <p className='float-right m-0 p-0'>{ showChannel(media) }</p>
                </div>
                <div className='card-body mt-2'>
                    <p className={awayBold}>{ showRecord(game.away_team) } {awayLogo} { showRank(game.away_team) } { game.away_team } &emsp; { game.away_points } </p>
                    <p className={homeBold}>{ showRecord(game.home_team) } {homeLogo} { showRank(game.home_team) } { game.home_team } &emsp; { game.home_points } </p>
                </div>
                <div className='card-footer rounded-0'>
                {/* style={{ backgroundColor:homeTeam.color }} */}
                    <p className='float-left m-0 p-0'>Over/Under: { showOver(lines) }</p>
                    <p className='float-right m-0 p-0'>{ showSpread(lines) }</p>      
                </div>
            </div>
        </div>
    );
}
