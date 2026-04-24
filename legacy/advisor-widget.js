(function(){
  // Don't load on the advisor page itself
  if(window.location.pathname==='/advisor')return;

  var kb=null;
  fetch('/advisor-kb.json').then(function(r){return r.json()}).then(function(d){kb=d}).catch(function(){});

  // Inject CSS
  var style=document.createElement('style');
  style.textContent=`
.bw-fab{position:fixed;bottom:28px;right:28px;z-index:9990;width:56px;height:56px;border-radius:50%;background:#0D9488;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;box-shadow:0 4px 20px rgba(13,148,136,.35);border:none}
.bw-fab:hover{transform:scale(1.06);box-shadow:0 6px 28px rgba(13,148,136,.4)}
.bw-fab svg{width:24px;height:24px;stroke:#fff;stroke-width:1.5;fill:none;transition:transform .2s}
.bw-fab-badge{position:absolute;top:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:#E24B4A;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;border:2px solid var(--off-white,#F7F7F5);font-family:'Inter',sans-serif}
.bw-panel{position:fixed;bottom:96px;right:28px;width:380px;height:540px;background:#fff;border-radius:20px;border:1px solid #E8E7E3;box-shadow:0 12px 48px rgba(0,0,0,.1);z-index:9989;display:none;flex-direction:column;overflow:hidden;font-family:'Inter',-apple-system,sans-serif}
.bw-panel.open{display:flex;animation:bwIn .3s ease}
@keyframes bwIn{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
.bw-p-head{padding:16px 20px;background:#040A0F;display:flex;align-items:center;gap:12px}
.bw-p-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#0D9488,#2DD4BF);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.bw-p-av svg{width:16px;height:16px;stroke:#fff;stroke-width:2;fill:none}
.bw-p-hinfo{flex:1}
.bw-p-hname{font-size:14px;font-weight:500;color:#fff}
.bw-p-hstatus{font-size:11px;color:#2DD4BF;display:flex;align-items:center;gap:5px}
.bw-p-hdot{width:5px;height:5px;border-radius:50%;background:#2DD4BF;animation:bwPulse 2s infinite}
@keyframes bwPulse{0%,100%{opacity:1}50%{opacity:.4}}
.bw-p-close{width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:none;color:rgba(255,255,255,.5);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px}
.bw-p-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.bw-m{max-width:90%;font-size:13px;line-height:1.6;animation:bwMsgIn .25s ease}
@keyframes bwMsgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.bw-m-bot{align-self:flex-start}
.bw-m-user{align-self:flex-end}
.bw-m-b{padding:12px 16px;border-radius:14px}
.bw-m-bot .bw-m-b{background:#F7F7F5;border:1px solid #E8E7E3;color:#2D2C28;border-top-left-radius:4px}
.bw-m-user .bw-m-b{background:#040A0F;color:#fff;border-top-right-radius:4px}
.bw-m-b p{margin:0 0 8px}
.bw-m-b p:last-child{margin:0}
.bw-m-b strong{font-weight:500}
.bw-m-b a{color:#0D9488;text-decoration:none;font-weight:500}
.bw-m-cta{display:inline-flex;align-items:center;gap:4px;padding:7px 14px;background:rgba(13,148,136,.06);border:1px solid rgba(13,148,136,.12);border-radius:8px;font-size:12px;font-weight:500;color:#0D9488;margin-top:8px;cursor:pointer;text-decoration:none}
.bw-m-time{font-size:10px;color:#A8A7A3;margin-top:4px}
.bw-typing{display:flex;gap:4px;padding:14px 18px;background:#F7F7F5;border:1px solid #E8E7E3;border-radius:14px;border-top-left-radius:4px;width:fit-content}
.bw-typing-d{width:6px;height:6px;border-radius:50%;background:#A8A7A3;animation:bwTB 1.4s ease-in-out infinite}
.bw-typing-d:nth-child(2){animation-delay:.2s}
.bw-typing-d:nth-child(3){animation-delay:.4s}
@keyframes bwTB{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
.bw-quick{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 10px}
.bw-qb{padding:7px 14px;background:rgba(13,148,136,.04);border:1px solid rgba(13,148,136,.1);border-radius:100px;font-size:12px;color:#0D9488;cursor:pointer;font-weight:500;font-family:'Inter',sans-serif;transition:all .2s}
.bw-qb:hover{background:rgba(13,148,136,.08)}
.bw-p-input{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #E8E7E3;background:#fff}
.bw-p-input input{flex:1;padding:10px 14px;border:1px solid #E8E7E3;border-radius:10px;font-size:13px;font-family:'Inter',sans-serif;color:#2D2C28;background:#F7F7F5;outline:none}
.bw-p-input input:focus{border-color:rgba(13,148,136,.3)}
.bw-p-input input::placeholder{color:#A8A7A3}
.bw-p-input button{width:36px;height:36px;border-radius:50%;background:#0D9488;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.bw-p-input button:disabled{background:#D4D3CF;cursor:not-allowed}
.bw-p-input button svg{width:14px;height:14px;stroke:#fff;stroke-width:2;fill:none}
.bw-p-foot{padding:8px 16px;text-align:center;border-top:1px solid #E8E7E3}
.bw-p-foot a{font-size:11px;color:#A8A7A3;text-decoration:none;font-family:'Inter',sans-serif}
.bw-p-foot a:hover{color:#0D9488}
@media(max-width:768px){.bw-panel{width:calc(100vw - 32px);right:16px;bottom:88px;height:60vh}.bw-fab{bottom:20px;right:20px;width:52px;height:52px}}
@media(max-width:480px){.bw-panel{width:100vw;height:100vh;height:100dvh;right:0;bottom:0;border-radius:0;border:none}.bw-fab{bottom:16px;right:16px;width:48px;height:48px}.bw-fab svg{width:22px;height:22px}}
`;
  document.head.appendChild(style);

  // Create FAB
  var fab=document.createElement('button');
  fab.className='bw-fab';
  fab.id='bwFab';
  fab.setAttribute('aria-label','Chat with Burlington Advisor');
  fab.innerHTML='<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg><span class="bw-fab-badge" id="bwBadge">1</span>';
  document.body.appendChild(fab);

  // Create panel
  var panel=document.createElement('div');
  panel.className='bw-panel';
  panel.id='bwPanel';
  panel.innerHTML=`
<div class="bw-p-head">
<div class="bw-p-av"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
<div class="bw-p-hinfo"><div class="bw-p-hname">Burlington Advisor</div><div class="bw-p-hstatus"><span class="bw-p-hdot"></span> Online</div></div>
<button class="bw-p-close" id="bwClose">&times;</button>
</div>
<div class="bw-p-msgs" id="bwMsgs">
<div class="bw-m bw-m-bot"><div class="bw-m-b">Welcome to Burlington Consult. I can help you understand if you qualify for a U.S. green card through the EB-1A or NIW pathway. What do you do professionally?</div></div>
</div>
<div class="bw-quick" id="bwQuick">
<button class="bw-qb" onclick="bwSend('Do I qualify for EB-1A?')">Do I qualify?</button>
<button class="bw-qb" onclick="bwSend('How much does it cost?')">Pricing</button>
<button class="bw-qb" onclick="bwSend('How long does it take?')">Timeline</button>
<button class="bw-qb" onclick="bwSend('Nigeria travel ban?')">Travel ban</button>
</div>
<div class="bw-p-input">
<input id="bwInput" placeholder="Ask a question..." onkeydown="if(event.key==='Enter'&&this.value.trim()){event.preventDefault();bwSend(this.value)}">
<button id="bwSendBtn" onclick="var i=document.getElementById('bwInput');if(i.value.trim())bwSend(i.value)"><svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>
</div>
<div class="bw-p-foot"><a href="/advisor">Open full advisor &rarr;</a></div>
`;
  document.body.appendChild(panel);

  // Remove existing WhatsApp button if present
  var wa=document.querySelector('.whatsapp-btn');
  if(wa)wa.style.display='none';

  // Toggle
  var isOpen=false;
  fab.onclick=function(){toggleBW()};
  document.getElementById('bwClose').onclick=function(){toggleBW()};

  function toggleBW(){
    isOpen=!isOpen;
    panel.classList.toggle('open',isOpen);
    var badge=document.getElementById('bwBadge');
    if(isOpen){
      badge.style.display='none';
      fab.innerHTML='<svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:#fff;stroke-width:2;fill:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      if(window.innerWidth<=480)document.body.style.overflow='hidden';
    }else{
      fab.innerHTML='<svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:#fff;stroke-width:1.5;fill:none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';
      document.body.style.overflow='';
    }
  }

  // Chat
  var history=[];
  var streaming=false;

  window.bwSend=function(text){
    if(streaming)return;
    var msgs=document.getElementById('bwMsgs');
    var input=document.getElementById('bwInput');
    var quick=document.getElementById('bwQuick');
    var sendBtn=document.getElementById('bwSendBtn');

    if(quick)quick.style.display='none';
    streaming=true;
    sendBtn.disabled=true;

    history.push({role:'user',content:text});
    var uEl=document.createElement('div');
    uEl.className='bw-m bw-m-user';
    uEl.innerHTML='<div class="bw-m-b">'+escHtml(text)+'</div>';
    msgs.appendChild(uEl);
    input.value='';

    var tEl=document.createElement('div');
    tEl.className='bw-m bw-m-bot';
    tEl.id='bwTyping';
    tEl.innerHTML='<div class="bw-typing"><div class="bw-typing-d"></div><div class="bw-typing-d"></div><div class="bw-typing-d"></div></div>';
    msgs.appendChild(tEl);
    msgs.scrollTop=msgs.scrollHeight;

    fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({messages:history,knowledge_base:kb})
    })
    .then(function(r){
      if(!r.ok)throw new Error('API error');
      var reader=r.body.getReader();
      var decoder=new TextDecoder();
      var fullText='';
      var buf='';
      function read(){
        reader.read().then(function(res){
          if(res.done){finish(fullText);return}
          buf+=decoder.decode(res.value,{stream:true});
          var lines=buf.split('\n');
          buf=lines.pop();
          for(var i=0;i<lines.length;i++){
            var ln=lines[i].trim();
            if(!ln.startsWith('data: '))continue;
            var d=ln.slice(6);
            if(d==='[DONE]')continue;
            try{var p=JSON.parse(d);if(p.type==='content_block_delta'&&p.delta&&p.delta.text)fullText+=p.delta.text}catch(e){}
          }
          read();
        });
      }
      read();
    })
    .catch(function(){
      finish('I am unable to connect right now. Please try again or contact Burlington Consult at founder@burlingtonconsult.com.');
    });

    function finish(resp){
      var t=document.getElementById('bwTyping');
      if(t)t.remove();
      history.push({role:'assistant',content:resp});
      var bEl=document.createElement('div');
      bEl.className='bw-m bw-m-bot';
      bEl.innerHTML='<div class="bw-m-b">'+fmtResp(resp)+'<a href="/assess" class="bw-m-cta">Profile Assessment &middot; $75 &rarr;</a></div>';
      msgs.appendChild(bEl);
      msgs.scrollTop=msgs.scrollHeight;
      streaming=false;
      sendBtn.disabled=false;
      input.focus();
    }
  };

  function fmtResp(t){
    t=escHtml(t);
    t=t.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>');
    t=t.replace(/\n\n/g,'</p><p>');
    t=t.replace(/\n/g,'<br>');
    return '<p>'+t+'</p>';
  }

  function escHtml(t){
    var d=document.createElement('div');
    d.appendChild(document.createTextNode(t));
    return d.innerHTML;
  }
})();
