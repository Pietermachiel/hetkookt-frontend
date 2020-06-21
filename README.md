# material

https://material.io/

Build beautiful products, faster.
Material is a design system – backed by open-source code – that helps teams build high-quality digital experiences.

## heroku

config.json
{
"apiUrl": "https://hetkookt.herokuapp.com/api",
"recipeUrl": "https://hetkooktapi.netlify.app/api"
}

## local

config.json
{
"apiUrl": "http://localhost:3900/api",
"recipeUrl": "http://localhost:3000/api"
}

## upload Netlify

netlify deploy --prod

# example netlify.toml

[build]
command = "npm run build"
functions = "functions"
publish = "build/"
base = "/"

<!-- ## Uncomment to use this redirect for Single Page Applications like create-react-app.

## Not needed for static site generators.

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

## (optional) Settings for Netlify Dev

## https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#project-detection

#[dev]

# command = "yarn start" # Command to start your dev server

# port = 3000 # Port that the dev server will be listening on

# publish = "dist" # Folder with the static content for \_redirect file

## more info on configuring this file: https://www.netlify.com/docs/netlify-toml-reference/ -->
