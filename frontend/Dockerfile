FROM node as build-deps 
WORKDIR /
COPY package.json yarn.lock ./ 
RUN yarn
COPY . ./
RUN yarn build


FROM nginx:1.12-alpine
COPY --from=build-deps /build /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

