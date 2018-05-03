#!/bin/bash

#create react into web public
cd react_src
yarn install
yarn build
cd ..

docker-compose build

docker-compose up -d

