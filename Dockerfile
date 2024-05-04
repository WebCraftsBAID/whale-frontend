FROM node:20 as builder
WORKDIR /whale-frontend
COPY package*.json ./whale-frontend/
RUN npm install
COPY . ./whale-frontend/
RUN npm run build
FROM nginx:stable-alpine as runtime
COPY --from=builder /app/disk /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
