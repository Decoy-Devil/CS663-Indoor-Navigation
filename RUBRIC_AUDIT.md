# Rubric / Deliverable Audit (updated after V3 research pass)

## Professor rubric vs. current site
| Category (pts) | Status | Evidence |
|---|---|---|
| Format / ease of use (5) | Met | 7 static pages, consistent tab nav, responsive (tested at 1280 px and 375 px, no horizontal scroll), no console errors except favicon 404. |
| Mixed media (5) | Met, with one audio action | 21 numbered figures: 10 original diagrams/charts + 11 reproduced CC BY 4.0 research figures (QR paper [3]: Figs 1, 2, 4, 5, 6; UNav 2022 [4]: Figs 1, 4, 6, 7, 8, 9). Audio narration (MP3 summary) on every page, now deployed. |
| Organization (5) | Met | Intro with "how to use" note → sensors → technical core → evidence → challenges → future + quiz → bibliography. |
| Originality (10) | Met | Prose original; research facts cited; our inferences explicitly labelled "our interpretation/observation". One short quoted phrase from [3]. |
| Length (10) | Met | Core reading ≈ 6,150 words ≈ 25–30 min; optional deep-dive panels add ≈ 8 min. |
| Grammar (5) | Needs final human read | Proofread during editing. |
| Level of detail (30) | Strengthened | QR: node/edge schema, ZBar + P3P + ICP pose, IMU lever-arm equations, Weinberg PDR, full EKF equations, corridor constraint, decode accuracy tables, fusion plot. UNav: mapping pipeline (Insta360, OpenVSLAM, COLMAP, 18-slice perspective images, floor-plan transform), NetVLAD distance, weighted-average formula with 75/30 match thresholds, PnP, Dijkstra graph, accuracy (<1 m, ≈2°), latency, server load, hardware. Full 9-metric table with z and p values, subgroup and ordering effects, limitations. Dijkstra pseudocode + worked trace + runnable Python. Decision table for when to prefer each approach. |
| Interactivity (5) | Met | One 5-question JavaScript quiz (locked decision); tested. |
| Annotated bibliography (5) | Met | 5 references, numbered by order of appearance, linked from citations, each with synopsis and reliability; synopses updated with verified results and figure-licence notes. |
| Presentation (20) | User action | Update the PowerPoint from the final site, then record an Unlisted YouTube video. |

## Fact-check log (V3)
- All UNav 2024 numbers on the site were verified against the PMC author manuscript (PMC11822047): success 100% vs 97.5%; path efficiency 1.17 vs 1.38 (z=−3.59, p<0.001); wrong turns 0.49 vs 1.96 (z=−3.52, p<0.001); cane contacts 3.40 vs 4.91 (p=.015); time 155.0 vs 185.1 s (p=.001); idle time 6.4 vs 19.9 s (p=.002); idles 1.26 vs 2.63 (p=.007); gait 0.75 vs 0.80 m/s (p=.121, n.s.); help requests 0.80 vs 2.08 (p=.003).
- QR paper numbers were read from the published PDF (Tables 3–4). The printed tables label both columns "0°"; the site explains that it reads the second column as 45°.
- UNav 2022 thresholds (weight 0 if ≤75 matches; fallback >30) were verified in the paper text.
- Fixed: `images/unav_temporal_results.svg` had an unescaped "&" and did not render in browsers (also broken on the live site).
- 2024 study figures are linked, not reproduced, because the free PMC copy is an author manuscript.
- No authoritative UNav demo video was found; none was added.

## Still pending (user)
1. Push all files to GitHub, **including `audio/`**. Do not push `_sources/` if you create it.
2. Narration: new ~26–33 s page summaries (MP3) generated with the open-source Kokoro neural TTS model (voice af_heart). Re-record in your own voice only if the instructor requires the author's voice.
3. Researcher outreach: send the drafted email, then add any genuine reply to the Challenges/Future pages (placeholders are still there).
4. Final human proofread on the deployed site.
5. Update the PowerPoint from the final site and record the Unlisted YouTube presentation.
