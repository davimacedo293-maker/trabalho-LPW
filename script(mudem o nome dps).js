let canvaEl = document.querySelector("canvas");
let context = canvaEl.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

const razaoDoCanva = 16/9;
const widthPadrao = 960;
const heightPadrao = 540;

const mapaDoJogo = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
let TileSize = 32;

//mapa temporario:

function desenharMapa() {
    for (let l = 0; l < mapaDoJogo.length; l++) {
        for (let c = 0; c < mapaDoJogo[l].length; c++) {
            if (mapaDoJogo[l][c] === 1) {
                let posX = c * TileSize;
                let posY = l * TileSize;

                context.fillStyle = "gray";
                context.fillRect(posX, posY, TileSize, TileSize);                
            }
        }
    }
}

//ajuda o canva a manter a proporçao independente do tamanho da sua tela
function ajustarCanvas(){
    const porcentagemDaTela = 0.8;
    let targetWidth = window.innerWidth * porcentagemDaTela;
    let targetHeight = targetWidth / razaoDoCanva;

    canvaEl.style.width = targetWidth + "px";
    canvaEl.style.height = targetHeight + "px";

    canvaEl.style.position = "absolute";
    canvaEl.style.left = "50%";
    canvaEl.style.top = "50%";
    canvaEl.style.transform = "translate(-50%, -50%)";

    canvaEl.width = widthPadrao;
    canvaEl.height = heightPadrao;

    context.imageSmoothingEnabled = false;
    canvaEl.style.imageRendering = "pixelated";
}
ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);

const teclasAndar = {
    KeyA: false,
    KeyD: false
};

class Spritesheet{
    constructor(img, frameWidth, frameHeight, framesX, framesY){
        //caracteristicas da imagem
        this.img = new Image();

        this.carregada = false;

        this.img.onload = () => {
            this.carregada = true;
        }

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
        this.posY = 100;

        //velocidade do personagem
        this.vBase = 5;
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
        if(this.carregada){
            context.drawImage(this.img,
                this.colunaAtual * this.frameWidth,
                this.linhaAtual * this.frameHeight,
                this.frameWidth, this.frameHeight,
                this.posX, this.posY,
                this.frameWidth, this.frameHeight
            );
        } else {
            // PROVISÓRIO: Desenha um quadrado vermelho enquanto a imagem carrega
            context.fillStyle = "red";
            context.fillRect(
                this.posX, 
                this.posY, 
                this.frameWidth, 
                this.frameHeight
            );
        }
    }
    atualizarPosicao() {
        this.posX += this.vX;
        this.posY += this.vY;
    }
}

class Personagem extends Spritesheet{
    constructor(img, frameWidth, frameHeight, framesX, framesY, hitboxWidth, hitboxHeight){
        super(img, frameWidth, frameHeight, framesX, framesY);
        this.vida = 3;
        this.pontos = 0;
        this.danoBase = 10;

        this.hitboxWidth = hitboxWidth;
        this.hitboxHeight = hitboxHeight;
    }
    atualizarPosicao(){

        this.vY += this.gravidade;

        //checa no X
        this.posX += this.vX;

        if(this.checarColisoes(this.posX, this.posY, "x")){
            //colisao pra direita

            //a variavel direita é a posicao exata da direita do personagem
            if(this.vX > 0){
                let direita = this.posX + this.frameWidth - (this.frameWidth - this.hitboxWidth) / 2;
                let folgaEsquerda = (this.frameWidth - this.hitboxWidth) / 2;
                this.posX = Math.floor(direita / TileSize) * TileSize - this.frameWidth + folgaEsquerda - 1;

            }
            //colisao pra esquerda

            //a variavel esquerda aq é a mesma coisa
            if(this.vX < 0){
                let esquerda = (this.posX + (this.frameWidth - this.hitboxWidth)/2);
                this.posX = Math.floor(esquerda / TileSize) * TileSize + TileSize - (this.frameWidth - this.hitboxWidth)/2;
            }
            this.vX = 0;
        }

        //checa no y
        this.posY += this.vY;

        this.noChao = false;
        if(this.checarColisoes(this.posX, this.posY, "y")){
            //colisao embaixo
            if(this.vY > 0){
                let baixo = (this.posY + this.frameHeight);
                this.posY = Math.floor(baixo / TileSize) * TileSize - this.frameHeight;
                this.noChao = true;
                this.vY = 0;
            }
            //colisao emcima
            if(this.vY < 0){
                let cima = this.posY + this.frameHeight - this.hitboxHeight;
                this.posY = Math.floor(cima / TileSize) * TileSize + TileSize - (cima - this.posY);
                this.vY = 0;
            }
        }

        /*consertar isso pra funcionar com qualquer plataforma
        let chao = 201;
        if(this.posY >= chao) {
            this.linhaAtual = 1 * this.frameHeight;
            this.posY = (chao - 1);
            this.vY = 0;
            this.noChao = true;
        }*/
    }
    checarColisoes(futuroX, futuroY, eixo){
        //false significa que nn tem colisao, true é pq tem

        let esquerdo = Math.floor((futuroX + (this.frameWidth - this.hitboxWidth)/2) / TileSize);
        let direita = Math.floor((futuroX + (this.frameWidth + this.hitboxWidth)/2) / TileSize);
        let topo = Math.floor((futuroY + this.frameHeight - this.hitboxHeight)/TileSize);
        let baixo = Math.floor((futuroY + this.frameHeight)/ TileSize);

        if(eixo === "x"){
            baixo = Math.floor((futuroY + this.frameHeight - 1)/ TileSize);
        }
        if(eixo === "y"){
            direita = Math.floor((futuroX + (this.frameWidth + this.hitboxWidth)/2 - 1) / TileSize);
            esquerdo = Math.floor((futuroX + (this.frameWidth - this.hitboxWidth)/2 + 1) / TileSize);
        }

        if (esquerdo < 0 || topo < 0 || baixo >= mapaDoJogo.length || direita >= mapaDoJogo[0].length) {
            return true;
        }


        for(let l = topo; l <= baixo; l++){
            for(let c = esquerdo; c <= direita; c++){
                if(mapaDoJogo[l][c] === 1){
                    return true;
                }
            }
        }
        return false;
    }

    controlar(direcao){
        if(direcao == "direita"){
            this.vX = this.vBase;
            this.colunaAtual = 2;
        }
        if(direcao == "esquerda"){
            this.vX = -this.vBase;
            this.colunaAtual = 2;
        }
        if(direcao == "cima") {
            if(this.noChao) {
                this.vY = this.forcaPulo;
                this.linhaAtual = 3;
                this.noChao = false;
            }
        }
        if(direcao == "paradoX") {
            this.vX = 0;
            this.colunaAtual = 1;
        }
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
        jogador.controlar("cima");
    }
})

const jogador = new Personagem("sprites/jogador/black-background.png", 16, 16, 21, 33, 8, 14);

function atualizarJogo() {
    context.clearRect(0, 0, canvaEl.width, canvaEl.height);

    if(teclasAndar.KeyD)
        jogador.controlar("direita");
    else if(teclasAndar.KeyA)
        jogador.controlar("esquerda");
    else
        jogador.controlar("paradoX");

    jogador.atualizarPosicao();

    jogador.desenhar();

    //muda depois
    desenharMapa();

    requestAnimationFrame(atualizarJogo);
}

atualizarJogo();