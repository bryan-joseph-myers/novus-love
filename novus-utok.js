(function(N){var D=N.DATA,E=N.E,S=E.S;
function $(id){return document.getElementById(id);}
function utokSVG(im,w,h,dual){
var cx=w/2,cy=h/2,pad=w*.12,pw=w-pad*2,ph=h-pad*2;
var s='<svg viewBox="0 0 '+w+' '+h+'" width="100%" xmlns="http://www.w3.org/2000/svg" style="display:block">';
s+='<rect x="0" y="0" width="'+cx+'" height="'+cy+'" fill="rgba(248,81,73,.06)" rx="4"/>';
s+='<rect x="'+cx+'" y="0" width="'+cx+'" height="'+cy+'" fill="rgba(63,185,80,.06)" rx="4"/>';
s+='<rect x="0" y="'+cy+'" width="'+cx+'" height="'+cy+'" fill="rgba(210,153,34,.06)" rx="4"/>';
s+='<rect x="'+cx+'" y="'+cy+'" width="'+cx+'" height="'+cy+'" fill="rgba(88,166,255,.06)" rx="4"/>';
s+='<line x1="'+pad+'" y1="'+cy+'" x2="'+(w-pad)+'" y2="'+cy+'" stroke="#30363d" stroke-width="1"/>';
s+='<line x1="'+cx+'" y1="'+pad+'" x2="'+cx+'" y2="'+(h-pad)+'" stroke="#30363d" stroke-width="1"/>';
var fs=Math.max(8,Math.round(w*.04));
s+='<text x="'+(w-pad)+'" y="'+(cy-4)+'" text-anchor="end" fill="#3fb950" font-size="'+fs+'">Affiliation</text>';
s+='<text x="'+pad+'" y="'+(cy-4)+'" text-anchor="start" fill="#f85149" font-size="'+fs+'">Hostility</text>';
s+='<text x="'+cx+'" y="'+(pad-2)+'" text-anchor="middle" fill="#58a6ff" font-size="'+fs+'">Dominance</text>';
s+='<text x="'+cx+'" y="'+(h-pad+fs+2)+'" text-anchor="middle" fill="#8b949e" font-size="'+fs+'">Submission</text>';
var qfs=Math.max(7,Math.round(w*.032));
s+='<text x="'+(cx*.5)+'" y="'+(cy*.45)+'" text-anchor="middle" fill="rgba(248,81,73,.35)" font-size="'+qfs+'">Dom-Hostile</text>';
s+='<text x="'+(cx*1.5)+'" y="'+(cy*.45)+'" text-anchor="middle" fill="rgba(63,185,80,.35)" font-size="'+qfs+'">Dom-Affiliative</text>';
s+='<text x="'+(cx*.5)+'" y="'+(cy*1.55)+'" text-anchor="middle" fill="rgba(210,153,34,.35)" font-size="'+qfs+'">Sub-Hostile</text>';
s+='<text x="'+(cx*1.5)+'" y="'+(cy*1.55)+'" text-anchor="middle" fill="rgba(88,166,255,.35)" font-size="'+qfs+'">Sub-Affiliative</text>';
if(dual){
var imA=E.calcInfluenceMatrix("a"),imB=E.calcInfluenceMatrix("b");
var axA=pad+imA.love*pw,ayA=pad+(1-imA.power)*ph,arA=Math.max(6,4+imA.freedom*14);
s+='<circle cx="'+axA+'" cy="'+ayA+'" r="'+(arA+4)+'" fill="none" stroke="rgba(63,185,80,.3)" stroke-width="2" stroke-dasharray="3,2"/>';
s+='<circle cx="'+axA+'" cy="'+ayA+'" r="5" fill="#3fb950"/>';
s+='<text x="'+axA+'" y="'+(ayA-arA-8)+'" text-anchor="middle" fill="#3fb950" font-size="'+(qfs+1)+'" font-weight="600">'+S.a.name+'</text>';
var axB=pad+imB.love*pw,ayB=pad+(1-imB.power)*ph,arB=Math.max(6,4+imB.freedom*14);
s+='<circle cx="'+axB+'" cy="'+ayB+'" r="'+(arB+4)+'" fill="none" stroke="rgba(188,140,255,.3)" stroke-width="2" stroke-dasharray="3,2"/>';
s+='<circle cx="'+axB+'" cy="'+ayB+'" r="5" fill="#bc8cff"/>';
s+='<text x="'+axB+'" y="'+(ayB-arB-8)+'" text-anchor="middle" fill="#bc8cff" font-size="'+(qfs+1)+'" font-weight="600">'+S.b.name+'</text>';
}else if(im){
var px=pad+im.love*pw,py=pad+(1-im.power)*ph,pr=Math.max(6,4+im.freedom*14);
s+='<circle cx="'+px+'" cy="'+py+'" r="'+(pr+4)+'" fill="none" stroke="rgba(88,166,255,.3)" stroke-width="2" stroke-dasharray="3,2"/>';
s+='<circle cx="'+px+'" cy="'+py+'" r="5" fill="#58a6ff"/>';
}
s+='</svg>';return s;}
function dimBar(label,val,color){
return '<div style="display:flex;align-items:center;gap:6px;margin:2px 0"><span style="color:'+color+';font-size:.75rem;min-width:65px">'+label+'</span><div style="flex:1;height:6px;background:#30363d;border-radius:3px;overflow:hidden"><div style="width:'+Math.round(val*100)+'%;height:100%;background:'+color+';border-radius:3px"></div></div><span style="font-size:.72rem;color:#8b949e">'+Math.round(val*100)+'%</span></div>';}
function renderInd(who){
var el=$("utok_"+who);if(!el)return;
var im=E.calcInfluenceMatrix(who);
var quad=E.getUtokQuadrant(im);
var html='<div class="utok-card">';
html+='<div class="utok-card-title">Influence Matrix</div>';
html+=utokSVG(im,200,200,false);
html+=dimBar("Power",im.power,"#58a6ff");
html+=dimBar("Love",im.love,"#f85149");
html+=dimBar("Freedom",im.freedom,"#3fb950");
html+='<div style="text-align:center;margin-top:4px;font-size:.75rem;color:#8b949e">Quadrant: <span style="color:var(--text)">'+quad+'</span></div>';
html+='<div style="font-size:.7rem;color:#8b949e;margin-top:2px;text-align:center">Ring size = autonomy level</div>';
html+='</div>';if(el)el.innerHTML=html;}
function renderRel(){
var el=$("utokRelInline");if(!el)return;
var html='<div class="utok-card">';
html+='<div class="utok-card-title">Influence Matrix — Both Partners</div>';
html+=utokSVG(null,240,240,true);
var imA=E.calcInfluenceMatrix("a"),imB=E.calcInfluenceMatrix("b");
html+='<div style="display:flex;gap:1rem;justify-content:center;margin-top:6px">';
html+='<div style="font-size:.75rem"><span style="color:#3fb950">'+S.a.name+':</span> '+E.getUtokQuadrant(imA)+'</div>';
html+='<div style="font-size:.75rem"><span style="color:#bc8cff">'+S.b.name+':</span> '+E.getUtokQuadrant(imB)+'</div>';
html+='</div>';
html+='<div style="font-size:.7rem;color:#8b949e;margin-top:4px;text-align:center">Dashed ring = autonomy level. Closer dots = more aligned relational stance.</div>';
html+='<div style="display:flex;gap:.75rem;margin-top:8px;flex-wrap:wrap;justify-content:center">';
html+='<div style="flex:1;min-width:120px;max-width:180px;background:rgba(63,185,80,.06);border:1px solid #30363d;border-radius:6px;padding:6px 8px">';
html+='<div style="font-size:.78rem;font-weight:600;color:#3fb950;margin-bottom:4px;text-align:center">'+S.a.name+'</div>';
html+=dimBar("Power",imA.power,"#58a6ff");
html+=dimBar("Love",imA.love,"#f85149");
html+=dimBar("Freedom",imA.freedom,"#3fb950");
html+='<div style="text-align:center;font-size:.72rem;color:#8b949e;margin-top:3px">'+E.getUtokQuadrant(imA)+'</div>';
html+='</div>';
html+='<div style="flex:1;min-width:120px;max-width:180px;background:rgba(188,140,255,.06);border:1px solid #30363d;border-radius:6px;padding:6px 8px">';
html+='<div style="font-size:.78rem;font-weight:600;color:#bc8cff;margin-bottom:4px;text-align:center">'+S.b.name+'</div>';
html+=dimBar("Power",imB.power,"#58a6ff");
html+=dimBar("Love",imB.love,"#f85149");
html+=dimBar("Freedom",imB.freedom,"#3fb950");
html+='<div style="text-align:center;font-size:.72rem;color:#8b949e;margin-top:3px">'+E.getUtokQuadrant(imB)+'</div>';
html+='</div>';
html+='</div>';
html+='</div>';if(el)el.innerHTML=html;}
function injectContainers(){
var targets=[{after:"emotStateA",id:"utok_a"},{after:"emotStateB",id:"utok_b"}];
for(var i=0;i<targets.length;i++){
var t=targets[i],ref=$(t.after);
if(ref&&!$(t.id)){var d=document.createElement("div");d.id=t.id;ref.parentNode.insertBefore(d,ref.nextSibling);}
}
var bioA=$("bioMetricsA");if(bioA&&!$("utok_a")){var d=document.createElement("div");d.id="utok_a";bioA.parentNode.insertBefore(d,bioA.nextSibling);}
var bioB=$("bioMetricsB");if(bioB&&!$("utok_b")){var d2=document.createElement("div");d2.id="utok_b";bioB.parentNode.insertBefore(d2,bioB.nextSibling);}

}
function renderAll(){injectContainers();renderInd("a");renderInd("b");renderRel();}
N.UTOK_UI={renderInd:renderInd,renderRel:renderRel,renderAll:renderAll};
var origRecalc=E.recalcAll;if(origRecalc){E.recalcAll=function(){var r=origRecalc.apply(this,arguments);setTimeout(renderAll,50);return r;};}
var obs=new MutationObserver(function(muts){
for(var i=0;i<muts.length;i++){if(muts[i].addedNodes.length>0){
var app=$("app");if(app&&app.innerHTML.length>100){obs.disconnect();setTimeout(renderAll,200);break;}
}}});
obs.observe(document.body,{childList:true,subtree:true});
})(window.Novus);
