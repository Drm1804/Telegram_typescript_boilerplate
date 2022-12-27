FROM node:14-alpine3.12
RUN mkdir /bot
WORKDIR /bot
COPY package.json /bot
COPY package-lock.json /bot
RUN npm ci
COPY tsconfig.json /bot
COPY .eslintrc.json /bot
COPY .eslintignore /bot
COPY tsconfig.release.json /bot
COPY config.ts /bot
COPY /src /bot/src
RUN mkdir files
RUN npm run build
