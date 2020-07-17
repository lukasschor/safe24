## Safe24 Service

### TODOs
-[ ] Listen for webhooks from Gnosis Safe transaction service
-[ ] Check if Safe has active membership
-[ ] Submit transaction to Gnosis Safe relay service using OWL
-[ ] Convert DAI to OWL (Optional) 

### Open questions
- How to check if Safe has active membership
  - Use local db and update with webhooks
  - Calculate based on events when trying to submit tx (cache with redis)
