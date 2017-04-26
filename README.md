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
- filterUserOnly
- pins (arr)
  - img url (str)
  - uploader handle (str)
  - like count (int)
  - this user likes (bool)
  - is saving like (bool)
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
- [X] make stupid webpack work from my server
  - [X] make it work at all
  - [X] apply loaders
  - [X] use express middleware
  - [X] make images work for dev server
- [X] make the pins refresh after saving one
- [X] set-up passport 
- [X] configure routing so you get back home after logging in
- [X] make this work together with the current 'hydrating'
- [X] add logging out
- [X] navigation
- [X] make sure you can only see/do things right depending on login
  - [X] see login / logout
  - [X] see add pin page
  - [X] only saves pin if logged in
- [X] set-up a 'my pins' page
- [X] allow liking
  - [X] make the server properly set currentUserLikes
  - [X] make the client properly display filled in heart or not
  - [X] make the add function- needs to trigger saving to the DB and changing the pin object in the array without mutating
  - [X] make the remove function (same as above)
  - [X] link fn to clicking
  - [X] probably need a queue or something for DB requests in case they click faster than the DB connection
- [X] create button for adding a pin
- [X] something is going weird with redirecting out of /new
- [X] 404 route
- [ ] be able to see other users' walls (click on their name)
- [ ] be able to delete images
- [ ] ...
- [ ] make sure I can generate a actual build with webpack (not just )
- make sure I don't need cookie-parser, react-fontawesome and remove them
- [ ] deploy to heroku
- [ ] clean-up the statuses (just use the same ones and change the type)
- [ ] explain all the webpack nonsense in my notes
- [ ] explain redux in my notes (along with the best patterns)

======

- [X] mock-up the pieces of the state
  - [X] decide on some reducers
- [X] map out the different components

## Bonus
- [ ] the middleware definitely isn't working correctly.  stupid head
- [X] validate image before saving pin (in client)
- [ ] validate image before saving pin (in server)
- [ ] paging for the pins (this probably keeps masonry from freaking out)
- [ ] display saving error messages
- [ ] make a starter repo for myself
