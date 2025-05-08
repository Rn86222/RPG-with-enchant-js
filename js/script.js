enchant();

window.onload = function () {
	const game = new Game(400, 650);  				//画面サイズを400*500にする。（このサイズだとスマホでも快適なのでおススメ）

	/////////////////////////////////////////////////
	//ゲーム開始前に必要な画像・音を読み込む部分
	const rarrowImgUrl = "image/rightarrow.png";
	const retryImgUrl = "image/retry.png";
	const tweetImgUrl = "image/tweet.png";
	const attackBtnImgUrl = "image/attack_button.png";
	const slimeImgUrl = "image/slime.png";
	const heroImgUrl = "image/hero.png";
	const magicImgUrl = "image/magic_button.png";
	const attackImgUrl = "image/attack.png";
	const attackBgmUrl = "music/attack.mp3";
	const enemyAttackBgmUrl = "music/enemy_attack.mp3";
	const healBgmUrl = "music/magic.mp3";
	const fieldBgmUrl = "music/field.mp3";
	const battleBgmUrl = "music/battle.mp3";
	const fieldImgUrl = "image/field.png";
	const hitotsumeImgUrl = "image/hitotsume.png";
	const recuBtnImgUrl = "image/recu_button.png";
	const cancelBgmUrl = "music/cancel.mp3";
	const fireImgUrl = "image/fire.png";
	const flamBgmUrl = "music/flam.mp3";
	const flamBtnUrl = "image/flam_button.png";
	const ochimushaImgUrl = "image/ochimusha.png";
	const pushBgmUrl = "music/push.mp3";
	const dragonImgUrl = "image/dragon.png";
	const formBtnUrl = "image/form_button.png";
	const reculaBtnUrl = "image/recula_button.png";
	const recudBtnUrl = "image/recud_button.png";
	const flameaBtnUrl = "image/flamea_button.png";
	const flamoodBtnUrl = "image/flamood_button.png";
	const renzokugiriBgmUrl = "music/renzokugiri.mp3";
	const criticalBgmUrl = "music/critical.mp3";
	const missBgmUrl = "music/miss.mp3";
	const tokugiBtnUrl = "image/tokugi_button.png";
	const slashBtnUrl = "image/slash_button.png";
	const slashBgmUrl = "music/slash.mp3";
	const madanBtnUrl = "image/madan_button.png";
	const madanBgmUrl = "music/madan.mp3"
	const madanImgUrl = "image/madan.png"
	const maouImgUrl = "image/maou.png";
	const anotherImgUrl = "image/another.png";
	const bossBgmUrl = "music/boss.mp3";
	const saveBtnUrl = "image/save_button.png";
	const newGameBtnUrl = "image/newgame_button.png";
	const loadGameBtnUrl = "image/loadgame_button.png";
	const saveBgmUrl = "music/save.mp3";
	const gameStartBgmUrl = "music/game_start.mp3"
	const chargeBtnUrl = "image/charge_button.png";
	const chargeBgmUrl = "music/charge.mp3";
	const titleImgUrl = "image/title.png";
	const titleBgmUrl = "music/title.mp3";
	const gameOverBgmUrl = "music/game_over.mp3";
	const universeImgUrl = "image/universe.png";
	const shinMaouBgmUrl = "music/shinMaou.mp3";
	const barrierBtnUrl = "image/barrier.png";
	const barrierBgmUrl = "music/barrier.mp3";
	const rareSlimeImgUrl = "image/rare_slime.png";

	game.preload([rarrowImgUrl, retryImgUrl, tweetImgUrl, attackBtnImgUrl, slimeImgUrl, heroImgUrl, magicImgUrl,
		attackImgUrl, attackBgmUrl, enemyAttackBgmUrl, healBgmUrl, fieldBgmUrl, battleBgmUrl, fieldImgUrl, hitotsumeImgUrl, recuBtnImgUrl,
		cancelBgmUrl, fireImgUrl, flamBgmUrl, flamBtnUrl, ochimushaImgUrl, pushBgmUrl, dragonImgUrl, formBtnUrl, reculaBtnUrl, recudBtnUrl,
		flameaBtnUrl, flamoodBtnUrl, renzokugiriBgmUrl, criticalBgmUrl, missBgmUrl, tokugiBtnUrl, slashBtnUrl, slashBgmUrl, madanBtnUrl,
		madanBgmUrl, madanImgUrl, maouImgUrl, anotherImgUrl, bossBgmUrl, saveBtnUrl, newGameBtnUrl,loadGameBtnUrl, saveBgmUrl, gameStartBgmUrl, 
		chargeBtnUrl, chargeBgmUrl, titleImgUrl, titleBgmUrl, gameOverBgmUrl, universeImgUrl, shinMaouBgmUrl, barrierBtnUrl, barrierBgmUrl,
		rareSlimeImgUrl]);
	//読み込み終わり
	/////////////////////////////////////////////////

	game.onload = function () {					//ロードが終わった後にこの関数が呼び出されるので、この関数内にゲームのプログラムを書こう

		/////////////////////////////////////////////////
		//グローバル変数 

		let state = -1;								//現在のゲーム状態

		let noInAnother = true;
		let conbatMaou = false;

		let shinMaouAppeared = false;

		var inputName = new Entity();
		//DOM設定
		inputName._element = document.createElement('input');
		inputName._element.setAttribute('type', 'text');
		inputName._element.setAttribute('maxlength', '9');
		inputName._element.setAttribute('id', 'name');
		inputName._element.setAttribute('value', '');
		inputName.width = 300;
		inputName.height = 40;
		inputName.x = 10;
		inputName.y = 50;

		var inputPassword = new Entity();
		//DOM設定
		inputPassword._element = document.createElement('input');
		inputPassword._element.setAttribute('type', 'text');
		inputPassword._element.setAttribute('maxlength', '9');
		inputPassword._element.setAttribute('id', 'name');
		inputPassword._element.setAttribute('value', '');
		inputPassword.width = 300;
		inputPassword.height = 40;
		inputPassword.x = 10;
		inputPassword.y = 30;

		var Player = enchant.Class.create(enchant.Sprite, {
			initialize: function (w, h) {
				enchant.Sprite.call(this, w, h);
				this.rmove = 0;
				this.dmove = 0;
				this.lmove = 0;
				this.umove = 0;
			},
		})
		var Button = enchant.Class.create(enchant.Sprite, {
			initialize: function (w, h) {
				enchant.Sprite.call(this, w, h);
				this.valid = true;
			},
		})

		var magicButton = enchant.Class.create(enchant.Sprite, {
			initialize: function (w, h) {
				enchant.Sprite.call(this, w, h);
				this.valid = true;
				this.open = false;
			},
		})

		var Bgm = enchant.Class.create({
			initialize: function () {
				this.data = null;
				this.isPlay = false;//プレイの状態フラグ
				this.isPause = false;
			},
			//BGM用音楽ファイルのセット
			set: function (data) {
				this.data = data;
			},
			//再生(再生のみに使う)
			play: function () {
				this.data.play();
				this.isPlay = true;
				if (this.data.src != undefined) {//srcプロパティを持っている場合
					this.data.src.loop = true;
				}
			},
			//ループ再生(必ずループ内に記述すること) PCでのループ再生で使う
			loop: function () {
				if (this.isPlay == true && this.data.src == undefined) {//再生中でsrcプロパティを持っていない場合
					this.data.play();
					this.isPause = false;//ポーズ画面から戻った場合は自動的に再生を再開させるため
				} else if (this.isPause) {//srcあり場合でポーズ画面から戻ったとき用
					this.data.play();
					this.data.src.loop = true;//ポーズするとfalseになるっぽい(確認はしていない)
					this.isPause = false;
				}
			},
			//再生停止(曲を入れ替える前は,必ずstop()させる)
			stop: function () {
				if (this.data != null) {
					if (this.isPause) {
						this.isPlay = false;
						this.isPause = false;
						this.data.currentTime = 0;
					} else if (this.isPlay) {
						this.data.stop();
						this.isPlay = false;
					}
				}
			},
			//一時停止（ポーズ画面などの一時的な画面の切り替え時に音を止めたいときのみ使う）
			pause: function () {
				if (this.data != null) {
					this.data.pause();
					this.isPause = true;
				}
			}
		});
		let hero = ["勇者", 50, 30, 50, 30, 1, attackBgmUrl, heroImgUrl, 0, 1.0, 1.0]; // 名前、最大HP、最大MP、HP、MP、レベル、攻撃音、画像、反動ターン、攻撃倍率、防御倍率
		//hero = ["勇者", 20000, 5000, 20000, 5000, 99, attackBgmUrl, heroImgUrl, 0, 1.0, 1.0]; // 名前、最大HP、最大MP、HP、MP、レベル、攻撃音、画像、反動ターン、攻撃倍率
		const slime = ["スライム", 35, 10, 35, 10, 1, enemyAttackBgmUrl, slimeImgUrl, 0, 1.0, 1.0];
		const hitotsume = ["ひとつめ", 50, 10, 50, 10, 3, enemyAttackBgmUrl, hitotsumeImgUrl, 0, 1.0, 1.0];
		const ochimusha = ["落ち武者", 80, 10, 80, 10, 6, enemyAttackBgmUrl, ochimushaImgUrl, 0, 1.0, 1.0];
		const dragon = ["ドラゴン", 300, 10, 300, 10, 10, enemyAttackBgmUrl, dragonImgUrl, 0, 1.0, 1.0];
		let maou = ["魔王", 1500, 100, 1500, 100, 13, enemyAttackBgmUrl, maouImgUrl, 0, 1.0, 1.0];
		const shinMaou = ["真・魔王", 130000, 400, 130000, 400, 120, enemyAttackBgmUrl, maouImgUrl, 0, 1.0, 1.0];
		const rareSlime = ["スライム（レア）", 999, 9999, 999, 9999, 999, enemyAttackBgmUrl, slimeImgUrl, 0, 1.0, 1.0];
		const enemies = [slime, hitotsume, ochimusha, dragon, maou, shinMaou, rareSlime];
		let enemy;
		let exp = 0;
		let battleBgm = new Bgm();
		battleBgm.set(game.assets[battleBgmUrl]);
		let fieldBgm = new Bgm();
		fieldBgm.set(game.assets[fieldBgmUrl]);
		let bossBgm = new Bgm();
		bossBgm.set(game.assets[bossBgmUrl]);
		let titleBgm = new Bgm();
		titleBgm.set(game.assets[titleBgmUrl]);
		let gameOverBgm = new Bgm();
		gameOverBgm.set(game.assets[gameOverBgmUrl]);
		let shinMaouBgm = new Bgm();
		shinMaouBgm.set(game.assets[shinMaouBgmUrl]);

		//グローバル変数終わり
		/////////////////////////////////////////////////

		// 最初の画面
		const firstScene = new Scene();

		// ランキング用のでデータ転送
		function SaveRankingData() {
			let phpurl = "./php/save-ranking-data.php";
			let name = hero[0];
			let level = hero[5];
			console.log("send");
			name = JSON.stringify(name);
			level = JSON.stringify(level);
			$.ajax({
				type: "POST",
				url: phpurl,
				data: {
					name: name,
					level: level
				}
			}).done(function (data) {
				console.log(data);
			}).fail(function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("failed");
				return;
			})
		}

		// ランキング表の取得
		function GetRankingData() {
			let phpurl = "./php/get-ranking-data.php";
			let nameList = "";
			let levelList = "";
			let tmp;
			console.log("get");
			$.ajax({
				type: "GET",
				url: phpurl,
				data: {}
			}).done(function (data) {
				data = data.split('\n');
				for (let i = 0; i < 8; i++) {
					tmp = data[i].split(',');
					nameList += (i + 1) + "位   " + tmp[0].slice(1, -1) + "<br>";
					levelList += "Lv " + tmp[1] + "<br>";
				}
				rankingNameText.text = nameList;
				rankingLevelText.text = levelList;
			}).fail(function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("failed");
				return;
			})
		}

		// セーブデータを検索&ロード
		function SearchAndLoadData(name) {
			let phpurl = "./php/search-and-load-data.php";
			name = JSON.stringify(name);
			$.ajax({
				type: "GET",
				url: phpurl,
				data: {}
			}).done(function (data) {
				data = data.split('\n');
				for (let i = 0; i < data.length; i++) {
					tmp = data[i].split(',');
					if (hero[0] == tmp[0]) {
						for (let j = 1; j < 6; j++) {
							hero[j] = Number(tmp[j]);
						}
						exp = Number(tmp[6]);
						heroImg.x = Number(tmp[7]);
						heroImg.y = Number(tmp[8]);
						console.log("found");
						updateBattleStatusText();
						updateStatusText();
						break;
					}
				}
				console.log("success");
			}).fail(function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("failed");
				return;
			})
		}

		// データをセーブ
		function SaveData() {
			let phpurl = "./php/save-data.php";
			let name = hero[0];
			let maxHp = hero[1];
			let maxMp = hero[2];
			let hp = hero[3];
			let mp = hero[4];
			let level = hero[5];
			let password = inputPassword._element.value;
			$.ajax({
				type: "POST",
				url: phpurl,
				data: {
					name: name,
					maxHp: maxHp,
					maxMp: maxMp,
					hp: hp,
					mp: mp,
					level: level,
					exp: exp,
					x: heroImg.x,
					y: heroImg.y,
					password: password,
				}
			}).done(function (data) {
				console.log("success-write");
				game.assets[saveBgmUrl].play();
			}).fail(function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("failed");
				return;
			})
		}

		function newGame(name, password) {
			if (name == "" || password == "") {
				game.assets[cancelBgmUrl].play();
				formExplanationText.text = "名前またはパスワードが空です";
				return;
			}
			let phpurl = "./php/search-and-load-data.php";
			$.ajax({
				type: "GET",
				url: phpurl,
				data: {}
			}).done(function (data) {
				data = data.split('\n');
				for (let i = 0; i < data.length; i++) {
					tmp = data[i].split(',');
					if (name == tmp[0]) {
						game.assets[cancelBgmUrl].play();
						formExplanationText.text = "その名前は既に存在します。";
						return;
					}
				}
				game.assets[gameStartBgmUrl].play();
				setTimeout(function () {
					state = 0;
					hero[0] = inputName._element.value;
					nameText.text = hero[0];
					battleNameText.text = hero[0];
					SaveData();
					game.popScene();
					game.pushScene(mainScene);
				}, 1000)
			}).fail(function(XMLHttpRequest, textStatus, errorThrown){
				console.log("failed");
				return;
			})
		}

		function loadGame(name, password) {
			if (name == "" || password == "") {
				game.assets[cancelBgmUrl].play();
				formExplanationText.text = "名前またはパスワードが空です";
				return;
			}
			let phpurl = "./php/search-and-load-data.php";
			$.ajax({
				type: "GET",
				url: phpurl,
				data: {}
			}).done(function (data) {
				data = data.split('\n');
				for (let i = 0; i < data.length; i++) {
					tmp = data[i].split(',');
					if (name == tmp[0] && password == tmp[9]) {
						hero[0] = name;
						for (let j = 1; j < 6; j++) {
							hero[j] = Number(tmp[j]);
						}
						exp = Number(tmp[6]);
						heroImg.x = Number(tmp[7]);
						heroImg.y = Number(tmp[8]);
						if (hero[5] >= 80) {
							fieldShinMaouImg.scaleX = 0.3;
						}
						console.log("found");
						updateBattleStatusText();
						updateStatusText();
					  nameText.text = hero[0];
						battleNameText.text = hero[0];
						game.assets[gameStartBgmUrl].play();
						setTimeout(function() {
						state = 0;
						game.popScene();
						game.pushScene(mainScene);
						}, 1000);
						return;
					}
				}
				game.assets[cancelBgmUrl].play();
				formExplanationText.text = "名前またはパスワードが間違っています";
				return;
			}).fail(function(XMLHttpRequest, textStatus, errorThrown){
				console.log("failed");
				return;
			})
		}

		function configLabel(label, font, color, width, x, y, scene) {
			label.font = font;
			label.color = color;
			label.width = width;
			label.moveTo(x, y);
			scene.addChild(label);
		}

		function configSprite(sprite, scaleX, scaleY, x, y, image, scene) {
			sprite.scaleX = scaleX;
			sprite.scaleY = scaleY;
			sprite.moveTo(x, y);
			sprite.image = image;
			scene.addChild(sprite);
		}

		function updateStatusText() {
			hpText.text = "HP: " + hero[3] + "/" + hero[1];
			mpText.text = "MP: " + hero[4] + "/" + hero[2];
			lvText.text = "Lv: " + hero[5];
		}

		function updateBattleStatusText() {
			function moveTexts(x, y) {
				battleNameText.moveTo(x, y);
				battleHpText.moveTo(x, y+30);
				battleMpText.moveTo(x, y+60);
				battleLvText.moveTo(x, y+90);
			}
			if (hero[1] >= 10000) {
				moveTexts(10, 340);
			}
			else if (hero[1] >= 1000) {
				moveTexts(30, 340);
			}
			else {
				moveTexts(50, 340);
			}
			battleHpText.text = "HP: " + hero[3] + "/" + hero[1];
			battleMpText.text = "MP: " + hero[4] + "/" + hero[2];
			battleLvText.text = "Lv: " + hero[5];
		}

		function configEnemy(number, scaleX) {
			enemy = [...enemies[number]];
			enemyImg = enemyImgs[number];
			enemyImg.scaleX = scaleX;
		}

		function closeFieldHeals() {
			fieldRecuBtn.scaleX = 0.0;
			fieldReculaBtn.scaleX = 0.0;
			fieldRecudBtn.scaleX = 0.0;
			fieldMagicBtn.valid = true;
		}


		const titleImg = new Sprite(401, 258);
		configSprite(titleImg, 1.0, 1.0, 0, 0, game.assets[titleImgUrl], firstScene);

		const formText = new Label();
		configLabel(formText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 250, firstScene);
		formText.text = "名前";

		inputName.moveTo(50, 280);
		firstScene.addChild(inputName);

		const passwordText = new Label();
		configLabel(passwordText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 350, firstScene);
		passwordText.text = "パスワード";

		inputPassword.moveTo(50, 380);
		firstScene.addChild(inputPassword);

		const newGameBtn = new Button(120, 60);
		configSprite(newGameBtn, 0.8, 0.8, 50, 450, game.assets[newGameBtnUrl], firstScene);

		const loadGameBtn = new Button(120, 60);
		configSprite(loadGameBtn, 0.8, 0.8, 230, 450, game.assets[loadGameBtnUrl], firstScene);

		const formExplanationText = new Label();
		configLabel(formExplanationText, "17px Meiryo", 'rgba(255,255,255,1)', 400, 60, 530, firstScene);
		formExplanationText.text = "いずれの場合もパスワードが必要です";

		newGameBtn.ontouchend = function () {newGame(inputName._element.value, inputPassword._element.value)};
		loadGameBtn.ontouchend = function() {loadGame(inputName._element.value, inputPassword._element.value)} 

		game.pushScene(firstScene);
		titleBgm.play();

		const mainScene = new Scene();					//シーン作成
		mainScene.backgroundColor = "black"; 			//mainSceneシーンの背景は黒くした

		const nameText = new Label();
		configLabel(nameText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 340, mainScene);

		const hpText = new Label();
		configLabel(hpText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 370, mainScene);

		const mpText = new Label();
		configLabel(mpText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 400, mainScene);

		const lvText = new Label();
		configLabel(lvText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 430, mainScene);

		const fieldImg = new Sprite(800, 800);
		configSprite(fieldImg, 0.9, 0.65, -300, -330, game.assets[fieldImgUrl], mainScene);

		// const universeImg = new Sprite(1600, 1200);
		// configSprite(universeImg, 0.05, 0.05, -500, -400, game.assets[universeImgUrl], mainScene);

		const fieldShinMaouImg = new Sprite(336, 335);
		fieldShinMaouImg.frame = 1;
		configSprite(fieldShinMaouImg, 0.0, 0.3, 30, -130, game.assets[maouImgUrl], mainScene);

		const saveText = new Label();
		configLabel(saveText, "20px Meiryo", 'rgba(255,55,0,1)', 400, 50, 20, mainScene);

		const anotherImg = new Sprite(1600, 1200);
		configSprite(anotherImg, 0.0, 0.4, -600, -500, game.assets[anotherImgUrl], mainScene);

		const anotherText = new Label();
		configLabel(anotherText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 20, mainScene);

		const heroImg = new Player(300, 300);
		configSprite(heroImg, 0.2, 0.2, 0, 0, game.assets[heroImgUrl], mainScene);

		const fieldMagicBtn = new Button(120, 60);
		configSprite(fieldMagicBtn, 1.0, 1.0, 50, 500, game.assets[magicImgUrl], mainScene);

		const fieldRecuBtn = new Button(120, 60);
		configSprite(fieldRecuBtn, 0.0, 1.0, 200, 500, game.assets[recuBtnImgUrl], mainScene);

		const fieldReculaBtn = new Button(120, 60);
		configSprite(fieldReculaBtn, 0.0, 1.0, 50, 570, game.assets[reculaBtnUrl], mainScene);

		const fieldRecudBtn = new Button(120, 60);
		configSprite(fieldRecudBtn, 0.0, 1.0, 200, 570, game.assets[recudBtnUrl], mainScene);

		const saveBtn = new Button(120, 60);
		configSprite(saveBtn, 0.8, 0.8, -12, 275, game.assets[saveBtnUrl], mainScene);

		fieldMagicBtn.ontouchend = function () {
			if (this.valid) {
				game.assets[pushBgmUrl].play();
				fieldRecuBtn.scaleX = 1.0;
				if (hero[5] >= 4) {
					fieldReculaBtn.scaleX = 1.0;
				}
				if (hero[5] >= 9) {
					fieldRecudBtn.scaleX = 1.0;
				}
				this.valid = false;
			}
			else {
				game.assets[cancelBgmUrl].play();
				closeFieldHeals();
			}
		}

		function fieldHealMagic(mp, healConstant) {
			if (hero[4] >= mp) {
				let heal = Math.floor((Math.random() - 0.5) * 10 + Math.floor(hero[5] / 10 + 1) * healConstant);
				hero[4] -= mp;
				game.assets[healBgmUrl].play();
				hero[3] += heal;
				if (hero[3] > hero[1]) {
					hero[3] = hero[1];
				}
				updateStatusText();
			}
			else {
				game.assets[cancelBgmUrl].play();
			}
		}

		fieldRecuBtn.ontouchend = function () {fieldHealMagic(3, 25);}
		fieldReculaBtn.ontouchend = function () {fieldHealMagic(8, 75);}
		fieldRecudBtn.ontouchend = function () {fieldHealMagic(20, 200);}

		saveBtn.ontouchend = function () {
			SaveData();
			saveText.text = "セーブしました。";
			console.log("saveBtn pressed")
			setTimeout(function () {
				saveText.text = "";
			}, 2000)
		}

		// 移動キーの設置
		const moveButtonX = 280;
		const moveButtonY = 380;

		const rarrowImg = new Sprite(55, 60);
		configSprite(rarrowImg, 1.0, 1.0, moveButtonX + 50, moveButtonY, game.assets[rarrowImgUrl], mainScene)

		const darrowImg = new Sprite(55, 60);
		darrowImg.rotation = 90;
		configSprite(darrowImg, 1.0, 1.0, moveButtonX, moveButtonY + 50, game.assets[rarrowImgUrl], mainScene)

		const larrowImg = new Sprite(55, 60);
		larrowImg.rotation = 180;
		configSprite(larrowImg, 1.0, 1.0, moveButtonX - 50, moveButtonY, game.assets[rarrowImgUrl], mainScene)

		const uarrowImg = new Sprite(55, 60);
		uarrowImg.rotation = 270;
		configSprite(uarrowImg, 1.0, 1.0, moveButtonX, moveButtonY - 50, game.assets[rarrowImgUrl], mainScene)

		// キーを押したら動くように
		rarrowImg.ontouchstart = function () {
			heroImg.rmove = 1;
			closeFieldHeals();
		}

		rarrowImg.ontouchend = function () {
			heroImg.rmove = 0;
		}

		darrowImg.ontouchstart = function () {
			heroImg.dmove = 1;
			closeFieldHeals();
		}

		darrowImg.ontouchend = function () {
			heroImg.dmove = 0;
		}

		larrowImg.ontouchstart = function () {
			heroImg.lmove = 1;
			closeFieldHeals();
		}

		larrowImg.ontouchend = function () {
			heroImg.lmove = 0;
		}

		uarrowImg.ontouchstart = function () {
			heroImg.umove = 1;
			closeFieldHeals();
		}

		uarrowImg.ontouchend = function () {
			heroImg.umove = 0;
		}

		function chooseEnemy(level) {
			if (level <= 3) {
				if (Math.random() > 0.6) {
					configEnemy(1, 0.5);
				}
				else {
					configEnemy(0, 0.5);
				}
			}
			else if (level <= 9) {
				if (Math.random() > 0.7) {
					configEnemy(2, 0.5);
				}
				else if (Math.random() > 0.3) {
					configEnemy(1, 0.5);
				}
				else {
					configEnemy(0, 0.5)
				}
			}
			else if (level <= 49){
				if (Math.random() > 0.7) {
					configEnemy(3, 0.5);
				}
				else {
					configEnemy(2, 0.5)
				}
			}
			else {
				if (Math.random() > 0.95) {
					configEnemy(6, 0.5);
				}
				else if (Math.random() > 0.7) {
					configEnemy(2, 0.5);
				}
				else {
					configEnemy(3, 0.5)
				}
			}
		}

		function moveHero() {
			heroImg.x += (heroImg.rmove - heroImg.lmove) * 20
			heroImg.y += (heroImg.dmove - heroImg.umove) * 20
		}

		function heroIsMoving() {
			return (heroImg.rmove != heroImg.lmove || heroImg.dmove != heroImg.umove) && heroImg.x >= -110 && heroImg.x <= 200 && heroImg.y >= -100 && heroImg.y <= 140;
		}

		function validateHeroPosition() {
			if (heroImg.y < -100) {heroImg.y = -100;}
			if (heroImg.x < -110) {heroImg.x = -110;}
			if (heroImg.y > 140) {heroImg.y = 140;}
			if (heroImg.x > 200) {heroImg.x = 200;}
		}

		function toBattle() {
			fieldMagicBtn.valid = true;
			heroImg.rmove = heroImg.dmove = heroImg.lmove = heroImg.umove = 0;
			updateBattleStatusText();
			battleText.text = enemy[0] + "があらわれた！<br>コマンド？"
			game.popScene();
			game.pushScene(BattleScene);
			if (enemy[0] == "真・魔王") {
				validateBattleBtn(false);
				setTimeout(function() {
					battleText.text = "不思議な力で" + hero[0] + "は全回復した！";
					game.assets[healBgmUrl].play();
					hero[3] = hero[1];
					hero[4] = hero[2];
					updateBattleStatusText();
					setTimeout(function() {
						battleText.text = enemy[0] + "があらわれた！<br>コマンド？"
						validateBattleBtn(true);
					}, 2000)
				}, 2000)
			}
		}

		///////////////////////////////////////////////////
		//メインループ　ここに主要な処理をまとめて書こう
		game.onenterframe = function () {
			if (state == -1) {
				titleBgm.loop();
				// console.log(input._element.value);
			}
			if (state == 0) { 							//state=0のとき、初期セット状態
				titleBgm.stop();
				fieldBgm.play();
				noInAnother = true;
				conbatMaou = false;
				hero[8] = 0;
				hero[9] = 1.0;
				hero[10] = 1.0;
				state = 1;							//ゲームスタート状態に移行
				updateStatusText();
				updateBattleStatusText();
			}
			else if (state == 1) {							//ゲームスタート　状態
				if (!battleBgm.isPlay && !shinMaouBgm.isPlay) fieldBgm.loop();
				if (fieldBgm.isPause) battleBgm.loop();
				shinMaouBgm.loop();
				moveHero();
				if (!shinMaouAppeared && hero[5] >= 80 && heroIsMoving() && heroImg.x >= 20 && heroImg.x <= 80 && heroImg.y <= -70) {
					shinMaouImg.scaleX = 0.0;
					fieldBgm.pause();
					shinMaouBgm.play();
					configEnemy(5, 0.7);
					toBattle();
					heroImg.x = 45;
					heroImg.y = -30;
				}
				else if (heroIsMoving()) {
					if (Math.random() > 0.95) {
						fieldBgm.pause();
						battleBgm.play();
						chooseEnemy(hero[5]);
						toBattle();
					}
				}
				validateHeroPosition();
			}
			else if (state == 2) { //異空間
				if (fieldBgm.isPlay) fieldBgm.pause();
				if (bossBgm.isPlay) bossBgm.loop();
				moveHero();
				if (heroIsMoving()) {
					if (Math.random() > 0.95) {
						bossBgm.play();
						configEnemy(4, 0.5);
						toBattle();
					}
				}
				validateHeroPosition();
			}
			else if (state == 3) {
				gameOverBgm.loop();
			}
		};


		////////////////////////////////////////////////////////////////
		//戦闘画面
		const BattleScene = new Scene();
		BattleScene.backgroundColor = "black";

		const gaugeWidth = 195;
		const gaugeHeight = 20;

		const redGaugeSprite = new Sprite(gaugeWidth, gaugeHeight);
		// Surfaceオブジェクトを生成しスプライトに連結
		const redGaugeSurface = new Surface(gaugeWidth, gaugeHeight);
		redGaugeSprite.image = redGaugeSurface;
		BattleScene.addChild(redGaugeSprite);
		// 赤い四角形を描く
		redGaugeSurface.context.fillStyle = "rgba(255,0,0,1)";
		redGaugeSurface.context.fillRect(0, 0, gaugeWidth, gaugeHeight);
		redGaugeSprite.moveTo(100, 100);

		const gaugeSprite = new Sprite(gaugeWidth, gaugeHeight);
		// Surfaceオブジェクトを生成しスプライトに連結
		const gaugeSurface = new Surface(gaugeWidth, gaugeHeight);
		gaugeSprite.image = gaugeSurface;
		BattleScene.addChild(gaugeSprite);
		// 赤い四角形を描く
		gaugeSurface.context.fillStyle = "rgba(0,255,0,1)";
		gaugeSurface.context.fillRect(0, 0, gaugeWidth, gaugeHeight);
		gaugeSprite.moveTo(100, 100);

		const battleText = new Label();
		configLabel(battleText, "20px Meiryo", 'rgba(255,255,255,1)', 350, 30, 30, BattleScene);

		const slimeImg = new Sprite(300, 300);
		configSprite(slimeImg, 0.0, 0.5, 30, 50, game.assets[slimeImgUrl], BattleScene);

		const hitotsumeImg = new Sprite(300, 300);
		configSprite(hitotsumeImg, 0.0, 0.5, 35, 50, game.assets[hitotsumeImgUrl], BattleScene);

		const ochimushaImg = new Sprite(300, 300);
		configSprite(ochimushaImg, 0.0, 0.5, 30, 50, game.assets[ochimushaImgUrl], BattleScene);

		const dragonImg = new Sprite(370, 338);
		dragonImg.frame = 1;
		configSprite(dragonImg, 0.0, 0.5, 25, 50, game.assets[dragonImgUrl], BattleScene);

		const maouImg = new Sprite(336, 335);
		configSprite(maouImg, 0.0, 0.5, 30, 50, game.assets[maouImgUrl], BattleScene);

		const shinMaouImg = new Sprite(336, 335);
		shinMaouImg.frame = 1;
		configSprite(shinMaouImg, 0.0, 0.7, 40, 25, game.assets[maouImgUrl], BattleScene);

		const rareSlimeImg = new Sprite(300, 300);
		configSprite(rareSlimeImg, 0.0, 0.5, 30, 50, game.assets[rareSlimeImgUrl], BattleScene);
		
		const enemyImgs = [slimeImg, hitotsumeImg, ochimushaImg, dragonImg, maouImg, shinMaouImg, rareSlimeImg];
		let enemyImg;

		const attackBtn = new Button(120, 60);
		configSprite(attackBtn, 0.8, 0.8, 230, 340, game.assets[attackBtnImgUrl], BattleScene);

		const magicBtn = new magicButton(120, 60);
		configSprite(magicBtn, 0.8, 0.8, 180, 400, game.assets[magicImgUrl], BattleScene);

		const tokugiBtn = new magicButton(120, 60);
		configSprite(tokugiBtn, 0.8, 0.8, 280, 400, game.assets[tokugiBtnUrl], BattleScene);

		const recuBtn = new Button(120, 60);
		configSprite(recuBtn, 0.0, 0.8, 30, 470, game.assets[recuBtnImgUrl], BattleScene);

		const flamBtn = new Button(120, 60);
		configSprite(flamBtn, 0.0, 0.8, 145, 470, game.assets[flamBtnUrl], BattleScene);

		const reculaBtn = new Button(120, 60);
		configSprite(reculaBtn, 0.0, 0.8, 260, 470, game.assets[reculaBtnUrl], BattleScene);

		const flameaBtn = new Button(120, 60);
		configSprite(flameaBtn, 0.0, 0.8, 30, 530, game.assets[flameaBtnUrl], BattleScene);

		const recudBtn = new Button(120, 60);
		configSprite(recudBtn, 0.0, 0.8, 145, 530, game.assets[recudBtnUrl], BattleScene);

		const flamoodBtn = new Button(120, 60);
		configSprite(flamoodBtn, 0.0, 0.8, 260, 530, game.assets[flamoodBtnUrl], BattleScene);

		const slashBtn = new Button(120, 60);
		configSprite(slashBtn, 0.0, 0.8, 30, 470, game.assets[slashBtnUrl], BattleScene);

		const madanBtn = new Button(120, 60);
		configSprite(madanBtn, 0.0, 0.8, 145, 470, game.assets[madanBtnUrl], BattleScene);

		const chargeBtn = new Button(120, 60);
		configSprite(chargeBtn, 0.0, 0.8, 260, 470, game.assets[chargeBtnUrl], BattleScene);

		const barrierBtn = new Button(120, 60);
		configSprite(barrierBtn, 0.0, 0.8, 30, 530, game.assets[barrierBtnUrl], BattleScene);

		const attackImg = new Sprite(55, 60);
		configSprite(attackImg, 0.0, 2.0, 180, 200, game.assets[attackImgUrl], BattleScene);

		const fireImg = new Sprite(500, 500);
		configSprite(fireImg, 0.0, 0.2, -64, -40, game.assets[fireImgUrl], BattleScene);

		const madanImg = new Sprite(1600, 1200);
		configSprite(madanImg, 0.0, 0.1, -600, -380, game.assets[madanImgUrl], BattleScene);

		const battleNameText = new Label();
		configLabel(battleNameText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 340, BattleScene);

		const battleHpText = new Label();
		configLabel(battleHpText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 370, BattleScene);

		const battleMpText = new Label();
		configLabel(battleMpText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 400, BattleScene);

		const battleLvText = new Label();
		configLabel(battleLvText, "20px Meiryo", 'rgba(255,255,255,1)', 400, 50, 430, BattleScene);

		function closeMagics() {
			magicBtn.open = false;
			recuBtn.scaleX = 0.0;
			flamBtn.scaleX = 0.0;
			reculaBtn.scaleX = 0.0;
			flameaBtn.scaleX = 0.0;
			recudBtn.scaleX = 0.0;
			flamoodBtn.scaleX = 0.0;
		}

		function closeTokugis() {
			tokugiBtn.open = false;
			slashBtn.scaleX = 0.0;
			madanBtn.scaleX = 0.0;
			chargeBtn.scaleX = 0.0;
			barrierBtn.scaleX = 0.0;
		}

		function validateBattleBtn(valid) {
			attackBtn.valid = valid;
			magicBtn.valid = valid;
			tokugiBtn.valid = valid;
		}

		function buttonPressed() {
			validateBattleBtn(false);
			closeMagics();
			closeTokugis();
		}

		function attackMagic(mp, damageConstant, bgmUrl, from, to) {
			if (from[4] >= mp) {
				let damage = Math.floor(((Math.random() - 0.5) * 10 + damageConstant * Math.floor(from[5] / 8 + 1)) * to[10]);
				from[4] -= mp;
				game.assets[bgmUrl].play();
				return damage;
			}
			else {
				battleText.text += "しかしMPが足りない！";
				return 0;
			}
		}

		function healMagic(mp, healConstant, bgmUrl, from, to) {
			if (from[4] >= mp) {
				let heal = Math.floor((Math.random() - 0.5) * 10 + healConstant * Math.floor(from[5] / 10 + 1));
				from[4] -= mp;
				game.assets[bgmUrl].play();
				return heal;
			}
			else {
				battleText.text += "しかしMPが足りない！";
				return 0;
			}
		}

		function tokugi(hp, damageConstant, bgmUrl, from, to) {
			if (from[3] > from[5] * hp) {
				let damage = Math.floor(((Math.random() - 0.5) * 10 + from[5] * damageConstant) * from[9] * to[10]);
				from[3] -= from[5] * hp;
				game.assets[bgmUrl].play();
				from[9] = 1.0;
				return damage;
			}
			else {
				battleText.text += "しかしHPが足りない！";
				return 0;
			}
		}

		//0:名前 1:最大HP 2:最大MP 3:HP 4:MP 5:レベル 6:攻撃音 7:画像
		function action(actionType, actionName, from, to) {
			if (actionType == "こうげき") {
				let damage = 0;
				battleText.text = from[0] + "の攻撃！<br>";
				if (Math.random() > 0.9) {
					battleText.text += "しかし" + from[0] + "の攻撃は外れた！";
					game.assets[missBgmUrl].play();
					from[9] = 1.0;
					return;
				}
				if (from[0] == hero[0]) {
					attackImg.scaleX = 2.5;
				}
				damage = Math.floor(((Math.random() - 0.5) * from[5] * 5 + from[5] * 10 + 20) * from[9] * to[10]);
				to[10] = 1.0;
				from[9] = 1.0;
				if (Math.random() > 0.9) {
					battleText.text += "クリティカル！<br>";
					game.assets[criticalBgmUrl].play();
					damage *= 2.0;
				}
				else {
					game.assets[from[6]].play();
				}
				to[3] -= damage;
				if (to[3] < 0) {
					to[3] = 0;
				}
				battleText.text += to[0] + "に" + damage + "ダメージ！";
			}
			else if (actionType == "こうげきじゅもん") {
				let damage = 0;
				battleText.text = from[0] + "は" + actionName + "をとなえた！<br>";

				if (actionName == "フラム") {damage = attackMagic(4, 40, flamBgmUrl, from, to);}
				else if (actionName == "フラメア") {damage = attackMagic(10, 80, flamBgmUrl, from, to);}
				else if (actionName == "フラムード") {damage = attackMagic(30, 120, flamBgmUrl, from, to);}

				to[3] -= damage;
				if (to[3] < 0) {
					to[3] = 0;
				}
				if (damage != 0) {
					battleText.text += to[0] + "に" + damage + "ダメージ！";
					to[10] = 1.0;
				}
				else {
					return;
				}
			}
			else if (actionType == "かいふくじゅもん") {
				let heal = 0;
				battleText.text = from[0] + "は" + actionName + "をとなえた！<br>";

				if (actionName == "レキュ") {heal = healMagic(3, 25, healBgmUrl, from, to);}
				else if (actionName == "レキュラ") {heal = healMagic(8, 75, healBgmUrl, from, to);}
				else if (actionName == "レキュド") {heal = healMagic(20, 200, healBgmUrl, from, to);}

				to[3] += heal;
				if (to[3] > to[1]) {
					to[3] = to[1]
				}
				if (heal != 0) {
					battleText.text += to[0] + "は" + heal + "回復した！";
				}
				else {
					return;
				}
			}
			else if (actionType == "とくぎ") {
				let damage = 0;
				battleText.text = from[0] + "は" + actionName + "をくりだした！<br>";
				if (from[0] != "真・魔王" && actionName != "バリア" && actionName != "チャージ" && Math.random() > 0.8) {
					battleText.text += "しかし" + from[0] + "の" + actionName + "は外れた！";
					from[9] = 1.0;
					game.assets[missBgmUrl].play();
					return;
				}

				if (actionName == "スラッシュ") {damage = tokugi(6, 20, slashBgmUrl, from, to);}
				else if (actionName == "魔弾") {damage = tokugi(20, 30, madanBgmUrl, from, to);}
				else if (actionName == "突撃") {damage = tokugi(6, 25, enemyAttackBgmUrl, from, to);}
				else if (actionName == "れんぞくぎり") {damage = tokugi(8, 30, renzokugiriBgmUrl, from, to);}
				else if (actionName == "ファイアブレス") {damage = tokugi(10, 35, flamBgmUrl, from, to);}
				else if (actionName == "超魔弾") {
					if (from[3] > from[5] * 8) {
						from[8] = 2;
					}
					damage = tokugi(8, 50, madanBgmUrl, from, to);
				}
				else if (actionName == "超魔弾・改") {
					if (from[3] > from[5] * 10) {
						from[8] = 2;
					}
					damage = tokugi(8, 60, madanBgmUrl, from, to);
				}
				else if (actionName == "チャージ") {
					if (from[3] > from[5] * 3) {
						from[3] -= from[5] * 3;
						battleText.text += "次のこうげき・とくぎの威力が2.5倍に上昇！";
						from[9] = 2.5;
						game.assets[chargeBgmUrl].play();
						updateBattleStatusText();
					}
					else {
						battleText.text += "しかしHPが足りない！";
					}
				}
				else if (actionName == "バリア") {
					if (from[4] >= 300) {
						from[4] -= 300;
						battleText.text += "次に受けるダメージを大幅に軽減！"
						from[10] = 0.1;
						game.assets[barrierBgmUrl].play();
						updateBattleStatusText();
					}
					else {
						battleText.text += "しかしMPが足りない！";
					}
				}

				to[3] -= damage;
				if (to[3] < 0) {
					to[3] = 0;
				}
				if (damage != 0) {
					battleText.text += to[0] + "に" + damage + "ダメージ！";
					to[10] = 1.0;
				}
				else {
					return;
				}
			}
			//gaugeSprite.scaleX = enemy[3] / enemy[1];
			gaugeSurface.context.fillStyle = "rgba(255,0,0,1)";
			gaugeSurface.context.fillRect(0, 0, gaugeWidth, gaugeHeight);
			gaugeSurface.context.fillStyle = "rgba(0,255,0,1)";
			gaugeSurface.context.fillRect(0, 0, gaugeWidth * enemy[3] / enemy[1], gaugeHeight);
			updateBattleStatusText();
			return true;
		}

		function masterSkill(skillName) {
			battleText.text += hero[0] + "は" + skillName + "を覚えた！<br>";
		}

		function conbatEnemy() {
			let getexp = Math.floor((Math.random() - 0.5) * enemy[5] * 2 + enemy[5] * 5);
			battleText.text = enemy[0] + "を倒した！<br>" + getexp + "の経験値を手に入れた！<br>";
			if (enemy[0] == "真・魔王") {
				shinMaouAppeared = true;
				shinMaouBgm.stop();
			}
			hero[9] = 1.0;
			hero[10] = 1.0;
			//conbatMaou = true;
			saveBtn.scaleX = 0.8;
			battleBgm.stop();
			exp += getexp;
			while (true) {
				if (hero[5] <= 98 && exp >= hero[5] * 15) {
					battleText.text += "レベルが上がった！<br>";
					exp -= hero[5] * 15;
					hero[5] += 1;
					hero[1] += hero[5] * 4;
					hero[2] += hero[5];
					if (hero[5] == 99) {
						hero[1] = 20000;
						hero[2] = 5000;
					}
					hero[3] += Math.floor((hero[1] - hero[3]) / 2);
					hero[4] += Math.floor((hero[2] - hero[4]) / 2);
					if (!shinMaouAppeared && hero[5] >= 80) {
						fieldShinMaouImg.scaleX = 0.3;
					}
					updateBattleStatusText();
					if (hero[5] == 3) {masterSkill("スラッシュ");}
					else if (hero[5] == 4) {masterSkill("レキュラ");}
					else if (hero[5] == 6) {masterSkill("フラメア");}
					else if (hero[5] == 9) {masterSkill("レキュド");}
					else if (hero[5] == 11) {masterSkill("フラム―ド");}
					else if (hero[5] == 13) {masterSkill("魔弾");}
					else if (hero[5] == 20) {masterSkill("チャージ");}
					else if (hero[5] == 80) {masterSkill("バリア");}
				}
				else {
					break;
				}
			}
			enemyImg.scaleX = 0;
		}

		function returnToMain() {
			validateBattleBtn(true);
			battleText.text = "";
			updateBattleStatusText();
			updateStatusText();
			if (state == 2) {
				state = 1;
				bossBgm.stop();
				anotherText.text = "";
				anotherImg.scaleX = 0.0;
			}
			if (hero[5] < 80 && noInAnother && hero[5] >= 18 && Math.random() > 0.95) {
				anotherImg.scaleX = 0.4;
				saveBtn.scaleX = 0.0;
				anotherText.text = "異空間に迷い込んでしまった！<br>何かが起こる予感がする...";
				maou[5] = hero[5];
				maou[0] = "魔王Lv" + (hero[5]);
				maou[1] = 10 * maou[5] * maou[5];
				maou[3] = maou[1];
				maou[8] = 0;
				noInAnother = false;
				state = 2;
			}
			else if (!noInAnother) {
				noInAnother = true;
			}
			game.popScene();
			game.pushScene(mainScene);
			gaugeSurface.context.fillStyle = "rgba(0,255,0,1)";
			gaugeSurface.context.fillRect(0, 0, gaugeWidth, gaugeHeight);
		}

		function toGameOver() {
			battleText.text = "";
			enemyImg.scaleX = 0;
			saveBtn.scaleX = 0.8;
			validateBattleBtn(true);
			game.popScene()
			fieldBgm.stop();
			battleBgm.stop();
			bossBgm.stop();
			shinMaouBgm.stop();
			setTimeout(function () {
				gameOverBgm.play();
				state = 3;
			}, 100)
			anotherText.text = "";
			anotherImg.scaleX = 0.0;
			SaveRankingData();
			setTimeout((function () {
				gaugeSurface.context.fillStyle = "rgba(0,255,0,1)";
				gaugeSurface.context.fillRect(0, 0, gaugeWidth, gaugeHeight);
				GetRankingData();
				game.pushScene(endScene)
			}), 100);
		}

		function enemyTurn() {
			if (enemy[8] > 0) {
				enemy[8] -= 1;
				battleText.text = enemy[0] + "は反動で動けない！";
				setTimeout(function () {
					toNextTurn();
				}, 2000)
				return;
			}
			else if (enemy[0] == "スライム（レア）") {
				if (Math.random() > 0.1) {action("とくぎ", "バリア", enemy, enemy);}
				else {action("こうげき", "こうげき", enemy, hero);}
			}
			else if (enemy[0] == "真・魔王") {
				let rand = Math.random();
				if (enemy[9] == 2.5) {action("とくぎ", "超魔弾・改", enemy, hero);}
				else if (rand > 0.9) {
					if (enemy[4] >= 20) {action("かいふくじゅもん", "レキュド", enemy, enemy);}
					else {action("とくぎ", "チャージ", enemy, enemy);}
				}
				else if (rand > 0.75) {action("とくぎ", "チャージ", enemy, enemy);}
				else {action("こうげき", "こうげき", enemy, hero);}
			}
			else if (enemy[0] != "スライム" && Math.random() > 0.7) {
				if (enemy[0] == "ひとつめ") {action("とくぎ", "突撃", enemy, hero);}
				else if (enemy[0] == "落ち武者") {action("とくぎ", "れんぞくぎり", enemy, hero);}
				else if (enemy[0] == "ドラゴン") {action("とくぎ", "ファイアブレス", enemy, hero);}
				else if (enemy[0] == "魔王Lv" + hero[5]) {action("とくぎ", "超魔弾", enemy, hero);}
			}
			else {
				action("こうげき", "こうげき", enemy, hero);
			}
			let scaleX = enemyImg.scaleX;
			let scaleY = enemyImg.scaleY;
			enemyImg.scaleX *= 1.2;
			enemyImg.scaleY *= 1.2;
			if (hero[3] == 0) {
				setTimeout(function () {
					enemyImg.scaleX = scaleX;
					enemyImg.scaleY = scaleY;
					battleText.text = hero[0] + "は倒れた...";
					setTimeout(function () {
						toGameOver();
					}, 2000)
				}, 2000)
			}
			else {
				setTimeout(function () {
					enemyImg.scaleX = scaleX;
					enemyImg.scaleY = scaleY;
					toNextTurn();
				}, 2000)
			}
		}

		function toNextTurn() {
			battleText.text = enemy[0] + "があらわれた！<br>コマンド？";
			console.log(enemy[3], enemy[4]);

			validateBattleBtn(true);
		}

		attackBtn.ontouchend = function () {
			if (!this.valid) {
				return;
			}
			buttonPressed();
			action("こうげき", "こうげき", hero, enemy);

			if (enemy[3] == 0) {
				setTimeout(function () {
					attackImg.scaleX = 0.0;
					conbatEnemy();
					setTimeout(function () {
						returnToMain();
					}, 2000)
				}, 2000)
			}
			else {
				setTimeout(function () {
					attackImg.scaleX = 0.0;
					enemyTurn();
				}, 2000)
			}
		}

		magicBtn.ontouchend = function () {
			if (!this.valid) {
				return;
			}
			if (!this.open) {
				game.assets[pushBgmUrl].play();
				closeTokugis();
				this.open = true;
				recuBtn.scaleX = 0.8;
				flamBtn.scaleX = 0.8;
				if (hero[5] >= 4) {reculaBtn.scaleX = 0.8;}
				if (hero[5] >= 6) {flameaBtn.scaleX = 0.8;}
				if (hero[5] >= 9) {recudBtn.scaleX = 0.8;}
				if (hero[5] >= 11) {flamoodBtn.scaleX = 0.8;}
			}
			else {
				game.assets[cancelBgmUrl].play();
				closeMagics();
			}
		}

		function healBtnPressed(button, healName) {
			if (!button.valid) {
				return;
			}
			buttonPressed();
			action("かいふくじゅもん", healName, hero, hero);
			setTimeout(function () {
				enemyTurn();
			}, 2000)
		}

		recuBtn.ontouchend = function () { healBtnPressed(recuBtn, "レキュ"); }
		reculaBtn.ontouchend = function () { healBtnPressed(reculaBtn, "レキュラ"); }
		recudBtn.ontouchend = function () { healBtnPressed(recudBtn, "レキュド"); }

		function fireBtnPressed(button, fireName, scaleX, scaleY, x, y) {
			if (!button.valid) {
				return;
			}
			buttonPressed();
			if (action("こうげきじゅもん", fireName, hero, enemy)) {
				fireImg.moveTo(x, y);
				fireImg.scaleX = scaleX;
				fireImg.scaleY = scaleY;
			}
			if (enemy[3] == 0) {
				setTimeout(function () {
					fireImg.scaleX = 0.0;
					conbatEnemy();
					setTimeout(function () {
						returnToMain();
					}, 2000)
				}, 2000)
			}
			else {
				setTimeout(function () {
					fireImg.scaleX = 0.0;
					enemyTurn();
				}, 2000)
			}
		}

		flamBtn.ontouchend = function () { fireBtnPressed(flamBtn, "フラム", 0.2, 0.2, -64, -40); }
		flameaBtn.ontouchend = function () { fireBtnPressed(flameaBtn, "フラメア", 0.3, 0.3, -74, -40); }
		flamoodBtn.ontouchend = function () { fireBtnPressed(flamoodBtn, "フラムード", 0.4, 0.4, -84, -40); }

		tokugiBtn.ontouchend = function () {
			if (!this.valid) {
				return;
			}
			if (!this.open) {
				game.assets[pushBgmUrl].play();
				closeMagics();
				this.open = true;
				if (hero[5] >= 3) {slashBtn.scaleX = 0.8;}
				if (hero[5] >= 13) {madanBtn.scaleX = 0.8;}
				if (hero[5] >= 20) {chargeBtn.scaleX = 0.8;}
				if (hero[5] >= 80) {barrierBtn.scaleX = 0.8;}
			}
			else {
				game.assets[cancelBgmUrl].play();
				closeTokugis();
			}
		}

		function tokugiBtnPressed(button, tokugiName, image, scaleX) {
			if (!button.valid) {
				return;
			}
			buttonPressed();
			if (action("とくぎ", tokugiName, hero, enemy)) {
				image.scaleX = scaleX;
			};
			if (enemy[3] == 0) {
				setTimeout(function () {
					image.scaleX = 0.0;
					conbatEnemy();
					setTimeout(function () {
						returnToMain();
					}, 2000)
				}, 2000)
			}
			else {
				setTimeout(function () {
					image.scaleX = 0.0;
					enemyTurn();
				}, 2000)
			}
		}

		slashBtn.ontouchend = function () { tokugiBtnPressed(slashBtn, "スラッシュ", attackImg, 2.5); }
		madanBtn.ontouchend = function () { tokugiBtnPressed(madanBtn, "魔弾", madanImg, 0.1); }
		chargeBtn.ontouchend = function () { tokugiBtnPressed(chargeBtn, "チャージ", attackImg, 0.0); }
		barrierBtn.ontouchend = function () { tokugiBtnPressed(barrierBtn, "バリア", attackImg, 0.0); }

		////////////////////////////////////////////////////////////////
		//結果画面
		const endScene = new Scene();
		endScene.backgroundColor = "black";

		//GAMEOVER
		const gameOverText = new Label(); 					//テキストはLabelクラス
		configLabel(gameOverText, "30px Meiryo", 'rgba(255,0,0,1)', 400, 110, 100, endScene);
		gameOverText.text = "Game Over";

		//リトライボタン
		const retryBtn = new Sprite(120, 60);				//画像サイズをここに書く。使う予定の画像サイズはプロパティで見ておくこと
		configSprite(retryBtn, 1.0, 1.0, 50, 200, game.assets[retryImgUrl], endScene);

		retryBtn.ontouchend = function () {				//S_Retryボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			state = 0;
			SearchAndLoadData(hero[0])
			gameOverBgm.stop();
			game.popScene();						//endSceneシーンを外す
			game.pushScene(mainScene);					//mainSceneシーンを入れる
		};

		//ツイートボタン
		const tweetBtn = new Sprite(120, 60);				//画像サイズをここに書く。使う予定の画像サイズはプロパティで見ておくこと
		configSprite(tweetBtn, 1.0, 1.0, 230, 200, game.assets[tweetImgUrl], endScene);

		tweetBtn.ontouchend = function () {				//S_Tweetボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			//ツイートＡＰＩに送信
			//結果ツイート時にURLを貼るため、このゲームのURLをここに記入してURLがツイート画面に反映されるようにエンコードする
			const url = encodeURI("http://rpgrn86222.stars.ne.jp/");
			if (!conbatMaou) {
				window.open("http://twitter.com/intent/tweet?text=" + hero[0] + "はLv" + hero[5] + "になった&hashtags=Rn86&url=" + url); //ハッシュタグにRn86タグ付くようにした。
			}
			if (conbatMaou) {
				window.open("http://twitter.com/intent/tweet?text=" + hero[0] + "はLv" + hero[5] + "になった　魔王を倒した！&hashtags=Rn86&url=" + url); //ハッシュタグにRn86タグ付くようにした。
			}
		};

		const rankingTitle = new Label();
		configLabel(rankingTitle, "20px Meiryo", 'rgba(255,255,0,1)', 400, 150, 350, endScene);
		rankingTitle.text = "ランキング";

		const rankingNameText = new Label();
		configLabel(rankingNameText, "20px Meiryo", 'rgba(255,255,0,1)', 400, 50, 380, endScene);

		const rankingLevelText = new Label();
		configLabel(rankingLevelText, "20px Meiryo", 'rgba(255,255,0,1)', 400, 300, 380, endScene);

	};
	game.start();
};
