FROM nginx

COPY ./app usr/share/nginx/html/app

RUN apt-get update && apt-get install -y procps

RUN apt-get install net-tools

RUN mkdir -p /data/cache/long /data/cache/short