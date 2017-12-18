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

		this.sendHandler = this.sendHandler.bind(this)
		this.addMessage = this.addMessage.bind(this)
	}

	sendHandler(message){
		const messageObject = {
			username: this.state.username,
			message: message,
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

	render(){
		return(
			<div className="chat">
				<Messages messages={this.state.messages}/>
				<ChatInput onSend={this.sendHandler}/>	
			</div>
		)
	}

}





module.exports = Chat