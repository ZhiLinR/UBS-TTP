# api quick reference sheet
## POST /api/scenario
creates a new scenario for the user. 

@params req.body.uid - required, user id <br>
@params req.body.topic - optional, a selected or predefined topic to be used <br>

Sample request body:
```
{
    "uid":"666350518e5c4522aed85892", //required
    "topic":"Diversity" //optional 
}
```

Sample success response: 
```
{
	"success": true,
	"status": 200,
	"message": "Scenario Generated",
	"content": {
		"scenario": "As a Diversity and Inclusion Specialist, I was leading a training session on promoting diversity in the workplace. During the session, a participant made a derogatory comment about a certain race, which made some attendees visibly uncomfortable.",
		"options": {
			"passive": "You should ignore the comment and continue with the training session, hoping that the discomfort will dissipate on its own.",
			"reactive": "You should address the comment after the session, privately speaking with the participant to explain why their remark was inappropriate and the impact it had on others.",
			"proactive": "You should have established ground rules at the beginning of the training session, emphasizing the importance of respectful language and behavior, which could have prevented such comments.",
			"active": "You should immediately interrupt the participant, call out the inappropriate comment, and facilitate a discussion about why such remarks are harmful and how to create a more inclusive environment for everyone. You should also offer support to those who were affected by the comment."
		}
	}
}

```

### Additional Info:
This API's current behaviour has a behavioural lapse for the microservice. Only this endpoint can create a new Thread
for the user to use, meaning that the other endpoints will fail if the POST /api/scenario is not called AND if the user does not have a record in the DB.

Sample DB Record:
```
{
  "_id": {
    "$oid": "66673f1e177bd5f9a52f3ca7"
  },
  "uid": "666350518e5c4522aed85892",
  "thread_info": {
    "id": "thread_0BRNOfWhaDZrBAAI3xNv4OxB",
    "object": "thread",
    "created_at": 1718042398,
    "metadata": {
      "uid": "666350518e5c4522aed85892"
    }
  },
  "createdAt": {
    "$date": "2024-06-10T17:59:59.000Z"
  },
  "updatedAt": {
    "$date": "2024-06-10T17:59:59.000Z"
  },
  "__v": 0
}
```

---
## PUT /api/scenario/
Saves the user's interaction with the scenario (namely the given scenario and the selected option) into OpenAI [Threads](https://platform.openai.com/docs/api-reference/threads/getThread) and [Messages](https://platform.openai.com/docs/api-reference/messages) beta functions.

@params req.body.uid - user's id <br>
@params req.body.content - contains scenario and options <br>


Sample request body
```
{
    "uid":"666350518e5c4522aed85892",
    "content": {
        "scenario": "As a Diversity and Inclusion Specialist, I was facilitating a training session on Diversity in the workplace. During the session, a participant made a dismissive remark about a colleague's cultural background, causing discomfort in the room. What should I do?",
        "options": 
             "You should address the comment directly, expressing how it was inappropriate and reminding participants about the importance of respecting all cultures in the workplace."
        
    }
}
```

Sample success response:
```
{
	"success": true,
	"status": 200,
	"message": "Thread Updated"
}
```

Thread Data Sample:
![Data input assigned to both user and assistant](./refs/sample%20OA.png "OpenAI Threads Interface")


---
## GET /api/scenario/summary/:uid
Generates a personality overview for the user judging from their interactions with scenarios and their profile. 

@params req.params.uid - user's id

Sample success response:
```
{
	"success": true,
	"status": 200,
	"message": "Summarised",
	"content": {
		"profile_summary": "You are a respectful, inclusive individual who values cultural diversity. You handle situations with tact and address inappropriate comments head-on, emphasizing the importance of respecting all cultures in the workplace. Your proactive approach in promoting inclusivity and respect sets a positive example for others to follow."
	}
}
```
## DELETE /scenario/:thread_id
Deletes the thread with the reference thread_id (couldn't find any deletion thingy on the web interface). Mainly used for managing threads created during testing.

@params req.params.thread_id - the id of the thread to be deleted

Sample success response (default from OpenAI)
```
{
    "id": "thread_kZSzGhMq4WnD7bYtMSozXoFa",
    "object": "thread.deleted",
    "deleted": true
}
```
---

