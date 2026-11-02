import { BITMASK_PARA_SPRITE, TileSize, context, mapaDoJogo } from './constantes.js';

export class Spritesheet{
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

export class Tileset extends Spritesheet{
    constructor(img, IdDoTile){
        super(img, TileSize, TileSize, 8, 6);
        this.id = IdDoTile;
    }

    checarBitmask(mapa, linha, coluna){
        if(mapa[linha][coluna] === 0 || mapa[linha][coluna] !== this.id) return -1;

        const linhas = mapa.length;
        const colunas = mapa[0].length;

        const n = (linha > 0) && mapa[linha - 1][coluna] === this.id;
        const s = (linha < linhas - 1) && mapa[linha + 1][coluna] === this.id;
        const l = (coluna < colunas - 1) && mapa[linha][coluna + 1] === this.id;
        const o = (coluna > 0) && mapa[linha][coluna - 1] === this.id;

        const ne = (linha > 0 && coluna < colunas - 1) && mapa[linha - 1][coluna + 1] === this.id;
        const se = (linha < linhas - 1 && coluna < colunas - 1) && mapa[linha + 1][coluna + 1] === this.id;
        const no = (linha > 0 && coluna > 0) && mapa[linha - 1][coluna - 1] === this.id;
        const so = (linha < linhas - 1 && coluna > 0) && mapa[linha + 1][coluna - 1] === this.id;

        let valorBitmask = 0;

        if(no && o && n) valorBitmask += 1;
        if(n) valorBitmask += 2;
        if(ne && n && l) valorBitmask += 4;
        if(l) valorBitmask += 8;
        if(se && s && l) valorBitmask += 16;
        if(s) valorBitmask += 32;
        if(so && s && o) valorBitmask += 64;
        if(o) valorBitmask += 128;

        return valorBitmask;
    }

    desenharMapaTileset(mapa){
        for(let y = 0; y < mapa.length; y++){
            for(let x = 0; x < mapa[y].length; x++){
                let bitmask = this.checarBitmask(mapa, y, x);

                if(bitmask === -1){
                    continue;
                }

                let indexTileset = BITMASK_PARA_SPRITE[bitmask];

                if(indexTileset === undefined) indexTileset = 46;
                this.colunaAtual = indexTileset % this.framesX;
                this.linhaAtual = Math.floor(indexTileset / this.framesX);

                this.posX = x * this.frameWidth;
                this.posY = y * this.frameHeight;

                this.desenhar();
            }
        }
    }
}

export class Entidade extends Spritesheet{
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

export class Personagem extends Entidade{
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

export class Inimigo extends Entidade {
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