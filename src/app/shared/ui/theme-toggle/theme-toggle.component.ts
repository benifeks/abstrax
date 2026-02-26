import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent implements OnInit {
  private themes: Array<'light' | 'dark' | 'synth'> = [
    'light',
    'dark',
    'synth',
  ];
  public currentTheme: 'light' | 'dark' | 'synth' = 'light';

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') as
      | 'light'
      | 'dark'
      | 'synth'
      | null;
    this.applyTheme(savedTheme ?? 'light');
  }

  public cycleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.applyTheme(this.themes[nextIndex]);
  }

  private applyTheme(theme: 'light' | 'dark' | 'synth') {
    document.documentElement.classList.remove(
      ...this.themes.map((t) => `${t}-theme`),
    );
    document.documentElement.classList.add(`${theme}-theme`);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }
}
