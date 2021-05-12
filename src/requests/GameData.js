import React, { Component } from 'react';

class GameData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameData:[],
            isLoaded: false
        };
    }

    async componentDidMount(){
        await this.getGame(this.props.game)
    }

    async getGame(gameID){
        let url = `http://statsapi.mlb.com/api/v1.1/game/${gameID}/feed/live`
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    gameData:data,
                    isLoaded: true
                })
            })
    }

    render() {
        const { gameData, isLoaded } = this.state

        if(!isLoaded){
            return null;
        } else{
            console.log(gameData)
            const innState = gameData.liveData.linescore.inningState
            const currentInn = gameData.liveData.linescore.currentInningOrdinal
            const numOuts = gameData.liveData.linescore.outs
            return (
                <React.Fragment>
                    <p className='m-0 p-0 text-nowrap'>{innState} {currentInn} Inning ({numOuts} {numOuts > 1 || numOuts === 0 ? 'Outs' : 'Out'}) </p>
                </React.Fragment>
            ); 
        }

    }
}

GameData.propTypes = {};

export default GameData;
