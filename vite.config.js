import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * base 按部署环境切换：
 * - GitHub Pages 是项目页，站点挂在 https://txwzs-211.github.io/gxy-portfolio/，
 *   资源必须带 /gxy-portfolio/ 前缀，否则 /assets/xxx 会 404、整站白屏。
 * - Cloudflare Pages 与本地 dev / preview 都在根路径，用 '/'。
 * 之前写死 '/' 只修好了本地预览，反而把 GitHub Pages 那份部署弄坏了。
 */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/gxy-portfolio/' : '/',
  server: {
    port: 5173,
    open: false
  }
})
