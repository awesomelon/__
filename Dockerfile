FROM node:20.11.0

WORKDIR /thingsflow

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 9876

CMD ["yarn", "start:prod"]
