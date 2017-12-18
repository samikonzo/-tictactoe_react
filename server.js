require('babel-core/register');
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');


console.log(' server.js from root : runned ')
//require('server.js');


const express		= require('express')
const app			= express()
const http 			= require('http').Server(app)
const io 			= require('socket.io')(http)
const reload		= require('reload')
const PORT 			= process.env.PORT || 3000
const l 			= console.log



/*
* browser reloader / just for dev
*/
reload(app)


/* 
*	link to socket logic 
*/
require('server-app.js')(app, io)


/*
* ??
*/
app.use(express.static('public')) 


/*
*	index page
*/
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/src/index.html')
})


/*
*	connect by invite
*/
app.get('/invite_:id', (req, res) => {
	res.sendFile(__dirname + '/src/index.html')
})

/*
*	link to bundle
*/
app.get('/public/:filename', (req, res) => {
	res.sendFile(__dirname + '/public/' + req.params.filename)
})


http.listen(PORT, ()=>{
	l(`We are listening port :` + PORT)
}) 



