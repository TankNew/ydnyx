#!/bin/zsh
echo "Start Build !"
work_path=$(cd `dirname $0`;pwd)
# work_path=$(dirname $(readlink -f $0))
cd ${work_path}
docker build -t docker.ednet.cn/ydnyx .
docker-compose up --build --no-deps -d ydnyx
docker rmi $(docker images -f "dangling=true" -q)
