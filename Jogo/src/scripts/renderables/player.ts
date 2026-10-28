import { Sprite, TextureAtlas, loader, Body, Rect, game, input } from "melonjs";

class PlayerEntity extends Sprite {
    // Variáveis de controlo do Dash
    isDashing: boolean = false;
    dashTimer: number = 0;
    dashDuration: number = 150; // Duração do dash em ms
    dashCooldown: number = 0; //Cooldown para realizar o prox dash
    dashSpeed: number = 25;     // Velocidade explosiva do dash
    facingLeft: boolean = false;  // Direção do personagem
    /**
     * constructor
     */
    constructor(x: number, y: number, settings: any) {
        const atlas = new TextureAtlas(
            loader.getJSON("texture") as any,
            loader.getImage("texture") as any
        );

        super(x, y, {
            ...settings,
            ...atlas.getAnimationSettings([
                "walk0001.png", "walk0002.png", "walk0003.png",
                "walk0004.png", "walk0005.png", "walk0006.png"
            ]),
            anchorPoint: { x: 0, y: 0 }
        });

        this.body = new Body(
            this,
            new Rect(0, 0, settings.width, settings.height),
        );

        (this.body as any).setMaxVelocity(5, 18);
        (this.body as any).setFriction(0.4, 0);
        this.alwaysUpdate = true;

        (game as any).viewport.follow(this, (game as any).viewport.AXIS.BOTH, 0.1);

        input.bindKey(input.KEY.A, "left");
        input.bindKey(input.KEY.D, "right");
        input.bindKey(input.KEY.W, "jump", true);
        input.bindKey(input.KEY.Q, "dash", true);
        input.bindKey(input.KEY.J, "ataque", true);
    }

    /**
     * update the entity
     */
    override update(dt: number): boolean {
        // 1. Registar a direção do movimento horizontal
        if (input.isKeyPressed("left")) {
            this.facingLeft = true;

            if (!this.isDashing) {
                (this.body as any).force.x = -(this.body as any).maxVel.x;
            }

        } 
        
        else if (input.isKeyPressed("right")) {
            this.facingLeft = false;

            if (!this.isDashing) {
                (this.body as any).force.x = (this.body as any).maxVel.x;
            }
        }
        
        else {
            if (!this.isDashing) {
                (this.body as any).force.x = 0;
            }
        }

        // 2. Ativar o Dash ao pressionar 'Q'
        if (input.isKeyPressed("dash") && !this.isDashing && this.dashCooldown == 0) {
            this.isDashing = true;
            this.dashTimer = this.dashDuration;
        }

        // 3. Executar comportamento físico durante o Dash
        if (this.isDashing) {
            this.dashTimer -= dt;
            
            // Define a direção horizontal (1 para direita, -1 para esquerda)
            const direction = this.facingLeft ? -1 : 1;
            
            // Aplica velocidade de dash e anula a gravidade vertical temporariamente
            (this.body as any).force.x = direction * this.dashSpeed;
            (this.body as any).force.y = 0;

            // Termina o dash quando o temporizador esgotar
            if (this.dashTimer <= 0) {
                this.isDashing = false;
            }
        } 

        else {
            // Comportamento normal de salto se não estiver em dash
            if (input.isKeyPressed("jump") && !(this.body as any).jumping && !(this.body as any).falling) {
                (this.body as any).force.y = -(this.body as any).maxVel.y;
            }
        }

        return super.update(dt);
    }

    /**
     * collision handler
     * (called when colliding with other objects)
     */
    override onCollision(): boolean {
        // Make all other objects solid
        return true;
    }
}

export default PlayerEntity;