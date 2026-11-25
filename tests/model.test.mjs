import test from 'node:test';
import assert from 'node:assert/strict';
import '../model.js';
const base={base:{name:'Marca de prueba'},baseResult:'',ideas:[],scripts:{},calendar:[],notes:'',inventory:'',week:0};
test('legacy backups acquire all new modules without losing content',()=>{const s=StudioModel.normalize({...base,scripts:{idea:'Texto guardado'}},base);assert.equal(s.scripts.idea,'Texto guardado');assert.deepEqual(s.measurements,[])});
test('malformed imports rejected before replacing state',()=>{assert.throws(()=>StudioModel.normalize({...base,ideas:[{}]},base));assert.throws(()=>StudioModel.normalize({...base,calendar:[{date:'2026-01-01'}]},base));assert.throws(()=>StudioModel.normalize({...base,pillars:[{name:'x',weight:-1}]},base))});
test('zero reach is unavailable, not infinite or fabricated engagement',()=>{assert.equal(StudioModel.rate({reach:0}),null);assert.equal(StudioModel.rate({reach:100,likes:5,comments:2,saves:2,shares:1}),10)});
test('publication links only allow HTTPS Instagram hosts',()=>{for(const url of ['javascript:alert(1)','https://instagram.com.attacker.test/p/1','http://instagram.com/p/1'])assert.equal(StudioModel.instagramUrl(url),false);assert.equal(StudioModel.instagramUrl('https://www.instagram.com/p/123'),true)});
