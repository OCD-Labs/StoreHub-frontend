## Total refectore

This codebase can be greatly improved by doing a few things

1.  **Separate the concerns**: components are doing multiple things at once

    - clean up and add related components to their page
    - API calls should not be made in pages (react query for all data fetching needs)

2.  **improved typescript definitions**: figure out
3.  File structure in a bit of shambles. FIX
4.  **use a consistent naming convention**: camelCase for variable names, PascalCase for component names, kebab for file names.
5.  **linting**: There should be eslint and prettier config file for more organized code across teams

## steps for auth

1.  **create a new user**: create a new user on the backend
2.  **verify**: user is taken to verify page after email has been sent
3.  when the user clicks the link session is added and they are taken to /page
    if not they can resend verification
4.  **login**: user can login with email and password

## Generate store image with ai

- move the image generation to a background task
