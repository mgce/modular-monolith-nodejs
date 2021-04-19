# 3. DI container for each module

Date: 2021-04-01

## Status

Accepted

## Context

Each module should be maximum independent. It should take care of all the dependencies by itself. It should be able to create a graph of object.

## Decision

For each module we will create a separate DI container. It support modularity, and makes each module responsible by them dependencies.

## Consequences

- Memory usage of the application can be bigger, because multiple container can take more memory than single one.
- Modules will be more independent
- Modules must be initialized by main application
- Modules will be easier to extract, because it won't have cupling to the rest of codebase.
- Maintain of each container per module
- Duplicated code