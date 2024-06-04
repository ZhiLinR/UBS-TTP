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

- @param req.body — json body/ form data

## PUT /posts/
update a post

- @param req.body — json body/ form data

## DELETE /posts/:post_id/:uid
flag a post for deletion

- @param post_id — unique post_id field in each document
- @param uid — gets the admin id for who flagged deletion

---

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