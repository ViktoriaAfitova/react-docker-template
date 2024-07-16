FROM node:19-alpine
ARG PORT
ENV PORT=$PORT
WORKDIR /app
COPY package.json ./
RUN npm install
COPY app.js ./
COPY db.js ./
EXPOSE ${PORT}
CMD ["node", "app.js"]
