# Sessions vs Json web tokens

## What we will cover

* What is a session?
* What is a Json web token?
* When do you use one over the other?

## Things to think about

Sessions are a bit tricky to manage over a cluster of apps but it is not
uncommon that companies do this.

Jwt are very easy to manage in a cluster but you can never put private data
in the token because a hacker can steal it from a user and crack the hash.

I find a good rule of thumb for Jwt is to only include the user id but never actually storing the data connected to the id in the token. 
Use the id to grab the data from the database when the request comes to the system.

Jwt also puts your client in a position where it needs to include the token
in every request to the system while a session handles everything on the server.
