# CTD-system

## CTD-backend

IUT CSE FEST 2024 Hackathon DevOps Segment Team team_naam_nai

# Stage 1

A UI app where users can login and register account. Implement automated testing and deployment pipeline

# Stage 2

Add and View Car post in User dashboard.

# Stage 3

View all the car posts in Home. Automated infrastructure scaling is implemented.

## Here is our solutions:

### Stage 1: Progress

Frontend:A simple frontend UI created with react
Testing: Introduced Unit testing and integration testing with supertest and jest.
Backend: A backend app created with express.js
CI/CD: Frontend CI/CD pipeline created using AWS codePipeline
Git branching: best practices were used to maintain branching
strategy for seamless collaboration and automates testing.

# Git Branching Strategy

Main: Main production branch

Develop: Development branch

QA: Branch for quality assurance test

Stage: Final requirements check before merging to main

Feature: Feature branch for developing multiple features simultaneously

### Stage 2: progress

Infrastructure automation: Introduced infrastructure
automation for more flexibility during deployment

### Stage 3: progress

Implement : UI was updated to show car posts in home.
Infrastructure scaling: Infrastructure was configured to scale automatically during heavy load

## Auto-Scaling Policy

# ScaleUp Policy

CloudWatch Metric :

CpuUtilization

    Rule :

      Average CpuUtilization = 30

    Add Instance = 1

# Final Architure of the system
![alt text](https://github.com/rakib3004/VMS-backend/blob/main/Architecture.png?raw=true)


These are the links for individual repositories

CTD_Frontend: https://github.com/SwarnaIslam/Frontend_DevOps/tree/frontend

CTD_Backend: https://github.com/SwarnaIslam/Backend_DevOps

CTD_Terraform: https://github.com/galib-1206/CTD-System_Terraform.git

CTD_Slide: https://docs.google.com/presentation/d/1aKeX0ZUB2nPybSfRaSQCk8AjWAOzebVe6nm27Kx_P1g/edit?usp=sharing

forntend link: https://ctd.projectsbd.me
