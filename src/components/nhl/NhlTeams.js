import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import RosterList from './RosterList'
import loadLogos from './NhlLogos'
import loadColors from './NhlColors';
import TeamDetail from './TeamDetail';

export default class NhlTeams extends Component{

    constructor(props){
        super(props)
        this.state = {
            teams: [],
            isLoaded: false,
        }
    }

    handleCallback = (stats) =>{
        this.setState({teamStats: stats})
    }

    async componentDidMount(){
        await this.getTeams()
    }

    async getTeams(){
        await fetch('https://statsapi.web.nhl.com/api/v1/teams')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    teams: data.teams,
                    isLoaded: true
                })
            })
    }

    async getStats(team){
        let url = `https://statsapi.web.nhl.com/api/v1/teams/${team}/stats`
        await fetch(url)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    render(){
        const { teams, isLoaded } = this.state;

        if(!isLoaded){
            return null
        } else{
            return(
                <div className='container'>
                    <ul className='row row-cols-3 list-unstyled mt-3'>
                        { teams.map(team => (
                            <li key={team.id}>
                              { team.id !== 55 ? 
                                <Card team={team}/> : null }
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }
}

function RosterModal(team){
    team = team.team
    console.log(team)

    // if(team.id === 55){
    //     return(
    //             <Modal.Body>
    //                         { team.name } doesn't currently have a roster
    //             </Modal.Body>
    //     )
    // }
    return(
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{ team.teamName } Roster</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RosterList team={ team } />
                </Modal.Body>
        </div>
    )
}

const Card = (team) => {
    console.log(team.id)
        team = team.team
        const teamID = team.id
        const site = team.officialSiteUrl
        const logos = new loadLogos();
        const colors = new loadColors();

        const [isOpen, setIsOpen] = useState(false);
        const handleClose = () => setIsOpen(false)
        const handleOpen = () => setIsOpen(true)

        return (
            <div className='col col-auto m-2'>
                <div className='card text-white' style={ { backgroundColor:colors.get(teamID).color } }>
                    <div className='row'>
                        <div className='col mt-2'>
                            <div className='card-title text-center'>
                                <span><img src={logos.get(teamID).logo} alt={team.name} className='' height='24px' width='24px'/></span>
                                <h5 style={{ display:'inline', whiteSpace:'nowrap' }}>{ team.name }</h5>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <TeamDetail teamID={teamID}/>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <div className='row text-center'>
                            <div className='col'>
                                <button className='btn btn-link btn-sm' style={{ color:'white', textDecoration:'none' }} onClick={ handleOpen }>Roster</button>
                                    <Modal show={isOpen} onHide={handleClose} size='lg'>
                                        <RosterModal team={team} />
                                    </Modal>
                            </div>
                            <div className='col'>
                                <button className='btn btn-link btn-sm' style={{ color:'white', textDecoration:'none' }}>Stats</button>
                            </div>
                            <div className='col'>
                                <a className='btn btn-link btn-sm' href={ site } style={{ color:'white', textDecoration:'none' }}>Site</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}