---
title: Operations runbook
status: active
owner: deployment maintainer
last-reviewed: 2026-08-14
review-cycle: every release or incident
---

# Operations runbook

## Service profile

- Application: Understand Karachi
- Runtime: vinext/React production worker with static assets
- Hosting link: `.openai/hosting.json`
- Current project ID: `appgprj_6a7db59e8f888191ac913e8c2be34536`
- Current site URL: `https://understand-karachi.ssfgroup.chatgpt.site`
- Current release: version 3; see [release record](../releases/2026-08-14-v3.md)
- Current visibility: private; confirm before each release
- Persistent application data: none required by the current traveller flow
- External runtime dependency: OpenFreeMap basemap/tile delivery
- Local critical assets: `/data/*.geojson`, `/photos/*`, `/favicon.svg`, `/og.png`

Do not place deployment credentials or temporary source-repository tokens in
this file, shell history, commits, or issue comments.

## Local start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. If the development server reports an existing
lock, first identify the owning process; do not delete a live lock or terminate
an unrelated session.

Production preflight:

```bash
npm run lint
npm test
```

## Release

1. Confirm the target commit and working tree; never package unrelated local
   changes.
2. Complete the [QA and release checklist](../quality/qa-release-checklist.md).
3. Build and package through the approved Sites workflow associated with the
   existing project ID. Re-linking or creating a replacement project requires
   maintainer approval.
4. Create a new immutable site version and deploy that version with the intended
   visibility. Do not expose a private project publicly by assumption.
5. Poll deployment status to a terminal state and record the version ID.
6. Smoke-test from a fresh session: HTML, locale switch, interactive/fallback
   map, GeoJSON, photographs, favicon, social image, source links, and emergency
   links.
7. Record the release using the template in the QA checklist.

## Rollback

Rollback is appropriate for a blank page, broken primary journey, missing
critical assets, security/privacy regression, materially wrong travel/safety
claim, inaccessible blocking interaction, or persistent deployment errors.

1. Stop further promotion and capture the failing URL/version/commit.
2. If the problem is a dangerous factual claim, make the deployment private or
   unavailable until a safe version can be restored.
3. Redeploy the most recent known-good immutable version; do not rebuild it from
   an unverified working tree.
4. Repeat the critical smoke tests.
5. Record cause, impact window, rollback version, and follow-up owner in the
   active plan or incident record.

## Incident triage

| Symptom | First checks | Safe response |
| --- | --- | --- |
| Site does not load | Deployment status, root response, recent version, asset manifest | Roll back if root HTML is unavailable |
| Map is blank but page works | Browser console/network, basemap reachability, local GeoJSON status, attribution | Keep textual journey available; do not call it a total outage |
| Districts/corridors missing | Fetch `/data/karachi-districts.geojson` and `karachi-network.geojson`; validate JSON metadata | Restore last known-good assets/version |
| 3D hero missing | WebGL support, dynamic import, console | Accept fallback if title/start remain intact; fix separately |
| Wrong or stale critical claim | Source registry, review date, responsible authority | Remove “current”, add date/caution, or roll back |
| Language mismatch | locale storage, document `lang`, localized key parity | Default safely to Roman Urdu and repair before promotion |
| Suspected secret or private data | Diff, logs, hosting configuration | Restrict access and follow `SECURITY.md` immediately |

## External basemap degradation

The local teaching overlays and prose are authoritative for the product lesson;
the remote basemap is contextual. During a basemap incident:

- retain the map fallback and adjacent explanation;
- do not remove attribution or substitute an unapproved tile provider;
- avoid repeated automated retries that could worsen an outage;
- communicate that detailed background tiles are unavailable, not that Karachi
  data has been erased.

## Data correction procedure

For an urgent administrative, emergency, or travel-safety correction, identify
the source owner, capture the direct evidence and effective time, patch the
canonical record and both language views, run the full release checklist, and
record what changed. Preserve the older source record for auditability rather
than rewriting history.
