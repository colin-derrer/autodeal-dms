AutodealDMS is a web-hosted dealer management system (DMS) with team functionality. Users can set roles, manage clients via customer relations management functionality, send messages with analytics to clients with embedded vehicle images to gauge interest, autogenerate leads, and assist in the deal-closing process.

### Setup

To start this, create an .env file (or otherwise set environment variables), and set the following key:value pairs:
- DATABASE_URL: your URL database connection
- JWT_SECRET: your JWT secret
- BCRYPT_WORK_FACTOR: how long BCRYPT (a password library) should work on passwords. 12-13 is a good number as of 2024.
- REGISTER_CODE: a required code when registering to help prevent account spam

DATABASE_URL="postgresql://postgres:toby@localhost:5432/halcyon"
JWT_SECRET="i belive in u"
BCRYPT_WORK_FACTOR = 12
REGISTER_CODE = "dogcat"

Then, run "npm install" and optionally run "npx prisma db push --force-reset" (which should occur in a post-install script).
To run a dev environment, run `npm run dev`, and to create and serve a build, run `npm run build` and `npm run start`.