import React, { Component } from 'react';
import Header from './Header';
import Pusher from 'pusher-js';

class Slider extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            value: 50,
        }
    }

    componentDidMount() {
        const pusher = new Pusher('APP_KEY');
        const channel = pusher.subscribe('slider');
        channel.bind('targetValue', data => {
          this.setState({ value: data });
        });
      }

      handleChange(e) {
        fetch("http://localhost:8080/slider", 
                { method: "POST", body: JSON.stringify(e.target.value) });
      }

    render() {
        console.log("render");
        return (
            <div>
                <Header active="Slider"/>
                <div className="slider">
                    <input type="range" min="0" max="100" value={this.state.value} onChange={(e) => this.handleChange(e)}/>
                </div>
            </div>
        );
    }
}

export default Slider;