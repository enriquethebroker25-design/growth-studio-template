import {mkdir,copyFile,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
if(existsSync('.env.local'))process.loadEnvFile('.env.local');
await mkdir('public/vendor',{recursive:true});
for(const file of ['index.html','app.js','modules.js','sync.js','styles.css','model.js','setup.js','install.js','manifest.webmanifest','icon.svg','sw.js','icon-192.png','icon-512.png']) await copyFile(file,`public/${file}`);
await copyFile('node_modules/@supabase/supabase-js/dist/umd/supabase.js','public/vendor/supabase.js');
await writeFile('public/config.js','window.STUDIO_CONFIG='+JSON.stringify({supabaseUrl:process.env.SUPABASE_URL||'',supabaseKey:process.env.SUPABASE_PUBLISHABLE_KEY||''})+';\n');
console.log('Static app built in public/');
