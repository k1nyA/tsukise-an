# Known Failure Cases And Mitigations

## 1) Inline `--body` caused markdown collapse

- Symptom: backticks and route-like text collapsed or disappeared.
- Cause: shell expansion and quoting issues in multiline strings.
- Mitigation: always render to file and pass via `--body-file`.

## 2) Mixed bullet and heading styles caused review noise

- Symptom: `-`, `*`, and ad hoc heading names mixed in one issue/PR.
- Cause: manual authoring without canonical section order.
- Mitigation: schema + renderer enforce section order and bullet style.

## 3) Parent/dependency links became ambiguous

- Symptom: `34`, `Issue34`, and `# 34` mixed in the same body.
- Cause: manual text entry.
- Mitigation: normalize references to `#34` in renderer.

## 4) PR description and Issue description drifted

- Symptom: missing testing section, missing related issue refs, inconsistent blocks.
- Cause: separate ad hoc templates by author.
- Mitigation: use both issue and PR schemas from this skill.
