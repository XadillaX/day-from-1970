NODE ?=

build:
	@$(NODE) ./node_modules/.bin/uglifyjs \
		df1970.js -o df1970.min.js --reserved "df1970,module,exports" \
		--source-map df1970.min.map -c -m sort

.PHONY: build
