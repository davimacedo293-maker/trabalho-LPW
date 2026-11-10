import { mapaDoJogo, TileSize } from "./constantes.js";

export const camera = {
    x:0,
    y:0
};

export function moverCamera(Personagem, canvaEl) {
    const larguraMapa = mapaDoJogo[0].length * TileSize;
    const alturaMapa = mapaDoJogo.length * TileSize;

    camera.x = Personagem.posX + Personagem.frameWidth / 2 - canvaEl.width / 2;

    camera.x = Math.max(0, Math.min(camera.x, larguraMapa - canvaEl.width));
}