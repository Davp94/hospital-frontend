FROM node:20-alpine3.20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/hospital-frontend/browser/ /usr/share/nginx/html
EXPOSE 4200
