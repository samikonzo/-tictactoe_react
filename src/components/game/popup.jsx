var React = require('react')

class Popup extends React.Component{
	render(){
		var popupVisibility = this.props.visible ? 'playground__popup--visible' : ''
		var restartBtnVisibility = this.props.visible ? 'playground__restartBtn--visible' : ''
		var status = this.props.status
		var popupStatus = `playground__popup--${status}`
		var text

		switch(status){
			case 'win' : 	text = 'Соперник повержен!'
							break;

			case 'fail': 	text = 'Вы проиграли'
							break;

			case 'draw': 	text = 'Ничья'
							break;


		}

		return (
			<div className={`playground__popup ${popupVisibility} ${popupStatus}`}>
				<p>{text}</p>
				<button className={`playground__restartBtn ${restartBtnVisibility}`} onClick={this.props.onClick}> restart game </button>
			</div>
		)
	}
}
module.exports = Popup	