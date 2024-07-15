FROM node:19-alpine as builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine
COPY --from=builder /app/build usr/share/nginx/html
COPY config/nginx.template.config /etc/nginx/conf.d/default.conf

ARG PORT
ENV PORT=$PORT

EXPOSE ${PORT}

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'