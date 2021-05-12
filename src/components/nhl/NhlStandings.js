import React, { Component } from 'react';
import '../../css/text.css'

const url = 'https://statsapi.web.nhl.com/api/v1/standings';
export default class NhlStandings extends Component{
    constructor(props){
        super(props);
        this.state = {
            standings: [],
            isLoaded: false,
        }
    }

    async componentDidMount(){
        await this.getStandings(url)
    }

    async getStandings(link){
        await fetch(link)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    standings: data.records,
                    isLoaded: true,
                })
            })
    }

    render(){
        const { standings, isLoaded } = this.state;
        const westRank = standings[0];
        const centralRank = standings[1];
        const eastRank = standings[2];
        const northRank = standings[3];
        console.log(westRank)


        if(!isLoaded){
            return null;
        } else{
            return(
                <div className="container">
                    <div className="row row-cols-2 mt-3">
                        <div className="col text-white">
                            <h1 className='text-center'>West</h1>
                            <Rankings rankings={westRank.teamRecords} />
                        </div>
                        <div className="col text-white">
                            <h1 className='text-center'>Central</h1>
                            <Rankings rankings={centralRank.teamRecords} />
                        </div>
                        <div className='col text-white'>
                            <h1 className='text-center'>East</h1>
                            <Rankings rankings={eastRank.teamRecords} />
                        </div>
                        <div className='col text-white'>
                            <h1 className='text-center'>North</h1>
                            <Rankings rankings={northRank.teamRecords} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const Rankings = (props) => {
    const logos = loadLogos();
    return(
        <div className='mb-3'>
            <table className='table table-secondary table-borderless table-striped'>
                <thead>
                    <tr className="table-primary">
                        <th scope='col'>Team</th>
                        <th scope='col'>GP</th>
                        <th scope='col'>W</th>
                        <th scope='col'>L</th>
                        <th scope='col'>OT</th>
                        <th scope='col'>PTS</th>
                        <th scope='col'>DIFF</th>
                        <th scope='col'>STRK</th>
                    </tr>
                </thead>
                <tbody className='table-hover'>
                    { props.rankings.map(team => {
                        const goalDiff = team.goalsScored - team.goalsAgainst
                        return(
                        <tr className={ `${team.divisionRank <= 4 ? 'table-success' : ''} font-weight-bold text-nowrap` }>
                            <th scope='row'>{ team.divisionRank }  <span><img src={ logos.get(team.team.id).logo } alt={team.team.name} height="24px" width="24px"/></span> { team.team.name } </th>
                            <td>{ team.gamesPlayed }</td>
                            <td>{ team.leagueRecord.wins }</td>
                            <td>{ team.leagueRecord.losses }</td>
                            <td>{ team.leagueRecord.ot }</td>
                            <td>{ team.points }</td>
                            <td style={{ color:(goalDiff > 0 ? 'green' : 'red') }}>{ goalDiff > 0 ? `+${goalDiff}` : goalDiff }</td>
                            <td style={{ color:(team.streak.streakType == 'wins' ? 'green' : 'red') }}>{ team.streak.streakCode }</td>
                        </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    );

}

function loadLogos(){
    let logos = new Map()

    logos.set(1, {logo:'https://assets-sports.thescore.com/hockey/team/6/w72xh72_logo@2x.png'})
    logos.set(2, {logo:'https://assets-sports.thescore.com/hockey/team/7/w72xh72_logo@2x.png'})
    logos.set(3, {logo:'https://assets-sports.thescore.com/hockey/team/8/w72xh72_logo@2x.png'})
    logos.set(4, {logo:'https://assets-sports.thescore.com/hockey/team/9/w72xh72_logo@2x.png'})
    logos.set(5, {logo:'https://assets-sports.thescore.com/hockey/team/10/w72xh72_logo@2x.png'})

    logos.set(6, {logo:'https://assets-sports.thescore.com/hockey/team/1/w72xh72_logo@2x.png'})
    logos.set(7, {logo:'https://assets-sports.thescore.com/hockey/team/2/w72xh72_logo@2x.png'})
    logos.set(8, {logo:'https://assets-sports.thescore.com/hockey/team/3/w72xh72_logo@2x.png'})
    logos.set(9, {logo:'https://assets-sports.thescore.com/hockey/team/4/w72xh72_logo@2x.png'})
    logos.set(10, {logo:'https://assets-sports.thescore.com/hockey/team/5/w72xh72_logo@2x.png'})

    logos.set(52, {logo:'https://assets-sports.thescore.com/hockey/team/11/w72xh72_logo@2x.png'})
    logos.set(12, {logo:'https://assets-sports.thescore.com/hockey/team/12/w72xh72_logo@2x.png'})
    logos.set(13, {logo:'https://assets-sports.thescore.com/hockey/team/13/w72xh72_logo@2x.png'})
    logos.set(14, {logo:'https://assets-sports.thescore.com/hockey/team/14/w72xh72_logo@2x.png'})
    logos.set(15, {logo:'https://assets-sports.thescore.com/hockey/team/15/w72xh72_logo@2x.png'})

    logos.set(16, {logo:'https://assets-sports.thescore.com/hockey/team/16/w72xh72_logo@2x.png'})
    logos.set(17, {logo:'https://assets-sports.thescore.com/hockey/team/18/w72xh72_logo@2x.png'})
    logos.set(18, {logo:'https://assets-sports.thescore.com/hockey/team/19/w72xh72_logo@2x.png'})
    logos.set(19, {logo:'https://assets-sports.thescore.com/hockey/team/20/w72xh72_logo@2x.png'})
    logos.set(20, {logo:'https://assets-sports.thescore.com/hockey/team/26/w72xh72_logo@2x.png'})

    logos.set(21, {logo:'https://assets-sports.thescore.com/hockey/team/27/w72xh72_logo@2x.png'})
    logos.set(22, {logo:'https://assets-sports.thescore.com/hockey/team/28/w72xh72_logo@2x.png'})
    logos.set(23, {logo:'https://assets-sports.thescore.com/hockey/team/30/w72xh72_logo@2x.png'})
    logos.set(24, {logo:'https://assets-sports.thescore.com/hockey/team/21/w72xh72_logo@2x.png'})
    logos.set(25, {logo:'https://assets-sports.thescore.com/hockey/team/22/w72xh72_logo@2x.png'})

    logos.set(26, {logo:'https://assets-sports.thescore.com/hockey/team/23/w72xh72_logo@2x.png'})
    logos.set(53, {logo:'https://assets-sports.thescore.com/hockey/team/24/w72xh72_logo@2x.png'})
    logos.set(28, {logo:'https://assets-sports.thescore.com/hockey/team/25/w72xh72_logo@2x.png'})
    logos.set(29, {logo:'https://assets-sports.thescore.com/hockey/team/17/w72xh72_logo@2x.png'})
    logos.set(30, {logo:'https://assets-sports.thescore.com/hockey/team/29/w72xh72_logo@2x.png'})

    logos.set(54, {logo:'https://assets-sports.thescore.com/hockey/team/102/w72xh72_logo@2x.png'})

    return logos;
}