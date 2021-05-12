import dayjs from 'dayjs';
import React, { Component } from 'react';
import loadLogos from '../components/nhl/NhlLogos'

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var day = new Date();
const url = 'https://statsapi.web.nhl.com/api/v1/schedule';

export default class NhlRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            todayGames: [],
            isLoaded: false,
        }
    }

    changeDay(direction,date){
        if(direction=='left'){
            date.setDate(date.getDate() - 1);
            date = dayjs(date).format('YYYY-MM-DD');
            let lUrl = `https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`
            this.getGames(lUrl);
            //console.log(date);
        } else if(direction=='right'){
            date.setDate(date.getDate() + 1);
            date = dayjs(date).format('YYYY-MM-DD');
            let lUrl = `https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`
            this.getGames(lUrl);
            //console.log(date);
        } else{
            console.log('error');
        }
    }

    async componentDidMount(){
        await this.getGames(url);
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
        todayGames.sort((a, b) => (a.gameDate > b.gameDate) ? 1 : -1)
        console.log(todayGames)

        if(!isLoaded){
            return null;
        } else{
            return(
                <div>
                    <div className="container-fluid w-75">
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
                                    status={game.status.abstractGameState} time={game.gameDate} detail={game.status.detailedState}/>})}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const Scoreboard = (props) => {
    const logos = new loadLogos();

    var streamTeam = props.home.team.name.replace(/\./g,'');
    streamTeam = streamTeam.replace(/\s+/g, '-').toLowerCase();
    const streamUrl = `http://playoffsstream.com/nhl/${streamTeam}-live-stream`;

    function showTime(time){
        return dayjs(time).format('h:mm A');
    }

    return(
        <div>
            <div className="container-fluid m-1 bg-dark text-white">
                <span>
                    <span>
                        <a href={props.status !=='Live' ? 'javascript:void(0)' : streamUrl} target={props.status
                            !=='Live' ? '' : "_blank" } style={{ textDecoration: 'none', color: 'white' }}>
                            <div className="card-body border-bottom border-light">
                                <div className="row">
                                    <div className="col-5 text-nowrap">
                                        <span> <img src={logos.get(props.away.team.id).logo}
                                                alt={props.away.team.name} height="24px" width="24px" /> </span>
                                        { props.away.isWinner ? <b>{props.away.team.name}</b> :
                                        props.away.team.name }
                                    </div>
                                    <div className="col-3 text-nowrap">
                                        {props.away.score}
                                    </div>
                                    <div className="col-4 text-right">
                                        { props.detail }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-5 text-nowrap">
                                        <span>
                                            <img src={logos.get(props.home.team.id).logo}
                                                alt={props.home.team.name} height="24px" width="24px" /> </span>
                                        <span> { props.home.isWinner ? <b>{props.home.team.name}</b> :
                                            props.home.team.name } </span>
                                    </div>
                                    <div className="col-3">
                                        {props.home.score}
                                    </div>
                                    <div className="col-4 text-right">
                                        { props.status == 'Preview' && props.detail !== 'Postponed' ? showTime(props.time) : null }
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