# Inspired from https://cli.vuejs.org/guide/deployment.html#docker-nginx

FROM node:18 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./ .
RUN yarn build

FROM nginx AS runner
RUN mkdir /app
COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
