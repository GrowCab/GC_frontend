FROM node:16 as builder

WORKDIR /frontend
COPY package.json /frontend
COPY package-lock.json /frontend

RUN npm install

COPY . /frontend
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
