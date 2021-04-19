# 5. Use local contract for integration events

Date: 2021-04-10

## Status

Accepted

## Context

Each of the module expose integration events. Other modules can listen for these events and execute specific action. We need to define events somewhere, to be able to properly handle it in each module.

## Possible solutions

1. Shared contracts. 
Pros:
- less code duplication
- going into microservices it's easy to copy this directory, with all the codebase
- easier to just import needed things instead of defining it multiple times in every module
Cons:
- coupling to mutiple modules

1. Local contracts
Pros:
- less coupling
Cons:
- more effort to maintain integration between events e.g. contract testing
- a lot of duplicated code

## Decision

One of the goals of this project is to keep each module as independent as possible, I decided to use local contracts

## Consequences

To maintain contract consistency, contract testing will need to be in place.