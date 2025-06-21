# Stable Snap

## Frontend
### Prerequisites
1. node (I am using v20.9.0)
run
´´´bash
node --version
´´´
to check version

2. npm (I am using 10.1.0)
run
3. 
´´´bash
npm --version
´´´
to check version

### Setup
´´´bash
npm install
´´´
To install node packages.

If this does not work: delete ´´´package-lock.json´´´ and try again.

### Running application after setup
After successfully installing node packages:

´´´bash
npm run dev
´´´

That's it :) You have to run this command each time you start to code. It opens a server locally, you access it via the
link which is shown to you in the console.

### Building application for deployment (AWS amplify already takes care of this)
Basically you can ignore this command for local development.
Run
´´´bash
npm run build
´´´
and the application will be built inside the /web-client/dist folder

### Adding UI components
Just look at the detailed instructions [here in the section about 'add component'](https://ui.shadcn.com/docs/installation/vite#add-components)
1. npx shadcn@latest add button