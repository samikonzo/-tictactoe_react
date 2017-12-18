var React = require('react')
var Message = require('./ChatMessage.jsx')

class ChatMessages extends React.Component{
	componentDidUpdate(){
		if(this.list){
			this.list.scrollTop = this.list.scrollHeight
		} 
	}	

	render(){
		const messages = this.props.messages.map((message, i) => {
			return(
				<Message
					key={i}
					username={message.username}
					message={message.message}
					fromMe={message.fromMe} 
				/>
			)
		})

		return (
			<div className="chat__log" ref={(list) => this.list = list}>
				{ messages }
			</div>	
		)
	}
}

ChatMessages.defaultProps = {
	messages: []
}


module.exports = ChatMessages 