# Todo List

A simple Todo List using React JS, Node JS, Express JS and MongoDB which runs in Docker containers. Tasks can be added, edited and deleted. Each task can have sub tasks upto any level. A simple login mechanism has also been added.


## Table of Contents

- [APIs](#apis)
- [Quick Start](#quick-start)


## APIs
  
- `POST: /api/v1/accounts/login`

  `payload:
{
  "email" : "test@test.com",
  "password" : "qwerty123!"
}`

  Login to the service and generate a token.
  
- `POST: /api/v1/tasks`

  `payload:
{
  "level" : 1,
  "taskId" : "xxxxx",
  "text" : "yyyyy"
}`

  Add a new task to the database with the Task ID of the parent(optional).

- `GET: /api/v1/tasks?level=1&id=xxxx`

  Get the list of tasks/sub-tasks of a parent Task ID(optional) and which at a particular level.
  
- `GET: /api/v1/tasks/:id`

  Get a task information using Task ID.

- `PUT: /api/v1/tasks/:id/complete`

  Mark a task as completed.
  
- `DELETE: /api/v1/tasks/:id`

  Delete a task and its sub tasks at all levels.

A successful response will be

200: `{ success: true, data: {} }` or `{ success: true, data: [] }`


## Quick Start

- `docker-compose up` - To start the frontend, backend and database in separate docker containers. 


