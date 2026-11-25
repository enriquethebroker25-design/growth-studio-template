import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import vm from 'node:vm';
test('fresh installation has a blank profile and independent local key',()=>{const source=readFileSync('app.js','utf8');const initial=source.slice(source.indexOf('const defaults='),source.indexOf('let state;'));const defaults=vm.runInNewContext(initial+'defaults');assert.ok(Object.values(defaults.base).every(v=>v===''));assert.equal(defaults.ideas.length,0);assert.equal(defaults.calendar.length,0);assert.match(source,/growthStudioTemplateV1/)});
test('default build has no preconfigured cloud connection',()=>{const sandbox={window:{}};vm.runInNewContext(readFileSync('public/config.js','utf8'),sandbox);assert.equal(sandbox.window.STUDIO_CONFIG.supabaseUrl,'');assert.equal(sandbox.window.STUDIO_CONFIG.supabaseKey,'')});
test('distribution excludes backups, environment files and deployment credentials',()=>{const walk=dir=>readdirSync(dir).flatMap(name=>{const p=dir+'/'+name;return statSync(p).isDirectory()?walk(p):[p]});for(const path of walk('public')){assert.doesNotMatch(path,/(\.env|respaldo|backup|original\/|\.git\/)/i);const data=readFileSync(path,'utf8');assert.doesNotMatch(data,/sb_(?:publishable|secret)_[A-Za-z0-9_-]{15,}|eyJ[A-Za-z0-9_-]{40,}|team_[A-Za-z0-9]{15,}|prj_[A-Za-z0-9]{15,}/)}});
