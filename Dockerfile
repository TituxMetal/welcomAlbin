FROM node:lts-slim AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
ENV NODE_ENV = development
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine AS runtime
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

