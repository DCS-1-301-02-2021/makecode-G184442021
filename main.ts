scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 .
    8 8 8 f f f 8 8 f f f 8 8 8 8 .
    8 8 8 f 2 f 8 8 f 2 f 8 8 8 8 .
    8 2 8 f f f 8 8 f f f 8 2 2 8 .
    8 2 2 8 8 8 8 8 8 8 8 8 2 2 8 .
    8 1 2 2 8 8 2 2 8 8 2 2 1 2 8 .
    8 1 1 2 8 8 8 8 8 8 2 1 1 2 8 .
    8 2 1 2 2 2 2 2 2 2 2 1 2 2 8 .
    8 2 2 1 1 1 1 1 1 1 1 2 2 8 8 .
    8 8 2 2 2 2 2 2 2 2 2 2 8 8 8 .
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(assets.image`bogy`, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
info.changeScoreBy(1)
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
