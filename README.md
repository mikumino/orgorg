# OrgOrg

Effortless meeting scheduling.

## Getting started
Clone the [project](<https://github.com/mikumino/event-organizer-app>) with git:

```bash
git clone https://github.com/mikumino/orgorg.git
```

After cloning, open a terminal inside the cloned repository and run:

```bash
pnpm install
```

To run the dev server, in the same directory, run:

```bash
pnpm run dev
```

This will launch the server and allow you to test the app through http://localhost:5173/.

To build the project, run:

```bash
pnpm run build
```

## Deployment

The website is deployed [here](https://orgorg.pages.dev) through Cloudflare Pages.

To deploy the website yourself, you can utilize [Svelte adapters](https://kit.svelte.dev/docs/adapters) for no-config deployments.

# Release Notes (v1.0)

All core functionalities of OrgOrg are now implemented. No major bugs.

## Features

- Meeting organization
- Availability filling
- Meeting sharing
    - Available through unique links
    - No account required
- Account creation
    - Email verification through smtp2go
    - User authentication
    - Keep track of meetings

## Known Issues

- No way to delete meetings
- No way to delete accounts
- No way to change email/password

# Contributors and Evaluations

- Alan Le (me!)
    - Project Manager, Full-stack Developer
    - Worked on frontend (project scaffolding, mockups, login/register pages, meeting organization page, availabilties page), backend (account creation, meeting and availability creation), and deployment
- Ava Vazquez
    - Frontend Developer
    - Worked on frontend (availability filling/page and all related components, user profile page)
    - Very good communication and ability to work independently, good technical skills
- Lauren Contreras
    - Backend Developer
    - Worked on backend (account creation, meeting and availability creation, initialization of database and tables)
    - Good technical skills, always communicative and eager to help
- Daniel Nam
    - Frontend Developer
    - Worked on error handling for meeting organization page
    - Completed assigned tasks on time
- Dylan Oliva
    - Business Analyst / QA
    - Worked on testing and documentation
    - Good communication and ability to work independently. Proactive in work.
