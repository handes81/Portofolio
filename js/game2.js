setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
	logo:"logo1.png",
	startBtn:"tombolStart1.png",
	cover:"cover1.png",
	playBtn:"btn-play.png",
	maxBtn:"maxBtn.png",
	minBtn:"minBtn.png",
	idle:"Idle.png",
	run:"Run.png",
	jump:"Jump.png",
	fall:"Fall.png",
	tileset:"Terrain.png",
	bg:"bg2.png",
	enidle:"enidle.png",
	enhit:"enhit.png",
	enrun:"enrun.png",
	cp:"cp.png",
	apple:"apple.png"
}
//file suara yang dipakai dalam game
var suara = {
	bgm:"sound1.mp3",
	bgm2:"sound2.mp3",
	bgm3:"sound3.mp3",
	bgm4:"sound4.mp3"
}

//load gambar dan suara lalu jalankan startScreen
loading(gambar, suara, startScreen);

function startScreen(){	
	hapusLayar("#ece8e1");
	tampilkanGambar(dataGambar.logo, 600, 200);
	var startBtn = tombol(dataGambar.startBtn, 600, 350);
	if (tekan(startBtn)){
		jalankan(halamanCover);
	}
}

function halamanCover(){
	hapusLayar("#ece8e1");
	gambarFull(dataGambar.cover);
	
	var playBtn = tombol(dataGambar.playBtn, 1100, 500);
	if (tekan(playBtn)){
		musik(bgmc(),30);
		setAwal();
		jalankan(gameLoop);
	}	
	resizeBtn(1150,50);
}

function setAwal(){
	
	game.hero = setSprite(dataGambar.idle,32,32);
	game.hero.animDiam = dataGambar.idle;
	game.hero.animJalan = dataGambar.run;
	game.hero.animLompat = dataGambar.jump;
	game.hero.animJatuh = dataGambar.fall;
	game.skalaSprite = 2;
	
	setPlatform(map_1, dataGambar.tileset, 32, game.hero);
	setPlatformTrigger(1, dataGambar.cp);
	setPlatformItem(1, dataGambar.apple);

	game.gameOver = ulangiPermainan;
	
	var musuh1 = {};
	musuh1.animDiam = dataGambar.enidle;
	musuh1.animJalan = dataGambar.enrun;
	musuh1.animMati = dataGambar.enhit;
	setPlatformEnemy(1, musuh1);
}

function gameLoop() {
    hapusLayar("#9c9695");
	cekItem();
	teks(game.score, 40, 60, "Calibri-bold-20pt-left-biru");

    // Pengecekan arah gerakan karakter
    var gerakanX = 0;
    if (game.kanan) {
        gerakanX = 3;
    } else if (game.kiri) {
        gerakanX = -3;	
    }
    // Gerakan karakter
	
    if (game.atas) {
        gerakLevel(game.hero, 0, -10);
    }
    gerakLevel(game.hero, gerakanX, 0);

    // Latar belakang
    if (gerakanX !== -20) {

			// Background bergerak ke kiri sesuai pergerakan karakter
			latar(dataGambar.bg, 1, gerakanX * 0);
	}

    buatLevel();
}

 function ulangiPermainan(){
	game.aktif = true;
	setAwal();
	jalankan(gameLoop);
 }
 
 function bgmc(){
	 var random= Math.random() * 1;
	 if(random <= 0.25){
		 return dataSuara.bgm;
	 }else if(random <= 0.50){
		 return dataSuara.bgm2;
	 }else if(random <= 0.75){
		 return dataSuara.bgm3
	 }else if(random > 0.75){
		 return dataSuara.bgm4;
	 }
 }
 
 function cekItem(){
	if(game.itemID > 0){
		tambahScore(10*game.itemID);
		game.itemID = 0;
	}

	 
	 
	 
	if (game.triggerID == 1){
	game.triggerID = 0;
	game.aktif = false;
	setTimeout(ulangiPermainan, 2000);
	}
 }