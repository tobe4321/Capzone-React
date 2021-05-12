import React, { Component } from 'react';

class BoxScoreBatters extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='col border container-fluid'>
                <table className='table table-striped table-borderless table-sm'>
                    <thead style={{ backgroundColor:'orange' }}>
                        <tr>
                            <th scope='col' className='text-left'>{ this.props.shortName } Batters</th>
                            <th scope='col'>AB</th>
                            <th scope='col'>R</th>
                            <th scope='col'>H</th>
                            <th scope='col'>RBI</th>
                            <th scope='col'>HR</th>
                            <th scope='col'>BB</th>
                            <th scope='col'>SO</th>
                            <th scope='col'>LOB</th>
                            <th scope='col'>AVG</th>
                            <th scope='col'>OPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Object.entries(this.props.players).map(player =>(player[1].gameStatus.isOnBench != true &&
                        <tr className='p-3' key={player[1].person.id}>
                            <th scope='row' className='text-left'> <a href={`https://www.mlb.com/player/${player[1].person.id}`} target='_blank'> { player[1].person.fullName }, {
                                player[1].position.abbreviation } </a> </th>
                            <td> { player[1].stats.batting.atBats } </td>
                            <td> { player[1].stats.batting.runs } </td>
                            <td> { player[1].stats.batting.hits } </td>
                            <td> { player[1].stats.batting.rbi } </td>
                            <td> { player[1].stats.batting.homeRuns } </td>
                            <td> { player[1].stats.batting.baseOnBalls } </td>
                            <td> { player[1].stats.batting.strikeOuts } </td>
                            <td> { player[1].stats.batting.leftOnBase } </td>
                            <td> { player[1].seasonStats.batting.avg } </td>
                            <td> { player[1].seasonStats.batting.ops } </td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        );
    }
}

BoxScoreBatters.propTypes = {};

export default BoxScoreBatters;
