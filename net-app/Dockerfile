FROM node

WORKDIR /app

ARG DEFAULT_PORT=80

ENV PORT=${DEFAULT_PORT}

COPY ./package.json /app/

RUN npm install 

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]