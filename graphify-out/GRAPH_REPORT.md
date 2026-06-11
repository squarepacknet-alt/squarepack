# Graph Report - SquarePack  (2026-04-23)

## Corpus Check
- 36 files · ~99,831 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 84 nodes · 74 edges · 3 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `showToast()` - 7 edges
2. `generateMetadata()` - 6 edges
3. `localize_product()` - 4 edges
4. `localize_testimonial()` - 4 edges
5. `fetchProducts()` - 4 edges
6. `fetchTestimonials()` - 4 edges
7. `LocalizedProduct` - 3 edges
8. `LocalizedTestimonial` - 3 edges
9. `createProduct()` - 3 edges
10. `updateProduct()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (11): BaseModel, get_product(), get_products(), get_testimonial(), get_testimonials(), localize_product(), localize_testimonial(), LocalizedProduct (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (9): createProduct(), createTestimonial(), deleteProduct(), deleteTestimonial(), fetchProducts(), fetchTestimonials(), showToast(), updateProduct() (+1 more)

### Community 2 - "Community 2"
Cohesion: 0.2
Nodes (1): generateMetadata()

## Knowledge Gaps
- **Thin community `Community 2`** (10 nodes): `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `AboutUsPage()`, `generateMetadata()`, `getProducts()`, `getTestimonials()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._