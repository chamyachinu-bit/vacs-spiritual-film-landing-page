# Film Gallery Design QA

## Visual target

- Continuous physical 35mm film roll: dark emulsion body, uninterrupted sprocket tracks, photographs cut into the same strip.
- Concave 3D path: large/near at both viewport edges and small/far through the centre.
- Reference geometry informed by the supplied film illustration and the shared cylindrical transform approach in the provided CodePen.

## Verification

- Desktop verified at the normal in-app browser viewport.
- Mobile verified at 360 × 800.
- All source photographs remain in colour.
- The film body and both sprocket tracks are rendered as one uninterrupted curved canvas surface; there are no individual film panels, connector layers, or floating-card gaps.
- Automatic motion, hover slowdown, pointer dragging, click-to-focus, infinite wrapping, responsive sizing, and reduced-motion fallback remain implemented.
- Dragging now releases into restrained momentum and friction instead of stopping mechanically.
- Sprocket spacing uses the same perspective projection as the frames, compressing toward the distant centre and expanding toward the foreground edges.
- Photographs are rendered in narrow curved slices so their image surfaces follow the continuous film bend.
- Arrow-key navigation and screen-reader centre-frame announcements were verified.
- The renderer derives its repeating sequence directly from the source image list, so a short collection fills the roll and later images can be added without changing the animation logic.
- No browser console warnings or errors were found during desktop or mobile verification.
- No deployment or repository push was performed.

## Final result

passed
