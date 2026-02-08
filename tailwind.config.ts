import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Teal Professional Palette (Research-Based)
                primary: {
                    50: '#F0FDFA',   // Teal 50
                    100: '#CCFBF1',  // Teal 100
                    200: '#99F6E4',  // Teal 200
                    300: '#5EEAD4',  // Teal 300
                    400: '#2DD4BF',  // Teal 400
                    500: '#14B8A6',  // Teal 500 - Main brand color
                    600: '#0D9488',  // Teal 600
                    700: '#0F766E',  // Teal 700
                    800: '#115E59',  // Teal 800
                    900: '#134E4A',  // Teal 900
                    950: '#042F2E',  // Teal 950
                },
                // Keep secondary for alerts/warnings
                secondary: {
                    50: '#FFF7ED',   // Orange 50
                    100: '#FFEDD5',  // Orange 100
                    200: '#FED7AA',  // Orange 200
                    300: '#FDBA74',  // Orange 300
                    400: '#FB923C',  // Orange 400
                    500: '#F97316',  // Orange 500
                    600: '#EA580C',  // Orange 600
                    700: '#C2410C',  // Orange 700
                    800: '#9A3412',  // Orange 800
                    900: '#7C2D12',  // Orange 900
                    950: '#431407',  // Orange 950
                },
                success: {
                    50: '#F0FDF4',
                    100: '#DCFCE7',
                    200: '#BBF7D0',
                    300: '#86EFAC',
                    400: '#4ADE80',
                    500: '#22C55E',
                    600: '#16A34A',
                    700: '#15803D',
                    800: '#166534',
                    900: '#14532D',
                },
                warning: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                    800: '#92400E',
                    900: '#78350F',
                },
                danger: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    200: '#FECACA',
                    300: '#FCA5A5',
                    400: '#F87171',
                    500: '#EF4444',
                    600: '#DC2626',
                    700: '#B91C1C',
                    800: '#991B1B',
                    900: '#7F1D1D',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'], // Single font family
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'fade-up': 'fadeUp 0.4s ease-out',
                'slide-in': 'slideIn 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'gradient': 'gradientMove 3s ease infinite',
                'shimmer': 'shimmerMove 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                gradientMove: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                shimmerMove: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            boxShadow: {
                'clean': '0 1px 3px rgba(0, 0, 0, 0.08)',
                'clean-lg': '0 4px 12px rgba(0, 0, 0, 0.08)',
                'clean-xl': '0 8px 20px rgba(0, 0, 0, 0.08)',
            },
            borderRadius: {
                'clean': '8px',
                'clean-lg': '12px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
export default config
