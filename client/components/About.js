import React, {Component} from 'react'

export default class About extends Component {
	
	constructor(props){
		super(props);
	}
	render() {
        return (
            <section className="widget">      
                <h2 className="widget-title">About</h2>     
                ClipTales is about framing a story using paperclips and a little bit of imagination. It begins with a plot in mind, and a couple of paperclips in hand. And ends with a few stickmen trying to realise what I had imagined. I try to do them justice to the best of my ability :)
            </section>
        )
	}
}