var React = require('react')
var Messages = require('./ChatMessages.jsx')
var ChatInput = require('./ChatInput.jsx')
var l = console.log

import css from './chat.css';	

class Chat extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			messages : [],
			username : socket.id
		}

		//waiting for socket.id...just for fun
		if(!this.state.username){
			var that = this;
			var socketIdWaiter = setTimeout(function f(){
				if(socket.id){
					//l('here socket id!')
					that.state.username = socket.id
				} else {
					//l('no socket id')
					socketIdWaiter = setTimeout(f, 200)
				}

			}, 200)
		}

		//listen messages
		socket.on('chatMessage', message => {
			this.addMessage(message)
		})

		/*socket.on('chatTyping', () => {
			this.showEnemyTyping()
		})*/

		this.sendHandler = this.sendHandler.bind(this)
		this.addMessage = this.addMessage.bind(this)
		//this.showEnemyTyping = this.showEnemyTyping.bind(this)
	}

	sendHandler(message){
		const messageObject = {
			username: this.state.username,
			message: message,
			//enemyTyping: false,
		}

		socket.emit('chatMessage', messageObject)
	}

	addMessage(message){
		if(message.username == this.state.username){
			message.fromMe = true
		}

		const messages = this.state.messages;

		messages.push(message)

		this.setState({
			messages: messages
		})
	}

	showEnemyTyping(){
		/*this.setState({
			enemyTyping: true
		})*/
	}

	render(){

		const chatVisibility = this.props.visibility ? 'chat--visible' : ''

		return(
			<div className={`chat ${chatVisibility}`}>
				<Messages messages={this.state.messages} enemyTyping={this.state.enemyTyping}/>
				<ChatInput onSend={this.sendHandler}/>	
			</div>
		)
	}

}


module.exports = Chat