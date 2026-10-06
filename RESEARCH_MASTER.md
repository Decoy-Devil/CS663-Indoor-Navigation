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

## Verified additions (V3)
- QR [3]: node record = ID, corner geodetic coordinates, floor, type, adjacent edges, reachable nodes, position offset; edge = ID, start/end, length, width, centerline. ZBar → 4 corners → P3P (+4th point check) → ICP → R_w2c,T_w2c; IMU pose via R_c2b,T_c2b. Weinberg step model S = k·(amax−amin)^(1/4). EKF state [x,y,θ]. Corridor constraint d > w/2 → project onto centerline. Decode test: 1 m 0.15/0.08 m, 1°/4°; 2 m 0.25/0.21 m, 2°/4°; 3 m failed. Fusion test: 31 states, 6 QR codes on pillars. CC BY 4.0.
- UNav 2022 [4]: Insta360; 4,258 frames × 18 slices (640×360, 75° FOV) = 76,644 images; OpenVSLAM + COLMAP/SuperPoint; T = xXᵀ(XXᵀ)⁻¹; NetVLAD squared Euclidean; weights m_j/Σm (m≤75 → 0; fallback best >30; else increase K); PnP; <1 m, ≈2° at 17 points (NYU Langone ACC); 2–3 s at K=20; ~40 min capture + ~15 min map build; Android app + Jetson AGX Xavier backpack; offline mode. CC BY 4.0.
- UNav 2024 [5]: 12 blind + 8 low vision, 38.3±8.4 y, 9 F; Mahidol Salaya; 7 buildings ≈92,900 m²; 24 routes (20 indoor, 4 outdoor), 50–200 m, 2–4 turns; crossover, counterbalanced; Wilcoxon; Jetson Orin backpack, 16 MP chest camera, bone-conduction headset; DGX A100 server; RTT 3.62 s (0.24–5.96); ≈7 users/GPU; blind subgroup benefited more (time 44.4 vs 12.4 s, p=.047; path eff. 0.292 vs 0.106, p=.044); ordering effect on time (p=.043). PMC copy = author manuscript (figures linked, not reused).
