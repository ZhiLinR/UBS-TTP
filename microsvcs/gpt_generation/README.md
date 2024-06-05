# api quick reference sheet
## POST /api/scenario
*Debating on a GET? maybe with query instead?* 

creates a new scenario for the user. 

@params req.body.uid - required, user id, currently email <br>
@params req.body.topic - optional, a selected or predefined topic to be used <br>

Sample request body:
```
{
    "uid":"sammyho@email.com", //required
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
---
## POST /api/scenario/end
*naming improvements appreciated 😢* 

Logs the user's interaction with the scenario (namely the given scenario and the selected option).

@params req.body.uid - user's id, currently email <br>
@params req.body.content - contains scenario and options <br>


Sample request body
```
{
    "uid":"sammyho@email.com",
    "content": {
        "scenario": "As a Diversity and Inclusion Specialist, I was facilitating a training session on Diversity in the workplace. During the session, a participant made a dismissive remark about a colleague's cultural background, causing discomfort in the room. What should I do?",
        "options": 
             "You should address the comment directly, expressing how it was inappropriate and reminding participants about the importance of respecting all cultures in the workplace."
        
    }
}
```
*The data inside content is copy and pasted from the scenario generation, directly copied into the body.

Sample success response:
```
{
    "message": "Entry Created",
    "success": true
}
```

---
## GET /api/scenario/summary/:uid
Generates a personality overview for the user judging from their interactions with scenarios and their profile. 

@params req.params.uid - user's id, currently admin

Sample success response:
```
{
    "message": "Summarised",
    "success": true,
    "content": {
        "profile_summary": "You are a sensitive and empathetic individual who values diversity and inclusion. You take a stand against inappropriate behavior and strive to create a respectful and accepting environment. Your ability to address uncomfortable situations directly and educate others on the importance of cultural respect sets you apart as a role model for promoting harmony in the workplace."
    }
}
```

---

