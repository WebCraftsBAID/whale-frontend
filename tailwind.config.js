/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'accent-red': '#d93427',
                'accent-orange': '#f6894f'
            },
            fontFamily: {
                display: ['Outfit', 'Noto Sans CJK SC', 'system-ui', 'sans-serif'],
                body: ['Noto Sans CJK SC', 'system-ui', 'sans-serif']
            }
        },
    },
    plugins: [],
}

