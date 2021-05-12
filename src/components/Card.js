import dayjs from "dayjs";
import React from "react";

let colors = new Map()
colors.set('Hawks', {color: "#E03A3E"})
colors.set('Celtics', {color: "#007A33"})
colors.set('Nets', {color: "#000000"})
colors.set('Hornets', {color: "#00788C"})
colors.set('Bulls', {color: "#CE1141"})
colors.set('Cavaliers', {color: "#860038"})
colors.set('Mavericks', {color: "#00538C"})
colors.set('Nuggets', {color: "#1D428A"})
colors.set('Pistons', {color: "#C8102E"})
colors.set('Warriors', {color: "#1D428A"})
colors.set('Rockets', {color: "#CE1141"})
colors.set('Pacers', {color: "#002D62"})
colors.set('Clippers', {color: "#C8102E"})
colors.set('Lakers', {color: "#552583"})
colors.set('Grizzlies', {color: "#5D76A9"})
colors.set('Heat', {color: "#98002E"})
colors.set('Bucks', {color: "#00471B"})
colors.set('Timberwolves', {color: "#78BE20"})
colors.set('Pelicans', {color: "#C8102E"})
colors.set('Knicks', {color: "#F58426"})
colors.set('Thunder', {color: "#007AC1"})
colors.set('Magic', {color: "#0077C0"})
colors.set('76ers', {color: "#006BB6"})
colors.set('Suns', {color: "#1D1160"})
colors.set('Trail Blazers', {color: "#E03A3E"})
colors.set('Kings', {color: "#5A2D81"})
colors.set('Spurs', {color: "#C4CED4"})
colors.set('Raptors', {color: "#CE1141"})
colors.set('Jazz', {color: "#00471B"})
colors.set('Wizards', {color: "#002B5C"})

function Card(props){
    const color = colors.get(props.nickname)

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
    }

    function dateToTime(utcDate){
        var localDate = new Date(utcDate);
        return dayjs(localDate).format('h:mm A') + ' EST';
    }

    return(
        <div className="container-fluid">
            <div className='col m-1'>
            <div className="card" style={ { backgroundColor:color.color, color:"white"} }>
                <div className="card-body">
                    <h5 className="card-title">{props.fullName}  ({props.win} - {props.loss})</h5>
                    <span><img src={props.logo} alt={props.nickname} loading="lazy" style={{width:"50px",height:"50px",float:"right"}}/></span>
                    <p className="card-subtitle">{ordinal(props.rank)} place in {props.conference}</p>
                    { props.games.map(game => {
                        if(game.hTeam.teamId != props.team && game.vTeam.teamId != props.team){
                            return;
                        } else if(game.hTeam.teamId == props.team){
                            return (
                                <div>
                                    <p className="card-text"> {dateToTime(game.startTimeUTC)} vs {game.vTeam.fullName}</p>
                                    <p className="card-text">{game.hTeam.shortName}  {game.statusGame == 'Scheduled' ? 0 : game.hTeam.score.points} - {game.statusGame == 'Scheduled' ? 0 : game.vTeam.score.points}  {game.vTeam.shortName} </p>
                                </div>
                                );
                        } else{
                            return (
                                <div>
                                    <p className="card-text"> {dateToTime(game.startTimeUTC)} @ {game.hTeam.fullName}</p>
                                    <p className="card-text">{game.vTeam.shortName}  {game.statusGame == 'Scheduled' ? 0 : game.vTeam.score.points} - {game.statusGame == 'Scheduled' ? 0 : game.hTeam.score.points}  {game.hTeam.shortName}</p>
                                </div>
                            );
                        }
                    }) }
                </div>
                <div class="card-footer text-white d-flex">
                    {props.nickname} Leading Scorer -  
                </div>
            </div>
            </div>
        </div>
    );
}

export default Card;