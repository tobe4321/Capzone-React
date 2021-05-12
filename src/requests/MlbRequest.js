import dayjs from 'dayjs';
import React, { Component } from 'react';
import GameData from './GameData';
import MlbButtonGroup from './MlbButtonGroup';

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var day = new Date();
const url = 'http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1';

export default class MlbRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            todayGames: [],
            isLoaded: false,
            mlbTeams: {},
        }
    }

    changeDay(direction,date){
        if(direction=='left'){
            date.setDate(date.getDate() - 1);
            date = dayjs(date).format('YYYY-MM-DD');
            let lUrl = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${date}&endDate=${date}`
            this.getGames(lUrl);
            //console.log(date);
        } else if(direction=='right'){
            date.setDate(date.getDate() + 1);
            date = dayjs(date).format('YYYY-MM-DD');
            let lUrl = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${date}&endDate=${date}`
            this.getGames(lUrl);
            //console.log(date);
        } else{
            console.log('error');
        }
    }

    async componentDidMount(){
        await this.getGames(url);
        // await this.getTeams(tUrl);
    }

    async getGames(link){
        await fetch(link)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    todayGames: data.dates[0].games,
                    isLoaded: true,
                })
            })
    }

    async getTeams(link){
        await fetch(link)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    mlbTeams: data.teams
                })
            })
    }

    showPrevDate = (date) => {
        const prev = new Date(date);
        prev.setDate(prev.getDate() - 1);
        return dayjs(prev).format('MMMM DD');
    }

    resetDate = () => {
        const today = new Date();
        day = today;
    }

    showNextDate = (date) => {
        const next = new Date(date);
        next.setDate(next.getDate()+1);
        return dayjs(next).format('MMMM DD');
    }

    render(){
        const { todayGames, isLoaded } = this.state;
        console.log(todayGames)
        todayGames.sort((a, b) => (a.gameDate > b.gameDate) ? 1 : -1)

        if(!isLoaded){
            return null;
        } else{
            return(
                <div>
                    <div className="container-fluid w-75 overflow-auto">
                        <div className="row ml-3 text-center mt-3 text-white mb-3 container-fluid">
                            <div className="col">
                                <button className="btn btn-secondary btn-sm" onClick={ () => this.changeDay('left', day) }>{ this.showPrevDate(day) }</button>
                            </div>
                            <span className="col" onClick={ () => {this.getGames(url); this.resetDate();} }>
                                { day.toLocaleString('en-US', options) }
                            </span>
                            <div className="col">
                                <button className="btn btn-secondary btn-sm" onClick={ () => this.changeDay('right', day) }>{ this.showNextDate(day) }</button>
                            </div>
                        </div>
                        <div className="row row-cols-2 mb-5 pb-5">
                            { todayGames.map(game => {
                                    return <Scoreboard key={game.gamePk} away={game.teams.away} home={game.teams.home} 
                                    status={game.status.abstractGameState} time={game.gameDate} detail={game.status.detailedState} id={game.gamePk} />})}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const Scoreboard = (props) => {
    const logos = loadLogos();

    function teamLost(team){
        console.log(team.isWinner);
        console.log(team.team.name)
        if(!team.isWinner && team.team.id == 147){
            return(
                <div className="alert alert-danger" role="alert">
                    The {team.team.name} actually won and this is just an alternate universe
                </div>
            );
        }
    }

    function showTime(time){
        return dayjs(time).format('h:mm A');
    }

    return(
            <div>
                <div className="container-fluid bg-dark text-white">
                    <span>
                        <span>
                        <a style={{ textDecoration: 'none', color: 'white' }}>
                            <div className="card-body border-bottom border-light">
                                <div className="row m-auto">
                                    <div className="col-5 text-nowrap">
                                        <span> <img
                                                src={logos.get(props.away.team.id).logo}
                                                alt={props.away.team.name} height="24px" width="24px" /> </span>
                                        { props.away.isWinner ? <b>{props.away.team.name}</b> : props.away.team.name }
                                    </div>
                                    <div className="col-3 text-nowrap">
                                        { props.detail == 'Postponed' || props.status == 'Preview' ? null : props.away.score }
                                    </div>
                                    <div className="col-4 text-right">
                                        { props.detail === 'In Progress' ? <GameData game={props.id} /> : props.detail }
                                    </div>
                                </div>
                                <div className="row m-auto">
                                    <div className="col-5 text-nowrap">
                                        <span> 
                                        <img src={logos.get(props.home.team.id).logo}
                                                alt={props.home.team.name} height="24px" width="24px" /> </span>
                                       <span> { props.home.isWinner ? <b>{props.home.team.name}</b> : props.home.team.name } </span>
                                    </div>
                                    <div className="col-3">
                                        { props.detail == 'Postponed' || props.status == 'Preview' ? null : props.home.score }
                                    </div>
                                    <div className="col-4 text-right">
                                        { props.status == 'Preview' ? showTime(props.time) :  
                                        <MlbButtonGroup status={props.status} awayTeamName={props.away.team.name} homeTeamName={props.home.team.name} id={props.id} />
                                        }
                                    </div>
                                </div>
                            </div>
                            </a>
                        </span>
                    </span>
                </div>
            </div>
        );
}

function loadLogos(){
    let logos = new Map()

    logos.set(110, {logo: 'https://assets-sports.thescore.com/baseball/team/1/w72xh72_logo@2x.png'})
    logos.set(111, {logo: 'https://assets-sports.thescore.com/baseball/team/2/w72xh72_logo@2x.png'})
    logos.set(147, {logo: 'https://assets-sports.thescore.com/baseball/team/3/w72xh72_logo@2x.png'})
    logos.set(141, {logo: 'https://assets-sports.thescore.com/baseball/team/4/w72xh72_logo@2x.png'})
    logos.set(139, {logo: 'https://assets-sports.thescore.com/baseball/team/5/w72xh72_logo@2x.png'})

    logos.set(145, {logo: 'https://assets-sports.thescore.com/baseball/team/6/w72xh72_logo@2x.png'})
    logos.set(114, {logo: 'https://assets-sports.thescore.com/baseball/team/7/w72xh72_logo@2x.png'})
    logos.set(116, {logo: 'https://assets-sports.thescore.com/baseball/team/8/w72xh72_logo@2x.png'})
    logos.set(118, {logo: 'https://assets-sports.thescore.com/baseball/team/9/w72xh72_logo@2x.png'})
    logos.set(142, {logo: 'https://assets-sports.thescore.com/baseball/team/10/w72xh72_logo@2x.png'})

    logos.set(108, {logo: 'https://assets-sports.thescore.com/baseball/team/11/w72xh72_logo@2x.png'})
    logos.set(133, {logo: 'https://assets-sports.thescore.com/baseball/team/12/w72xh72_logo@2x.png'})
    logos.set(136, {logo: 'https://assets-sports.thescore.com/baseball/team/13/w72xh72_logo@2x.png'})
    logos.set(140, {logo: 'https://assets-sports.thescore.com/baseball/team/14/w72xh72_logo@2x.png'})
    logos.set(144, {logo: 'https://assets-sports.thescore.com/baseball/team/15/w72xh72_logo@2x.png'})

    logos.set(120, {logo: 'https://assets-sports.thescore.com/baseball/team/16/w72xh72_logo@2x.png'})
    logos.set(121, {logo: 'https://assets-sports.thescore.com/baseball/team/17/w72xh72_logo@2x.png'})
    logos.set(143, {logo: 'https://assets-sports.thescore.com/baseball/team/18/w72xh72_logo@2x.png'})
    logos.set(146, {logo: 'https://assets-sports.thescore.com/baseball/team/19/w72xh72_logo@2x.png'})
    logos.set(158, {logo: 'https://assets-sports.thescore.com/baseball/team/20/w72xh72_logo@2x.png'})

    logos.set(112, {logo: 'https://assets-sports.thescore.com/baseball/team/21/w72xh72_logo@2x.png'})
    logos.set(113, {logo: 'https://assets-sports.thescore.com/baseball/team/22/w72xh72_logo@2x.png'})
    logos.set(117, {logo: 'https://assets-sports.thescore.com/baseball/team/23/w72xh72_logo@2x.png'})
    logos.set(134, {logo: 'https://assets-sports.thescore.com/baseball/team/24/w72xh72_logo@2x.png'})
    logos.set(138, {logo: 'https://assets-sports.thescore.com/baseball/team/25/w72xh72_logo@2x.png'})

    logos.set(119, {logo: 'https://assets-sports.thescore.com/baseball/team/26/w72xh72_logo@2x.png'})
    logos.set(135, {logo: 'https://assets-sports.thescore.com/baseball/team/27/w72xh72_logo@2x.png'})
    logos.set(137, {logo: 'https://assets-sports.thescore.com/baseball/team/28/w72xh72_logo@2x.png'})
    logos.set(115, {logo: 'https://assets-sports.thescore.com/baseball/team/29/w72xh72_logo@2x.png'})
    logos.set(109, {logo: 'https://assets-sports.thescore.com/baseball/team/30/w72xh72_logo@2x.png'})

    return logos;
}