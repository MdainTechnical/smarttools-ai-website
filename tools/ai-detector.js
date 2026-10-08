const API="https://amzyatsnmhbtrzwvtpar.supabase.co/functions/v1/ai-content-detector";
const $=s=>document.querySelector(s);
const textInput=$("#textInput"), wordCount=$("#wordCount"), error=$("#error"), loading=$("#loading"), result=$("#result");
const countWords=t=>t.trim()?t.trim().split(/\s+/).filter(Boolean).length:0;
function setError(m){error.textContent=m;error.style.display=m?"block":"none"}
function pct(v){const n=Number(v);return Number.isFinite(n)?(n*100).toFixed(2)+"%":"0%"}
function clean(v){return v==null?"—":String(v)}
textInput.addEventListener("input",()=>{const n=countWords(textInput.value);wordCount.textContent=`Words: ${n} · Minimum required: 30 words`});
async function apiRequest(url,options={}){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);try{const r=await fetch(url,{...options,signal:controller.signal});let d;try{d=await r.json()}catch{throw new Error("invalid")}if(!r.ok)throw new Error(String(d?.error||"request"));return d}finally{clearTimeout(timer)}}
function render(data){
 const r=data?.result;if(!r)throw new Error("invalid");
 const score=Math.max(0,Math.min(1,Number(r.score)||0));$("#score").textContent=pct(score);
 const deg=score*360;$("#scoreRing").style.background=`conic-gradient(#8b5cf6 0deg,#6366f1 ${deg}deg,rgba(255,255,255,.08) ${deg}deg)`;
 $("#verdict").textContent=clean(r.verdict);
 const llm=r.llm_classifier||{};$("#model").textContent=clean(llm.source);$("#confidence").textContent=pct(llm.confidence);
 const dist=llm.distribution||{};const rows=["chatgpt","claude","gemini","grok","deepseek"];
 $("#distributionRows").innerHTML=rows.map(k=>`<div class="dist-row"><span>${k[0].toUpperCase()+k.slice(1)}</span><div class="bar"><i style="width:${Math.max(0,Math.min(100,(Number(dist[k])||0)*100))}%"></i></div><b>${pct(dist[k])}</b></div>`).join("");
 result.classList.add("show");
}
$("#analyzeBtn").addEventListener("click",async()=>{setError("");const n=countWords(textInput.value);if(n<30){setError("Please enter at least 30 words.");return}loading.style.display="block";$("#analyzeBtn").disabled=true;try{render(await apiRequest(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:textInput.value.trim()})}))}catch(e){setError(e.name==="AbortError"?"The request timed out. Please try again.":"Something went wrong. Please try again.")}finally{loading.style.display="none";$("#analyzeBtn").disabled=false}});
$("#againBtn").addEventListener("click",()=>$("#analyzeBtn").click());
$("#clearBtn").addEventListener("click",()=>{textInput.value="";wordCount.textContent="Words: 0 · Minimum required: 30 words";result.classList.remove("show");setError("");textInput.focus()});