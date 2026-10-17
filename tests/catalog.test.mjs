import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {regions,services,people,priceFor,normalize} from '../src/data.mjs';
import {renderPage} from '../src/templates.mjs';
const root=fileURLToPath(new URL('../docs/',import.meta.url));
test('launch includes exactly two requested regions, ten services and twenty unique subservices',()=>{
  assert.deepEqual(regions.map(r=>r.slug),['skopski','krivopalanecki']);
  assert.equal(services.length,10);assert.equal(services.flatMap(s=>s.subs).length,20);
  assert.equal(new Set(services.flatMap(s=>s.subs.map(x=>x.slug))).size,20);
  assert.equal(people.length,100);assert.equal(new Set(people.map(p=>p.id)).size,100);
  assert.equal(new Set(people.map(p=>p.name)).size,100);
});
test('every service and subservice page contains five complete regional personas with specific prices',()=>{
  for(const r of regions)for(const s of services){
    const ps=people.filter(p=>p.region===r.slug&&p.service===s.slug);assert.equal(ps.length,5);
    for(const p of ps){assert.ok(p.name&&p.area&&p.city&&p.specialties.length===2&&p.demo);assert.ok(p.rating>0&&p.rating<=5);}
    for(const sub of ['',...s.subs.map(x=>x.slug)]){
      const html=renderPage({kind:'directory',region:r.slug,service:s.slug,sub,base:'/odponedelnik'});
      assert.equal((html.match(/data-person=/g)||[]).length,5);
      assert.ok(html.includes(`data-sub="${sub}"`));assert.ok(html.includes('Примерни оценки и цени'));
      for(const p of ps){const price=priceFor(p,sub);assert.ok(price.min>0&&price.max>=price.min&&price.unit);}
      assert.ok(!html.includes('tel:'));assert.ok(!html.includes('aggregateRating'));
    }
  }
});
test('search handles Macedonian and common Latin typing',()=>{
  for(const [a,b] of [['чешма','cesma'],['ѓорче','gjorce'],['Крива Паланка','kriva palanka'],['ѕид','dzid'],['Скопје','skopje']])assert.equal(normalize(a),normalize(b));
});
test('all built routes and local asset/link targets exist, including deep links',async()=>{
  const manifest=JSON.parse(await readFile(path.join(root,'route-manifest.json'),'utf8'));
  assert.equal(manifest.routes.length,65);
  const checked=new Set();
  for(const route of manifest.routes){
    const html=await readFile(path.join(root,route,'index.html'),'utf8');
    assert.match(html,/<html lang="mk">/);assert.match(html,/name="robots" content="noindex,follow"/);
    for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){
      const href=match[1].split('#')[0];if(!href.startsWith(manifest.base+'/'))continue;
      const local=href.slice(manifest.base.length);if(checked.has(local))continue;checked.add(local);
      const target=path.join(root,local,local.endsWith('/')?'index.html':'');assert.ok((await stat(target)).isFile(),`Missing ${href}`);
    }
  }
});
