var React = require('react')

class Infobar extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			visible 	: props.visibility, 
			winsX 		: 0,
			wins0 		: 0,
			winsDraw 	: 0 
		}

		socket.on('endGame', props => {
			var statistic = props.statistic

			l(statistic)

			this.setState(prevState => {
				return {
					winsX: statistic['X'],
					wins0: statistic['0'],
					winsDraw: statistic['draw'],
				}
			})			
		})
	}

	componentWillReceiveProps(props){
		this.setState(prevState => {
			return {
				visible: props.visibility
			}
		})
	}

	render(){
		var infobarVisibility = this.state.visible ? 'infobar--visible' : '' 

		return(
			<table className={`infobar ${infobarVisibility}`}>
				<tbody>
					<tr>
						<td colSpan="3"> Wins </td>
					</tr>

					<tr>
						<td>X</td>
						<td>draw</td>
						<td>0</td>
					</tr>

					<tr>
						<td className="infobar-wins__X">{this.state.winsX}</td>
						<td className="infobar-wins__draw">{this.state.winsDraw}</td>
						<td className="infobar-wins__0">{this.state.wins0}</td>
					</tr>
				</tbody>
			</table>

		)
	}

}


module.exports = Infobar