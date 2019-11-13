import theme from 'styled-theming';

export const white = '255, 255, 255';
export const grey = '240, 240, 240';
export const dark = '20, 25, 29';
export const black = '0,0,0';
export const primary = '3, 169, 244';


export const color = theme('mode', {
	dark: '255, 255, 255',
	light: '20, 25, 29',
});

export const textColor = theme('mode', {
	dark: 'rgba(255, 255, 255, .7)',
	light: 'rgba(20, 25, 29, .7)',
});

export const mutedColor = theme('mode', {
	dark: 'rgba(255, 255, 255, .3)',
	light: 'rgba(20, 25, 29, .1)',
});

export const backgroundColor = theme('mode', {
	dark: '#23252a',
	light: '#fff',
});

export const sidebarBackgroundColor = theme('mode', {
	dark: '10,10,12',
	light: '173,174,177',
});

export const boxBackgroundColor = theme('mode', {
	dark: '#1e1f24',
	light: '#eaeaeb',
});

export const titleBarColor = theme('mode', {
	dark: dark,
	light: grey
});

export const modalBackgroundColor = theme('mode', {
	dark: '#14191d',
	light: '#fff'
});

export const cardBackgroundColor = theme('mode', {
	dark: '#fff',
	light: '#fff'
});

export const boardBackgroundColor = theme('mode', {
	dark: '90,93,98',
	light: '214,214,216'
});

export const inputBorderColor = theme('mode', {
	dark: '#14191d',
	light: '#f0f0f0'
});

export const inputBackgroundColor = theme('mode', {
	dark: '#2b2f33',
	light: '#f3f6f9'
});

export const progressBackground = theme('mode', {
	dark: `rgba(${dark}, .5)`,
	light: `rgba(${dark}, .2)`
});

export const progressForeground = theme('mode', {
	// dark: `rgba(${dark}, .75)`,
	dark: '#141518',
	light: `rgba(${dark}, .2)`
});