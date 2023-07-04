gendiff:
	node bin/gendiff.js

install-deps: 
	npm ci

publish:
	npm publish --dry-run