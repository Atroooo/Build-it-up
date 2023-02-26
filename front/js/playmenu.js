class playmenu extends Phaser.Scene {
  constructor() {
    super("playmenu");
  }

  create() {
    this.music = this.sound.add("sonictheme",{ volume:0.06});
    this.music.play()
    this.play = this.add.sprite(game.config.width * 0.4499, game.config.height * 0.35, "play");
    //set the width of the sprite
            this.play.displayWidth = 270;
            //scale evenly
            this.play.scaleY = this.play.scaleX;

    this.play.depth = 100;

    this.play.setInteractive({  useHandCursor: true});
    this.play.on('pointerdown', () => this.startGame());
        this.play.on("pointerdown", () => {
            this.music.stop();
        });
    this.play.setOrigin(0, 0);
    this.play.setScrollFactor(0);




    this.info = this.add.sprite(game.config.width * 0.465, game.config.height * 0.50, "info");
    //set the width of the sprite
            this.info.displayWidth = 230;
            //scale evenly
            this.info.scaleY = this.info.scaleX;

    this.info.depth = 100;
    this.info.setOrigin(0, 0);
    this.info.setScrollFactor(0);
    this.info.setInteractive({  useHandCursor: true});
    this.info.on('pointerdown', () =>  this.startTuto() );

        this.info.on("pointerdown", () => {
            this.music.stop();
        });


    this.skybg = this.add.tileSprite(0, 0, game.config.width , game.config.height, "skybg");
    this.skybg.setOrigin(0, 0);
    this.skybg.setScrollFactor(0);


 

    // Add a second background layer. Repeat as in bg_1
    this.city = this.add.tileSprite(0, 0, game.config.width , game.config.height, "city");
    this.city.setOrigin(0, 0);
    this.city.setScrollFactor(0);
    // since this tile is shorter I positioned it at the bottom of he screen
    this.city.y = 21 * 22;
    

    // add sonic
    this.sonic = this.add.sprite(game.config.width * 1.5, game.config.height / 1.07, "sonic");
    //set the width of the sprite
            this.sonic.displayWidth = 200;
            //scale evenly
            this.sonic.scaleY = this.sonic.scaleX;


    // create an animation for the sonic
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers('sonic', { frames: [ 5, 6, 7] }),
      frameRate: 60,
      repeat: -1
    });
    this.sonic.play("run");
    // allow key inputs to control the sonic
    this.cursors = this.input.keyboard.createCursorKeys();

    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

    // making the camera follow the sonic
    this.myCam.startFollow(this.sonic);

    
  



 }
  startGame()
  {
    this.scene.launch('MainScene').launch('hud').stop();
    this.sound.add("button",{loop: false, volume:0.2}).play();

  }

  startTuto() {
    this.scene.stop();
    this.sound.add("button",{loop: false, volume:0.2}).play();
    this.scene.launch('tutoriel');
}



    update() {

 // move the sonic when the arrow keys are pressed
     if (this.cursors.left.isDown && this.sonic.x > 0) {
      this.sonic.x -= 3;
      this.sonic.scaleX = 1;

    } else if (this.cursors.right.isDown && this.sonic.x < game.config.width * 3) {
      this.sonic.x += 3;
      this.sonic.scaleX = -1;

    } 
    // scroll the texture of the tilesprites proportionally to the camera scroll

      this.city.tilePositionX += 2;
    this.skybg.tilePositionX += 1;




  }
 
}


