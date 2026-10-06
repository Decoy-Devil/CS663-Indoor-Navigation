# CS663 Project 1 — Research Master Notes

## Scope
Topic: Mobile — previous work on indoor navigation using vision, with the goal of moving from current point A to destination B. Primary accessibility context: blind and low-vision users.

## Focal recent papers
1. Liu & Zhang (2023), QR-code map + IMU fusion. DOI 10.5194/isprs-archives-XLVIII-1-W2-2023-665-2023.
2. Yang et al. (2024), UNav efficacy study. DOI 10.1080/10400435.2024.2382113.

## Supporting papers
3. Khan et al. (2022), systematic review of vision-based indoor navigation. DOI 10.1016/j.cag.2022.03.005.
4. Plikynas et al. (2020), indoor navigation technologies mapped to visually impaired user needs. DOI 10.3390/s20030636.
5. Yang et al. (2022), UNav technical system. DOI 10.3390/s22228894.

## Verified facts used
- QR paper: QR codes can act as indoor road-network nodes/control points; node information includes QR position/posture; photographing a node plus IMU fusion can provide absolute position/direction; map edges support navigation/path planning.
- UNav technical paper: standard RGB query images; VPR retrieves similar mapped reference images; weighted location estimate; PnP direction estimate; Dijkstra shortest path; average localization error below 1 m in the reported technical evaluation.
- UNav efficacy: 20 blind/low-vision participants; unfamiliar routes under 200 m; 9 metrics; UNav superior on 8/9 and statistically significant on 7/9; success 100% vs 97.5%; path efficiency 1.17 vs 1.38; wrong turns 0.49 vs 1.96; time 155.0 s vs 185.1 s; help requests 0.80 vs 2.08; gait speed difference not significant.

## Our analysis (not paper claims)
- QR/IMU trades installed marker infrastructure for explicit, simple location anchors.
- UNav avoids dedicated positioning markers but needs visual mapping and more sophisticated computation.
- Neither is universally superior; deployment context determines the better tradeoff.

## Finalization item intentionally pending
Researcher/professor/student outreach is reserved for the finalization phase per our project plan. Add the actual response or transparent outreach status to Challenges/Future before final submission.
