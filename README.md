https://extended-tic-tac-toe.web.app/

--- VER. 0.8.0 ---
	
	** COMMON
		- some code refactoring
		- deleted useless component
	** STYLES
		- added help station
		- added favicon

--- VER. 0.7.5 ---

	** FIXED
		- added priority. The bot is smarter and more dangerous )))
		- bot strives to make move as close to the center as possible
	** COMMON
		- winstreak can be a random number : whether it is 5 or 7

--- VER. 0.6.0 ---

	** FIXED
		- first move of bot is not near game area borders
		- now the bot makes the first move, after losing and restarting
	** STYLES
		- added style of active history
		- added new move style effect

--- VER. 0.5.0 ---

	** COMMON
		- the structure of project has been changed
		- to checked out default attributes of empty head element in React
		- to connected WEBPACK 
		- to added charset utf-8

	** STYLES
		- styles via css.modules
		- added more gaming font, not Ubuntu font-face
		- added inset shadown to better displaying active functions or occupied another cell
		- edited active style cell
		- shifted all rgb into hsl
		- optimized occupied style
		- to set up variables in sass code, integrated it into code
		- history font-size - to decreased
		- chacnged distance between header buttons and history log	

	** WEBPACK
		- integrated css autoprefix 
		- added css modules and it will lead to a change in the structure of the project
		- web application supports old browsers!

	** FIXED
		- fixed annoying bag when switching mode
		- the bot will not walk if the path is obviously short