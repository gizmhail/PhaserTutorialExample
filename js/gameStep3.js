var gameStateStep3 = function(){
    this.characterSprite = null;
    this.backgroundSprite = null;
    this.cursorKeys = null;
    this.spacebarKey = null;
};

gameStateStep3.prototype = { 
    // Assets loading - do not use asssets here
    preload: function () {
        // Load this images, available with the associated keys later
        tutorialGame.load.image('background', 'assets/background.jpg');
        // Each sprite is 54x55 . -1 means we don't limit to a number of sprites,
        //  0 is the margin of the file, 10 the spacing between each sprites
        tutorialGame.load.spritesheet('characterFrames', 'assets/SaraFullSheet7.png', 54,55,-1, 0 ,10);
    },
    // Called after preload - create sprites,... using assets here
    create: function () {
        // Create a sprite
        this.backgroundSprite = tutorialGame.add.sprite(0, 0, 'background');
        this.characterSprite = tutorialGame.add.sprite(20, 300, 'characterFrames');
        
        // Add animations
        this.characterSprite.animations.add("up",[0,1,2,3,4,5,6,7,8]);
        this.characterSprite.animations.add("left",[13,14,15,16,17,18,19,20,21]);
        this.characterSprite.animations.add("down",[26,27,28,29,30,31,32,33,34]);
        this.characterSprite.animations.add("right",[39,40,41,42,43,44,45,46,47]);
        
        // Shortcut method to create 4 inputs for the arrow keys
        this.cursorKeys = tutorialGame.input.keyboard.createCursorKeys();
        // Creation of a specific key observer
        this.spacebarKey = tutorialGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    // Called for each refresh
    update: function (){
        var characterSpeed = 4;
        var moving = false;
        var walkAnimationSpeed = 10;
        var walkAnimationLooping = true;//true means that the animation will loop once finished
        if(this.cursorKeys.left.isDown){
            this.characterSprite.x -= characterSpeed;
            if(!moving) this.characterSprite.animations.play("left",walkAnimationSpeed,walkAnimationLooping);
            moving = true;
        }
        if(this.cursorKeys.right.isDown){
            this.characterSprite.x += characterSpeed;
            if(!moving) this.characterSprite.animations.play("right",walkAnimationSpeed,walkAnimationLooping);
            moving = true;
        }
        if(this.cursorKeys.up.isDown){
            this.characterSprite.y -= characterSpeed;
            if(!moving) this.characterSprite.animations.play("up",walkAnimationSpeed,walkAnimationLooping);
            moving = true;
        }
        if(this.cursorKeys.down.isDown){
            this.characterSprite.y += characterSpeed;
            if(!moving) this.characterSprite.animations.play("down",walkAnimationSpeed,walkAnimationLooping);
            moving = true;
        }
        if(!moving){
            this.characterSprite.frame = 26;
        }
        // Tutorial test
        if(this.spacebarKey.isDown){
            this.characterSprite.scale.set(2,2);
        }else{            
            this.characterSprite.scale.set(1,1);
        }
    },
    // Called after the renderer rendered - usefull for debug rendering, ...
    render: function  () {
    
    }
};
