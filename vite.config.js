import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			// добавляем миксины в scss что бы не импортировать их в каждом файле
			scss: {
				additionalData: `
          @use '/src/scss/_mixins' as *;
          @use '/src/scss/_variables' as *;
        `,
			},
		},
	},
	build: {
		// Enable sourcemaps for production build
		sourcemap: true,
	},
	server: {
		// Automatically open browser on dev server start
		open: true,
	},
});
