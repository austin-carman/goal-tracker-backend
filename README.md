# Goal Tracker Backend

This app stores goals created by a user and allows other users to interact by liking or commenting on goals to give encouragement or advice. Steps can be added to goals to break them up into more manageable pieces and can be marked as completed as the user achieves these landmarks. In order to use the app, one must register and login to access their profile page where they can create goals and see their previously created goals displayed.

## API ENDPOINTS

### AUTH
Base URL: /api/auth
### [POST] /register
Body: 
user_username: required - must be at least 3 characters

user_password: required - must be at least 3 character
### [POST] /login
Body: 
user_username: required

user_password: required

## GOALS
Base URL: /api/goals
### [GET] /:user_id
Returns list of all goals created by the specified user

user_id is the id of the user that is logged in

### [GET] /details/:goal_id
Returns all details of a specific goal

goal_id is the id of the specific goals desired

### [POST] /new/:user_id
Adds a new goal to the user's goal list

user_id is the owner of the goal/logged in user

Body:
title - required

### [POST] /add-step/:goal_id
Returns new step

goal_id is the id of the goal that new step is attached to

Body:
step_number - required. Cannot be duplicate
step_text - required

### [PUT] /edit/goal/:goal_id
Returns edited goal

goal_id is the id of the goal to edit

Body:
title - required

### [PUT] /edit/step/:step_id
Returns edited step

step_id is the id of the step to edit

Body: one of the following is required to make any change
step_number - optional
step_text - optional
completed - optional. Value is either "true" or "false"

### [DELETE] /delete/:goal_id
Returns the number of items deleted

goal_id is the id of the goal to delete

All associated steps are also deleted
