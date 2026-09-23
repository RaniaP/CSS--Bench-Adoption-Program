# CLAUDE.md: Bench Adoption Program

## Project summary

An interactive website where donors can adopt a bench at a park with more than 500 benches, for a specific number of months or years. Users click a bench on a map of the park and see whether it is available to adopt or who currently owns it.

**Problem it solves:** there is no concrete data source showing which benches are adopted, by whom, and which are still available.

**Why it matters:** more adoptions mean more funding to maintain the park, plus more engagement on the website and activity at the park. The primary audience is Columbia University students, staff, and alumni, along with current donors and city government.

The full requirements are in `bench-adoption-prd.md`. Read it before starting any feature, and refer to requirements by their IDs (FR-1, FR-2, section 7.4, and so on).

## About me

- I'm a beginner. Write simple, well-commented code and explain what each file does in plain language.
- Tell me exactly how to run or test anything you build (commands to type, what to open in the browser).
- If something in the PRD is marked [TODO] or is unclear, ask me instead of guessing.

## How we work

- Build **one feature at a time**, in the order below.
- **Plan before coding:** for each feature, first list the files you'll create or change and your approach, then wait for my approval.
- Keep it as simple as possible. Don't add frameworks, databases, logins, or build tools unless I agree to them.
- Don't build real payment processing. Payment is an open question in the PRD.
- After each feature works, remind me to commit to Git, and update the Progress section below.

## Build order

1. Choose a tech stack and file structure (propose it, don't build it yet)
2. Sample bench data (`benches.json`) using the fields in PRD section 7.4
3. Interactive park map showing all benches (FR-1)
4. Click a bench to see its details: availability or current owner (FR-2)
5. Mock adoption flow with term options, no real payment (FR-3)

## Tech stack

Not decided yet. Propose one in step 1. Starting preference: plain HTML, CSS, and JavaScript, a free map library, and a JSON file for bench data.

## Progress

- [x] PRD drafted (`bench-adoption-prd.md`)
- [x] CLAUDE.md created
- [x] Tech stack chosen: plain HTML, CSS, and JavaScript
- [ ] Sample bench data (`benches.json` remains pending until PRD fields are confirmed)
- [x] Interactive map (FR-1) prototype
- [ ] Bench detail view (FR-2)
- [ ] Mock adoption flow (FR-3)
