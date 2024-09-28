// Questo codice può essere totalmente sostituito con
// un codice già pronto o può essere usato come base
// per uno sketch che cambia visualizzazione in relazione
// alle parti del brano audio definite con addCue().
//
// Per maggiori informazioni:
// https://codesthesia.net/brera/cg/laboratorio/progetto/
//
// Crediti musicali:
// https://freemusicarchive.org/music/Bauchamp/Loop_Mania_Sampler_Pack/130_od_beat


let sound;
let soundPart;  // parte corrente dell'audio
let fft;
let centro;

let diametro = 10;

let width = 1920;
let height = 1080;

let pixel;   // oggetto che cade
let player;  // oggetto che rimbalza
let base;
let pilastro;



function preload() {

  sound = loadSound("Pixel_sound.mp3");
}


function setup() {
  createCanvas(width, height);
  background(222);
  colorMode(HSB);
  

  
  stroke(255,127);
  noiseDetail(0.05, 0.05);

  
  
  noFill();

  fft = new p5.FFT();

  sound.addCue(0.01, cueReached, "bum");   
  sound.addCue(10.0, cueReached, "bumcha"); 
  sound.addCue(4.0, cueReached, "cha"); 
  sound.addCue(20.0, cueReached, "bim");

  sound.playMode("restart"); // evita sovrapposizioni audio
  sound.setVolume(0.5); // solo per non spaventare la nonna
  sound.loop(); // audio che parte subito

  setupResizable();
  
  pixel = new Group();
  pixel.width = 20;
  pixel.height = 20;
  pixel.x = () => random(270,1700); 
  pixel.y = () => random (360,500);
  pixel.amount = 400;
  pixel.bounciness = 0;   
  
    player = new Sprite(360, 100, 36);     
    player.bounciness = 0.8;
  
  //labirinto
    base1 = new Sprite(340, 190, 240, 20, "static");
    base2 = new Sprite(530, 280, 240, 20, "static");
    base3 = new Sprite(340, 380, 240, 20, "static");
    base4 = new Sprite(470, 455, 20, 170, "static");
    base5 = new Sprite(690, 565, 20, 270, "static");
    base6 = new Sprite(610, 365, 20, 150, "static");
    base7 = new Sprite(640, 185, 20, 170, "static");
    base8 = new Sprite(830, 190, 200, 20, "static");
    base9 = new Sprite(740, 325, 20, 250, "static");
    base10 = new Sprite(830, 460, 200, 20, "static");
    pilastro = new Sprite(955, 510, 50, 380, "static");
    base12 = new Sprite(990, 260, 20, 320, "static");
    base13 = new Sprite(1100, 410, 200, 20, "static");
    base14 = new Sprite(1290, 340, 200, 20, "static");
    base15 = new Sprite(1100, 280, 200, 20, "static");
    base16 = new Sprite(1290, 210, 240, 20, "static");
    base17 = new Sprite(1400, 460, 20, 480, "static");
  
  
  //schermo
    base7 = new Sprite(965, 80,1570 , 40, "static"); //alto
    base8 = new Sprite(200, 380, 40, 640, "static");//sinistra
    base9 = new Sprite(965, 720, 1570, 40, "static");//basso
    base10 = new Sprite(1730,380, 40, 640, "static");//destra

    world.gravity.y = 10;
}

function cueReached(val) {
  soundPart = val;
}

function setupResizable() {
  centro = createVector(width/2, height/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupResizable();
}


function draw() {
  clear();
  if (player.collided(pilastro)) {
		player.vel.y = -5;
		pilastro.h -= 50;
	}
  
    //FRECCIA
  noFill();
  circle(mouseX, mouseY, diametro);
  
  if (mouse.pressing()) {
        player.moveTowards( mouse );
    }
  
  
  fft.analyze();  // analizza frequenze (per getEnergy())
  
  // sfondo (in base alla parte dell'audio)
  if (soundPart == "bum") {
    background(118,39,44); // rosso scuro
  } else if (soundPart == "bumcha") {
    background(170,39,76); // violetto
  } else if (soundPart == "cha") {
    background(229,55,60); // azzurro
  } else if (soundPart == "bim"){
    background(100, 250, 30);
  }
  
  
  //FONDO PIXEL
  noStroke()
  fill(118,29,64)
  for (let a = 5;  a < width;  a = a+60) {
        for (let b = 5;  b < height;  b = b+60) {
            square( a,b, 30 );
        }
    }
  
  for (let a = 35;  a < width;  a = a+60) {
        for (let b = 35;  b < height;  b = b+60) {
            square( a,b, 30 );
        }
    }

  //console
   
  fill(0,0,60);//grigio
  rect(0,700,1950,300);
  
  //croce comandi
  fill(0,0,0)
  rect(675,800,30,140);
  rect(620,855,140,30);
  
  fill(206,79,72); //blu
  circle(1400,830,50);
  
  fill(8,91,84);//rosso
  circle(1320,900,50);
  
  noStroke();
  fill(0,0,0);//nero
  rect(0,0,1950,60);
  rect(0,60, 200,680);
  rect(1750,60, 200,680);

  
  let yt = frameCount * 0.5; // tempo
    let yv = sin( yt * 0.1 ) * 0.4; // valore
    let y1 = map( yv, -0.5, 0.5, 790, 750 );
    let y2 = map( yv, -0.5, 0.5, 770, 750 );
  
  circle(30,960,50); //cerchio nero del volume
  
  
  
  //sound bar console
  
       //volume viola
  if (soundPart == "cha" || soundPart == "bumcha" || soundPart == "bim") {
    let eTreble = fft.getEnergy("treble");
    let diamTrebleAlto = map(eTreble, 0, 255, 0, 2000);
    //frameRate(10);
    fill(229,55,60);
    rect(60, 700,80,-diamTrebleAlto);
  }
     //volume assurrino
  if (soundPart == "cha" || soundPart == "bumcha" || soundPart == "bim") {
    let eTreble = fft.getEnergy("treble");
    let diamTrebleAlto = map(eTreble, 0, 255, 0, 1800);
    //frameRate(10);
    fill(170,39,76);
    rect(1800, 700,80,-diamTrebleAlto);
  }
  //cercio console
  
  if (soundPart == "bumcha" || soundPart == "cha" || soundPart == "bim") {
    let eTreble = fft.getEnergy("treble");
    let diamTreble = map(eTreble, 0, 255, 0, 130);
    fill(360,100,100);
    strokeWeight(2);
    stroke(255);
    circle(30, 960, diamTreble);
  }
  


}


function mousePressed(){
  diametro += 2;
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

// FUNZIONI CHIAMATE ATTRAVERSO ICONA ALTOPARLANTE

function attivaAudio() {  // se l'audio viene riattivato...
  sound.loop(); // riavvia il brano
}

function disattivaAudio() {  // se l'audio viene disattivato...
  sound.pause(); // metti in pausa il brano
}
