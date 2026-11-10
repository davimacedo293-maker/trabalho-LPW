import { Personagem, Inimigo, Tileset } from './classes.js';
import { canvaEl, context, mapaDoJogo, pontosDeSpawnInimigos, TileSize } from './constantes.js';
import { camera, moverCamera } from './camera.js';

const razaoDoCanva = 16/9;
const widthPadrao = 960;
const heightPadrao = 540;

const TodosOsTilesets = {
    1: new Tileset('./sprites/plataformas/sprite_terra_grama.png', 1)
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

const jogador = new Personagem("sprites/jogador/DarkSamurai.png", 32, 32, 14, 8, 80, 400, 32, 32, 1, 1);

let listaInimigos = [];

function criarInimigo(posX, posY) {
    let novoInimigo = new Inimigo("sprites/jogador/black-background.png", 16, 16, 21, 33, 200, 200, 8, 14, 1, 1);
    novoInimigo.posX = posX;
    novoInimigo.posY = posY;

    listaInimigos.push(novoInimigo);
}
criarInimigo(300, 500);

function verificaCriacaoInimigo() {
    for(let i = pontosDeSpawnInimigos.length - 1; i >= 0; i--) {
        if(jogador.posX >= pontosDeSpawnInimigos[i].x) {
            if(!pontosDeSpawnInimigos[i].ativado) {
                criarInimigo(300, pontosDeSpawnInimigos[i].y);
                pontosDeSpawnInimigos[i].ativado = true;
            }
        }
    }
}

function atualizarJogo() {
    context.clearRect(0, 0, canvaEl.width, canvaEl.height);

    moverCamera(jogador, canvaEl);

    context.save();
    context.translate(-camera.x, -camera.y);

    if(jogador.noChao && jogador.knockback)
        jogador.knockback = false;

    if(teclasAndar.KeyD)
        jogador.controlar("direita");
    else if(teclasAndar.KeyA)
        jogador.controlar("esquerda");
    else if(!jogador.knockback)
        jogador.controlar("paradoX");

    //desenha o mapa
    for(let Tile of Object.values(TodosOsTilesets)){
        Tile.desenharMapaTileset(mapaDoJogo);
    }

    if(jogador.estaAtacando) {
        jogador.atacar(listaInimigos);
    }

    jogador.atualizarPosicao();

    jogador.atualizarAnimacao();

    for(let i = listaInimigos.length - 1; i >= 0; i--) {
        let inimigo = listaInimigos[i];

        if(inimigo.vida <= 0) {
            listaInimigos.splice(i, 1);
            jogador.pontos += 67;
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

    verificaCriacaoInimigo();

    jogador.desenhar();

    context.restore();

    context.font = '24px "Comic Sans MS"';
    context.fillStyle = "black";
    context.fillText("Vidas: " + jogador.vida, 0, 30);
    context.fillText("Pontos: " + jogador.pontos, 130, 30);

    requestAnimationFrame(atualizarJogo);
}

atualizarJogo();