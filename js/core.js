
//The game will be displayed in the gameDiv HTML element, and will take a 800x600 space
var tutorialGame = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
//All game states
tutorialGame.state.add("MenuState", menu);
tutorialGame.state.add("GameStateStep1", gameStateStep1);
tutorialGame.state.add("GameStateStep2", gameStateStep2);
tutorialGame.state.add("GameStateStep3", gameStateStep3);
tutorialGame.state.add("GameStateStep4", gameStateStep4);
tutorialGame.state.add("GameStateStep5", gameStateStep5);
//Initial state
//tutorialGame.state.start("MenuState");
tutorialGame.state.start("GameStateStep5");


