WORKDIR /app
 
COPY . .
 
RUN NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build-dist
 
# stage - #final

FROM nginx:stable
 
COPY --from=builder /app/dist/  /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
 
CMD ["nginx", "-g", "daemon off;"]
