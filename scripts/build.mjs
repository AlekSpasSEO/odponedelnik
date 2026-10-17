import {mkdir,rm,cp,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {regions,services} from '../src/data.mjs';
import {renderPage} from '../src/templates.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=path.resolve(root,'docs');
if(path.dirname(out)!==path.resolve(root)||path.basename(out)!=='docs')throw Error('Output must be the project docs directory.');
const base=(process.env.BASE_PATH??'/odponedelnik').replace(/\/$/,'');
if(base&&!/^\/[a-z0-9-]+$/.test(base))throw Error('BASE_PATH must be empty or one URL-safe path segment.');
const origin=process.env.SITE_ORIGIN||'https://alekspasseo.github.io';
if(!/^https?:\/\/[a-z0-9.:-]+$/.test(origin))throw Error('SITE_ORIGIN must be an HTTP(S) origin.');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
await cp(path.join(root,'public'),out,{recursive:true});
await cp(path.join(root,'src/data.mjs'),path.join(out,'data.mjs'));
await cp(path.join(root,'src/ui.mjs'),path.join(out,'ui.mjs'));
const routes=[];
async function page(route,params){const dest=path.join(out,route,'index.html');await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,renderPage({base,origin,...params}));routes.push('/'+(route?route+'/':''));}
await page('',{kind:'home'});
for(const r of regions){
  await page(r.slug,{kind:'region',region:r.slug});
  for(const s of services){
    await page(`${r.slug}/${s.slug}`,{kind:'directory',region:r.slug,service:s.slug});
    for(const sub of s.subs)await page(`${r.slug}/${s.slug}/${sub.slug}`,{kind:'directory',region:r.slug,service:s.slug,sub:sub.slug});
  }
}
for(const kind of ['zacuvani','kako-raboti'])await page(kind,{kind});
await writeFile(path.join(out,'404.html'),renderPage({base,origin,kind:'404'}));
await writeFile(path.join(out,'.nojekyll'),'');
await writeFile(path.join(out,'robots.txt'),`User-agent: *\nDisallow: ${base?base+'/':'/'}\n`);
await writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin}${base}${r}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(out,'route-manifest.json'),JSON.stringify({base,regions:regions.length,services:services.length,subservices:services.reduce((n,s)=>n+s.subs.length,0),routes},null,2));
console.log(`Built ${routes.length} pages + 404 in ${out}. Base path: ${base||'/'}`);
