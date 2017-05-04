BasicGame.ChooseShip = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.ChooseShip.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.add.sprite(0, 0, 'sky_background').scale.setTo(.75,.75);
		this.add.sprite(150,200,'logoTitle');

		this.carrierButton = this.add.button( 350, 300, 'carrierButton', this.chooseCarrier, this);
        this.destroyerButton = this.add.button( 350, 350, 'destroyerButton', this.chooseDestroyer, this);
        this.stealth_cruiserButton = this.add.button( 350, 400, 'stealth_cruiserButton', this.chooseStealth_Cruiser, this);
        this.corvetteButton = this.add.button( 350, 450, 'corvetteButton', this.chooseCorvette, this);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

    chooseCarrier: function(pointer){
        this.game.state.states['Game'].playerShip = 'carrier';
        this.state.start('Game');
    },

    chooseDestroyer: function(pointer){
        this.game.state.states['Game'].playerShip = 'destroyer';
        this.state.start('Game');
    },

    chooseStealth_Cruiser: function(pointer){
        this.game.state.states['Game'].playerShip = 'stealth_cruiser';
        this.state.start('Game');
    },

    chooseCorvette: function(pointer){
        this.game.state.states['Game'].playerShip = 'corvette';
        this.state.start('Game');
    }

};
