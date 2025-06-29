import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with a theme', () => {
      expect(service.currentTheme()).toBeDefined();
      expect(['light', 'dark']).toContain(service.currentTheme());
    });
  });

  describe('Theme Setting', () => {
    it('should set theme and update signal', () => {
      service.setTheme('light');
      expect(service.currentTheme()).toBe('light');

      service.setTheme('dark');
      expect(service.currentTheme()).toBe('dark');
    });
  });

  describe('Theme Toggling', () => {
    it('should toggle from dark to light', () => {
      service.setTheme('dark');
      service.toggleTheme();
      expect(service.currentTheme()).toBe('light');
    });

    it('should toggle from light to dark', () => {
      service.setTheme('light');
      service.toggleTheme();
      expect(service.currentTheme()).toBe('dark');
    });
  });

  describe('Computed Signals', () => {
    it('should correctly compute isDarkMode', () => {
      service.setTheme('dark');
      expect(service.isDarkMode()).toBe(true);

      service.setTheme('light');
      expect(service.isDarkMode()).toBe(false);
    });

    it('should correctly compute isLightMode', () => {
      service.setTheme('light');
      expect(service.isLightMode()).toBe(true);

      service.setTheme('dark');
      expect(service.isLightMode()).toBe(false);
    });
  });

  describe('System Theme Detection', () => {
    it('should return a valid theme from getSystemTheme', () => {
      const systemTheme = service.getSystemTheme();
      expect(['light', 'dark']).toContain(systemTheme);
    });
  });

  describe('Integration', () => {
    it('should maintain theme state across multiple operations', () => {
      // Start with dark theme
      service.setTheme('dark');
      expect(service.currentTheme()).toBe('dark');
      expect(service.isDarkMode()).toBe(true);
      expect(service.isLightMode()).toBe(false);

      // Toggle to light
      service.toggleTheme();
      expect(service.currentTheme()).toBe('light');
      expect(service.isLightMode()).toBe(true);
      expect(service.isDarkMode()).toBe(false);

      // Toggle back to dark
      service.toggleTheme();
      expect(service.currentTheme()).toBe('dark');
      expect(service.isDarkMode()).toBe(true);
      expect(service.isLightMode()).toBe(false);
    });

    it('should handle theme changes without errors', () => {
      expect(() => {
        service.setTheme('light');
        service.setTheme('dark');
        service.toggleTheme();
        service.toggleTheme();
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should not throw error when setting theme multiple times', () => {
      expect(() => {
        service.setTheme('dark');
        service.setTheme('dark'); // Setting same theme
        service.setTheme('light');
        service.setTheme('light'); // Setting same theme
      }).not.toThrow();
    });

    it('should maintain signal consistency', () => {
      service.setTheme('dark');
      const isDark1 = service.isDarkMode();
      const isLight1 = service.isLightMode();

      expect(isDark1).toBe(true);
      expect(isLight1).toBe(false);
      expect(isDark1).not.toBe(isLight1); // They should be opposite

      service.setTheme('light');
      const isDark2 = service.isDarkMode();
      const isLight2 = service.isLightMode();

      expect(isDark2).toBe(false);
      expect(isLight2).toBe(true);
      expect(isDark2).not.toBe(isLight2); // They should be opposite
    });
  });

  describe('Public API', () => {
    it('should expose all required public methods and properties', () => {
      expect(typeof service.currentTheme).toBe('function');
      expect(typeof service.isDarkMode).toBe('function');
      expect(typeof service.isLightMode).toBe('function');
      expect(typeof service.toggleTheme).toBe('function');
      expect(typeof service.getTheme).toBe('function');
      expect(typeof service.setTheme).toBe('function');
      expect(typeof service.getSystemTheme).toBe('function');
    });

    it('should return readonly signals for computed properties', () => {
      const currentTheme = service.currentTheme;
      const isDarkMode = service.isDarkMode;
      const isLightMode = service.isLightMode;

      // These should be functions (signals)
      expect(typeof currentTheme).toBe('function');
      expect(typeof isDarkMode).toBe('function');
      expect(typeof isLightMode).toBe('function');

      // They should return the expected types
      expect(typeof currentTheme()).toBe('string');
      expect(typeof isDarkMode()).toBe('boolean');
      expect(typeof isLightMode()).toBe('boolean');
    });
  });
});
