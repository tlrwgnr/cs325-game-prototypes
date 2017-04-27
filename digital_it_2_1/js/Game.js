BasicGame.Game = function(game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //  a reference to the currently running game (Phaser.Game)
    this.add; //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera; //  a reference to the game camera (Phaser.Camera)
    this.cache; //  the game cache (Phaser.Cache)
    this.input; //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load; //  for preloading assets (Phaser.Loader)
    this.math; //  lots of useful common math operations (Phaser.Math)
    this.sound; //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage; //  the game stage (Phaser.Stage)
    this.time; //  the clock (Phaser.Time)
    this.tweens; //  the tween manager (Phaser.TweenManager)
    this.state; //  the state manager (Phaser.StateManager)
    this.world; //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics; //  the physics manager (Phaser.Physics)
    this.rnd; //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    // Create your own variables.
    this.bouncy = null;
    this.player = null;
    this.cursors = null;
    this.letter = null;
    this.floor = null;
    this.platforms = null;
    this.music = null;
    this.getLetterSFX = null;
    this.tileBack = null;
    this.enemies = null;
    this.bossDoor = null;
    this.playerHasLetter = false;
    this.textBox = null;
    this.attack_button = null;
    this.evade_button = null;
    this.enemy = null;
    this.enemy_health = 20;

    // player stats
    this.player_health = null;
    this.player_defense = null;
    this.player_attack = null;
    this.player_fighters = null;

    this.playerDidAction = false;

    this.increase_player_health = null;
    this.increase_player_defense = null;
    this.increase_player_attack = null;
    this.increase_player_fighters = null;

    this.gametext = null;
    this.gametext_health = null;
    this.gametext_defense = null;
    this.gametext_attack = null;
    this.gametext_fighters = null;
    this.attackUp = function(){
        if(this.roll != 0){
            this.roll-=1;
            this.player_attack += 1;
            console.log(this.roll);
            this.updateStats();
            this.updateRoll();
        }
    }
    this.defenseUp = function(){
        if(this.roll != 0){
            this.roll-=1;
            this.player_defense += 1;
            this.updateStats();
            this.updateRoll();
        }
    }
    this.healthUp = function(){
        if(this.roll != 0){
            this.roll-=1;
            this.player_health += 1;
            this.updateStats();
            this.updateRoll();
        }
    }
    this.fightersUp = function(){
        if(this.roll != 0){
            this.roll-=1;
            this.player_fighters += 1;
            this.updateStats();
            this.updateRoll();
        }
    }
    this.rollDie =  function(){
        this.roll = Math.ceil(Math.random()*10);
        this.gametext.text = "You roll a " + this.roll;
    }
    this.updateStats = function(){
        this.gametext_health.text = "Health:" + this.player_health;
        this.gametext_attack.text = "Attack:" + this.player_attack;
        this.gametext_defense.text = "Defense:" + this.player_defense;
        this.gametext_fighters.text = "Fighters:" + this.player_fighters;
    }
    this.updateRoll = function(){
        if(this.roll >= 0){
            this.gametext.text = this.roll + " activity points remaining."
        }
    }
    this.attack = function(){
        console.log("attack");
        if(!this.playerDidAction){
            this.gametext.text = "You hit enemy for " + this.player_attack + " damage!"
            this.enemy_health -= this.player_attack;
            this.playerDidAction = true;
        }
        else{
            this.gametext.text = "Already acted, end turn to roll again";
        }

    }
    this.evade = function(){
        console.log("evade");
        if(!this.playerDidAction){
            if((Math.random()*10) >= 5){
                this.gametext.text = "You evaded the hit!"
            }
            else{
                this.gametext.text = "You failed to evade! Took " + (this.player_defense - 15) + " damage!";
                this.player_health += this.player_defense - 15;
            }
            this.playerDidAction = true;
        }
        else{
            this.gametext.text = "Already acted, end turn to roll again";
        }

    }
    this.endTurn = function(){
        this.rollDie();
        this.playerDidAction = false;
    }

    this.roll = null;
};



BasicGame.Game.prototype = {

    create: function() {

        this.music = this.add.audio('gameMusic');
        this.music.play();
        this.floor = new Phaser.Rectangle(this.game.world.width - 200, 0, 200, 600);
        // this.game.debug.geom(this.floor, '#A9A9A9');


        this.tileBack = this.add.sprite(0, 0, 'space_bg2').scale.setTo(.17, .17);
        this.add.sprite(this.game.world.width - 150, 50, 'destroyer').scale.setTo(.5, .5);

        this.enemy = this.add.sprite(300, 50, 'carrier');
        this.textBox = this.add.sprite(0, this.game.world.height - 250, 'textBox');

        this.playerDidAction = false;

        this.player_health = 10;
        this.player_defense = 10;
        this.player_attack = 10;
        this.player_fighters = 1;
        this.enemy_health = 30;

        this.roll = Math.ceil(Math.random()*10);

        var style = {
            font: "32px Arial",
            fill: "#ff0044",
            wordWrap: true,
            wordWrapWidth: 300,
            align: "center"
        };
        var statStyle = {
            font: "20px Arial",
            fill: "#5500ff",
            wordWrap: true,
            wordWrapWidth: 600,
            align: "center"
        };

        this.attack_button = this.game.add.button(650, 420, 'attack_button', this.attack, this, 2, 1, 0);
        this.evade_button = this.game.add.button(650, 480, 'evade_button', this.evade, this, 2, 1, 0);
        this.end_button = this.game.add.button(650, 530, 'end_button', this.endTurn, this, 2, 1, 0);

        this.gametext = this.game.add.text(100, this.game.world.height-150, "You roll a " + this.roll, style);
        this.gametext_health = this.game.add.text(400, this.game.world.height-200, "Health:" + this.player_health, statStyle);
        this.gametext_defense = this.game.add.text(400, this.game.world.height-150, "Defense:" + this.player_defense, statStyle);
        this.gametext_attack = this.game.add.text(400, this.game.world.height-100, "Attack:" + this.player_attack, statStyle);
        this.gametext_fighters = this.game.add.text(400, this.game.world.height-50, "Fighters:" + this.player_fighters, statStyle);

        this.increase_player_health = this.game.add.button(500, this.game.world.height-220, 'increase_button', this.healthUp, this, 2, 1, 0);
        this.increase_player_defense = this.game.add.button(500, this.game.world.height-170, 'increase_button', this.defenseUp, this, 2, 1, 0);;
        this.increase_player_attack = this.game.add.button(500, this.game.world.height-120, 'increase_button', this.attackUp, this, 2, 1, 0);;
        this.increase_player_fighters = this.game.add.button(500, this.game.world.height-70, 'increase_button', this.fightersUp, this, 2, 1, 0);;


    },

    update: function() {
        if(this.player_health <= 0){
            this.quitGame();
        }
        if(this.enemy_health <= 0){
            this.winGame();
        }

    },


    debug: function() {

    },

    quitGame: function(pointer) {


        this.music.stop();
        this.state.start('GameOver');

    },

    winGame: function(pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        // this.state.start('MainMenu');
        this.music.stop();
        this.state.start('Win');

    }



};
