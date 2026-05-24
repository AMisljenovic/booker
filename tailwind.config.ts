export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				surface: {
					DEFAULT: "#16161e",
					card: "#1e1e2c",
					elevated: "#1c1c27",
				},
				border: {
					DEFAULT: "#2a2a38",
					focus: "#6c63ff",
				},
				accent: {
					DEFAULT: "#6c63ff",
					hover: "#7c74ff",
				},
				text: {
					primary: "#8080b0",
					secondary: "#8080b0",
					muted: "#6b6b7a",
				},
				neutral: {
					offwhite: "#f4f4f6",
					soft: "#e9e9ee",
					faint: "#dcdce6",
				},
			},
		},
	},
};
