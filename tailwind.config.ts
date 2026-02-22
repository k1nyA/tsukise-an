const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./registry/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ryokan: {
          bg: "var(--ryokan-bg)",
          dark: "var(--ryokan-dark)",
          darkest: "var(--ryokan-darkest)",
          gold: "var(--ryokan-gold)",
          muted: "var(--ryokan-muted)",
          subtle: "var(--ryokan-subtle)",
          secondary: "var(--ryokan-secondary)",
          "light-gold": "var(--ryokan-light-gold)",
          "light-bg": "var(--ryokan-light-bg)",
          "light-bg-alt": "var(--ryokan-light-bg-alt)",
          "soft-line": "var(--ryokan-soft-line)",
          "text-on-dark": "var(--ryokan-text-on-dark)",
          "text-subtle": "var(--ryokan-text-subtle)",
          "hero-overlay": "var(--ryokan-hero-overlay)",
        },
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        accent: "var(--font-accent)",
      },
      spacing: {
        "section-y": "var(--section-padding-y)",
        "section-x": "var(--section-padding-x)",
        header: "var(--header-height)",
        hero: "var(--hero-height)",
        "subpage-hero": "var(--subpage-hero-height)",
      },
      maxWidth: {
        content: "var(--content-max-width)",
        page: "var(--page-width)",
      },
      height: {
        header: "var(--header-height)",
        hero: "var(--hero-height)",
        "subpage-hero": "var(--subpage-hero-height)",
      },
    },
  },
  plugins: [],
};

export default config;
