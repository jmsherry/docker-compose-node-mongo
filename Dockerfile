FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3333

# CMD ["npm", "start"]
RUN chmod +x wait-for-it.sh

ENTRYPOINT [ "/bin/bash", "-c" ]

CMD ["./wait-for-it.sh" , "localhost:27107" , "--strict" , "--timeout=300" , "--" , "npm", "start"]
