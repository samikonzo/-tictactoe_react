var React = require('react')

class ChatInput extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			chatInput : ''
		}

		this.submitHandler = this.submitHandler.bind(this)
		this.textChangeHandler = this.textChangeHandler.bind(this)
	}

	textChangeHandler(e){
		this.setState({
			chatInput: e.target.value
		})

		socket.emit('chatTyping')
	}

	submitHandler(e){
		e.preventDefault()
		this.props.onSend(this.state.chatInput)
		this.setState({
			chatInput: ''
		})

		this.inputDom.focus()
	}

	render(){
		return (
			<form className="chat-form" onSubmit={this.submitHandler}> 
				<input 
					type="text"
					className="chat-form__input"
					onChange={this.textChangeHandler}
					value={this.state.chatInput}
					ref={inputDom => this.inputDom = inputDom}
					placeholder="..."
					required
				/>
				<input 
					type="submit"
					className="chat-form__submitBtn"
					
					value="send"
				/>
			</form>
		)
	}
}	

module.exports = ChatInput