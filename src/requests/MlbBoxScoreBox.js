import React, { Component } from 'react';
import loadLogos from './MlbLogos';

class MlbBoxScoreBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isUndefined(inning){
        if(inning === undefined){
            return true
        } 
        return false
    }

    render() {
        const logos = new loadLogos();

        return (
            <div className='col'>
                <div className='container'>
                <table className='table table-sm table-borderless'>
                    <thead>
                        <tr className='table-active'>
                            <th scope='col'>{this.props.gameStatus != 'Final' ? this.props.currentInning : 'Final'}</th>
                            <th scope='col'>1</th>
                            <th scope='col'>2</th>
                            <th scope='col'>3</th>
                            <th scope='col'>4</th>
                            <th scope='col'>5</th>
                            <th scope='col'>6</th>
                            <th scope='col'>7</th>
                            <th scope='col'>8</th>
                            <th scope='col'>9</th>
                            <th scope='col'></th>
                            <th scope='col'>R</th>
                            <th scope='col'>H</th>
                            <th scope='col'>E</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'><span><img src={logos.get(this.props.awayTeamID).logo}
                                                alt={this.props.awayTeamName} height="24px" width="24px" className='mr-1' /> {this.props.awayTeamName}</span></th>
                            <td>{this.isUndefined(this.props.innings[0]) ? null : this.props.innings[0].away.runs}</td>
                            <td>{this.isUndefined(this.props.innings[1]) ? null : this.props.innings[1].away.runs}</td>
                            <td>{this.isUndefined(this.props.innings[2]) ? null : this.props.innings[2].away.runs}</td>
                            <td>{this.isUndefined(this.props.innings[3]) ? null : this.props.innings[3].away.runs}</td>
                            <td>{this.isUndefined(this.props.innings[4]) ? null : this.props.innings[4].away.runs}</td>
                            <td>{this.isUndefined(this.props.innings[5]) ? null : this.props.innings[5].away.runs}</td>
                            <td>{this.isUndefined(this.props.innings[6]) ? null : this.props.innings[6].away.runs}</td>
                            <td>{this.isUndefined(this.props.innings[7]) ? null : this.props.innings[7].away.runs}</td>
                            <td>{this.isUndefined(this.props.innings[8]) ? null : this.props.innings[8].away.runs}</td>
                            <td></td>
                            <td>{this.props.awayTeam.batting.runs}</td>
                            <td>{this.props.awayTeam.batting.hits}</td>
                            <td>{this.props.awayTeam.fielding.errors}</td>
                        </tr>
                        <tr>
                            <th scope='row'><span><img src={logos.get(this.props.homeTeamID).logo}
                                                alt={this.props.homeTeamName} height="24px" width="24px" className='mr-1' /> {this.props.homeTeamName}</span></th>
                            <td>{this.isUndefined(this.props.innings[0]) ? null : this.props.innings[0].home.runs}</td>
                            <td>{this.isUndefined(this.props.innings[1]) ? null : this.props.innings[1].home.runs}</td>
                            <td>{this.isUndefined(this.props.innings[2]) ? null : this.props.innings[2].home.runs}</td>
                            <td>{this.isUndefined(this.props.innings[3]) ? null : this.props.innings[3].home.runs}</td>
                            <td>{this.isUndefined(this.props.innings[4]) ? null : this.props.innings[4].home.runs}</td>
                            <td>{this.isUndefined(this.props.innings[5]) ? null : this.props.innings[5].home.runs}</td>
                            <td>{this.isUndefined(this.props.innings[6]) ? null : this.props.innings[6].home.runs}</td>
                            <td>{this.isUndefined(this.props.innings[7]) ? null : this.props.innings[7].home.runs}</td>
                            <td>{this.isUndefined(this.props.innings[8]) ? null : this.props.innings[8].home.runs}</td>
                            <td></td>
                            <td>{this.props.homeTeam.batting.runs}</td>
                            <td>{this.props.homeTeam.batting.hits}</td>
                            <td>{this.props.homeTeam.fielding.errors}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

MlbBoxScoreBox.propTypes = {};

export default MlbBoxScoreBox;
