# Bench Adoption Program: Product Requirements Document (PRD)

**Status:** Draft
**Author:** [TODO: your name]
**Last updated:** 2026-09-22

> Legend: text taken from your notes is written as-is. Anything marked **[TODO]** is a gap to fill in or restructure.

---

## 1. Mission

Create a website for donors to adopt a bench at a park that has more than 500 benches.

- Donors can adopt a bench for a specific number of months or years.

## 2. Situation (Problem Statement)

There is no concrete data source showing which potential donor benches are adopted, by whom, and which ones are still available.

## 3. Goal

Create an interactive website that allows the user to:

1. Click a bench location on the map of the park.
2. View the details of that bench, including whether it is available to adopt or who the current owner is.

This is intended to increase engagement on the website and increase activity at the park.

## 4. Why (Rationale)

Increasing the adoption of benches can increase funding to maintain the park.

## 5. Stakeholders

| Stakeholder | Role / Interest |
|---|---|
| Columbia University students | [TODO: e.g., potential donors, class or group gifts, or site users] |
| Columbia University staff | [TODO: your "Why Stakeholders" note lists staff, but the stakeholder list does not. Confirm whether staff is a stakeholder] |
| Columbia alumni | [TODO] |
| Current donors | [TODO: e.g., existing adopters who need to see and manage their benches] |
| City government | [TODO: e.g., approves the program, owns the park or benches, maintains data] |

### Why target these stakeholders

Targeting Columbia students, staff, and alumni will foster tradition, network, and recognition of whom a donor may adopt a bench for. Benches can symbolize unity and gift-giving.

## 6. Success Metrics

**[TODO]** Define how "increased engagement," "increased activity at the park," and "increased funding" will be measured.

| Goal | Metric | Baseline | Target |
|---|---|---|---|
| Website engagement | [TODO: e.g., unique visitors, bench clicks per session] | [TODO] | [TODO] |
| Bench adoption | [TODO: e.g., % of benches adopted, new adoptions per month] | [TODO] | [TODO] |
| Funding | [TODO: e.g., total dollars raised for park maintenance] | [TODO] | [TODO] |
| Park activity | [TODO: how will this be measured?] | [TODO] | [TODO] |

## 7. Requirements

### 7.1 User stories

**[TODO]** Review, edit, and add to these starter stories.

- As a donor, I can click a bench on the park map so that I can see its details.
- As a donor, I can see whether a bench is available to adopt or who currently owns it.
- As a donor, I can choose how long to adopt a bench (a specific number of months or years).
- [TODO: As a donor, I can pay for / submit an adoption request]
- [TODO: As a current donor, I can view or renew my adopted bench]
- [TODO: As an administrator, I can add, edit, or update bench records]

### 7.2 Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Interactive map of the park showing bench locations (park has more than 500 benches) | [TODO] |
| FR-2 | Clicking a bench location shows its details, including availability status and current owner | [TODO] |
| FR-3 | Donors can adopt an available bench for a specific number of months or years | [TODO] |
| FR-4 | [TODO: search or filter, e.g., show only available benches] | [TODO] |
| FR-5 | [TODO: adoption flow, payment, confirmation] | [TODO] |

### 7.3 Adoption terms

**[TODO]** Your notes say donors adopt for "a specific number of months/years." Define:

- Term options (e.g., 1, 3, or 5 years): [TODO]
- Cost per term: [TODO]
- What happens when a term ends (renewal, release back to available): [TODO]

### 7.4 Data requirements

The Situation section says no concrete data source exists, so creating one is part of this project.

**[TODO]** Confirm the fields for each bench record. Suggested starting point:

| Field | Description |
|---|---|
| Bench ID | [TODO] |
| Map location | Coordinates or map position: [TODO] |
| Status | Available / Adopted: [TODO] |
| Current adopter | Donor name, or "anonymous": [TODO] |
| Term start / end | [TODO] |
| [TODO: other fields, e.g., dedication text, plaque] | |

- Data owner / maintainer: [TODO]
- Data source of truth (spreadsheet, database, city records): [TODO]

## 8. Scope

### In scope (Version 1)

- Interactive park map with clickable bench locations
- Bench detail view (availability and current owner)
- [TODO]

### Out of scope / Non-goals

**[TODO]** Decide what is out for version one. Candidates: online payment, physical plaques or recognition, city approval workflow, donor accounts.

- [TODO]

### First feature implementation plan: visual park map

The first website page will implement the map portion of **FR-1** as a simple prototype.

**Files**

- `index.html`: The page structure, map area, legend, and accessible labels.
- `styles.css`: The park illustration, pathway, bench markers, layout, and responsive styles.
- `script.js`: Sample bench locations and simple hover/click behavior for the map markers.

**Approach**

- Use plain HTML, CSS, and JavaScript with no framework or build tools.
- Represent the park as a stylized visual map rather than a geographically accurate map until the park survey and mapping source are confirmed in section 7.4 and the open questions.
- Include a walkable pathway through the park and clearly marked sample bench locations along and near the pathway.
- Generate a stable 528-bench inventory in JavaScript for this first visual prototype, grouped into seven park districts; move it to `benches.json` when the fields in section 7.4 are confirmed.
- Make bench markers keyboard accessible and provide a legend for available and adopted benches.
- Use small, dense markers at map scale so the interface can represent 500+ benches without turning every marker into a large label; show the selected bench details below the map.

## 9. Risks & Dependencies

**[TODO]**

- City government sign-off and any agreement on bench adoption: [TODO]
- Ownership and upkeep of the bench data: [TODO]
- Verifying donors and adopter names shown publicly: [TODO]
- [TODO]

## 10. Open Questions

- Is staff a stakeholder, alongside students and alumni?
- What are the adoption term lengths and prices?
- Who maintains the bench data after launch?
- Is payment handled on the site or elsewhere?
- What role does city government play in approval and ownership?
- How will the park's bench locations be mapped (existing survey, GPS, manual)?

## 11. Timeline / Milestones

**[TODO]**

| Milestone | Target date |
|---|---|
| Finalize PRD | [TODO] |
| Bench data source built | [TODO] |
| Prototype of interactive map | [TODO] |
| Launch | [TODO] |
