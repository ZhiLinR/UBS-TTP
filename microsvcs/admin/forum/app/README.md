# quick reference api routes

## GET /posts
Responds with an array of all documents contained within the collection on success. <br>

No parameters expected

## GET /posts/:post_id
Responds with a single document containing the requested post<br>

1 parameter expected.
- @param post_id — unique post_id field in each document

## POST /posts/
make a new post

- @param req.body — json body/form data 

Sample of POST Request Body for this API:

```
{
    "main_content":{ // Post Content
        "title": "Upcoming Cleanest Coding Workshop",
        "description": "Sign up for Workshop"
    } 
    "admin_uid":"sammyho@email.com"// Where uid represents the administrator who made the post
}
```

The following is the expected success message.

```
{
    "message": "Post Created",
    "post_id": "666023c83c7dfb9ad0fe1be9" //Represents the _id of the document generated
}
```
Record inserted will look like:
```
{
  "_id": {
    "$oid": "666027746d3cfdd074754bf4" 
  },
  "admin": "sammy@email.com",
  "timestamp": "2024-06-05T08:53:08.003Z",
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
    "main_content":{"title":Upcoming Workshop,"description":Sign up for Workshop}
    "admin_uid":sammy@email.com //Where uid represents the administrator who made the post
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
    "$oid": "666027746d3cfdd074754bf4"
  },
  "admin": "sammy@email.com",
  "timestamp": "2024-06-05T08:53:08.003Z",
  "post_content": {
    "title": "Upcoming Cleanest Coding Workshop",
    "description": "Sign up for Workshop"
  },
  "lastModified": { // Including a new field for when it was last modified.
    "$date": "2024-06-05T09:05:20.505Z" 
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

## DELETE /posts/
flag a post for deletion

- @param req.body.post_id — unique _id field in each document
- @param req.body.admin_uid — gets the admin id for who flagged deletion

Sample of PUT Request Body for this API:

```
{
    "post_id":"66602e306ebef83805a22cb5",
    "admin_uid":"cheryl@email.com"
}
```

---

# Section WIP

## PUT /posts/:post_id/comments/:uid
Add a comment
- @param req.params.uid — user id, currently email
- @param req.params.post_id — post_id - unique _id field in each document
- @param req.body.comment — user comment in plaintext

## DELETE /posts/:post_id/comments/:uid
Delete a comment
- @param req.params.uid — user id, currently email
- @param req.params.post_id — post_id - unique _id field in each document
- @param req.body.comment — user comment in plaintext