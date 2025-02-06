import img from '/src/assets/article_1.png'
import { Blog, BlogPreview, FullArticle } from '../articleInterfaces'

const blogPreview: BlogPreview = {
    title: 'Develop a Platformer Game with Phaser 3',
    description: 'A quick guide to building a platformer game using Phaser 3. Learn about setting up Phaser, creating player characters, and designing levels.',
    date: 'January 29, 2024',
    topic: ['Game Development', 'Phaser 3', 'JavaScript', 'HTML Canvas'],
    imageUrl: img,
};

const fullArticle: FullArticle = {
    sections: [
        {
            title: 'Setting Up Phaser 3',
            content: `To get started with Phaser 3, you first need to install the framework and set up your project. Begin by installing Phaser via npm and creating your project structure.

You will need to organize your assets (images, audio) and source code (scenes, sprites). Once that's done, initialize Phaser in your JavaScript file to configure the game canvas and scenes for loading, creating, and updating.

Here is how you can install Phaser and set up your basic project structure:`,
            codeBlocks: [
                {
                    language: 'bash',
                    code: `npm install phaser@3`
                },
                {
                    language: 'javascript',
                    code: `import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: { preload, create, update },
};

const game = new Phaser.Game(config);`
                }
            ]
        },
        {
            title: 'Creating Player Characters',
            content: `Player characters are crucial to gameplay. You need to design your character and implement its movement using sprite sheets for animations.

Start by creating animations like walking, jumping, and idle states. Then, set up player controls to enable movement and jumping. Make sure the character interacts with the environment using Phaser's physics engine, such as gravity and collision detection.

Here's an example of how to define a walking animation and basic controls for player movement:`,
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `function create() {
  this.knight = this.physics.add.sprite(100, 100, 'knight');
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.knight.anims.play('walk', true);
}`
                },
                {
                    language: 'javascript',
                    code: `function update() {
  const cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) this.knight.setVelocityX(-160);
  if (cursors.right.isDown) this.knight.setVelocityX(160);
  if (cursors.up.isDown && this.knight.body.touching.down) this.knight.setVelocityY(-330);
}`
                }
            ]
        },
        {
            title: 'Designing Levels',
            content: `Level design plays a major role in the player experience. A good level should provide challenges, obstacles, and rewards, while guiding the player through different areas. 

Start by planning the theme of your levels and introducing obstacles like pits, spikes, or enemies. You can also add hidden collectibles to encourage exploration.

Here's an example of how to implement a collectible item in your level:`,
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `this.physics.add.collider(this.knight, hiddenTreasure, collectTreasure, null, this);

function collectTreasure() {
  hiddenTreasure.destroy();
  score += 10;
}`
                }
            ]
        },
        {
            title: 'Implementing Game Mechanics',
            content: `Game mechanics define how players interact with the game world. These mechanics include player movement, collecting items, fighting enemies, and other core interactions.

For example, you can introduce gravity, jumping, and different states like running and crouching. Additionally, you may want to add power-ups and enemies with AI behaviors.

Here’s how you can add basic player physics and an item collection mechanic:`,
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `function create() {
  this.knight = this.physics.add.sprite(100, 100, 'knight');
  this.knight.setCollideWorldBounds(true);
  this.knight.setGravityY(300);
  this.knight.setBounce(0.2);
}`
                },
                {
                    language: 'javascript',
                    code: `this.powerUp = this.physics.add.sprite(300, 200, 'speedBoost');
this.physics.add.collider(this.knight, this.powerUp, collectPowerUp, null, this);

function collectPowerUp() {
  this.knight.setVelocityX(320); // Speed boost
  this.powerUp.destroy();
}`
                }
            ]
        },
        {
            title: 'Testing and Debugging',
            content: `Testing is crucial in ensuring your game functions correctly. You'll need to test both functionality and performance while addressing any bugs or glitches.

Make sure to test player interactions, game mechanics, and the overall performance of your game, especially in different browsers or devices.

Here’s an example of a basic test for player movement:`,
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `describe("Player Movement", function() {
  it("Should move left when the left arrow is pressed", function() {
    // Test logic here
  });
});`
                }
            ]
        },
        {
            title: 'Conclusion',
            content: `Congratulations! You've now built the foundation for a platformer game using Phaser 3. You’ve learned how to set up the game engine, create player characters, design levels, and implement basic game mechanics.

To continue improving, you can add more features such as complex enemies, power-ups, boss fights, and even multiplayer support. The possibilities are endless!`,
        }
    ],
    tableOfContents: [
        'Setting Up Phaser 3',
        'Creating Player Characters',
        'Designing Levels',
        'Implementing Game Mechanics',
        'Testing and Debugging',
        'Conclusion'
    ]
};

const article_1: Blog = {
    titleHeader: 'Phaser 3 Platformer Game Tutorial',
    ...blogPreview,
    ...fullArticle
};

export default article_1;
