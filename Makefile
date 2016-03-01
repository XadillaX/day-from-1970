UGLIFY_PATH=./node_modules/.bin/uglifyjs
MOCHA_PATH=./node_modules/.bin/_mocha
NODE ?=

build: df1970.js
	@$(UGLIFY_PATH) \
		df1970.js -o df1970.min.js --reserved "df1970,module,exports" \
		--source-map df1970.min.map -c -m sort

test:
	@$(MOCHA_PATH)

.PHONY: test
