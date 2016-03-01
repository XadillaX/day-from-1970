UGLIFY_PATH=./node_modules/.bin/uglifyjs
MOCHA_PATH=./node_modules/.bin/_mocha
ISTANBUL_PATH=./node_modules/.bin/istanbul
COVERALLS_PATH=./node_modules/.bin/coveralls

build: df1970.js
	@$(UGLIFY_PATH) \
		df1970.js -o df1970.min.js --reserved "df1970,module,exports" \
		--source-map df1970.min.map -c -m sort

test-coveralls:
	@$(ISTANBUL_PATH) cover $(MOCHA_PATH) \
		--report lcovonly \
		-- \
		-R spec && \
		cat ./coverage/lcov.info | \
		\
		$(COVERALLS_PATH) && \
		rm -rf ./coverage

test:
	@$(MOCHA_PATH)

.PHONY: test test-coveralls
