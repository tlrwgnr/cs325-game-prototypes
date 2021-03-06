
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		// this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(150, 200, 'logoTitle');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('sky_background', 'assets/bg5.png');
        this.load.image('textBox', 'assets/textBox.png');
        this.load.image('attack_button', 'assets/attack_button.png');
        this.load.image('evade_button', 'assets/evade_button.png');
        this.load.image('increase_button', 'assets/increase_button.png');
        this.load.image('end_button', 'assets/end_button.png');

        this.load.image('space_bg2', 'assets/background2.png');
		// this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.image('playButton', 'assets/start_button.png')
		this.load.audio('titleMusic', 'assets/01 HHavok-intro.mp3');
        this.load.audio('gameMusic', 'assets/02 HHavok-main.mp3');
		//	+ lots of other required assets here

        // my assests
        this.load.image('destroyer', 'assets/ship1.png');
        this.load.image('carrier', 'assets/Spaceship_tut.png');
        this.load.image('stealth_cruiser', 'assets/ship5.png');
        this.load.image('corvette', 'assets/sship3.png');

        this.load.image('game_bg', 'assets/background.png');


        this.load.image('retryButton', 'assets/button_retry.png');
        this.load.image('mainMenuButton', 'assets/button_main-menu.png');
        this.load.image('gameover_text', 'assets/gameover_text.png');
        this.load.image('victory', 'assets/victory.png');
        this.load.image('destroyerButton', 'assets/destroyerButton.png');
        this.load.image('carrierButton', 'assets/carrierButton.png');
        this.load.image('stealth_cruiserButton', 'assets/stealth_cruiserButton.png');
        this.load.image('corvetteButton', 'assets/corvetteButton.png');




	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
