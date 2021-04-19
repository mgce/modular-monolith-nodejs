# 4. Share infrastrcture between all modules

Date: 2021-04-01

## Status

Accepted

## Context

Each of the module need some kind of building blocks to bootstrap the application.

## Possible solutions

1. Make one directory with shared codebase. 
Pros:
- less code duplication
- going into microservices it's easy to copy this directory, with all the codebase
- each module can still have module-specific infrastrcture defined only inside a module
- easier to just import needed things than copying it into each module
Cons:
- coupling to shared folder
- different requirements of implementation for each module which will force to 

2. Define infrastructure in each module
Pros:
- less coupling
Cons:
- more effort to maintain application
- a lot of duplicated code

## Decision

In this application, we will have one building-blocks folder, shared between modules.

## Consequences

Remember to not overuse this shared folder. Everything which is not general, should be keeped in modules separetly. 