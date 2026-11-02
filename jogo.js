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
}

class Entidade extends Spritesheet{
    constructor(img, frameWidth, frameHeight, framesX, framesY, posX, posY, hitboxWidth, hitboxHeight){
        super(img, frameWidth, frameHeight, framesX, framesY);

        //posiçao da entidade
        this.posX = posX;
        this.posY = posY;

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

        this.estaAtacando = false;
        this.tempoAtaque = 0;
        this.alcanceAtaque = 1;
        this.direcaoOlhar = 1;

        this.hitboxWidth = hitboxWidth;
        this.hitboxHeight = hitboxHeight;
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

    atualizarPosicao() {
        this.posX += this.vX;
        this.posY += this.vY;
    }
}

class Personagem extends Entidade{
    constructor(img, frameWidth, frameHeight, framesX, framesY, posX, posY, hitboxWidth, hitboxHeight){
        super(img, frameWidth, frameHeight, framesX, framesY, posX, posY, hitboxWidth, hitboxHeight);
        this.vida = 3;
        this.pontos = 0;
        this.danoBase = 10;

        this.tempoInvulneravel = 0;
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

    controlar(direcao){
        if(direcao == "direita"){
            this.vX = this.vBase;
            this.colunaAtual = 2;
            this.direcaoOlhar = 1;
        }
        if(direcao == "esquerda"){
            this.vX = -this.vBase;
            this.colunaAtual = 2;
            this.direcaoOlhar = -1;
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
            let fodase = "67_69_420";
        }
    }
    ativarAtaque() {
        if (this.tempoAtaque <= 0) {
            this.estaAtacando = true;
            this.tempoAtaque = 12;
        }
        this.direcaoOlhar = (this.vX < 0) ? -1 : 1; 
    }
    atacar() {
        const duracaoTotal = 12;
        let framesPassados = duracaoTotal - this.tempoAtaque;
        let progressoLinear = framesPassados / duracaoTotal;
        let progressoAnimacao = 1 - Math.pow(1 - progressoLinear, 3); //Suavização da animação

        let dir = this.direcaoOlhar; 
        
        //Converte a posição central do jogador para a matriz
        let tileX = Math.floor((this.posX + this.frameWidth / 2) / TileSize);
        let tileY = Math.floor((this.posY + this.frameHeight / 2) / TileSize);

        //Descobre a distância até a parede em quantidade de blocos
        let limiteDeBlocos = this.alcanceAtaque; 
        
        for(let i = 1; i <= this.alcanceAtaque; i++) {
            let checarX = tileX + (i * dir);
            let checarY = tileY;

            if(mapaDoJogo[checarY][checarX] === 1) {
                limiteDeBlocos = i - 1;
                break;
            }
        }

        let alcanceMaximoPixels = limiteDeBlocos * TileSize;
        let larguraPixelAtual = progressoAnimacao * alcanceMaximoPixels;

        context.fillStyle = "blue";
        context.lineWidth = 1;

        if (dir === 1) {
            let ataqueX = this.posX + this.frameWidth;
            context.fillRect(ataqueX, this.posY, larguraPixelAtual, this.frameHeight);
            context.strokeRect(ataqueX, this.posY, larguraPixelAtual, this.frameHeight);
        } else {
            let ataqueX = this.posX;
            context.fillRect(ataqueX, this.posY, -larguraPixelAtual, this.frameHeight);
            context.strokeRect(ataqueX, this.posY, -larguraPixelAtual, this.frameHeight);
        }

        let hitboxX = (dir === 1) ? (this.posX + this.frameWidth) : (this.posX - larguraPixelAtual);
        let ataqueHitbox = { 
            x: hitboxX, 
            y: this.posY, 
            width: larguraPixelAtual, 
            height: this.frameHeight 
        };

        // aplica o dano se encostar no inimigo
        if (typeof listaInimigos !== 'undefined') {
            listaInimigos.forEach(inimigo => {
                if (ataqueHitbox.x < inimigo.posX + inimigo.frameWidth &&
                    ataqueHitbox.x + ataqueHitbox.width > inimigo.posX &&
                    ataqueHitbox.y < inimigo.posY + inimigo.frameHeight &&
                    ataqueHitbox.y + ataqueHitbox.height > inimigo.posY) {
                    if (inimigo.tempoInundado <= 0) {
                        inimigo.vida -= this.danoBase;
                        inimigo.tempoInundado = 20;
                    }
                }
            });
        }

        jogador.tempoAtaque--;
        if(jogador.tempoAtaque <= 0)
            jogador.estaAtacando = false;
    }
}

// if(x in y) verifica se x faz parte de um objeto ou vetor y
document.addEventListener('keydown', function(event) {
    if (event.code in teclasAndar)
        teclasAndar[event.code] = true;

    if(event.code == "KeyW")
        jogador.controlar("cima");

    if(event.code == "KeyJ")
        jogador.ativarAtaque();
});

document.addEventListener('keyup', function(event) {
    if (event.code in teclasAndar) {
        teclasAndar[event.code] = false;
    }
});

class Inimigo extends Entidade {
    constructor(img, frameWidth, frameHeight, framesX, framesY, posX, posY, hitboxWidth, hitboxHeight){
        super(img, frameWidth, frameHeight, framesX, framesY, posX, posY, hitboxWidth, hitboxHeight);
        this.vida = 50;
        this.dano = 1;

        this.vBase = 2;
        this.tempoInundado = 0;
    }
    perseguir(alvo) {
        if(this.posX < alvo.posX) {
            this.vX = this.vBase;
            this.colunaAtual = 2     //(muda a coluna da spritesheet p animação de andar)
        }
        else if(this.posX > alvo.posX) {
            this.vX = -this.vBase;
            this.colunaAtual = 2     //(muda a coluna da spritesheet p animação de andar)
        }
        else
            this.vX = 0;

        this.vY += this.gravidade;

        this.posX += this.vX;
        if (this.checarColisoes(this.posX, this.posY, "x")) {
            this.vX = 0;
        }

        this.posY += this.vY;
        if (this.checarColisoes(this.posX, this.posY, "y")) {
            if (this.vY > 0) {
                let baixo = (this.posY + this.frameHeight);
                this.posY = Math.floor(baixo / TileSize) * TileSize - this.frameHeight;
                this.vY = 0;
            }
        }
    }
    causarDanoAoJogador(alvo) {
        if (this.posX < alvo.posX + alvo.frameWidth &&
            this.posX + this.frameWidth > alvo.posX &&
            this.posY < alvo.posY + alvo.frameHeight &&
            this.posY + this.frameHeight > alvo.posY) {
            console.log(alvo.tempoInvulneravel);
            if (alvo.tempoInvulneravel <= 0) {
                alvo.vida -= this.dano;
                alvo.tempoInvulneravel = 60; //1 segundo de invencibilidade (60 frames)
                alvo.morrer();
            }
        }
    }
}

const jogador = new Personagem("sprites/jogador/black-background.png", 16, 16, 21, 33, 100, 100, 8, 14);

let listaInimigos = [];

const primeiroInimigo = new Inimigo("sprites/jogador/black-background.png", 16, 16, 21, 33, 200, 200, 8, 14);
primeiroInimigo.posX = 200;
primeiroInimigo.posY = 100;

listaInimigos.push(primeiroInimigo);

function atualizarJogo() {
    context.clearRect(0, 0, canvaEl.width, canvaEl.height);

    context.font = '24px "Comic Sans MS"';
    context.fillStyle = "black";
    context.fillText("Vidas: " + jogador.vida, 0, 30);

    if(teclasAndar.KeyD)
        jogador.controlar("direita");
    else if(teclasAndar.KeyA)
        jogador.controlar("esquerda");
    else
        jogador.controlar("paradoX");

    //muda depois
    desenharMapa();

    if(jogador.estaAtacando) {
        jogador.atacar();
    }

    jogador.atualizarPosicao();

    for(let i = listaInimigos.length - 1; i >= 0; i--) {
        let inimigo = listaInimigos[i];

        if(inimigo.vida <= 0) {
            listaInimigos.splice(i, 1);
            continue;
        }

        if(inimigo.tempoInundado > 0)
            inimigo.tempoInundado--;

        inimigo.perseguir(jogador);
        inimigo.causarDanoAoJogador(jogador);
        inimigo.desenhar();
    }

    if(jogador.tempoInvulneravel > 0)
        jogador.tempoInvulneravel--;

    jogador.desenhar();

    requestAnimationFrame(atualizarJogo);
}

atualizarJogo();