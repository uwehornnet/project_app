const initialState = {
	darkMode: false,
};

export const ThemeReducer = (state = initialState, action) => {
	switch (action.payload) {
		case 'TOGGLE_THEME':
			return {
				...state,
				darkMode: !state.darkMode
			};
		default:
			return state;
	}
};