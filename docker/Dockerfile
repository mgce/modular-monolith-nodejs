FROM node:14.15.1-alpine3.10 as builder

WORKDIR /app

COPY . .

RUN npm i -g @microsoft/rush

RUN rush build