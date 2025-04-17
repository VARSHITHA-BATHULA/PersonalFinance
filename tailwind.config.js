/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F97316", // Orange-500 (Main color)
          foreground: "#F9FAFB", // Light neutral
        },
        secondary: {
          DEFAULT: "#FBBF24", // Amber-400 (Secondary color)
          foreground: "#FFFFFF", // White text on secondary
        },
        background: {
          DEFAULT: "#FDE68A", // Light Yellow-200 (Background color)
          dark: "#9A3412", // Dark Orange (For dark mode background)
        },
        accent: {
          lime: "#84CC16", // Lime-400 (Accent color)
          amber: "#FACC15", // Amber-400 (Accent color)
          cyan: "#22D3EE", // Cyan-400 (Accent color)
        },
        text: {
          DEFAULT: "#4A4A4A", // Darker gray text to go well with orange background
          dark: "#1E293B", // Dark Slate-800 (For dark mode text)
        },
        card: {
          DEFAULT: "#FFFFFF", // Light card color
          dark: "#F97316", // Orange-500 for dark mode card background
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(45deg, #F97316, #FBBF24)", // Orange to Amber gradient
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-dark":
          "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
