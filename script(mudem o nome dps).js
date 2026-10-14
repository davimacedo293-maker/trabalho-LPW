let canvaEl = document.querySelector("canvas");
let context = canvaEl.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvaEl.width = width;
canvaEl.height = height;

class Spritesheet{
    constructor(img, frameWidth, frameHeight, framesX, framesY){
        //caracteristicas da imagem
        this.img = new Image();
        this.img.src = img;
        /*cada linha é uma animacao e 
        cada coluna dessa linha é um frame da animacao*/
        this.linhaAtual = 0;
        this.colunaAtual = 0;
        this.frameHeight = frameHeight;
        this.frameWidth = frameWidth;
        this.framesX = framesX;
        this.framesY = framesY;

        //posicao do personagem
        this.posX = 0;
        this.posY = 0;

        //velocidade do personagem
        this.vBase = 10;
        this.vX = 0;
        this.vY = 0;
    }
    desenhar(){
        context.drawImage(this.img,
            this.colunaAtual * this.frameWidth,
            this.linhaAtual * this.frameHeight,
            this.frameWidth, this.frameHeight,
            this.posX, this.posY,
            this.frameWidth, this.frameHeight
        );
    }
    mover(direcao){
        if(direcao == "direita"){
            this.vX = this.vBase;
        }
        if(direcao == "esquerda"){
            this.vX = -this.vBase;
        }
        if(direcao == "cima") {
            this.vY = -this.vBase;
        }
        if(direcao == "baixo") {
            this.vY = this.vBase;
        }
        if(direcao == "paradoX")
            this.vX = 0;
        if(direcao == "paradoY")
            this.vY = 0;
    }
    atualizarPosicao() {
        this.posX += this.vX;
        this.posY += this.vY;
    }
}

class Personagem extends Spritesheet{
    constructor(img, frameWidth, frameHeight, framesX, framesY){
        super(img, frameWidth, frameHeight, framesX, framesY);
        this.vida = 3;
        this.pontos = 0;
        this.danoBase = 10;
    }
    morrer(){
        if(this.vida <= 0){
            while(1) {
                window.alert("morreu");
            }
        }
    }
}

const teclas = {
    KeyA: false,
    KeyD: false,
    KeyW: false,
    KeyS: false
};

// if(x in y) verifica se x faz parte de um objeto ou vetor y
document.addEventListener('keydown', function(event) {
    if (event.code in teclas) {
        teclas[event.code] = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code in teclas) {
        teclas[event.code] = false;
    }
});

const jogador = new Personagem("sonic.jpg", 16, 16, 4, 4);

function atualizarJogo() {
    context.clearRect(0, 0, canvaEl.width, canvaEl.height);

    if(teclas.KeyD)
        jogador.mover("direita");
    else if(teclas.KeyA)
        jogador.mover("esquerda");
    else
        jogador.mover("paradoX");

    if(teclas.KeyW)
        jogador.mover("cima");
    else if(teclas.KeyS)
        jogador.mover("baixo");
    else
        jogador.mover("paradoY");

    jogador.atualizarPosicao();

    jogador.desenhar();

    requestAnimationFrame(atualizarJogo);
}

atualizarJogo();