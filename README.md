# Content Management System (CMS)

## Why do we need a Content Management System?

Content on our main website is being constantly added and updated on a term-by-term basis. Having to update this data directly from within the codebase, or the database, would be a hassle. Also, we want executives on the team who don’t work on the website codebase to be able to update the content as well. The CMS solves these issues, making updating data on the website quick and simple for all authorized executives on the team.

## Setup

0. Ensure you have `node v16`, `yarn v2.*` and `Docker Desktop` installed. See onboarding docs for more info.
   0.1. https://yarnpkg.com/getting-started/migration#step-by-step
   <!-- TODO: revisit README and update info on yarn usage. -->
1. Install dependencies with `yarn install --frozen-lockfile`
2. Start the backend by running `yarn docker:dev`, then open a new terminal and run `yarn dev`
3. Launch the frontend in a new terminal with `yarn start:frontend`

## 💻 Technologies

- [ReactJS](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Storybook](https://storybook.js.org/)

## 🔨 Some features to implement

- Full coverage of dynamic content on the main website, so that the majority of updateable content on the site can be updated through the CMS.
- Implement user permission levels so only a handful of verified users can change the content on the CMS.
- Improve the login/logout functionality logic.
