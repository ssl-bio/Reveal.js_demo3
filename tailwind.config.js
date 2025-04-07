/** @type {import('tailwindcss').Config} */
module.exports = {
    // content: ["./**/*.{html,js}"],
    content: ["./*.html"],
    theme: {
	extend: {
	    screens: {
		'1080p': '1920px',
		'2k': '2048px',
		'1440p': '2560px',
		'2160p': '3840px',
		'4k': '4096px',
	    },
	    fontSize: {
		'2xs': ['0.7rem', '0.95rem'],
		'3xs': ['0.575rem', '0.8rem'],
		'4xs': ['0.45rem', '0.5rem'],
		'5xs': ['0.325rem', '0.45rem'],
		'6xs': ['0.2rem', '0.3rem'],
		'7xs': ['0.075rem', '0.11rem'],
	    },
	},
    },
    safelist: [
	'1080p',
	'2k',
	'1440p',
	'2160p',
	'4k',
    ],
    plugins: [],
}
