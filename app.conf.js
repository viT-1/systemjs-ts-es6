import tsconfig from './src/tsconfig.json';

const dest = tsconfig.compilerOptions.outDir || 'dist';

export const conf = {
	src: './src',
	dest: `./${dest}`,
};
