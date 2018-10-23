import React, { Component } from 'react';
import Header from './Header';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');


class Slider extends Component {

    constructor(props) {
        super(props);
        

        this.state = {
            value: 50,
        }
    }

    componentDidMount() {
        
        socket.on('slider', (targetValue) => {
            console.log(targetValue);
            if (this.state.value !== targetValue.targetValue) {

                this.refs.text.value = targetValue.targetValue;
                //this.setState({ value: targetValue.targetValue });

                console.log("re-render");
            }
        });
    }

    handleChange(e) {

        let value = e.target.value;
        function f(){
            socket.emit('subscribeToSlider', value);
        }
        setTimeout(f, 200);
    }

    render() {
        console.log("render");
        return (
            <div>
                <Header active="Slider"/>
                <div className="slider">

                    <input type="range" min="0" max="100" ref="text" step="3" onChange={(e) => this.handleChange(e)}/>
                </div>
            </div>
        );
    }
}

export default Slider;