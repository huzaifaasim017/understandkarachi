# Security and privacy policy

> Status: active · Owner: maintainers · Last reviewed: 2026-08-13

## Reporting

Do not publish an exploitable vulnerability, exposed credential, or sensitive
location record in a public issue. Contact the repository owner or deployment
administrator privately and include the affected URL or commit, impact,
reproduction steps, and any safe mitigation you tested.

No response-time guarantee is published yet. A maintainer should acknowledge a
credible report, restrict access if necessary, preserve evidence, rotate any
exposed credential, and communicate remediation before public disclosure.

## Current privacy boundary

The guide works without an account, server-side trip history, or stored precise
user location. Language preference is stored locally in the browser. Search
uses curated local place data. The optional “estimate my location” button makes
one browser Geolocation API request, compares the result with local anchors in
memory, and does not persist or transmit the coordinate to an application
database. Denial leaves search fully usable.

The basemap and hosted application are delivered by third-party infrastructure,
which may receive ordinary network metadata such as an IP address and user
agent. See the deployment provider's policy before changing public access.

## Sensitive changes

A proposal to add geolocation, analytics, user accounts, saved journeys,
community reports, or an external routing API requires a privacy and threat
model review before implementation. Define consent, retention, deletion,
access control, data minimization, vendor boundaries, and a no-permission
fallback.

Never commit secrets. If a secret is exposed, revoke or rotate it first; deleting
it from a later commit is not sufficient.
