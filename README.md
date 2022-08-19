# Paragon Connect Next.js Demo

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/useparagon/paragon-connect-nextjs-example)

This is an example app based on [TodoMVC in React](https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js) and the Next.js starter project.

For more info on adding Paragon Connect to your app, see:

- 🎥 **[Implementation walkthrough video](https://youtu.be/BcwOUMRXg_k?t=177)** (~5m): Watch how to add the client-side SDK, generate the Paragon User Token, and interact with the Events API. This repo is the code for TaskLab, featured in the demo!

- 📄 **[Setup documentation](https://docs.useparagon.com/v/connect/getting-started/installing-the-connect-sdk)**: Get step-by-step instructions adding the SDK in many common app authentication scenarios.

# Getting started

## Configuration

To use all of the features of this demo, you will need a Paragon Connect account.

Paste in your Project ID and Signing Key into the values of `.env.local`, at the root of the repository.

```
NEXT_PUBLIC_PARAGON_PROJECT_ID=""
PARAGON_SIGNING_KEY=""
```

## Installation

This demo requires [Node.js](https://nodejs.org) (12.22 or later) to be installed.

Install dependencies:

```
npm install
```

Start the application dev server:

```
npm start
```

After the demo has started, it will print the local URL you can visit:

```
> Ready on http://localhost:3000
```
