var React = require('react')

class Infobar extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
	}

	render(){
		return(
			<div className="infobar">
				<table className="infobar-signs">
					<tbody>
						<tr>
							<td> Your </td>
							<td> Turn </td>
						</tr>

						<tr>
							<td className="infobar-signs__player"> </td>
							<td className="infobar-signs__turn"> </td>
						</tr>
					</tbody>
				</table>

				<table className="infobar-wins">
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
							<td className="infobar-wins__X">0</td>
							<td className="infobar-wins__draw">0</td>
							<td className="infobar-wins__0">0</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}

}


module.exports = Infobar