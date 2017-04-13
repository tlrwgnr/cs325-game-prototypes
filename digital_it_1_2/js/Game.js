
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    // Create your own variables.
    this.bouncy = null;
    this.player = null;
    this.cursors = null;
    this.letter = null;
    this.ground = null;
    this.platforms = null;
    this.music = null;
    this.getLetterSFX = null;
    this.tileBack = null;
    this.enemies = null;
    this.bossDoor = null;
    this.playerHasLetter = false;
};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Create a sprite at the center of the screen using the 'logo' image.
        // this.bouncy = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        // // Anchor the sprite at its center, as opposed to its top-left corner.
        // // so it will be truly centered.
        // this.bouncy.anchor.setTo( 0.5, 0.5 );
        //
        // // Turn on the arcade physics engine for this sprite.
        // this.game.physics.enable( this.bouncy, Phaser.Physics.ARCADE );
        // // Make it bounce off of the world bounds.
        // this.bouncy.body.collideWorldBounds = true;
        //
        // // Add some text using a CSS style.
        // // Center it in X, and position its top 15 pixels from the top of the world.
        // var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        // var text = this.game.add.text( this.game.world.centerX, 15, "Build something amazing.", style );
        // text.anchor.setTo( 0.5, 0.0 );
        //
        // // When you click on the sprite, you go back to the MainMenu.
        // this.bouncy.inputEnabled = true;
        // this.bouncy.events.onInputDown.add( function() { this.state.start('MainMenu'); }, this );
        //
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 800, 1000);

        this.tileBack = this.game.add.tileSprite(0,0,800,1000, 'game_bg').scale.setTo(1.5,1.75);
        this.music = this.add.audio('gameMusic');
        this.music.play();
        this.getLetterSFX = this.add.audio('getLetterSound');

        this.bossDoor = this.game.add.sprite(this.game.world.width-135,15,'bossDoor');
        this.game.add.sprite(this.game.world.width-135,15,'bossDoor').scale.setTo(.3,.3);
        this.bossDoor.scale.setTo(.3,.3);
        this.bossDoor.enableBody = true;

        this.player = this.game.add.sprite(this.game.world.width/2,this.game.world.height-200, 'playerSprite');
        // this.player.add.animations.add('left', [8, 9, 10, 11], 10, true);
        this.player.animations.add('right', [0,1,2,3,4,5,6,7], 5, true);
        this.player.events.onInputDown.add(function(){this.statet.start('GameOver');}, this)

        this.game.physics.arcade.enable(this.player);


        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        this.player.scale.setTo(.25, .25);
        this.player.body.setSize(200,450,100,0);

        this.letter = this.game.add.sprite(this.game.world.width-50,this.game.world.height-70, 'letterSprite');
        this.letter.scale.setTo(.25,.25);

        this.game.physics.arcade.enable(this.letter);
        this.game.physics.arcade.enable(this.bossDoor);

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        // ground
        {
            this.platforms.create(0,this.game.world.height-20, 'floorSprite').body.immovable = true;
            this.platforms.create(50,this.game.world.height-20, 'floorSprite').body.immovable = true;
            this.platforms.create(100,this.game.world.height-20, 'floorSprite').body.immovable = true;
            this.platforms.create(150,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(200,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(250,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(300,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(350,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(400,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(450,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(500,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(550,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(600,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(650,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(700,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(750,this.game.world.height-20, 'floorSprite').body.immovable = true;;
            this.platforms.create(800,this.game.world.height-20, 'floorSprite').body.immovable = true;;
        }
        // platforms
        {
            this.platforms.create(this.game.world.width-200,this.game.world.height-170, 'floorSprite').body.immovable = true;
            this.platforms.create(this.game.world.width-150,this.game.world.height-170, 'floorSprite').body.immovable = true;
            this.platforms.create(this.game.world.width-100,this.game.world.height-170, 'floorSprite').body.immovable = true;
            this.platforms.create(this.game.world.width-50,this.game.world.height-170, 'floorSprite').body.immovable = true;

            this.platforms.create(0,this.game.world.height-170, 'floorSprite').body.immovable = true;
            this.platforms.create(150,this.game.world.height-170, 'floorSprite').body.immovable = true;
            this.platforms.create(100,this.game.world.height-170, 'floorSprite').body.immovable = true;
            this.platforms.create(50,this.game.world.height-170, 'floorSprite').body.immovable = true;

            this.platforms.create(this.game.world.width/2,this.game.world.height-300, 'floorSprite').body.immovable = true;

            this.platforms.create(this.game.world.width-200,this.game.world.height-500, 'floorSprite').body.immovable = true;
            this.platforms.create(this.game.world.width-150,this.game.world.height-500, 'floorSprite').body.immovable = true;
            this.platforms.create(this.game.world.width-100,this.game.world.height-500, 'floorSprite').body.immovable = true;
            this.platforms.create(this.game.world.width-50,this.game.world.height-500, 'floorSprite').body.immovable = true;

            this.platforms.create(0,this.game.world.height-500, 'floorSprite').body.immovable = true;
            this.platforms.create(150,this.game.world.height-500, 'floorSprite').body.immovable = true;
            this.platforms.create(100,this.game.world.height-500, 'floorSprite').body.immovable = true;
            this.platforms.create(50,this.game.world.height-500, 'floorSprite').body.immovable = true;

            this.platforms.create(this.game.world.width/2,this.game.world.height-670, 'floorSprite').body.immovable = true;

            this.platforms.create(this.game.world.width-150,this.game.world.height-850, 'floorSprite').body.immovable = true;
            this.platforms.create(this.game.world.width-100,this.game.world.height-850, 'floorSprite').body.immovable = true;
            this.platforms.create(this.game.world.width-50,this.game.world.height-850, 'floorSprite').body.immovable = true;

            this.platforms.create(50,500, 'floorSprite').body.immovable = true;
        }



        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        {
            var enemy = this.enemies.create(this.game.world.width-200,this.game.world.height-235,'pigeon_left');
            enemy.scale.setTo(.25,.25);
            enemy.body.immovable = true;
            enemy = this.enemies.create(this.game.world.width-300,this.game.world.height-800,'pigeon_left');
            enemy.scale.setTo(.25,.25);
            enemy.body.immovable = true;
            enemy = this.enemies.create(this.game.world.width-450,this.game.world.height-650,'pigeon_left');
            enemy.scale.setTo(.25,.25);
            enemy.body.immovable = true;
            enemy = this.enemies.create(this.game.world.width-550,this.game.world.height-300,'pigeon_left');
            enemy.scale.setTo(.25,.25);
            enemy.body.immovable = true;
        }

        this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 1000, enemyMove, this);

        function enemyMove(enemies){
            for(enemy in enemies){
                enemy.body.velocity.x = Math.random()*100;
            }
        }


        // this.platforms.create(0,this.game.world.height-100, 'floorSprite');
        // this.platforms.create(50,this.game.world.height-100, 'floorSprite');
        this.platforms.create(0,0, 'floorSprite');
        this.platforms.enableBody = true;
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
    },

    update: function () {
        function playerGetLetter(player, letter){
            letter.kill();
            // this.getLetterSFX.play();
        }

        function playerReachDoor(player, door){
            console.log("door touched");
            door.kill();
        }

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // this.tileBack.tilePosition.y = 2;

        if(this.game.physics.arcade.collide(this.player, this.letter, playerGetLetter)){
            this.playerHasLetter = true;
        }
        if(this.game.physics.arcade.collide(this.player, this.enemies)){
            // this.state.start('GameOver');
            this.quitGame();
        }
        if(this.playerHasLetter){
            if(this.game.physics.arcade.collide(this.player, this.bossDoor, playerReachDoor)){
                this.winGame();
            }
        }


        var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown){
            this.player.body.velocity.x = -200;
            this.player.animations.play('right');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        } else {
            this.player.animations.stop();
            this.player.body.velocity.x = 0;
            this.player.frame = 4;
        }

        if (this.cursors.up.isDown && hitPlatform) {
            this.player.body.velocity.y = -600;
            // jumpfx.play();
        }
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        // this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 500, 500, 500 );

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        // this.state.start('MainMenu');
        this.music.stop();
        this.state.start('GameOver');

    },

    winGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        // this.state.start('MainMenu');
        this.music.stop();
        this.state.start('Win');

    }



};
