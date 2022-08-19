# Paragon Sample App

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/useparagon/paragon-connect-nextjs-example)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fuseparagon%2Fparagon-connect-nextjs-example&env=NEXT_PUBLIC_PARAGON_PROJECT_ID,PARAGON_SIGNING_KEY&envDescription=You%20can%20find%20your%20Paragon%20Project%20ID%20in%20the%20Paragon%20Dashboard%2C%20in%20any%20integration's%20Overview%20tab.%20You%20can%20create%20your%20Paragon%20Signing%20Key%20in%20the%20Settings%20tab%20of%20the%20Paragon%20dashboard.&envLink=https%3A%2F%2Fbit.ly%2F3c4MytJ&demo-title=Paragon%20-%20Sample%20App&demo-description=A%20demo%20Next.js%20app%2C%20with%20integrations%20built%20on%20Paragon.&demo-url=https%3A%2F%2Fparagon-demo-live.vercel.app%2F&demo-image=https%3A%2F%2Fuseparagon.notion.site%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252Fd28afd31-7e3e-4f05-8b2f-a59f8598baac%252FFrame_977.png%3Ftable%3Dblock%26id%3Dd11fb8bc-ad8c-48fa-b0a7-1ea1dff1f526%26spaceId%3D731f846c-b074-4391-8301-e3172493b9f1%26width%3D1870%26userId%3D%26cache%3Dv2)

This is an example app based on [TodoMVC in React](https://github.com/tastejs/todomvc/tree/gh-pages/examples/react/js) and the Next.js starter project.

For more info on adding Paragon to your app, see:

- 🎥 **[Implementation walkthrough video](https://youtu.be/BcwOUMRXg_k?t=177)** (~5m): Watch how to add the client-side SDK, generate the Paragon User Token, and interact with the Events API. This repo is the code for TaskLab, featured in the demo!

- 📄 **[Setup documentation](https://docs.useparagon.com/v/connect/getting-started/installing-the-connect-sdk)**: Get step-by-step instructions adding the SDK in many common app authentication scenarios.

# Getting started

## Configuration

To use all of the features of this demo, you will need a Paragon account.

Paste in your Project ID and Signing Key into the values of `.env.local`, at the root of the repository.

```
NEXT_PUBLIC_PARAGON_PROJECT_ID=""
PARAGON_SIGNING_KEY=""
```

## Installation

This demo requires [Node.js](https://nodejs.org) (>= 16.x) to be installed.

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
