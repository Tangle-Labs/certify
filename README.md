# Certify

---

## Running

-   You can use `./.env.sample` as a boiler to create your own environment config file (`./.env`).

And then with some docker compose magic, we are ready to roll!

```sh
$ docker-compose up
```

## Where to find stuff :)

| Service                              | Default URL                                      |
| ------------------------------------ | ------------------------------------------------ |
| Client (SvelteKit)                   | [localhost:5173](http://localhost:5173)          |
| Storybook (Svelte Component Library) | [localhost:6006](http://localhost:6006)          |
| REST API Server (Express JS)         | [localhost:4269](http://localhost:4269)          |
| REST API Docs (Swagger)              | [localhost:4269](http://localhost:4269/api/docs) |
| Server Metrics (Grafana)             | [localhost:1337](http://localhost:1337)          |
