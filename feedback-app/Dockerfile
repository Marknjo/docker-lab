FROM node

WORKDIR /app

COPY ./package.json /app/

RUN npm install 

VOLUME [ "/app/feedback" ]

COPY . .

EXPOSE 80

CMD ["node", "server.js"]