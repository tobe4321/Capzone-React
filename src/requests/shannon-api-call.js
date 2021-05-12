import React, { Component } from 'react';

export default class ShannonApiCall extends Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
        };
    }

    async componentDidMount(){
        fetch("https://shayshay.p.rapidapi.com/random?limit=1", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "7b0347931fmshd041067ab6852c4p16223fjsne634a8cfd5a7",
                "x-rapidapi-host": "shayshay.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ 
                items: data.quote
            });
        });
    }


    render(){
        const { items } = this.state;
        return(
            <div className="container pt-50px">
                <div className="card-body">
                    <ul className="list-unstyled">
                        <li className="alert alert-info text-center">
                            <p>{items} - Uncle Shannon</p>
                        </li>
                    </ul>
                    <div className="card">
                        <img src="https://www.hiphopoverload.com/wp-content/uploads/DLp5D5FWAAAmMAW-1024x1024.jpg"
                            alt="shannon"></img>
                    </div>
                </div>
            </div>
        );
    }

}