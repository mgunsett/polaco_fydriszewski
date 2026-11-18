// Renderiza og/og.html a public/og-image.jpg (1200×630). Uso: node og/og.cjs
const { chromium } = require('playwright')
const path = require('path')
;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
  await p.goto('file://' + path.join(__dirname, 'og.html'))
  await p.evaluate(() => document.fonts.ready)
  await p.waitForTimeout(400)
  await p.screenshot({ path: path.join(__dirname, '..', 'public', 'og-image.jpg'), type: 'jpeg', quality: 86 })
  await b.close()
})()
