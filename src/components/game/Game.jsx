var React = require('react')
var Popup = require('./popup.jsx')

import css from './game.css'

class Game extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			visible: props.visibility,
			enable: false,
			playerTurn: false,
			playerSign: undefined,
			playerEnemySign: undefined,
			popup: false,
			popupStatus: undefined,
		}

		//listen messages
		socket.on('start', props => {
			this.setState( prevState => {
				return {
					enable: props.turn,
					playerTurn: props.turn,
					playerSign: props.turn ? 'X' : '0',
					playerEnemySign: props.turn ? '0' : 'X'
				}
			})
		})

		socket.on('place', props => {
			this.placeInCell(props)
		})

		socket.on('nextTurn', props => {
			this.setState( prevState => {
				return {
					enable: !prevState.playerTurn,
					playerTurn: !prevState.playerTurn,
				}
			})
		}) 

		socket.on('endGame', props => {
			this.endGame(props)
		})

		socket.on('restart', props => {
			this.restartGame(props)
		})

		socket.on('enable', yes => {
			if(yes){
				//enable playground
				this.setState( prevState => {
					enable : true
				})
			} 
			else{
				//disable playground
				this.setState( prevState => {
					enable : false
				})
			}	
		})


		//bind this
		this.clickHandler = this.clickHandler.bind(this)
		this.placeInCell = this.placeInCell.bind(this)
		this.endGame = this.endGame.bind(this)
		this.showWinCombination = this.showWinCombination.bind(this)
		this.sendRestartGameRequest = this.sendRestartGameRequest.bind(this)
		this.restartGame = this.restartGame.bind(this)
	}

	componentWillReceiveProps(props){
		this.setState( prevState => {
			return {
				visible: props.visibility
			}
		})
	}

	clickHandler(e){
		var target = e.target

		if(!this.state.enable || !this.state.playerTurn) return
		if(!target || target.nodeName != 'TD') return
		if(target.buzy) return	


		socket.emit('checkCell', {
			row: target.parentElement.sectionRowIndex,
			cell: target.cellIndex
		})

		this.setState( prevState => {
			return{
				enable: false
			}
		})
	}

	placeInCell(props){
		var row = props.cell.row
		var cell = props.cell.cell
		var sign = props.sign
		var td = this.playground.rows[row].cells[cell]

		td.buzy = true
		td.innerHTML = sign
		td.classList.remove('playground__cell--empty');
		//td.style.opacity = 1
	}

	endGame(props){
		this.showWinCombination(props.winArr)

		setTimeout( () => {
			this.setState( prevState => {
				var popupStatus;
				if(props.state == 'draw') popupStatus = 'draw'
				else popupStatus = (props.winSign == prevState.playerSign) ? 'win' : 'fail'

				return { 
					popup: true,
					popupStatus: popupStatus
				}
			})
		}, 1000)
	}

	showWinCombination(winArr){
		winArr.forEach((cell, i) => {
			var rowNum = cell[0]
			var cellNum = cell[1]
			var td = this.playground.rows[rowNum].cells[cellNum];
			resizeCell(td, i)
		})

		function resizeCell(td, i){
			td.classList.add('playground__cell--bigRed')
			td.classList.add('playground__cell--bigRed-' + i)
			
			setTimeout(function(){
				td.classList.remove('playground__cell--bigRed')
				td.classList.remove('playground__cell--bigRed-' + i)
			}, 1000 + i*200)
		}
	}

	sendRestartGameRequest(){
		socket.emit('restartGame')
	}

	restartGame(props){
		// you will turn first or not
		// disable playground for 1s for clear tds
		// hide popup
		// enable playground if need
		var turn = props.turn
		var willBeEnableAfterClear = turn
		this.setState(prevState => {
			return {
				enable: false,
				playerTurn: turn,
				popup: false,
			}
		})

		// and enable playground if need
		if(willBeEnableAfterClear){
			setTimeout(() => {
				this.setState({
					enable: true
				})
			},1000)
		}

		// clear tds
		[].forEach.call(this.playground.querySelectorAll('td'), td => {
			delete td.buzy 
			td.classList.add('playground__cell--empty')
			setTimeout(() => {
				td.innerHTML = ''
			}, 1000)
		})


		
	}

	render(){

		var gameVisibility = this.state.visible ? 'game--visible' : 'game--hidden'
		var playgroundEnable = this.state.enable ? '' : 'playground--disable'

		return(
			<div className={`game ${gameVisibility}`}>
				<Popup visible={this.state.popup} status={this.state.popupStatus} onClick={this.sendRestartGameRequest}/> 

				<table className={`playground ${playgroundEnable}`} onClick={this.clickHandler} ref={playground => this.playground = playground}>
					<tbody>
						<tr>
							<td className="playground__cell playground__cell--empty"/>
							<td className="playground__cell playground__cell--empty"/>
							<td className="playground__cell playground__cell--empty"/>
						</tr>
						<tr>
							<td className="playground__cell playground__cell--empty"/>
							<td className="playground__cell playground__cell--empty"/>
							<td className="playground__cell playground__cell--empty"/>
						</tr>
						<tr>
							<td className="playground__cell playground__cell--empty"/>
							<td className="playground__cell playground__cell--empty"/>
							<td className="playground__cell playground__cell--empty"/>
						</tr>
					</tbody>
				</table>
			</div>
			
		)
	}

}


module.exports = Game