interface Debris {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    angle: number;
    color: string;
    velocity: number;
    trail: boolean;
    collisionTime?: number;
}

export class SpaceAnimationEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private debris: Debris[] = [];
    private shootingStars: ShootingStar[] = [];
    private width: number;
    private height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.initializeDebris();
    }

    public initializeDebris() {
        this.debris = [];
        const numDebris = this.width < 600 ? 80 : 500;

        for (let i = 0; i < numDebris; i++) {
            this.debris.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 2,
                color: `rgba(255, 255, 255, ${Math.random() - 0.5})`,
                velocity: Math.random() + 0.1,
            });
        }
    }

    private createShootingStar(): ShootingStar | null {
        const probability = this.width < 600 ? 0.005 : 0.01;
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        const velocity = Math.random() * 10 + 2;
        const length = (velocity * 10) + 10;
        const angle = Math.random() * Math.PI * 2;
        const color = `rgba(255, 255, 255, ${Math.random()})`;
        if (Math.random() >= probability) return null;
        // Math.random() * 5 + 2
        return {
            x,
            y,
            length,
            angle,
            color,
            velocity,
            trail: true
        };
    }

    private updatePositions() {
        // Update debris
        this.debris.forEach(fragment => {
            fragment.x -= fragment.velocity;
            if (fragment.x < 0) {
                fragment.x = this.width;
            }
        });

        // Update shooting stars
        this.shootingStars.forEach(star => {
            star.x -= star.velocity * Math.cos(star.angle);
            star.y -= star.velocity * Math.sin(star.angle);
        });

        // Remove out-of-bounds stars
        this.shootingStars = this.shootingStars.filter(star =>
            star.x >= 0 && star.y >= 0 && star.x <= this.width && star.y <= this.height
        );
    }

    public render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw debris
        this.debris.forEach(fragment => {
            this.ctx.beginPath();
            this.ctx.arc(fragment.x, fragment.y, fragment.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = fragment.color;
            this.ctx.fill();
        });

        // Draw shooting stars
        this.shootingStars.forEach(star => {
            if (star.trail) {
                for (let i = 0; i < 10; i++) {
                    const alpha = 1 - i * 0.1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(
                        star.x + (star.length * i / 10) * Math.cos(star.angle),
                        star.y + (star.length * i / 10) * Math.sin(star.angle)
                    );
                    this.ctx.lineTo(
                        star.x + (star.length * (i + 1) / 10) * Math.cos(star.angle),
                        star.y + (star.length * (i + 1) / 10) * Math.sin(star.angle)
                    );
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
            }
        });
    }

    public animate() {
        const newStar = this.createShootingStar();
        if (newStar) {
            this.shootingStars.push(newStar);
        }
        this.updatePositions();
        this.render();
    }
}
