FROM node:10

RUN npm i -g typescript pkg@4.3.8

RUN mkdir /work
WORKDIR /work

COPY app.ts Server.ts package.json tsconfig.json  /work/
RUN npm i
RUN tsc -p tsconfig.json
RUN pkg . -t node10-win
RUN rm html-packer.exe

COPY run_pkg.sh /work
ENTRYPOINT ["/work/run_pkg.sh"]

