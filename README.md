# Elements with Custom Checkout Demo

## Set up

1. Clone the repo to `~/stripe/` directory. (**NOTE: It has to be in the stripe
   dir. If not, `esbuild` executable will be block by go/santa!!!**)

```shell
cd ~/stripe
git clone org-4479@git.corp.stripe.com:stripe-sandbox/elements-with-custom-checkout-demo.git
```

2. Install

```shell
npm install
```

## Development

In your terminal, run

```shell
npm run dev
```

You should see

```shell
  VITE v4.5.0  ready in 367 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Onboard your own account

In `.env` file, you can find @pololi test account credentials.  
If you'd like to onboard your own account, please refer to
[https://trailhead.corp.stripe.com/docs/checkout/custom-checkout/private-beta#gating-instructions](https://trailhead.corp.stripe.com/docs/checkout/custom-checkout/private-beta#gating-instructions)
to gate your own account and update the credentials in `.env`. Remember to
restart `npm run dev` after changing the credentials.

## Questions?

Reach out to @pololi at #elements-on-checkoutsession-team on Slack.

## Random notes

I followed this
[Using Vite to Serve and Hot-Reload React App & Express API Together](https://noam.hashnode.dev/using-vite-to-serve-and-hot-reload-react-app-express-api-together)
to set up the inital repo, so I can get the HMR for both express server and
react client. The trick is to have the express server running on vite dev server
so we don't have to run a separate process for express and get the fast HMR.

I copied a lot of code from @danwang's repo :)
[https://git.corp.stripe.com/stripe-sandbox/custom-checkout-demo](https://git.corp.stripe.com/stripe-sandbox/custom-checkout-demo)

For page style, I use

- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-postcss)
- [daisy UI](https://daisyui.com/docs/install/)
