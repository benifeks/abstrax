import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

interface Star {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-abstract-bg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abstract-bg.component.html',
  styleUrl: './abstract-bg.component.scss',
})
export class AbstractBgComponent implements OnInit {
  stars = signal<Star[]>([]);
  lines = signal<Line[]>([]);

  private readonly starCount = 60; // количество звезд
  private readonly connections = 3; // количество линий на звезду

  ngOnInit() {
    this.generateStars(this.starCount);
    this.animate();
  }

  generateStars(count: number) {
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: 50 + Math.random() * (window.innerWidth - 100),
        y: 50 + Math.random() * (window.innerHeight - 100),
        r: 0.8 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      });
    }
    this.stars.set(stars);
    this.updateLines(stars);
  }

  animate() {
    const update = () => {
      const stars = this.stars().map((s) => {
        let x = s.x + s.vx;
        let y = s.y + s.vy;

        if (x < 0 || x > window.innerWidth) s.vx *= -1;
        if (y < 0 || y > window.innerHeight) s.vy *= -1;

        return { ...s, x, y };
      });

      this.stars.set(stars);
      this.updateLines(stars);

      requestAnimationFrame(update);
    };

    update();
  }

  updateLines(stars: Star[]) {
    const lines: Line[] = [];
    const k = 3; // количество соседей на звезду

    for (let i = 0; i < stars.length; i++) {
      // находим k ближайших соседей
      const neighbors = stars
        .map((s, idx) => ({
          idx,
          dist: Math.hypot(s.x - stars[i].x, s.y - stars[i].y),
        }))
        .filter((s) => s.idx !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, k);

      neighbors.forEach((s) => {
        lines.push({
          x1: stars[i].x,
          y1: stars[i].y,
          x2: stars[s.idx].x,
          y2: stars[s.idx].y,
        });
      });
    }

    this.lines.set(lines);
  }
}
