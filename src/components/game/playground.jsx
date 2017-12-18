var React = require('react')
var Cell = require('./cell.jsx')

function returnCell(cell, r, c){
	if(this.props.cells[r][c] == undefined){
		this.props.cells[r][c] = cell
	}
}

class Playground extends React.Component{

	render(){
		var that = this

		return(
			<table className="playground" onClick={this.props.onClick}>
				<tbody>
					<tr>
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 0, 0)}/>	
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 0, 1)}/>	
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 0, 2)}/>	
					</tr>

					<tr>
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 1, 0)}/>
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 1, 1)}/>
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 1, 2)}/>
					</tr>

					<tr>
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 2, 0)}/>
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 2, 1)}/>
						<td className="playground__cell" ref={cell => returnCell.call(that, cell, 2, 2)}/>
					</tr>
				</tbody>	
			</table>
		)
	}

}

module.exports = Playground


