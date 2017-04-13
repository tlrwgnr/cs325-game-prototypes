
BasicGame.Win = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Win.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'sky_background');

        this.game.add.sprite(150,200, 'victory')

		this.playAgainButton = this.add.button( 200, 400, 'retryButton', this.playAgain, this);
        this.menuButton = this.add.button( 400, 400, 'mainMenuButton', this.toMainMenu, this);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	playAgain: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	},

    toMainMenu: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('MainMenu');

	}

};
