# Content Management System (CMS)

## Why do we need a Content Management System?

Content on our main website is being constantly added and updated on a term-by-term basis. Having to update this data directly from within the codebase, or the database, would be a hassle. Also, we want executives on the team who don’t work on the website codebase to be able to update the content as well. The CMS solves these issues, making updating data on the website quick and simple for all authorized executives on the team.

## Setup

0. Ensure you have `node v16`, `yarn v2+` and `Docker Desktop` installed. See onboarding docs for more info.
   0.1. https://yarnpkg.com/getting-started/migration#step-by-step
1. Install dependencies with `yarn install`
2. Create a `.env` file, then copy + paste relevant variables from [wloop.ca/web-env-vars](wloop.ca/web-env-vars)
3. Start the backend by running `yarn docker:dev`, then open a new terminal and run `yarn dev`
4. Launch the frontend in a new terminal with `yarn start:frontend`
5. For more commmands please see `package.json` under the "scripts" section. `yarn start` to start the application.
6. (Optional): Download React Tools and Redux Devtools to debug components from your browser.

## ISSUES:
1. Unit and integration tests will not work with the default Plug n' Play PnP configuration. To make them work, please add `nodeLinker: node-modules` to your .yarnrc.yml and rerun `yarn install`, then try running the unit/integration tests.
   1.1. Hopefully this will be resolved in the future; currently Mocha doesn't like PnP.
   1.2. **DO NOT COMMIT YOUR .yarnrc.yml CHANGES!!!**

## 💻 Technologies

- [ReactJS](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Storybook](https://storybook.js.org/)

## 🔨 Some features to implement

- Full coverage of dynamic content on the main website, so that the majority of updateable content on the site can be updated through the CMS.
- Improve the login/logout functionality logic.
