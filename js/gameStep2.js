var gameStateStep2 = function(){
    this.characterSprite = null;
    this.backgroundSprite = null;
    this.cursorKeys = null;
    this.spacebarKey = null;
};

gameStateStep2.prototype = { 
    // Assets loading - do not use asssets here
    preload: function () {
        // Load this images, available with the associated keys later
        tutorialGame.load.image('background', 'assets/background.jpg');
        tutorialGame.load.image('character', 'assets/Sara.png');
    },
    // Called after preload - create sprites,... using assets here
    create: function () {
        this.backgroundSprite = tutorialGame.add.sprite(0, 0, 'background');
        this.characterSprite = tutorialGame.add.sprite(20, 300, 'character');

        // Shortcut method to create 4 inputs for the arrow keys
        this.cursorKeys = tutorialGame.input.keyboard.createCursorKeys();
        // Creation of a specific key observer
        this.spacebarKey = tutorialGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    // Called for each refresh
    update: function (){
        var characterSpeed = 4;
        if(this.cursorKeys.up.isDown){
            this.characterSprite.y -= characterSpeed;
        }
        if(this.cursorKeys.down.isDown){
            this.characterSprite.y += characterSpeed;
        }
        if(this.cursorKeys.left.isDown){
            this.characterSprite.x -= characterSpeed;
        }
        if(this.cursorKeys.right.isDown){
            this.characterSprite.x += characterSpeed;
        }
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
