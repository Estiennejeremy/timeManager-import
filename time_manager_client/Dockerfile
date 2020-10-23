# Dev

# FROM node:alpine AS client_web
# WORKDIR /client_web
# COPY package*.json ./
# RUN npm install --silent
# COPY . .
# CMD [ "npm", "run", "serve" ]


# Production

# étape de build
FROM node as build-stage
WORKDIR /client_web
ENV PATH /client_web/node_modules/.bin:$PATH
COPY package*.json /client_web/
RUN npm install
COPY . .
RUN npm run build

# étape de production
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /client_web/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]
