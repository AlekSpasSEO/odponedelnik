import {mkdir, writeFile} from 'node:fs/promises';
const folder = new URL('../public/assets/fonts/', import.meta.url);
await mkdir(folder, {recursive:true});
const url = 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800;900&family=Roboto+Slab:wght@600;700;800;900&display=swap';
const res = await fetch(url, {headers:{'User-Agent':'Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36'}});
if(!res.ok) throw Error(`Font CSS ${res.status}`);
let css = await res.text();
const links = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]))];
for(let i=0;i<links.length;i++) {
  const r = await fetch(links[i]); if(!r.ok) throw Error(`Font ${r.status}`);
  const name = `font-${i}.woff2`;
  await writeFile(new URL(name,folder),Buffer.from(await r.arrayBuffer()));
  css=css.replaceAll(links[i],`./fonts/${name}`);
}
await writeFile(new URL('../public/assets/fonts.css',import.meta.url),css);
for(const [name,url] of [
  ['Golos-Text-OFL.txt','https://raw.githubusercontent.com/google/fonts/main/ofl/golostext/OFL.txt'],
  ['Roboto-Slab-LICENSE.txt','https://raw.githubusercontent.com/google/fonts/main/apache/robotoslab/LICENSE.txt']
]) {
  const r = await fetch(url); if(!r.ok) throw Error(`License ${name}: ${r.status}`);
  await writeFile(new URL(name,folder),await r.text());
}
console.log(`Saved ${links.length} local font files and licenses.`);
