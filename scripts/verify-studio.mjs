import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
const base=process.env.TEST_URL||'http://127.0.0.1:3000';
const response=await fetch(base+'/resume-studio');assert.equal(response.status,200);
const html=await response.text();
assert.ok(html.includes('<title>Paper / Studio — Interactive PDF Preview</title>'));
assert.ok(html.includes('noindex'));
assert.ok(html.includes('Clean'));
assert.ok(html.includes('YOUR FILE. YOUR BROWSER. NO UPLOAD.'));
assert.ok(!html.includes('Main navigation'),'Studio omits portfolio navigation');
const pdf=await fetch(base+'/resume-studio/alex-morgan-resume.pdf');assert.equal(pdf.status,200);assert.match(pdf.headers.get('content-type'),/pdf/);
const served=Buffer.from(await pdf.arrayBuffer());const source=await readFile('public/resume-studio/alex-morgan-resume.pdf');assert.deepEqual(served,source,'Viewer download is the original PDF');
for(const folder of ['cmaps','standard_fonts','wasm']){const files=await readdir('public/resume-studio/'+folder);const file=files.find(x=>!x.startsWith('.')&&!x.includes('LICENSE'));assert.ok(file,folder);const r=await fetch(`${base}/resume-studio/${folder}/${file}`);assert.equal(r.status,200,`${folder}/${file}`)}
const media=await readdir('.next/static/media');const worker=media.find(x=>x.startsWith('pdf.worker')&&x.endsWith('.mjs'));assert.ok(worker,'Local PDF worker bundled');assert.equal((await fetch(`${base}/_next/static/media/${worker}`)).status,200,'Local worker served');
console.log('PASS studio route, independent metadata, original PDF bytes, local worker, character maps, fonts and codecs.');
