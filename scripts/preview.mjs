import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../docs/',import.meta.url));
const manifest=JSON.parse(await readFile(path.join(root,'route-manifest.json'),'utf8'));
const port=Number(process.env.PORT||4188);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  try{
    let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if((manifest.base&&p===manifest.base)||(manifest.base&&p==='/')){res.writeHead(302,{Location:manifest.base+'/'});res.end();return;}
    if(manifest.base){if(!p.startsWith(manifest.base+'/'))throw Error('Not found');p=p.slice(manifest.base.length);}
    let dest=path.resolve(root,'.'+p);
    if(dest!==path.resolve(root)&&!dest.startsWith(path.resolve(root)+path.sep))throw Error('Not found');
    const st=await stat(dest);
    if(st.isDirectory()){if(!p.endsWith('/')){res.writeHead(301,{Location:new URL(req.url,'http://localhost').pathname+'/'});res.end();return;}dest=path.join(dest,'index.html');}
    const body=await readFile(dest);res.writeHead(200,{'Content-Type':mime[path.extname(dest)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
  }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}${manifest.base}/`));
