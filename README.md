# Welcome to Zapp Project

## Intro Video

[Loom](https://www.loom.com/share/9220208c26ed4d0a894a6aea3e85db7b)

## Tech Decisions

- RemixJS for FrontEnd as it's easier and faster to develop
- Fastify: Faster and Better performance to have ndoejs apps
- Prisma: Great ORM with easy migraitons and powerful
- SQLite: As the suggestion on code test introduction

## Assumptions:

- We have 4 required fields, sku, description, quantity and store
  `Simple to use new fields if we needed to`
- Assumed that our csv columns are always on the order of quantity,sky,description,store
  `Of course we have different order, we can show them in the import modal and ask the user to assign which column is what field, or alternatively we could parse the header and find which header is what column`
- Assumed we can always have all the .csv rows in the memory and send within one request to our API
  `This is only to simplify the exercise, bigger the .csv files, we could send few at ones (multiple requests) to backend, (And show the state modal as like 1/20 records are saved`
- Depending on the server (how much we want to keep the connection alive, we can send data to backend, 4 columns, makes ~ 40 bytes and 100 records makes 400 bytes), reasonable to say we can send 2KB easily, like 500 rows
- I am sending one request to check for duplicates to update or create the record. which makes it slow, imagine 10ms for each query

```500 records -> 500 find + 500 create/update -> 1000*10ms = 10s!
Not Ideal -> better is either
- send less records -> 10 records -> ~200ms
- remvoe the find, use upsert -> we can make half that, ~5s
- upsertMany (https://github.com/prisma/prisma/issues/4134) to have one request to make it all, (Ideal way, feature is being developed or we can make our own query)
- After user changes and validaets, (Save can export .csv -> upload it to server then parse it later) -> Complex, but perhaps better for huge .csv files
```

- No Pagination is developed, however, we definitely need paignation for experience or number items we can mount tot he page! I could use React Virtualised Table or Developed my own to render less or only items in the view
- Similarly fetch is only for demonstration of records, no pagination is implemented
- Testing: There is no test written, as I thought based on Description on the test, it's not something that you want are interested in, However, this is absoltely needed for real projects.

## Env Varibales

Create the .env file based on .env.example

## Install Dependencies

simply run

```
npm install -g pnpm
pnpm install
npx prisma generate
```

## Development

Run both backend and frontend

```shellscript
pnpm run dev
```

FrontEnd Local URL: http://0.0.0.0:5173
Backend Local URL: http://0.0.0.0:3000

## Deployment

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

## Fly

We can have a dockerfile deploy both frontend and backend
Since there is a docker, we can deploy that easily to fly.

## Vercel for FrontEnd.

We have different commands, so we can deploy frontend to Vercel
and Backend to Fly or Heroku

## CI/CD

Github Actions and .workflow/deploy.yml we can deploy this easily using a CI/CD to any of the options above.
