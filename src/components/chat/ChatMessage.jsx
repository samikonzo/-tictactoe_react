var React = require('react')

class ChatMessages extends React.Component{

	render(){
		const fromMe = this.props.fromMe ? 'message--fromMe' : ''
		// no nicknames
		const messageFrom = this.props.fromMe ? 'You' : 'Enemy'

		return (
			<div className={`message ${fromMe}`}>
				<div className="message__userName">
					{
						messageFrom
					}
				</div>
				<div className="message__message-body">
					{ this.props.message }
				</div>
			</div>
		)
	}
}


module.exports = ChatMessages