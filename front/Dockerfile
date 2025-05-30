FROM node:23.11.0-slim as frontend

WORKDIR /usr/app/front

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:1.28-alpine
COPY ./nginx/cs_group.conf /etc/nginx/templates/cs_group.conf.template
COPY --from=frontend /usr/app/front/dist /cs

EXPOSE 8080