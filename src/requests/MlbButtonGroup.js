import React, { Component, useState } from 'react';
import MlbBoxScore from './MlbBoxScore';
import Modal from 'react-bootstrap/Modal'
import { ModalBody, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

class MlbButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var streamTeam = this.props.homeTeamName.replace(/\./g,'');
        streamTeam = streamTeam.replace(/\s+/g, '-').toLowerCase();
        const streamUrl = `http://playoffsstream.com/mlb/${streamTeam}-live-stream`;

        return (
            <div className='btn-group btn-group-sm text-nowrap'>
                { this.props.status != 'Final' ? <a href={this.props.status !=='Live' ? 'javascript:void(0)' : streamUrl}
                    target={this.props.status !=='Live' ? '' : "_blank" }><button className='btn btn-sm btn-outline-success'>Watch
                        LIVE</button></a> : null }
                <BoxScoreModal homeTeam={this.props.homeTeamName} awayTeam={this.props.awayTeamName} gameID={this.props.id} />
            </div>
        );
    }
}

function BoxScoreModal(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <button type='button' className='btn btn-sm btn-outline-primary text-right' onClick={ handleShow }>Box
                    Score</button>
        <Modal show={show} onHide={handleClose} dialogClassName='mw-100 w-75'>
            <ModalHeader closeButton>
                <ModalTitle> {props.homeTeam} vs {props.awayTeam} </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <MlbBoxScore gameID={props.gameID} />
            </ModalBody>
        </Modal>
        </>
    )
}

MlbButtonGroup.propTypes = {};

export default MlbButtonGroup;
