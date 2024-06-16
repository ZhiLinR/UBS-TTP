# quick reference api routes

## GET /posts
Responds with an array of all posts not flagged for deletion within the collection on success. <br>

No parameters expected

Sample Success Body:
```
{
    "message": "successful",
    "content": [
        {
            "post_id": "6663704d1beac261446a8fc3",
            "created_by": "sammy@email.com",
            "timestamp": "2024-06-07T20:40:45.227Z",
            "post_content": {
                "title": "Upcoming Workshop",
                "description": "Sign up for Workshop"
            }
        }
    ]
}
```

## GET /posts/:post_id
Responds with a single document containing the requested post<br>

1 parameter expected.
- @param post_id — unique post_id field in each document

Sample success response:
```
{
    "message": "successful",
    "content": {
        "post_id": "6663698f1f32384d4443f604",
        "created_by": "sammy@email.com",
        "timestamp": "2024-06-07T20:11:59.771Z",
        "post_content": {
            "title": "Upcoming Cleanest Coding Workshop",
            "description": "Sign up for Workshop"
        },
        "lastModified": "2024-06-07T21:31:41.053Z",
        "status": {
            "flag": "D",
            "raised_by": null
        }
    }
}
```

## POST /posts/
make a new post

- @param req.body — json body/form data 

Sample of POST Request Body for this API:

```
{
    "main_content": {
        "title": "Upcoming Workshop",
        "description": "Sign up for Workshop"
    },
    "admin_uid": "666350518e5c4522aed85892" //Where uid represents the administrator who made the post
}
```

The following is the expected success message.

```
{
    "message": "Post Created"
}
```
Record inserted will look like:
```
{
  "_id": {
    "$oid": "66637f93558eb65050bd3ceb"
  },
  "post_id": "66637f93558eb65050bd3cea",
  "created_by_uid": "666350518e5c4522aed85892",
  "timestamp": "2024-06-07T21:45:55.974Z",
  "post_content": {
    "title": "Upcoming Workshop",
    "description": "Sign up for Workshop"
  }
}
```

## PUT /posts/:post_id
update a post

- @param req.params.post_id — json body/ form data <br>
Sample of Request Body for this API:

```
{
    "main_content": {
        "title": "Upcoming Cleanest Coding",
        "description": "Sign up for Workshop"
    },
    "admin_uid": "666350518e5c4522aed85892" 
}
```

The following is the expected success message.

```
{
    "message": "Post Updated",
    "content": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```
Record inserted will look like:
```
{
  "_id": {
    "$oid": "66637f93558eb65050bd3ceb"
  },
  "post_id": "66637f93558eb65050bd3cea",
  "created_by_uid": "666350518e5c4522aed85892",
  "timestamp": "2024-06-07T21:45:55.974Z",
  "post_content": {
    "title": "Upcoming Cleanest Coding",
    "description": "Sign up for Workshop"
  },
  "lastModified": {
    "$date": "2024-06-07T21:47:43.990Z"
  }
}
```
If the post_id or the admin_uid does not match the record in the database, the following failure message will be returned:

```
{
    "main_content": {...},
    "admin_uid": "sammyho@email.com" //this administrator did not make this post 
}

{
    "message": "No Reference Found"
}
```

## DELETE /posts/:post_id
flag a post for deletion

- @param req.params.post_id — unique post_id field in each document
- @param req.body.admin_uid — gets the admin id for who flagged deletion

Sample of Request Body for this API:

```
{
    "admin_uid":"666350518e5c4522aed85892"
}
```
Sample success body:
```
{
    "message": "Post Flagged for Deletion",
    "content": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

---

## POST /posts/:post_id/comments/
Add a comment
- @param req.params.post_id — post_id - unique _id field in each document
- @param req.body.uid — user id, unique uid field in db
- @param req.body.comment — user comment in plaintext

returns the inserted comment id

Sample request body:
```
{
    "uid":"666350518e5c4522aed85892",
    "comment":"love the idea"
}

```
Sample success message:
```
{
    "message": "Comment Added",
    "content": {
        "comment_id": "666381aec8e90b60d96cb9be"
    }
}
```
Sample db record:
```
{
  "_id": {
    "$oid": "666381aec8e90b60d96cb9bf"
  },
  "post_id": "66637f93558eb65050bd3cea",
  "comment_id": "666381aec8e90b60d96cb9be",
  "created_by_uid": "666350518e5c4522aed85892",
  "timestamp": "2024-06-07T21:54:54.381Z",
  "comment_content": "love the idea"
}
```


## DELETE /api/posts/:post_id/comments
Delete a comment
- @param req.params.uid — user id, unique uid field in db
- @param req.body.post_id — post_id - unique _id field in each document
- @param req.body.comment_id — user comment in plaintext

*checks all 3 fields against the document before initiating deletion

Sample request body:
```
{
    "uid": "666350518e5c4522aed85892",
    "comment_id": "666381aec8e90b60d96cb9be"
}
```

Sample success response:
```
{
    "message": "Comment Deleted",
    "content": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```
---