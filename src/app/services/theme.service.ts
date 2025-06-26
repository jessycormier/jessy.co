import { Injectable, signal, computed } from '@angular/core';
import { themeChange } from 'theme-change';

export type Theme = 'light' | 'dark';

/**
 * Theme Service
 *
 * Handles theme switching and prevents theme flash on page load.
 *
 * Theme Flash Prevention Strategy:
 * 1. theme-init.js runs immediately on page load (before CSS/Angular)
 * 2. Sets data-theme attribute based on localStorage or system preference
 * 3. Angular service syncs with this initial state when it loads
 * 4. theme-change library handles theme switching with proper persistence
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly _currentTheme = signal<Theme>('dark'); // Initialize with default

  /**
   * Current theme as a signal
   */
  readonly currentTheme = this._currentTheme.asReadonly();

  /**
   * Computed signal indicating if dark mode is active
   */
  readonly isDarkMode = computed(() => this.currentTheme() === 'dark');

  /**
   * Computed signal indicating if light mode is active
   */
  readonly isLightMode = computed(() => this.currentTheme() === 'light');

  constructor() {
    // Initialize theme-change library
    // false means don't sync with system preference automatically
    themeChange(false);

    // Initialize theme on service creation
    this.initializeTheme();
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Get the current theme from localStorage or system preference
   */
  getTheme(): Theme {
    const savedTheme = this.getStoredTheme();
    if (savedTheme && this.isValidTheme(savedTheme)) {
      return savedTheme as Theme;
    }

    // Fall back to system preference if no saved theme
    return this.getSystemTheme();
  }

  /**
   * Set the theme and persist it
   */
  setTheme(theme: Theme): void {
    this.storeTheme(theme);
    this.applyTheme(theme);
    this._currentTheme.set(theme);
  }

  /**
   * Get system theme preference
   */
  getSystemTheme(): Theme {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default to dark if no system preference detection
  }

  /**
   * Check if a theme value is valid
   */
  private isValidTheme(theme: string): theme is Theme {
    return theme === 'light' || theme === 'dark';
  }

  /**
   * Initialize theme on service creation
   */
  private initializeTheme(): void {
    const theme = this.getTheme();
    this.applyTheme(theme);
    this._currentTheme.set(theme);
  }

  /**
   * Apply theme to DOM
   */
  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = document.documentElement.className.replace(/\btheme-\w+\b/g, '');
    document.documentElement.classList.add(`theme-${theme}`);
  }

  /**
   * Store theme in localStorage
   */
  private storeTheme(theme: Theme): void {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to store theme in localStorage:', error);
    }
  }

  /**
   * Get stored theme from localStorage
   */
  private getStoredTheme(): string | null {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      console.warn('Failed to get theme from localStorage:', error);
      return null;
    }
  }
}
