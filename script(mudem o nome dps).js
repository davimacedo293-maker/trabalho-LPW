let canvaEl = document.querySelector("canvas");
let context = canvaEl.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvaEl.width = width;
canvaEl.height = height;

const teclasAndar = {
    KeyA: false,
    KeyD: false
};

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
        this.posX = 100;
        this.posY = 0;

        //velocidade do personagem
        this.vBase = 10;
        this.vX = 0;
        this.vY = 0;

        //caracteristicas do pulo
        this.noChao = true;
        this.gravidade = 0.6;
        this.forcaPulo = -12;
        this.alturaPulo = 50;
        this.frameAtual = 0;

    }
    desenhar(){
        context.drawImage(this.img,
            this.colunaAtual,
            this.linhaAtual,
            this.frameWidth, this.frameHeight,
            this.posX, this.posY,
            this.frameWidth, this.frameHeight
        );
    }
    mover(direcao){
        if(direcao == "direita"){
            this.vX = this.vBase;
            this.colunaAtual = 2 * this.frameWidth;
        }
        if(direcao == "esquerda"){
            this.vX = -this.vBase;
            this.colunaAtual = 2 * this.frameWidth;
        }
        if(direcao == "cima") {
            if(this.noChao) {
                this.vY = this.forcaPulo;
                this.linhaAtual = 3 * this.frameHeight;
                this.noChao = false;
            }
        }
        if(direcao == "paradoX") {
            this.vX = 0;
            this.colunaAtual = 1 * this.frameWidth;
        }
    }
    atualizarPosicao() {
        this.posX += this.vX;

        this.vY += this.gravidade;
        this.posY += this.vY;

        let chao = 201;
        if(this.posY >= chao) {
            this.linhaAtual = 1 * this.frameHeight;
            this.posY = (chao - 1);
            this.vY = 0;
            this.noChao = true;
        }
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

// if(x in y) verifica se x faz parte de um objeto ou vetor y
document.addEventListener('keydown', function(event) {
    if (event.code in teclasAndar) {
        teclasAndar[event.code] = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code in teclasAndar) {
        teclasAndar[event.code] = false;
    }
});

document.addEventListener('keydown', function(event) {
    if(event.code == "KeyW") {
        jogador.mover("cima");
    }
})

const jogador = new Personagem("sonic.jpg", 40, 40, 12, 10);

function atualizarJogo() {
    context.clearRect(0, 0, canvaEl.width, canvaEl.height);

    if(teclasAndar.KeyD)
        jogador.mover("direita");
    else if(teclasAndar.KeyA)
        jogador.mover("esquerda");
    else
        jogador.mover("paradoX");

    jogador.atualizarPosicao();

    jogador.desenhar();

    requestAnimationFrame(atualizarJogo);
}

atualizarJogo();