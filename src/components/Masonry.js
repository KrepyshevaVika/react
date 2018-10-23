import React, { Component } from 'react';
import Header from './Header';
import Masonry from 'react-masonry-component';
//import 'masonry-layout';

const masonryOptions = {
    columnWidth: '.masonry-sizer',
    itemSelector: '.masonry-item',
    gutter: 10,
    //fitWidth: true,
    //transitionDuration: 0,
    horizontalOrder: true,
    percentPosition: true
};

class MasonryComponent extends Component {

    componentDidMount() {
        this.getNodes();
    }
    
    getNodes() {
        this.props.getAll();
    }

    rndColor() {
        return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
    }

    item = (nodes) => {
        return nodes.map((elem) => {
            return (
                <div key={elem.id} className={'masonry-item'} style={ { background: this.rndColor() } }>
                    <div>
                        {elem.id} 
                    </div>
                    <div>
                        {elem.name}
                    </div>
                    <div>
                        {elem.description}
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.props.nodes);
        return (
            <div>
                <Header active="Masonry"/>
{/*<div class="masonry-class" data-masonry='{ "itemSelector": ".masonry-item", "columnWidth": "".masonry-sizer", "gutter": 10,  "horizontalOrder": true, "percentPosition": true }'>*/}
                <Masonry
                    className={'masonry-class'} 
                    options={masonryOptions} 
                >
                    <div className={'masonry-sizer'} ></div>
                    {this.item(this.props.nodes)}
                </Masonry>
            </div>
        );
    }
}

export default MasonryComponent;