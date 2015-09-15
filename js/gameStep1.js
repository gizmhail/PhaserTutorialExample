var gameStateStep1 = function(){
    this.characterSprite = null;
    this.backgroundSprite = null;
};

gameStateStep1.prototype = { 
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
    },
    // Called for each refresh
    update: function (){
   
    },
    // Called after the renderer rendered - usefull for debug rendering, ...
    render: function  () {
    
    }
};
