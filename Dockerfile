FROM node:12.14.1 as builder
COPY package.json package-lock.json ./
RUN echo 'package-lock=false' >> .npmrc
RUN npm install
RUN mkdir /fe-dahttt && mv ./node_modules ./fe-dahttt
WORKDIR /fe-dahttt
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /fe-dahttt/build /usr/share/nginx/html
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]