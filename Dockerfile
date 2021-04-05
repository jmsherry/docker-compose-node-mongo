FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3333

# import wait file and execute
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

# Carry on running
CMD ["npm", "start"]
