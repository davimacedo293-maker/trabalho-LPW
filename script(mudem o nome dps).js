let canvaEl = document.querySelector("canvas");
let context = canvaEl.getContext("2d");

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
        this.vBase = 1;
        this.vX = 0;
        this.vY = 0;
    }
    desenhar(){
        context.drawImage(this.img.src,
            this.linhaAtual * this.frameWidth,
            this.colunaAtual * this.frameHeight,
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
        this.posX += this.vX; 
    }
}

class Personagem extends Spritesheet{
    constructor(){
        this.vida = 3;
        this.pontos = 0;
        this.danoBase = 10;
    }
    morrer(){
        if(this.vida <= 0){
            window.alert(moreu);
        }
    }
}
