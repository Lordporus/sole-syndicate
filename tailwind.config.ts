import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // 8px base grid — all spacing is a multiple of 8px (4px half-step for micro-adjustments)
    spacing: {
      "0": "0",
      px: "1px",
      xs: "4px",   // 0.5x  — micro-adjustments only
      sm: "8px",   // 1x
      md: "16px",  // 2x
      lg: "24px",  // 3x
      xl: "32px",  // 4x
      "2xl": "48px",  // 6x
      "3xl": "64px",  // 8x
      "4xl": "96px",  // 12x
      "5xl": "128px", // 16x
      // Keep numerical steps for utility classes (padding, gap, etc.)
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "7": "28px",
      "8": "32px",
      "9": "36px",
      "10": "40px",
      "11": "44px",
      "12": "48px",
      "14": "56px",
      "16": "64px",
      "20": "80px",
      "24": "96px",
      "28": "112px",
      "32": "128px",
      "36": "144px",
      "40": "160px",
      "48": "192px",
      "56": "224px",
      "64": "256px",
      "72": "288px",
      "80": "320px",
      "96": "384px",
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "3/4": "75%",
      full: "100%",
      screen: "100vw",
      svh: "100svh",
      dvh: "100dvh",
    },
    extend: {
      colors: {
        // All colors driven by CSS variables for easy theme switching
        void: "var(--color-void)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        gold: "var(--color-gold)",
        "gold-dim": "var(--color-gold-dim)",
        drop: "var(--color-drop)",
        verified: "var(--color-verified)",
        scarce: "var(--color-scarce)",
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        card: "16px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 0 40px rgba(0,0,0,0.6)",
        glow: "0 0 80px rgba(197,164,58,0.15)",
        lifted: "0 20px 60px rgba(0,0,0,0.5)",
        "glow-gold": "0 0 40px rgba(197,164,58,0.3)",
      },
      // Breakpoints — mobile first
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      // Sole Syndicate motion grammar
      transitionDuration: {
        instant: "80ms",
        fast: "150ms",
        normal: "280ms",
        slow: "500ms",
        cinematic: "1200ms",
      },
      transitionTimingFunction: {
        "brand-standard": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "brand-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "brand-cinematic": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 40px rgba(197,164,58,0.1)" },
          "50%": { boxShadow: "0 0 80px rgba(197,164,58,0.3)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.3s ease-out both",
        ticker: "ticker 30s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-right": "slideOutRight 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
