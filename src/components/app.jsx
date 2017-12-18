var React = require('react')
var Game = require('./game/game.jsx')
var Chat = require('./chat/chat.jsx')
var Infobar = require('./infobar.jsx')

import css from './app.css'

class App extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			visibility: {
				mask: false,
				game: false,
				chat: false,
				infobar: false,
			}, 

			gameLink : null,

			stats: {
				X	: null,
				'0'	: null,
				draw: null,
			},
		}
		
		//this bind
		this.copyLink = this.copyLink.bind(this)
	}

	componentDidMount(){
		//Listening
		socket.on('waiting', props => {
			var href = window.location.href.split('invite')[0] + props.link

			this.setState( prevState => {
				return {
					visibility: {
						mask: true,
						game: false,
						chat: false,
						infobar: false,
					},

					gameLink: href
				}
			})
		})

		socket.on('start', props => {
			this.setState( prevState => {
				return	{
					visibility: {
						mask: false,
						game: true,
						chat: true,
						infobar: true,
					}
				}
			})
		})

		socket.emit('getState')
		//??socket.emit('ready')
	}

	copyLink(e){
		//react want it
		e.persist()
		// create temp input for 'copy from' source
		var tempInput = document.createElement('input');
		tempInput.style.cssText = `position: absolute; opacity:0;`
		document.body.appendChild(tempInput)

		// place link into temp input and select it
		tempInput.value = this.maskLink.innerHTML;
		tempInput.select()

		// copy to clipboard
		document.execCommand("copy")

		// remove temp input
		tempInput.remove()

		// create copy-message
		var copyMessage = document.createElement('div');
		copyMessage.innerHTML = 'copied!';
		copyMessage.classList.add('copyMessage');
		copyMessage.style.cssText = `
			position: absolute;
			top: ${e.clientY}px;
			left: ${e.clientX}px;
			opacity: 1;
			transition: 1s linear;
			user-select: none;
			z-index:10;
		`
		
		// place copy message
		document.body.appendChild(copyMessage);

		// fly and delete
		setTimeout(() => {
			copyMessage.style.top = e.clientY - 100 + 'px';
			copyMessage.style.opacity = 0;

			//remove 
			setTimeout(()=>{
				copyMessage.remove()
			},1000)
		}, 10)
	}

	render(){
		var visibility = this.state.visibility

		var maskVisibility = visibility.mask ? 'mask--visible' : 'mask--hidden'
		var gameVisibility = visibility.game ? true : false
		var chatVisibility = visibility.chat ? true : false
		var infobarVisibility = visibility.infobar ? true : false

		return(
			<div className="wrapper">
				<div className={`mask ${maskVisibility}`} onClick={this.copyLink} ref={(mask) => this.mask = mask}>
					<p>waiting for the enemy</p>
					<p ref={(link) => this.maskLink = link}>{this.state.gameLink}</p>
					<p>(click for copy to clipboard)</p>
				</div>

				<Infobar visibility={infobarVisibility}/>
				<Game visibility={gameVisibility} />
				<Chat visibility={chatVisibility} />
			</div>
		)
	}

}


module.exports = App