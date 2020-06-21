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

CI= npm run build

netlify deploy --prod

# example netlify.toml

[build]
command = "npm run build"
functions = "functions"
publish = "build/"
base = "/"

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200
