# User Stories
User Story: As an unauthenticated user, I can login with Twitter.
User Story: As an authenticated user, I can link to images.
User Story: As an authenticated user, I can delete images that I've linked to.
User Story: As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
User Story: As an unauthenticated user, I can browse other users' walls of images.
User Story: As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)

# Notes
use this to make things line up: https://www.npmjs.com/package/react-masonry-component
use this to prevent loading before image is loaded: https://github.com/hzdg/react-imageloader
example: https://midnight-dust.hyperdev.space (looks super broken to me)
use one of these for a responsive grid
  https://github.com/STRML/react-grid-layout
  http://flexboxgrid.com
use redux for this one
authenticate requests with jwt?

# Component Map
- *App Main*
  - Header
    - LoginOrLogout (presentation)
      - Login & Sign up / My Board & Logout button [conditional by user logged in]
  - AddPin (presentation)
    - Add pin button [add pin]
  - VisiblePins (presentation)
    - pin holder
      - Pins [like, unlike, delete]
  - Footer
- *Add Pin*

# State Map
- api errors (arr)
  - error (text)
- pins (arr)
  - img url (str)
  - uploader handle (str)
  - like count (int)
  - this user likes (bool)
  - is saving like (bool)
- logged in (bool)
- logged in user handle (str)
- login status
- new pin (obj)
  - url (str)
  - img status
  - saving status
- filter user only (bool)

# TO DO
- [X] set-up a test API server
  - [X] split start commands (need concurrently)
  - [X] just return test data
  - [X] point them to watch the right things
  - [ ] (opt) set-up async jest to make sure it works
- [X] set-up fake posts to return from the api
- [X] add prop-types package and replace react.proptypes with it
- [X] successfully pull in the fake posts to client
- [X] create components to display the posts in the body
- [X] make it conditionally display the image
- [X] apply masonry to the fake posts
- [X] add routing switch
- [X] create posts
 - [X] create API endpoints for saving posts
 - [X] create page form for a new post (needs to preview picture)
 - [X] allow submitting through endpoint
 - [X] update the preview pane
 - [X] check for valid picture first
 - [X] make it pretty
 - [X] redirect back to main page
 - [X] clear out testing messages
- [X] auto query for pins on page load
- [ ] make stupid webpack work from my server
  - [X] make it work at all
  - [X] apply loaders
  - [X] use express middleware
  - [ ] the image serving is a little fishy - may not be pointing / putting it in the right place
- [ ] make the pins refresh after saving one
- [ ] set-up passport 
- [ ] connect form to passport
- [ ] configure routing so you get back home after logging in
- [ ] make this work together with the current 'hydrating'
- [ ] make it so you can only save pins if you're logged in
- [ ] set-up a 'my pins' page
- [ ] navigation
- [ ] ...
- [ ] deploy to heroku
- [ ] clean-up the statuses (just use the same ones and change the type)
- [ ] explain all the webpack nonsense in my notes
- [ ] explain redux in my notes (along with the best patterns)

======

- [X] mock-up the pieces of the state
  - [X] decide on some reducers
- [X] map out the different components

## Bonus
- [X] validate image before saving pin (in client)
- [ ] validate image before saving pin (in server)
- [ ] paging for the pins (this probably keeps masonry from freaking out)
