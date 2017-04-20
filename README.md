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

# Map
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
- *State* 
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
  - new pin (obj)
    - url (str)
    - is saving (bool)
    - is saved (bool)
  - filter user only (bool)


  

    
    

# TO DO
- [ ] set-up a test API server
  - [ ] split start commands (need concurrently)
  - [ ] just return test data
  - [ ] (opt) set-up async jest to make sure it works
- [ ] set-up fake posts to return from the api
- [ ] successfully pull in the fake posts
- [ ] create components to display the posts in the body
- [ ] apply masonry to the fake posts

====

- [ ] mock-up the pieces of the state
  - [ ] decide on some reducers
- [ ] map out the different components
- [ ] 