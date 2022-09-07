FROM node:lts

WORKDIR /app

COPY ./package.json /app/

RUN npn install

COPY . /app/

EXPOSE 80

CMD [ "npm", "start" ]

