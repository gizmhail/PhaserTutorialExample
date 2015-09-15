var gameStateStep4 = function(){
    this.characterSprite = null;
    this.backgroundSprite = null;
    this.ballSprite = null;
    this.cursorKeys = null;
    this.spacebarKey = null;
    this.debug = false;
};

gameStateStep4.prototype = { 
    // Assets loading - do not use asssets here
    preload: function () {
        // Load this images, available with the associated keys later
        tutorialGame.load.image('background', 'assets/background.jpg');
        tutorialGame.load.image('character', 'assets/Sara.png');
        // Each sprite is 54x55 . -1 means we don't limit to a number of sprites,
        //  0 is the margin of the file, 10 the spacing between each sprites
        tutorialGame.load.spritesheet('characterFrames', 'assets/SaraFullSheet7.png', 54, 55, -1, 0 ,10);
        tutorialGame.load.spritesheet('ballFrames', 'assets/ball_animation.png', 45, 45);
    },
    // Called after preload - create sprites,... using assets here
    create: function () {
        // Create a sprite
        this.backgroundSprite = tutorialGame.add.sprite(0, 0, 'background');
        //tutorialGame.stage.backgroundColor = "#FFFFFF";//Usefull for presentation gif capture
        this.ballSprite = tutorialGame.add.sprite(90, 325, 'ballFrames');
        this.ballSprite.scale.set(0.5,0.5);
        this.characterSprite = tutorialGame.add.sprite(20, 300, 'characterFrames');

        // Add animations
        this.characterSprite.animations.add("up",[0,1,2,3,4,5,6,7,8]);
        this.characterSprite.animations.add("left",[13,14,15,16,17,18,19,20,21]);
        this.characterSprite.animations.add("down",[26,27,28,29,30,31,32,33,34]);
        this.characterSprite.animations.add("right",[39,40,41,42,43,44,45,46,47]);
        this.ballSprite.animations.add("rolling");

        // Shortcut method to create 4 inputs for the arrow keys
        this.cursorKeys = tutorialGame.input.keyboard.createCursorKeys();
        // Creation of a specific key observer
        this.spacebarKey = tutorialGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Physics engine initialisation (optional for arcade engine, need for other ones)
        tutorialGame.physics.startSystem(Phaser.Physics.ARCADE);
        // Add a physical body to the sprite
        tutorialGame.physics.enable(this.characterSprite, Phaser.Physics.ARCADE);
        // The sprite will collide with the borders
        this.characterSprite.body.collideWorldBounds = true;
        // We limit the physic body to a smaller part of the sprite (it contains white spaces)
        this.characterSprite.body.setSize(15, 35, 25, 20);
        //Ball body
        tutorialGame.physics.enable(this.ballSprite, Phaser.Physics.ARCADE);
        this.ballSprite.body.collideWorldBounds = true;
        this.ballSprite.body.bounce.set(1,1);
        this.ballSprite.body.mass = 0.5;
    },
    // Called for each refresh
    update: function (){
        var characterSpeed = 4;
        var moving = false;
        var walkAnimationSpeed = 10;
        var walkAnimationLooping = true;//true means that the animation will loop once finished
        if(this.cursorKeys.left.isDown){
            this.characterSprite.body.velocity.x -= characterSpeed;
            if(!moving) this.characterSprite.animations.play("left",walkAnimationSpeed,walkAnimationLooping);
            moving = true;
        }else if(this.cursorKeys.right.isDown){
            this.characterSprite.body.velocity.x += characterSpeed;
            if(!moving) this.characterSprite.animations.play("right",walkAnimationSpeed,walkAnimationLooping);
            moving = true;
        }else{
            this.characterSprite.body.velocity.x *= 0.8;
        }
        if(this.cursorKeys.up.isDown){
            this.characterSprite.body.velocity.y -= characterSpeed;
            if(!moving) this.characterSprite.animations.play("up",walkAnimationSpeed,walkAnimationLooping);
            moving = true;
        }else if(this.cursorKeys.down.isDown){
            this.characterSprite.body.velocity.y += characterSpeed;
            if(!moving) this.characterSprite.animations.play("down",walkAnimationSpeed,walkAnimationLooping);
            moving = true;
        }else {
            this.characterSprite.body.velocity.y *= 0.8;            
        }
        if(!moving){
            this.characterSprite.frame = 26;
            this.characterSprite.body.velocity.x = 0;
            this.characterSprite.body.velocity.y = 0;
        }
        var maxCharacterVelocity = 300;
        this.characterSprite.body.maxVelocity.set(maxCharacterVelocity,maxCharacterVelocity);    

        // Ball deceleration
        this.ballSprite.body.velocity.x *= 0.98;
        this.ballSprite.body.velocity.y *= 0.98;
        // Collision check (basic collision, square body against square body - we will improve it in next step)
        tutorialGame.physics.arcade.collide(this.characterSprite, this.ballSprite, function(){
            console.log("Ball was touched by player");
            return true;
        });
        //Ball animation (relative to its velocity)
        if(this.ballSprite.body.velocity.getMagnitude() > 2){
            var animationSpeed = Math.floor(15*Math.min(this.ballSprite.body.velocity.getMagnitude(), 100)/100);
            var rollingBallAnimation = this.ballSprite.animations.getAnimation("rolling");
            if (rollingBallAnimation.isPlaying) {
               rollingBallAnimation.speed = animationSpeed;
            } else {
                this.ballSprite.animations.play("rolling", animationSpeed, true);
            }
        }else{
            this.ballSprite.animations.stop("rolling");
        }


        // Tutorial debug
        if(this.spacebarKey.isDown){
            this.debug = true;
        }else{            
            this.debug = false;
        }
    },
    // Called after the renderer rendered - usefull for debug rendering, ...
    render: function  () {
        if(this.debug){
            tutorialGame.debug.body(this.characterSprite);
            tutorialGame.debug.body(this.ballSprite);
        }else{
            tutorialGame.debug.reset();
        }
    }
};
