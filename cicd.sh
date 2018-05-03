#!/bin/bash

#create react into web public
cd react_src
yarn install
webpack
cd ..

#build docker image
docker build . -t testapp:latest

#stop running container
docker kill testapp

#remove stopped container
docker rm testapp

#run new container
docker run -p 5005:5000 -d --name testapp testapp:latest
