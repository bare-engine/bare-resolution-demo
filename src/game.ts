import { CanvasPosition, CanvasScale, Color, Scene, StartBare, TextObject, TextureFilterMode, Vec2 } from 'bare-engine';

export class ResolutionDemo extends Scene
{
    private infoText: TextObject;

    constructor()
    {
        super({ UI: true, resize: true });
    }

    OnStart()
    {
        this.AddGameObject("bg");

        this.infoText = new TextObject(this, {
            fontSize: 8,
            fontFamily: 'monospace',
        });
    }

    OnUpdate(deltaTime: number): void
    {
        this.Layout();
    }

    OnRender(): void
    {
        rapid.drawRect({ 
            position: new Vec2(98, 16),
            width: 125, 
            height: 75, 
            color: Color.fromHex('#ffffff6d')
        });

        this.infoText.Render();

        const borderColor = Color.Black;

        rapid.drawLine({
            points: Vec2.FromArray([
                [0, 0],
                [bare.width, 0],
                [bare.width, bare.height],
                [0, bare.height],
            ]),
            width: 2,
            closed: true,
            color: borderColor
        });
    }

    private Layout()
    {
        this.infoText.SetText(
            `logic: ${Math.round(bare.width)} x ${Math.round(bare.height)}\n` +
            `css: ${rapid.canvas.clientWidth} x ${rapid.canvas.clientHeight}\n` +
            `dpr: ${rapid.dpr}\n` +
            `resolutionScale: ${bare.resolutionScale.toPrecision(5)}\n` +
            `\n` +
            `mouse-x: ${Math.round(this.mouseController.screen.position.x)}\n` +
            `mouse-y: ${Math.round(this.mouseController.screen.position.y)}\n`
        );

        this.infoText
            .SetPosition(108, 20)
            .SetPivot(0, 0);
    }
}

StartBare(ResolutionDemo, {
    antiAlias: false,
    textureFilter: TextureFilterMode.NEAREST,
    resolution: {
        width: 320,
        height: 107,
        scale: CanvasScale.Fit,
        integerScale: false,
        position: CanvasPosition.Center
    }
});