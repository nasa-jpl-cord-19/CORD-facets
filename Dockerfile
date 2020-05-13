FROM node:current as build

COPY ./ /home/node/app

WORKDIR /home/node/app

RUN npm install
#RUN npm audit fix
#RUN npm audit
RUN INLINE_RUNTIME_CHUNK=false npm run build


FROM nginx:alpine

COPY --from=build /home/node/app/build /usr/share/nginx/html
