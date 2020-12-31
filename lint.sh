#!/bin/sh
mkdir -p tmp
echo "function 推導(音韻地位, 小韻號, 字頭) {
`sed 's/^\(.\)/  \1/' $1`
}" > tmp/$1
npx eslint tmp/$1
