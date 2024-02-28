# LAB - Class 07

## Project: Bearer Auth

### Author: Melo

### Problem Domain

**Authentication System Phase 2:**  

Deploy an Express server that implements Bearer Authentication, with signup and signin capabilities, using a Postgres database for storage.  Any user that has successfully logged in using basic authentication (username and password) is able to continuously authenticate … using a “token”

### Links and Resources

- [Pull Request](https://github.com/MelodicXP/basic-auth/pull/2)
- [GitHub Actions ci/cd](https://github.com/MelodicXP/bearer-auth/actions/new)
- Prod [back-end server url](https://basic-auth-vw0p.onrender.com)

### Collaborators

### Setup

#### `.env` requirements (where applicable)

DATABASE_URL: postgres://localhost:XXXX/name-of-server

#### How to initialize/run your application (where applicable)

- e.g. `npm start`

#### How to use your library (where applicable)

#### Features / Routes

- Feature One: Deploy as prod branch once all tests pass.

#### Tests

- How do you run tests?
  - jest and supertest

- Any tests of note?
  - 404 on a bad route
  - 404 on a bad method
  - POST to /signup to create a new user.
  - POST to /signin to login as a user (use basic auth).
  - Tests for auth middleware and routes.

- Your linter is helpful!
- Running tests one at a time might be helpful.
- You will see some false failures in the terminal because each test does not necessarily test the entire system.
- Finding the actual failure in the terminal can lead you to the correct line of problematic code.
- Can AI be helpful? Integration tests rely on more than one unit of code. If asking AI for help, be sure to give AI all of the necessary context.

#### UML

![Lab-02-UML](./assets/Lab06UML.png)
