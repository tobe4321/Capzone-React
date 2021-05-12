import React, { Component } from 'react';
import '../css/links.css';

class BoxScorePitchers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='col border'>
                <table className='table table-striped table-borderless table-sm'>
                    <thead style={{ backgroundColor:'orange' }}>
                        <tr>
                            <th scope='col' className='text-left'>{ this.props.shortName } Pitchers</th>
                            <th scope='col'>IP</th>
                            <th scope='col'>H</th>
                            <th scope='col'>R</th>
                            <th scope='col'>ER</th>
                            <th scope='col'>BB</th>
                            <th scope='col'>SO</th>
                            <th scope='col'>HR</th>
                            <th scope='col'>ERA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(this.props.players).sort((a, b) => parseFloat(a[1].stats.pitching.inningsPitched) > parseFloat(b[1].stats.pitching.inningsPitched) ? -1 : 1).map(player =>(player[1].gameStatus.isOnBench !=
                        true && player[1].position.code == 1 &&
                        <tr key={player[1].person.id}>
                            <th scope='row' className='text-left'> <a href={`https://www.mlb.com/player/${player[1].person.id}`} target='_blank'> {player[1].person.fullName} </a> </th>
                            <td> {player[1].stats.pitching.inningsPitched} </td>
                            <td> {player[1].stats.pitching.hits} </td>
                            <td> {player[1].stats.pitching.runs} </td>
                            <td> {player[1].stats.pitching.earnedRuns} </td>
                            <td> {player[1].stats.pitching.baseOnBalls} </td>
                            <td> {player[1].stats.pitching.strikeOuts} </td>
                            <td> {player[1].stats.pitching.homeRuns} </td>
                            <td> {player[1].seasonStats.pitching.era} </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

BoxScorePitchers.propTypes = {};

export default BoxScorePitchers;
