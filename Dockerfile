# Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js .

EXPOSE 8000
CMD [ "node", "server.js" ]

# build command: 
#   docker build -t supermongol/hello-world-k8s-api .
# push command: 
#   docker push supermongol/hello-world-k8s-api
# Run local: 
#   docker run -p 8000:8000 supermongol/hello-world-k8s-api