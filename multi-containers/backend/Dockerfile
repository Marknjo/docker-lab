FROM node:lts

WORKDIR /app

COPY ./package.json /app/

RUN npm install 

EXPOSE 80

CMD ["npm", "start"]