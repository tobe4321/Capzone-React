import React, { Component } from 'react';
import PlayerDetail from './PlayerDetail';

class RosterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roster:[],
        };
    }

    async componentDidMount(){
        this.getRoster(this.props.team)
    }

    async getRoster(team){
        let url = `https://statsapi.web.nhl.com/api/v1/teams/${team.id}/roster`
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    roster: data.roster
                })
            })
    }

    render() {
        const { roster } = this.state
        console.log(roster)

        return (
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Pos</th>
                                <th scope='col'>#</th>
                                <th scope='col'>Player</th>
                                <th scope='col'>Shoots</th>
                                <th scope='col'>Age</th>
                                <th scope='col'>Ht</th>
                                <th scope='col'>Wght</th>
                                <th scope='col'>From</th>
                            </tr>
                        </thead>
                            { roster.map(player => (
                            <tbody>
                                <tr className='text-nowrap'>
                                    <PlayerDetail playerID={player.person.id} />
                                </tr>
                            </tbody>
                            )) }
                    </table>
                </div>
            </div>
        );
    }
}

RosterList.propTypes = {};

export default RosterList;
