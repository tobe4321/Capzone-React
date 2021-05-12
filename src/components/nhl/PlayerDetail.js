import React, { Component } from 'react';

class PlayerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: [],
            isLoaded: false
        };
    }

    async componentDidMount(){
        this.getPlayerDetail(this.props.playerID)
    }

    async getPlayerDetail(playerID){
        let url = `https://statsapi.web.nhl.com/api/v1/people/${playerID}`
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    player: data.people,
                    isLoaded: true
                })
            })
    }

    render() {
        const { player, isLoaded } = this.state

        if(!isLoaded){
            return null
        } else{
            return (
                <React.Fragment>
                    <th scope='row'> {player[0].primaryPosition.abbreviation} </th>
                    <td> {player[0].primaryNumber} </td>
                    <td> {player[0].fullName} </td>
                    <td> {player[0].shootsCatches} </td>
                    <td> {player[0].currentAge} </td>
                    <td> {player[0].height} </td>
                    <td> {player[0].weight} </td>
                    <td> {player[0].birthCity}, {player[0].birthStateProvince == 'undefined' ? '' : player[0].birthStateProvince} {player[0].birthCountry} </td>
                </React.Fragment>
            )
        }

    }
}

PlayerDetail.propTypes = {};

export default PlayerDetail;
