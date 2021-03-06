!function(){

    var baseVelocity = 170;

    function Character(params) {
        var self       = this;
        self._id       = params._id;
        self.name      = params.name;
        self.type      = 'remote';
        self.direction = params.direction || 'down';

        var posX       = params.x || 0;
        var posY       = params.y || 0;

        // Sprite config
        var characterSprite = 'player';

        if(params.group){
            self.group  = params.group;
            self.sprite = self.group.create(posX, posY, characterSprite);
        } else {
            self.sprite = phaser.add.sprite(posX, posY, characterSprite);
            phaser.physics.enable(self.sprite, Phaser.Physics.ARCADE);
        }

        self.sprite.name           = self.name;
        self.sprite.body.immovable = true;

        var text                   = phaser.add.bitmapText(100, 100, 'default', self.name, 16);
        self.playerName            = text;

        self.playerName.x          = (self.sprite.x + (self.sprite.width/2)) - (self.playerName.textWidth/2);
        self.playerName.y          = self.sprite.y - self.playerName.textHeight;

        self.sprite.animations.add('stand-down', [0]);
        self.sprite.animations.add('walk-down', [0, 1, 2]);

        self.sprite.animations.add('stand-left', [12]);
        self.sprite.animations.add('walk-left', [12, 13, 14]);

        self.sprite.animations.add('stand-right', [24]);
        self.sprite.animations.add('walk-right', [25, 26, 27]);

        self.sprite.animations.add('stand-up', [36]);
        self.sprite.animations.add('walk-up', [36, 37, 38]);

        self.playerName = text;
    }

    var onCollision = function(){
    };

    Character.prototype.update = function() {
        var self               = this;
        var player             = self.sprite,
        positionOffset         = 5;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        self.playerName.x = (player.x + (player.width/2)) - (self.playerName.textWidth/2);
        self.playerName.y = player.y - self.playerName.textHeight;

        phaser.physics.arcade.moveToXY(player, self.destinationX, self.destinationY, 10, baseVelocity);

        // if (self.destinationX && self.destinationX < player.x - positionOffset)
        // {
        //     player.body.velocity.x = -baseVelocity;
        //     self.direction = 'left';
        //     if ( parseInt(self.destinationX, 10) === parseInt(player.x, 10) ){
        //         self.destinationX = false;
        //     }
        // }
        // else if (self.destinationX && self.destinationX > player.x + positionOffset)
        // {
        //     player.body.velocity.x = baseVelocity;
        //     self.direction = 'right';
        //     if ( parseInt(self.destinationX, 10) === parseInt(player.x, 5) ){
        //         self.destinationX = false;
        //     }
        // }

        // if (self.destinationY && self.destinationY < player.y - positionOffset)
        // {
        //     player.body.velocity.y = -baseVelocity;
        //     self.direction = 'up';
        //     if ( parseInt(self.destinationY, 10) === parseInt(player.y, 10) ){
        //         self.destinationY = false;
        //     }
        // }
        // else if (self.destinationY && self.destinationY > player.y + positionOffset)
        // {
        //     player.body.velocity.y = baseVelocity;
        //     self.direction = 'down';
        //     if ( parseInt(self.destinationX, 10) === parseInt(player.x, 10) ){
        //         self.destinationX = false;
        //     }
        // }

        // if (self.destinationY && parseInt(self.destinationY, 10) !== parseInt(player.y, 10)) {
        //     var playerY  = player.y,
        //     destinationY = self.destinationY;

        //     if (playerY > destinationY){
        //         player.body.velocity.y = -baseVelocity;
        //         self.direction         = 'up';
        //     } else if (playerY < destinationY) {
        //         player.body.velocity.y = baseVelocity;
        //         self.direction         = 'down';
        //     }
        // } else {
        //     // if(self.destinationY !== false){
        //     //     player.y = self.destinationY;
        //     // }
        //     self.destinationY = false;
        // }

        // if (self.destinationX && parseInt(self.destinationX, 10) !== parseInt(player.x, 10)) {
        //     if (player.x < self.destinationX) {
        //         player.body.velocity.x = baseVelocity;
        //         self.direction         = 'right';
        //     } else if (player.x > self.destinationX) {
        //         player.body.velocity.x = -baseVelocity;
        //         self.direction         = 'left';
        //     }
        // } else {
        //     // if(self.destinationX !== false){
        //     //     player.x = self.destinationX;
        //     // }
        //     self.destinationX = false;
        // }

        if( player.body.velocity.x || player.body.velocity.y ) {
            self.sprite.animations.play('walk-'+self.direction, 5, true);
        } else {
            self.sprite.animations.play('stand-'+self.direction, 5, true);
        }

        if(game.groups.collisionGroup){
            phaser.physics.arcade.collide(self.sprite, game.groups.collisionGroup, onCollision, null, this);
        }
    };

    game.entities           = game.entities || {};
    game.entities.Character = Character;

}();