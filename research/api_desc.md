API Description
===============

### Purpose

This API should allow a user to interact with their TopScore application. This library will convert the RESTful TopScore API into a functional one via easy to use Promise based calls.

Initial functionality will be based around reading events, teams, players, and team <-> player links and writing team <->player links.


### Useful links

* [Beginnings of TopScore API Blog post](https://usetopscore.com/p/the-beginnings-of-the-api)
* [TopScore API Introduction](https://docs.google.com/document/d/148SFmTpsdon5xoGpAeNCokrpaPKKOSDtrLNBHOIq5c4/edit)

### API Work Flows

1. List a league's team and player information
  Given:
    - TopScore URL
  Do:
    - Read and display event info
    - From event info get event_id
    - Read and display team info
    - From team info get team_id
    - Read and display player info for each team

2. Authentication
  Given:
    - TopScore URL
  Do:
    - Query User ID
    - Generate auth secret
    - Verify auth secret

### Questions

1. auth_token - The v0.2 specification document says this is available per user at yoursite.com/u/auth-key. Is there a way to programatically look up this value for a user? If not is there a third party access API?


2. fields parameter - The v0.2 specification document says that you can specify for the API to include more information about field objects, ie the full value of the field rather than just its ID. I'm' not sure how this works. For example including the teams or registrations when looking up an event by event_id.

3. baggage - The registration object has several fields which seem related to baggaging. Are these guessed description correct?
  a. baggage_group_id: A unique identifier wherein all registrations with the same ID are mutually baggaged.
  b. is_baggage_user_approved: The registrant has accepted being bagged to the baggage group.
  c. is_baggage_owner_approved: The league has accepted the baggage group as acceptable.

4. throttling - Is the API throttled? If so what are the limits?