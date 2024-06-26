# quick reference about API calls

## GET api/profile/:uid
Gets a profile by a specific uid (currently email value) provided in params.

Sample Success Response:
```
{
	"success": true,
	"status": 200,
	"message": {
		"uid": "666350518e5c4522aed85892",
		"lastModified": "2024-06-14T09:12:08.886Z",
		"gender": "male",
		"organisation_type": "banking",
		"title": "Manager"
	}
}
```

## PUT api/profile/:uid
Updates specific **profiling** data (ie. organisation type, position etc) for a specific uid provided in params. Request body takes in a JSON definition of the changes provided following the format of:

```
{
    gender: "female",
    organisation_type:"banking",
    title: "CFO"
}
```
Sample Success Response:
```
{
	"success": true,
	"status": 200,
	"message": "Successfully Modified"
}
```

## POST api/profile/
Registers a new user minimally using an email and a name, defined in request body. 

Sample Request Body:
```
{
    email: "sam@example.com",
    name:"Sam",
}
```
Sample Success Response:
```
{
    "success": true,
    "status" : 200,
    "message": {
        "uid": "666350518e5c4522aed85892" // where uid is the unique uid for the user
    }
}
```