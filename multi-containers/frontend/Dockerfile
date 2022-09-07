FROM node:lts

WORKDIR /app

COPY ./package.json /app/

RUN npn install

COPY . /app/

EXPOSE 3000

CMD [ "npm", "start" ]

