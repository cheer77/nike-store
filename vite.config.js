import { defineConfig } from 'vite';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const pagesBase = isGithubActions && repositoryName ? `/${repositoryName}/` : '/';

export default defineConfig({
	base: pagesBase,
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
