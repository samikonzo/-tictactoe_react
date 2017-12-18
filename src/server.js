const express		= require('express')
const app			= express()
const http 			= require('http').Server(app)
const io 			= require('socket.io')(http)
const reload		= require('reload')
const PORT 			= process.env.PORT || 3000
const l 			= console.log

/*var gameRooms = {
	rooms : {},
	addRoom : function(room){
		var id = room.id
		this.rooms[id] = room;

		var link = '/invite_' + id

		app.get(link, (req, res) => {
			res.sendFile(__dirname + 'index.html')
		})
	},
	removeRoom : function(roomID){
		delete this.rooms[roomID]
	}
}*/


/*
* browser reloader / just for dev
*/
reload(app)


/* 
*	link to socket logic 
*/
require('server-app.js')(http, io)
app.use(express.static('public'))

/*
*	index page
*/
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

/*
*	connect by invite
*/
app.get('/invite_:id', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.get('/public/:filename', (req, res) => {
	l('need ' + req.params.filename)
	l(__dirname)
	//res.sendFile('../' + req.params.filename)
})





http.listen(PORT, ()=>{
	l(`We are listening port :` + PORT)
}) 



