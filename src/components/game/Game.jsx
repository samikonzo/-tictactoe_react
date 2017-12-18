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
			[].forEach.call(this.playground.querySelectorAll('td'), td => {
				delete td.buzy 
				td.classList.add('playground__cell--empty')
				td.innerHTML = ''
			})

			this.setState( prevState => {
				return {
					enable: props.turn,
					playerTurn: props.turn,
					playerSign: props.turn ? 'X' : '0',
					playerEnemySign: props.turn ? '0' : 'X',
					popup: false,
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
		var popupStatus;
		if(props.state == 'draw') popupStatus = 'draw'
		else popupStatus = (props.winSign == this.state.playerSign) ? 'win' : 'fail'

		if(popupStatus == 'draw'){
			this.setState( prevState => {
				return { 
					popup: true,
					popupStatus: popupStatus
				}
			})
		} else {
			this.showWinCombination(props.winArr)

			setTimeout( () => {
				this.setState( prevState => {
					return { 
						popup: true,
						popupStatus: popupStatus
					}
				})
			}, 1000)
		}
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
		//
		var turn = props.turn
		this.setState(prevState => {
			return {
				enable: turn,
				playerTurn: turn,
				popup: false,
			}
		});

		// clear tds
		[].forEach.call(this.playground.querySelectorAll('td'), td => {
			delete td.buzy 
			td.classList.add('playground__cell--empty')
			td.innerHTML = ''
		})
	
	}

	clearGame(){
		[].forEach.call(this.playground.querySelectorAll('td'), td => {
			delete td.buzy 
			td.classList.add('playground__cell--empty')
			td.innerHTML = ''
		})
	}

	render(){

		var gameVisibility = this.state.visible ? 'game--visible' : 'game--hidden'
		var playgroundEnable = this.state.enable ? '' : 'playground--disable'
		var currentTurn = this.state.playerTurn ? 'your turn' : 'enemy turn'
		var turnClass = this.state.playerTurn ? 'game-params__turn--my' : 'game-params__turn--enemy'
		var paramsHidden = this.state.popup ? 'game-params--hidden' : ''


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

				<p className={`game-params ${paramsHidden}`}>
					You play : <span className="game-params__sign">{this.state.playerSign}</span>
					<span className={`game-params__turn ${turnClass}`}>{currentTurn}</span>
				</p>
			</div>
			
		)
	}

}


module.exports = Game