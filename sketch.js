//variáveis da bola
let xBall = 300;
let yBall = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bola
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 7;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let collide = false;

//Placar 
let pontosPlayer = 0;
let pontosOponente = 0;

//Sons do Game
let raquetada;
let ponto; 
let trilhasonora;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop(0,1,0.2);
}

function draw() {
  background(0);
  showBall();
  movimentaBolinha();
  verificaColisaoBorda();
  showRaquete(xRaquete,yRaquete);
  movimentoRaquete();
  colisaoRaquete(xRaquete,yRaquete); //Raquete Player
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente); //Raquete Oponente 
  showRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  showPlacar();
  reconhecerPontos();
}

function showBall(){
  circle(xBall, yBall, diametro);
}

function movimentaBolinha(){
  xBall += velocidadeXBolinha;
  yBall += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBall + raio> width ||
     xBall - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBall + raio> height ||
     yBall - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function showRaquete (x,y){
  rect(x,y, raqueteComprimento , raqueteAltura);
}

function movimentoRaquete () {
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}
function colisaoRaquete(x,y){
  collide =
    collideRectCircle(x, y, raqueteComprimento , raqueteAltura , xBall , yBall , raio);
  if (collide){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaRaqueteOponente(){
    velocidadeYOponente = yBall - yRaqueteOponente - raqueteComprimento / 2 - 10;
    yRaqueteOponente += velocidadeYOponente
  calculaChanceDeErrar()
}
function showPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(17);
  fill(color(0,255,255));
  rect(150 , 10 , 40, 20);
  fill(225);
  text(pontosPlayer , 170 ,26 );
  fill(color(0,255,255));
  rect (450 , 10 , 40 , 20);
  fill(225);
  text(pontosOponente , 470 , 26);
}
function reconhecerPontos (){
  if (xBall > 590){
    pontosPlayer += 1;
    ponto.play();
  }
  if (xBall < 10){
    pontosOponente += 1;
    ponto.play()
  }
}
function calculaChanceDeErrar() {
  if (pontosOponente >= pontosPlayer) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 60
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}