FROM denoland/deno:ubuntu-1.29.2

EXPOSE 1333

WORKDIR /app

COPY . /app

RUN deno cache deps.ts  

# Fix permissions flags on production
CMD ["run", "--allow-all", "/app/src/app.ts"]

