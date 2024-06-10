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
    "message": "Scenario Generated",
    "success": true,
    "content": {
        "scenario": "I was facilitating a diversity and inclusion training session on the topic of gender inclusivity. During the session, there was a tense moment when a participant made a derogatory remark about non-binary individuals, which made some other participants uncomfortable.",
        "options": {
            "passive": "You should have ignored the remark and continued with the training, hoping that the discomfort would fade away.",
            "reactive": "You should have addressed the remark immediately, pointing out its inappropriateness and its impact on creating a safe and inclusive environment for all participants.",
            "proactive": "You should have set clear ground rules at the beginning of the training, emphasizing the importance of respect and inclusivity, to prevent such remarks from being made in the first place.",
            "active": "You should have used the moment as a teaching opportunity, engaging the group in a discussion about gender diversity, asking the participant to elaborate on their remark and guiding them towards understanding and empathy."
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
## PUT /api/scenario/end
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
	"message": "Response Recorded in Threads",
	"success": true,
	"content": {
		"msg": "No Content to Parse"
	}
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
	"message": "Summarised",
	"success": true,
	"content": {
		"profile_summary": "You are a strong advocate for diversity and inclusivity, valuing respect for all cultures. Your approach is assertive yet diplomatic, addressing inappropriate behavior directly while emphasizing the importance of respecting differences in the workplace. You prioritize creating a safe and welcoming environment for everyone, demonstrating leadership qualities in handling challenging situations with empathy and professionalism."
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

