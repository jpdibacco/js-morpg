// Login Scene
(function(){

  var LoginScene = function(game) {
  };

  // Preload
  LoginScene.prototype.preload = function() {
    console.log('Login preload');

    // Fonts
    var fontFile = (navigator.isCocoonJS) ? 'default.xml' : 'default_desktop.xml';
    this.load.bitmapFont('default', 'assets/fonts/default.png', 'assets/fonts/' + fontFile);

    var fontFile2 = (navigator.isCocoonJS) ? 'font_large.xml' : 'font_large_desktop.xml';
    this.load.bitmapFont('font_large', 'assets/fonts/font_large.png', 'assets/fonts/' + fontFile2);

    // Background
    phaser.load.image('background', 'assets/images/login_background2.jpg');

    // Input
    phaser.load.image('input', 'assets/images/input.png');

    // Button
    phaser.load.image('login_btn', 'assets/images/button_login.png');
  };

  // Create
  LoginScene.prototype.create = function() {
    this.stage.backgroundColor = 0x2d2d2d;
    var background = phaser.add.sprite(0, 0, 'background');
    background.alpha = 0.4;

    var title = this.add.bitmapText(phaser.canvas.width/2, 80, 'font_large', 'js-morpg', 72);
    title.x -= title.textWidth/2;

    var subtitle_text = 'Javascript + WebSockets = Awesome';
    var subtitle = this.add.bitmapText(phaser.canvas.width/2, 80+title.textHeight, 'default', subtitle_text, 16);
    subtitle.x -= subtitle.textWidth/2;

    var form       = phaser.add.group();
    var username   = form.create(0, 0, 'input');
    username.width = 250;
    var password   = form.create(0, 50, 'input');
    password.width = 250;
    var loginBtn   = form.create(0, 100, 'login_btn');
    loginBtn.width = 250;
    form.x         = phaser.canvas.width/2 - 250/2;
    form.y         = 210;

    window.placeholder1 = phaser.add.bitmapText(form.x + 15, form.y + 10, 'default', 'Username', 16);
    placeholder1.alpha = 0.7;

    window.placeholder2 = phaser.add.bitmapText(form.x + 15, form.y + 60, 'default', 'Password', 16);
    placeholder2.alpha = 0.7;

    var login_text = phaser.add.bitmapText(form.x + (250/2), form.y + 106, 'font_large', 'Login', 30);
    login_text.x -= login_text.textWidth/2;

    // CocoonJS Fix
    var fake = this.game.add.image(0, 0, '');
  };

  // Update
  LoginScene.prototype.update = function() {

  };

  // Render
  LoginScene.prototype.render = function() {
    // phaser.debug.cameraInfo(phaser.camera, 20, 20);
  };

  // initGame
  LoginScene.prototype.initGame = function() {
    this.state.start('game');
  };

  // game.scenes.login = LoginScene;
  phaser.state.add('Login', LoginScene);

})();