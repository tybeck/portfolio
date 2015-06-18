#!/bin/bash
# Starts Mongo database
# Author: Tyler Beck

SOURCE="${BASH_SOURCE[0]}"

while [ -h "$SOURCE" ]; do
  TARGET="$(readlink "$SOURCE")"
  if [[ $SOURCE == /* ]]; then
    SOURCE="$TARGET"
  else
    __DIR="$( dirname "$SOURCE" )"
    SOURCE="$__DIR/$TARGET"
  fi
done

__DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

dir="/c/Program Files/MongoDB/Server/3.0/bin"

cd "$dir"

./mongod --dbpath $__DIR/../data/db

read -p "Press [Enter] key..."