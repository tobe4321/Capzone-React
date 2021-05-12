import React, { Component } from 'react';

class TeamDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamStats:[],
            rankedTeamStats:[],
            isLoaded: false
        };
    }

    async componentDidMount(){
        this.getStats(this.props.teamID)
    }

    async getStats(teamID){
        let url = `https://statsapi.web.nhl.com/api/v1/teams/${teamID}/stats`
        console.log(url)
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    teamStats:data.stats[0].splits[0],
                    rankedTeamStats:data.stats[1].splits[0],
                    isLoaded: true
                })
            })
    }

    render() {
        const { teamStats, rankedTeamStats, isLoaded } = this.state
        if(!isLoaded){
            return null;
        } else{
            return (
                <React.Fragment>
                    <div className='col text-center'>
                        <span><p>Goals For</p><p style={{ fontSize:'20px', fontWeight:'600' }}>{ rankedTeamStats.stat.goalsPerGame }</p></span>
                    </div>
                    <div className='col text-center'>
                        <span><p>Goals Against</p><p style={{ fontSize:'20px', fontWeight:'600' }}>{ rankedTeamStats.stat.goalsAgainstPerGame }</p></span>
                    </div>
                    <div className='col text-center'>
                        <span><p>Power Play %</p><p style={{ fontSize:'20px', fontWeight:'600' }}>{ rankedTeamStats.stat.powerPlayPercentage }</p></span>
                    </div>
                    <div className='col text-center'>
                        <span><p>Penalty Kill %</p><p style={{ fontSize:'20px', fontWeight:'600' }}>{ rankedTeamStats.stat.penaltyKillPercentage }</p></span>
                    </div>
                    {/* <div className='row justify-content-center'>
                        <div className='col justify-content-center text-center'>
                            <p className='text-white'>
                                Record: ({ teamStats.stat.wins } - { teamStats.stat.losses } - { teamStats.stat.ot })
                            </p>
                        </div>
                    </div> */}
                </React.Fragment>
            );
        }

    }
}

TeamDetail.propTypes = {};

export default TeamDetail;
