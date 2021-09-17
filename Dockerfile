FROM node:10

RUN npm i -g typescript pkg

RUN mkdir /work
WORKDIR /work

COPY app.ts Server.ts package.json tsconfig.json  /work/
RUN npm i
RUN tsc -p tsconfig.json
RUN pkg . -t node10-win

# CMD ["pkg" ,"-t node10-win"]