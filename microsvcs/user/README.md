# quick reference about API calls

## GET api/profile/:uid
Gets a profile by a specific uid (currently email value) provided in params.


## PUT api/profile/:uid
Updates specific **profiling** data (ie. organisation type, position etc) for a specific uid provided in params. Request body takes in a JSON definition of the changes provided following the format of:

```
{
    gender: "female",
    organisation_type:"banking",
    title: "CFO"
}
```
*Sample fields in the database

## POST api/profile/
Registers a new user minimally using an email and a name, defined in request body. 

```
{
    email: "sam@example.com",
    name:"Sam",
}
```