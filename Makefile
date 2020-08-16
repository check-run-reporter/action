# This Makefile has been written according to guidelines at
# https://tech.davis-hansson.com/p/make/

# Use ">" instead of "\t" for blocks to avoid surprising whitespace issues
ifeq ($(origin .RECIPEPREFIX), undefined)
  $(error This Make does not support .RECIPEPREFIX. Please use GNU Make 4.0 or later. If you've installed an up-to-date Make with homebrew, you maye need to invoke 'gmake' instead of 'make'.)
endif
.RECIPEPREFIX = >

# Make sure we use actual bash instead of zsh or sh
SHELL := bash

# Enfore bash "strict mode"
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
.SHELLFLAGS := -euo pipefail -c

# Use one shell session per rule instead of one shell session per line
.ONESHELL:

# Delete the target of a Make rule if the rule fails
.DELETE_ON_ERROR:

# Warn on undefined variables
MAKEFLAGS += --warn-undefined-variables

# Disabling all the magical-but-unreadable bits of Make
MAKEFLAGS += --no-builtin-rules

# Wrap npx so it only uses local dependencies
NPX := npx --no-install

SRC := $(shell find src -type f)

# The first entry in a make file is the one that gets called by `make` without
# arguments
default: dist/index.js
.PHONY: default

clean:
> rm -rf .sentinel build dist
.PHONY: clean

.sentinel/lint/es: $(SRC) package.json
> npm run lint:es
> @mkdir -p $(@D)
> @touch $@

.sentinel/lint/types: $(SRC) package.json
> npm run lint:types
> @mkdir -p $(@D)
> @touch $@

.sentinel/build: $(SRC) package.json
> $(NPX) babel --extensions '.js,.ts' --source-maps -d build src
> @mkdir -p $(@D)
> @touch $@

dist/index.js: .sentinel/build
> $(NPX) ncc build build/index.js --source-map
