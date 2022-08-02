FROM node:16.16.0-alpine3.15 as builder

WORKDIR /app

RUN npm i -g @microsoft/rush

COPY ./src ./src
COPY ./tools ./tools
COPY ./common ./common
COPY ./rush.json .

RUN rush update
RUN rush build
RUN rush deploy --project @travelhoop/app

FROM node:14.15.1-alpine3.10

WORKDIR /app

COPY --from=builder /app/common/deploy/ .

EXPOSE 3010

CMD ["node", "./src/app/travelhoop/build/server.js"]