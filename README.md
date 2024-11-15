# Plain IO
A todo app

## Techstack
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![ShadCN](https://img.shields.io/badge/ShadCN-000000?style=for-the-badge&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)


# How to run
This guide will show you how to run this project locally

```bash
# Clone the repository
git clone https://github.com/niassuh1/plain-io.git

# Copy the environment variable and add all the variables from your supabase
cp .env.example .env
```

> [!WARNING]  
> Do make sure that all the environment variables are correct </br>
> For `AUTH_SECRET` this can be any string </br>
> `AUTH_TRUST_HOST` should be set to `http://localhost:3000` or `true`

### Running on a docker container
Simply run `docker-compose up` (Will migrate the schema into the supabase database)

### Running on your local machine
Make sure you have `node 20` installed as well as `yarn`
run `yarn install` then build through `yarn build` and finally you can run `yarn start`

