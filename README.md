# Yu Liu personal website

Public source repository for the Chinese-first personal academic website of Professor Yu Liu. This is separate from the existing `dmliu16/yuliu` site.

## Development

Requires Node 22.13 or newer. Run `npm ci`, then `npm run dev`. Build with `npm run build`.

Pages: home, research, selected publications (searchable), personal background, contact. An English toggle is available on every page. Images and fonts do not rely on third-party delivery services.

## Content before public launch

- Confirm current appointments and both language versions with Yu Liu.
- Add the complete approved publication, patent and award record; current publications are a small selection.
- Add the preferred professional email. No placeholder email or working contact form is included.
- The research venture is 上海魏来脑宇科技有限公司, separate from the inactive US entity IntellectSpark.
- Test the hosted site from mainland China before choosing a permanent domain.

## Sources

- https://fddi.fudan.edu.cn/4c/5e/c20919a674910/page.htm
- https://www.coachingscience.asia/index.php/en/about/president
- https://paper.people.com.cn/rmzk/html/2022-03/01/content_25906997.htm
- https://www.nwnu.edu.cn/_t720/2024/0702/c3842a234208/page.htm
- Publication DOI links are stored alongside the entries.

The investor decks, patient materials, and private family documents are not part of this repository.

## Static hosting

`npm run build` exports all five pages and a 404 page to `dist/client`. `npm run preview:static` serves only these files at port 3001. `npm run deploy:static` deploys them to Cloudflare after authentication. The deployment configuration has no Worker entrypoint, database, or server bindings. In Cloudflare Git builds use `npm run build` and deployment command `npx wrangler deploy --config wrangler.static.json`.

## Production and backup

- Primary: https://yu-liu.pages.dev/ (Cloudflare Pages). Build command `npm run build`, output `dist/client`.
- Backup: https://dmliu16.github.io/yu-liu-personal/ (GitHub Pages). The Pages workflow builds with `NEXT_PUBLIC_SITE_PREFIX=/yu-liu-personal` so assets and navigation use the repository path.
- Both update automatically from `main`. Cloudflare preview deployments use other branches.
