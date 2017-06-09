var game = new Phaser.Game("100%", "100%", Phaser.CANVAS,'gameContainer');

window.onload = function () {
	game.stage.backgroundColor = '#ffffff';

	var poleX = 0;
	var poleY = game.height*0.55;

	var character;
    var placedPoles;
	var poleGroup;

    var characterStop;

    /*Circles*/
    var c1;
    var c2;
    var c3;
    var c4;
    var c5;
    var c6;
    var c7;

    var bear;
    var bone;
    var bonePosition;

    var anim;

	var boneFound = false;

	var t1;
	var t2;
	var t3;
	var t4;

	var c2NotSeen = true;
	var c3NotSeen = true;
	var c4NotSeen = true;
	var c5NotSeen = true;
	var c6NotSeen = true;
	var c7NotSeen = true;
	var nextButton;
	var rectangle;

	var charSpeed=7;

	var langChosen = localStorage.getItem('lang');  //en ali slo


	var mummy, kost1, kost2, kost3, kost4, bearBones;

     var play = function(game){}
     play.prototype = {
		preload:function(){
			game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.forceLandscape = true;
			game.scale.parentIsWindow = true;
			game.scale.refresh();

			game.load.image("character", "images/ninja.png");
			game.load.image("pole", "images/pole13.png");
			game.load.image("bear", "images/medved-dlaka.png");
			game.load.image("bearBones", "images/medved-skelet.png");
			game.load.image("bone", "images/kost-prazna.png");
			game.load.spritesheet('mummy', 'images/ziva-gigant.png',240,293,8);
			game.load.image("background", "images/wallpaper.png");

			//zive s kostjo
			game.load.image("kost1", "images/kost-polna.png");
			game.load.image("kost2", "images/kost-polovica.png");
			game.load.image("kost3", "images/kost-cetrtina.png");
			game.load.image("kost4", "images/kost-osmina.png");

            /*Load circles - glede na jezik */
			if(langChosen === 'en'){
				//english
				/*game.load.image("c1", "images/trak1_en.png");
				game.load.image("c3", "images/trak2_en.png");
				game.load.image("c5", "images/trak3_en.png");
				game.load.image("c7", "images/now.png");*/

				game.load.image("c1", "images/circle11_en.png");
	            game.load.image("c2", "images/circle21_en.png");
	            game.load.image("c3", "images/circle31_en.png");
	            game.load.image("c4", "images/circle41_en.png");
	            game.load.image("c5", "images/circle51_en.png");
	            game.load.image("c6", "images/circle61_en.png");
	            game.load.image("c7", "images/now.png");
			}
			else{
				//slovenian
				/*game.load.image("c1", "images/trak1.png");
				game.load.image("c3", "images/trak2.png");
				game.load.image("c5", "images/trak3.png");
				game.load.image("c7", "images/danes.png");*/


				game.load.image("c1", "images/circle11.png");
	            game.load.image("c2", "images/circle21.png");
	            game.load.image("c3", "images/circle31.png");
	            game.load.image("c4", "images/circle41.png");
	            game.load.image("c5", "images/circle51.png");
	            game.load.image("c6", "images/circle61.png");
	            game.load.image("c7", "images/danes.png");
			}

			//teh ne rabimo ce mamo trakove
			/*game.load.image("c2", "images/transparent.png");
			game.load.image("c4", "images/transparent.png");
			game.load.image("c6", "images/transparent.png");*/

            game.load.image("bonePosition", "images/pb.png");

			game.load.spritesheet('button', 'images/nextBtn1.png', 291, 297);


		},
		create:function(){
			//console.log(game.width);

 			var circleOffset = 100;

			background = game.add.tileSprite(0, -70, 2000, 1000, "background");
			background.inputEnabled = true;

			characterStop = false;
			placedPoles = 0;
			poleGroup = game.add.group();

			/*Create circles and add click handler*/
			var circle_pole = poleY - 8;
			c1 = game.add.sprite(game.width*0.02,circle_pole,"c1");
			game.physics.enable(c1, Phaser.Physics.ARCADE);


			c2= game.add.sprite(game.width*0.2,circle_pole,"c2");
			game.physics.enable(c2, Phaser.Physics.ARCADE);


			c3= game.add.sprite(game.width-game.width*0.2-c1.width,circle_pole,"c3");
			game.physics.enable(c3, Phaser.Physics.ARCADE);
			c3.inputEnabled = true;
			//c3.events.onInputDown.add(move3, this);


			c4 = game.add.sprite(game.width-game.width*0.02-c1.width,circle_pole,"c4");
			game.physics.enable(c4, Phaser.Physics.ARCADE);

			var razmak = c3.x-(c2.width+c2.x);

			c5= game.add.sprite(c4.x+razmak,circle_pole,"c5");
			game.physics.enable(c5, Phaser.Physics.ARCADE);
			c5.inputEnabled = true;
			//c5.events.onInputDown.add(move5, this);

			var r = c2.x -(c1.x+c1.width);

			c6= game.add.sprite(c5.x+c5.width+r,circle_pole,"c6");
			game.physics.enable(c6, Phaser.Physics.ARCADE);


			c7= game.add.sprite(c6.x+razmak,circle_pole,"c7");
			game.physics.enable(c7, Phaser.Physics.ARCADE);
			c7.inputEnabled = true;
			//c7.events.onInputDown.add(moveCharacterLast, this);

			/*
			console.log(c1.x);
			console.log(c2.x);
			console.log(c3.x);
			console.log(c4.x);
			console.log(c5.x);
			console.log(c6.x);
			console.log(c7.x);*/

			/*Character*/
			mummy = game.add.sprite(0, poleY-260, 'mummy');
		   // mummy.scale.set(1);
		    mummy.smoothed = false;
		    game.physics.enable(mummy, Phaser.Physics.ARCADE);
		    anim = mummy.animations.add('walk');
			mummy.alpha=0;

		    anim.onStart.add(animationStarted, this);



		    /*Bear*/
		    bear = game.add.sprite(game.width*0.15,poleY-80,"bear");
		    bear.anchor.setTo(0.5, 0.5);
		    bear.alpha = 1;

		    bearBones = game.add.sprite(game.width*0.15,poleY-80,"bearBones");
		    bearBones.anchor.setTo(0.5, 0.5);
		    bearBones.alpha = 0;

		    /*Bone*/
		    bone = game.add.sprite(game.width*0.15+40,poleY-80,"bone");
		    bone.anchor.setTo(0.5, 0.5);
		    game.physics.enable(bone, Phaser.Physics.ARCADE);
			bone.inputEnabled = true;
			bone.alpha = 0;



		    /*Text1 -> trenutno loadamo kar sliko*/
		    var style = { font: "normal 30px MyriadPro-Regular"};

		    //  The Text is positioned at 0, 100
		    rectangle = game.add.graphics(game.width, game.height);
		    rectangle.lineStyle(2, 0x0000FF, 1);
    		rectangle.drawRect(game.width*0.4, game.height*0.1, 300, 100);

			//text glede na jezik
			var langX = game.width*0.3;
			var langY = game.height*0.09;

			var t1_txt, t2_txt, t3_txt, t4_txt;
			if(langChosen === 'en'){
				t1_txt =	"The bone of the bear is full of ¹⁴C. \n Which year do I have to travel for it \n to be completely gone?";
			    t2_txt = "It is still half full.";
	 			t3_txt = "The amount of ¹⁴C halved again!";
				t4_txt = "It is still there!";
			}
			else{
				t1_txt = "Ta kost je polna ¹⁴C.\nKaj meniš, v katero leto moram odpotovati,\nda ga v kosti ne bo več?";
			    t2_txt = "V kosti ga je še polovica.";
	 			t3_txt = "Spet se je razpolovil!";
				t4_txt = "Še vedno je notri!";
			}

			t1 = game.add.text(langX, langY, t1_txt, style);
			t1.alpha = 0;

			t2 = game.add.text(langX, langY, t2_txt, style);
			t2.alpha = 0;

			t3 = game.add.text(langX, langY, t3_txt, style);
			t3.alpha = 0;

			t4 = game.add.text(game.width*0.75, langY, t4_txt, style);
			t4.alpha = 0;

		    //Button to quiz
		    nextButton = game.add.button(game.width - 100, game.height/3, 'button', goToQuiz, this, 2, 1, 0);
		    nextButton.alpha = 0;

		    game.time.events.add(2000, function() {
		    	game.add.tween(bear).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		    	game.add.tween(bearBones).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
		    }, this);
		    game.time.events.add(4000, function() {
		    	game.add.tween(bearBones).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		    }, this);
		    game.time.events.add(5000, function() {
		    	game.add.tween(bone).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);

		    }, this);
		    game.time.events.add(6000, function() {
		    	mummy.alpha=1;
		    	bone.alpha=0;

		    	bear.destroy();
		    	bearBones.destroy();
		    	moveCharacter();


		    }, this);


			//zive s kostjo
			kost1 = game.add.sprite(game.width * 0.05+5,poleY-260,"kost1");
		    kost1.alpha = 0;

		    kost2 = game.add.sprite(game.width * 0.05+5,poleY-250,"kost2");
		    kost2.alpha = 0;

		    kost3 = game.add.sprite(game.width * 0.05+5,poleY-250,"kost3");
		    kost3.alpha = 0;

		    kost4 = game.add.sprite(game.width*0.60,poleY-250,"kost4");
		    kost4.alpha = 0;

			game.physics.startSystem(Phaser.Physics.ARCADE);


			addPole();

		},
		update:function(){

			var limit = 30;
			var charPosition = game.width * 0.05;

			if(Math.floor(c2.x) < limit && c2NotSeen){
				c2NotSeen = false;

			}
			if(Math.floor(c3.x) < limit && c3NotSeen){
				stopWalking();
				showText(t2);
				c3NotSeen = false;

				/*Zamenjamo zivo z zivo s kostjo*/
				kost2.alpha = 1;
				mummy.alpha = 0;
				background.inputEnabled = true;
				background.events.onInputDown.add(move5, this);
			}
			if(Math.floor(c4.x) < limit && c4NotSeen){
				c4NotSeen = false;

			}
			if(Math.floor(c5.x) < limit && c5NotSeen){
				stopWalking();
				showText(t3);
				c5NotSeen = false;

				/*Zamenjamo zivo z zivo s kostjo*/
				kost3.alpha = 1;
				mummy.alpha = 0;
				background.inputEnabled = true;
				background.events.onInputDown.add(moveCharacterLast, this);
			}
			if(Math.floor(c6.x) < limit && c6NotSeen){
				stopWalking();
				c6NotSeen = false;
			}
			if(mummy.x > (c7.x-c7.width+10) && c7NotSeen){
				stopWalking();
				showText(t4);
				c7NotSeen = false;
				/*Zamenjamo zivo z zivo s kostjo*/
				kost4.alpha = 1;
				mummy.alpha = 0;
				nextButton.alpha = 1;
			}
			/*if(mummy.x >= game.width  && !c7NotSeen){
				alert(mummy.x + ' vs ' + game.width);
				window.location = "quiz.html";
			}*/
			if(mummy.x >= game.width){
				game.destroy();
				top.location.href = "quiz.html";
			}
			if(mummy.x > charPosition && !boneFound){
				stopWalking();
				bone.destroy();
				boneFound = true;
				showText(t1);
				background.events.onInputDown.add(move3, this);

				/*Zamenjamo zivo z zivo s kostjo*/
				kost1.alpha = 1;
				mummy.alpha = 0;
			}
		},
		resize: function(){
			if(c1!=null){
				c1.x = game.width*0.02;
			}
			if(c2!=null){
				c2.x = game.width*0.2;
			}
			if(c3!=null){
				c3.x = game.width-game.width*0.2-c1.width;
			}
			if(c4!=null){
				c4.x = game.width-game.width*0.02-c1.width
			}


			if(c5!=null){
				var razmak = c3.x-(c2.width+c2.x);
				c5.x = c4.x+razmak;
			}


			if(c6!=null){
				var r = c2.x -(c1.x+c1.width);
				c6.x = c5.x+c5.width+r;
			}

			if(c7!=null){
				c7.x = 3*game.width-(game.width/8)*7;
			}

			if(mummy!=null){
				mummy.x = game.width * 0.15;
			}
			//pole.y = poleY;

		},
		render: function(){
			//game.debug.geom(rectangle, '#d6dee1');
		}
	}
    game.state.add("Play",play);
    game.state.start("Play");



    function showText(t){
    	t.alpha = 1;
    	bone.alpha = 0;
    //	c3.tint = '#393E41';
    }

    function move5(){
		characterStop = true;
		anim.play(charSpeed, true);
		kost2.alpha = 0;
		mummy.alpha = 1;
		t1.alpha = 0;
		t2.alpha = 0;
		t3.alpha = 0;
		t4.alpha = 0;
		background.events.onInputDown.remove(move5, this);
	}
	function move3(){
		characterStop = true;
		anim.play(charSpeed, true);
		kost1.alpha = 0;
		mummy.alpha = 1;
		t1.alpha = 0;
		t2.alpha = 0;
		t3.alpha = 0;
		t4.alpha = 0;
		background.events.onInputDown.remove(move3, this);
	}

	 function moveCharacter(){
		anim.play(charSpeed, true);
		game.physics.arcade.velocityFromAngle(mummy.angle, 120, mummy.body.velocity);
		t3.alpha = 0;

	}
	 function moveCharacterLast(){
		anim.play(charSpeed, true);
		game.physics.arcade.velocityFromAngle(mummy.angle, 150, mummy.body.velocity);
		t3.alpha = 0;
		background.events.onInputDown.remove(moveCharacterLast, this);

		kost3.alpha =0;
		mummy.alpha =1;

	}

	function stopWalking () {
    	characterStop = false;
    	anim.stop();
    	game.physics.arcade.velocityFromAngle(mummy.angle, 0, mummy.body.velocity);
	}

	function end(){
		alert("Prisli ste do konca!");

	}

	function animationStarted(sprite, animation) {

    //game.add.text(32, 32, 'Animation started', { fill: 'white' });

}

function goToQuiz(){
	t4.alpha = 0;
	kost4.alpha = 0;
	mummy.alpha = 1;
	moveCharacter();
	nextButton.alpha = 0;
}

function animationLooped(sprite, animation) {

    if (animation.loopCount === 1)
    {
       // loopText = game.add.text(32, 64, 'Animation looped', { fill: 'white' });
    }
    else
    {
       // loopText.text = 'Animation looped x2';
        animation.loop = false;
    }

}

function animationStopped(sprite, animation) {

   // game.add.text(32, 64+32, 'Animation stopped', { fill: 'white' });

}

function bearAnimation(){

}


	/*Dodaj casovni trak*/
	function addPole(){
		var pole = new Pole(game,0,poleY);
		game.add.existing(pole);
        //pole.anchor.set(0.5,0);
		poleGroup.add(pole);
	}


	Pole = function (game, x, y) {
		Phaser.Sprite.call(this, game, x, y, "pole");
		game.physics.enable(this, Phaser.Physics.ARCADE);
          this.body.immovable = true;
          this.body.velocity.x = 10;
	};
	Pole.prototype = Object.create(Phaser.Sprite.prototype);
	Pole.prototype.constructor = Pole;
	Pole.prototype.update = function() {
          if(characterStop){
          	var velocity = -180;
            this.body.velocity.x = velocity;
			game.physics.arcade.velocityFromAngle(c1.angle, velocity, c1.body.velocity);
			game.physics.arcade.velocityFromAngle(c2.angle, velocity, c2.body.velocity);
			game.physics.arcade.velocityFromAngle(c3.angle, velocity, c3.body.velocity);
			game.physics.arcade.velocityFromAngle(c4.angle, velocity, c4.body.velocity);
			game.physics.arcade.velocityFromAngle(c5.angle, velocity, c5.body.velocity);
			game.physics.arcade.velocityFromAngle(c6.angle, velocity, c6.body.velocity);
			game.physics.arcade.velocityFromAngle(c7.angle, velocity, c7.body.velocity);
			//game.physics.arcade.velocityFromAngle(bone.angle, velocity, bone.body.velocity);

			//game.physics.arcade.velocityFromAngle(text.angle, velocity, text.body.velocity);

		}else{
            this.body.velocity.x = 0
            game.physics.arcade.velocityFromAngle(c1.angle, 0, c1.body.velocity);
			game.physics.arcade.velocityFromAngle(c2.angle, 0, c2.body.velocity);
			game.physics.arcade.velocityFromAngle(c3.angle, 0, c3.body.velocity);
			game.physics.arcade.velocityFromAngle(c4.angle, 0, c4.body.velocity);
			game.physics.arcade.velocityFromAngle(c5.angle, 0, c5.body.velocity);
			game.physics.arcade.velocityFromAngle(c6.angle, 0, c6.body.velocity);
			game.physics.arcade.velocityFromAngle(c7.angle, 0, c7.body.velocity);
			//game.physics.arcade.velocityFromAngle(bone.angle, 0, bone.body.velocity);
          }
	}
}
