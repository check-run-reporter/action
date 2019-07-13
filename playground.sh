#!/usr/bin/env bash

set -euo pipefail
shopt -s globstar

GLOB='**/*'

for FILE in $GLOB; do
  echo $FILE
done