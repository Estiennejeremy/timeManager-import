# Time Manager

## Goal of the project  
Make a time management application for the Gotham City employees  


## Features  

### Users categories  
Employees
Manager
General Manager

### All users  
- Create account
- Edit their account information
- Delete their account
- Report their departure and arrival times
- View their dashboard

/api/signin
/api/signup
/api/signout


SCOPE : /api/users
  GET - get one user
    /api/users/:userID
  GET - get All
    /api/users
  POST - create user
    /api/users
  PUT / PATCH - update user
    /api/user/:userID
  DELETE - delete user
    /api/user/:userID

### Manager and general manager  
- Manage their team(s)
- View the averages of the daily and weekly hours of team over a given period
- View the daily and weekly working hours of an employee over a period of times
- Vew their employee's dashboard


### General manager  
- Promote a user from the rank of employee to manager
- View the dashboard of all users
- Delete accounts from all users


## Databases  

### Employees  
- id
- username
    string
    not null
- email
    string
    unique
    not null
- role
    ['EMPLOYEE', 'MANAGER', 'GENERAL_MANAGER']
    // faire une table juste pour les rôles
    not null

### Teams
- id
- manager_id
    int
- user_in_the_team_id

### Clocks
- id
- time
    datetime
    not null
- status
    boolean
    not null

### Workingtime
- id
- start
    datetime
    not null
- end
    datetime
    not null
- user_id
