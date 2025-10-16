**What’s included**
- Next.js 14 + React 18 + Tailwind
- Recharts (Donut + Bar)
- Redux Toolkit + redux-persist (sessionStorage)
- OR logic within a chart; AND across charts
- Persistent filters (session only)
- All types in `src/types/index.ts`
- Color/Gradient system in `src/theme/colors.ts`
- Reusable components (Card, Badge, LegendPill, SearchInput, FilterBar)
- Alias `@` → `src` (set in tsconfig + next.config)

## Run
```bash
npm i
npm run dev
```
## Build
```bash
npm run build && npm run start
```

## Notes
- Data served from `GET /api/rows` (public/data/rows.json)
- Update colors in `src/theme/colors.ts` if you want a different palette.
