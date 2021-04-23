Not allowed here to use
```json
	"include": [
		"**/*.ts"
	],
```
cause of `express-node/tsconfig.json` (extends json dependency) transpile files to incorrect `dist-node` folder.
