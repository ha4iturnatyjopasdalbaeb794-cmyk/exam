(function(){
console.log('🚀 BOT 033 - Flight Planning & Monitoring STARTED');
let db=null,loading=false;
async function loadDB(){
if(loading||db)return;
loading=true;
try{
const r=await fetch('https://raw.githubusercontent.com/ha4iturnatyjopasdalbaeb794-cmyk/exam/main/database_033.json');
db=await r.json();
console.log(`✅ База загружена: ${db.length} вопросов`);
}catch(e){
console.error('❌ Ошибка загрузки:',e);
setTimeout(loadDB,3000);
}finally{
loading=false;
}
}
loadDB();
function norm(t){
return(t||'').toLowerCase().replace(/[^\w\s]/g,'').replace(/\s+/g,' ').trim();
}
function findAns(){
try{
if(!db)return null;
const qEl=document.getElementById('Div_qs');
if(!qEl)return null;
const q=norm(qEl.innerText);
if(q.length<10)return null;
const match=db.find(x=>{
const dq=norm(x.question);
return dq===q||dq.substring(0,50)===q.substring(0,50);
});
if(!match)return null;
const ans=match.correct_answer;
if(!ans)return null;
const letter=ans.match(/^([A-D])/);
return letter?letter[1]:null;
}catch(e){
console.error('Ошибка поиска:',e);
return null;
}
}
function click(l){
const idx={'A':1,'B':2,'C':3,'D':4}[l];
if(!idx)return;
const tr=document.getElementById('tr_answer'+idx);
if(!tr)return;
tr.click();
console.log('✓ Clicked:',l);
}
let lastQ='';
setInterval(()=>{
try{
const qEl=document.getElementById('Div_qs');
if(!qEl)return;
const curQ=qEl.innerText.trim();
if(!curQ||curQ===lastQ)return;
lastQ=curQ;
const ans=findAns();
if(ans){
setTimeout(()=>click(ans),300);
}
}catch(e){}
},500);
document.addEventListener('click',()=>{
const ans=findAns();
if(ans)setTimeout(()=>click(ans),100);
},true);
})();
