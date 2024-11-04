FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .
RUN npm run build

FROM nginx:1.20
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/dist .

RUN rm /etc/nginx/conf.d/*.conf

COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
