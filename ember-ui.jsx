// ember-ui.jsx — All Ember components + screens
const { useState, useEffect, useRef } = React;

// ── TOKENS ────────────────────────────────────────────────────────────────
const T = {
  paper:'#F6F4F0', ink:'#111111', ink60:'#4A4A48', ink40:'#8A8885',
  rule:'#E4E1DB', white:'#FFFFFF',
  e6:'#D9480F', e1:'#FCE4D5', e8:'#8C2E09',
  lichen:'#4A5D3A', amber:'#B8860B',
  m50:'#EDEAE4', mw:'#DCE1E0', ml:'#B8B4AD',
};

// ── PRIMITIVES ────────────────────────────────────────────────────────────
function Eyebrow({ n, label, light }) {
  return (
    <div style={{ fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",fontSize:11,
      lineHeight:'14px',letterSpacing:'0.12em',textTransform:'uppercase',fontWeight:500,
      color:light?'rgba(255,255,255,0.5)':T.ink40,display:'flex',alignItems:'center',gap:8 }}>
      <span style={{ color:light?'rgba(255,255,255,0.3)':T.e6, fontWeight:400, letterSpacing:0 }}>
        ){String(n).padStart(2,'0')}
      </span>{label}
    </div>
  );
}

function Label({ children, light, style={} }) {
  return (
    <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:11,lineHeight:'14px',
      letterSpacing:'0.1em',textTransform:'uppercase',fontWeight:400,
      color:light?'rgba(255,255,255,0.45)':T.ink40,...style }}>{children}</div>
  );
}

function Num({ children, size=64, thin, light, style={} }) {
  return (
    <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:size,lineHeight:'1',
      letterSpacing:'-0.02em',fontVariantNumeric:'tabular-nums',
      fontWeight:thin?200:400,
      color:light?T.white:T.ink,...style }}>{children}</div>
  );
}

let _phId = 0;
function Photo({ label, style={} }) {
  const id = `p${++_phId}`;
  return (
    <div style={{ position:'relative',background:'#1B1813',overflow:'hidden',...style }}>
      <svg width="100%" height="100%" style={{position:'absolute',inset:0}} preserveAspectRatio="none">
        <defs>
          <pattern id={id} patternUnits="userSpaceOnUse" width="28" height="28" patternTransform="rotate(32)">
            <rect width="28" height="28" fill="#1B1813"/><line x1="0" y1="0" x2="0" y2="28" stroke="#25201B" strokeWidth="14"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`}/>
        <rect width="100%" height="100%" fill="rgba(165,108,48,0.08)"/>
      </svg>
      <div style={{ position:'absolute',bottom:20,left:20,fontFamily:'monospace',fontSize:10,
        color:'rgba(255,255,255,0.22)',textTransform:'uppercase',letterSpacing:'0.09em',
        pointerEvents:'none' }}>{label}</div>
    </div>
  );
}

function Btn({ children, primary, ghost, onClick, style={} }) {
  const [pressed, setPressed] = useState(false);
  const bg = primary ? T.e8 : 'transparent';
  const border = ghost ? `1px solid ${T.rule}` : primary ? 'none' : `1px solid ${T.ink}`;
  return (
    <button onClick={onClick}
      onMouseDown={()=>setPressed(true)} onMouseUp={()=>setPressed(false)} onMouseLeave={()=>setPressed(false)}
      style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:15,fontWeight:500,letterSpacing:0,
        background:bg,color:primary?T.white:T.ink,border,padding:'0 24px',height:52,
        cursor:'pointer',transform:pressed?'scale(0.97)':'scale(1)',
        transition:'transform 160ms ease-out,background 180ms',borderRadius:24,...style }}>{children}
    </button>
  );
}

function Chip({ label, selected, onToggle }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button onMouseDown={()=>setPressed(true)} onMouseUp={()=>setPressed(false)} onMouseLeave={()=>setPressed(false)}
      onClick={onToggle} style={{ height:44,padding:'0 18px',borderRadius:24,
        border:`1px solid ${selected?T.e8:T.rule}`,
        background:selected?T.e8:'transparent',color:selected?T.white:T.ink,
        fontFamily:"'Helvetica Neue',Helvetica",fontSize:14,cursor:'pointer',
        transform:pressed?'scale(0.97)':'',transition:'all 150ms ease-out',whiteSpace:'nowrap' }}>{label}
    </button>
  );
}

// ── ICONS ─────────────────────────────────────────────────────────────────
const IC = {p:1.5,s:'round'};
function IcoPin()  { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s} strokeLinejoin={IC.s}><circle cx="10" cy="8" r="3"/><path d="M10 18c0 0-6-4.8-6-10a6 6 0 1 1 12 0c0 5.2-6 10-6 10z"/></svg>; }
function IcoBell() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s} strokeLinejoin={IC.s}><path d="M10 2.5A5.5 5.5 0 0 0 4.5 8v4L3 14h14l-1.5-2V8A5.5 5.5 0 0 0 10 2.5z"/><path d="M8.5 16.5a1.5 1.5 0 0 0 3 0"/></svg>; }
function IcoWind() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s}><path d="M3 8.5h10a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3 12h7a2 2 0 1 1-2 2"/></svg>; }
function IcoLeaf() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s} strokeLinejoin={IC.s}><path d="M16.5 3.5C10 3.5 6 8 6 15l2-2c0-4 2-7 8-7.5"/><path d="M3.5 16.5l5-5"/></svg>; }
function IcoPerson(){ return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s} strokeLinejoin={IC.s}><circle cx="10" cy="7" r="3.5"/><path d="M3.5 18c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/></svg>; }
function IcoGear()  { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s}><circle cx="10" cy="10" r="2.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4"/></svg>; }
function IcoGlobe() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s}><circle cx="10" cy="10" r="7.5"/><path d="M10 2.5c-2 2-3 4.5-3 7.5s1 5.5 3 7.5M10 2.5c2 2 3 4.5 3 7.5s-1 5.5-3 7.5M2.5 10h15"/></svg>; }

// ── BAY AREA MAP ───────────────────────────────────────────────────────────
function BayAreaMap({ selectedPlume, onSelectPlume }) {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    let raf, t0=null;
    const tick = ts => { if(!t0)t0=ts; setPulse(((ts-t0)%2000)/2000); raf=requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const pR = 12 + 14*pulse, pO = 0.32*(1-pulse);

  return (
    <svg viewBox="0 0 680 460" width="100%" height="100%" style={{ display:'block' }}>
      <rect width="680" height="460" fill={T.m50}/>
      {/* Pacific Ocean */}
      <polygon points="0,0 92,0 72,460 0,460" fill={T.mw}/>
      {/* SF Bay */}
      <polygon points="184,96 190,76 215,58 248,50 272,58 308,68 344,80 370,100 388,138 384,180 372,222 358,270 336,326 294,388 250,408 210,392 186,354 168,294 162,242 156,196 150,162 146,140 152,114 168,98" fill={T.mw}/>
      {/* Topo – Marin */}
      <path d="M92,0 Q124,28 114,60 Q106,88 132,108 Q150,120 168,98" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.65"/>
      <path d="M75,0 Q108,38 98,72 Q88,104 116,122" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.42"/>
      <path d="M58,0 Q90,46 80,82 Q70,118 100,134" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.25"/>
      {/* Topo – Peninsula */}
      <path d="M92,460 Q124,408 116,346 Q110,284 128,230 Q142,186 150,162" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.65"/>
      <path d="M72,460 Q100,400 92,336 Q86,272 106,216 Q122,170 138,148" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.42"/>
      {/* Topo – East Bay */}
      <path d="M680,88 Q564,104 494,144 Q448,174 428,208 Q414,234 404,268" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.62"/>
      <path d="M680,134 Q578,152 516,190 Q470,216 452,252 Q438,280 428,310" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.42"/>
      <path d="M680,200 Q605,212 558,238 Q520,258 502,286 Q486,310 476,336" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.26"/>
      {/* Topo – South Bay */}
      <path d="M298,460 Q310,436 320,408 Q328,388 336,326" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.52"/>
      <path d="M196,460 Q212,442 218,416 Q222,400 210,392" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.42"/>

      {/* Smoke plume 1 – Marin RX */}
      <polygon
        points="88,26 148,14 190,30 210,62 200,92 184,96 168,98 146,84 122,70 96,56 86,40"
        fill={selectedPlume==='marin' ? T.e1 : 'rgba(252,228,213,0.62)'}
        stroke={T.e6} strokeWidth={selectedPlume==='marin'?1.75:1}
        style={{ cursor:'pointer', transition:'all 300ms ease-out' }}
        onClick={() => onSelectPlume(selectedPlume==='marin'?null:'marin')}
      />
      <text x="98" y="44" fontFamily="'Helvetica Neue',Helvetica" fontSize="7.5" fill={T.e8} letterSpacing="0.05em" fontWeight="500" style={{pointerEvents:'none',userSelect:'none'}}>PFIRS #24-0381</text>

      {/* Smoke plume 2 – Sierra drift */}
      <polygon points="478,80 560,64 642,82 680,108 680,214 620,230 545,210 480,184 460,148 458,114"
        fill="rgba(166,160,152,0.2)" stroke="rgba(138,133,126,0.36)" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="510" y="118" fontFamily="'Helvetica Neue',Helvetica" fontSize="7.5" fill={T.ink40} letterSpacing="0.05em" style={{pointerEvents:'none',userSelect:'none'}}>SIERRA DRIFT</text>

      {/* Connector line when selected */}
      {selectedPlume==='marin' && (
        <g>
          <line x1="150" y1="62" x2="222" y2="142" stroke={T.e6} strokeWidth="0.75" strokeDasharray="3,2.5"/>
          <circle cx="150" cy="62" r="2.5" fill={T.e6}/>
        </g>
      )}
      {/* User pin */}
      <circle cx="322" cy="190" r={pR} fill="none" stroke={T.e6} strokeWidth="1.5" opacity={pO}/>
      <circle cx="322" cy="190" r="5" fill={T.e6}/>

      {/* Coord label */}
      <text x="176" y="112" fontFamily="monospace" fontSize="7.5" fill={T.ink40} letterSpacing="0.02em">38.0625, −122.5647</text>
      {/* Region labels */}
      {[['SAN FRANCISCO',104,158],['MARIN',100,74],['OAKLAND',328,210],['SAN MATEO',188,316],['EAST BAY HILLS',425,182]].map(([t,x,y])=>(
        <text key={t} x={x} y={y} fontFamily="'Helvetica Neue',Helvetica" fontSize="8.5" fill={T.ink40} letterSpacing="0.065em" fontWeight="500">{t}</text>
      ))}
    </svg>
  );
}

// ── NAV RAIL ─────────────────────────────────────────────────────────────
const NAV = [
  { id:'home',   Icon:IcoPin,    badge:false },
  { id:'alert',  Icon:IcoBell,   badge:true  },
  { id:'air',    Icon:IcoWind,   badge:false },
  { id:'profile',Icon:IcoPerson, badge:false },
  { id:'settings',Icon:IcoGear,  badge:false },
  { id:'landing',Icon:IcoGlobe,  badge:false },
];

function NavRail({ active, onChange }) {
  return (
    <div style={{ width:56,minWidth:56,height:'100%',background:T.paper,
      borderRight:`1px solid ${T.rule}`,display:'flex',flexDirection:'column',
      alignItems:'center',paddingTop:18,gap:2,flexShrink:0 }}>
      {/* Ember mark */}
      <button onClick={()=>onChange('landing')} style={{ width:28,height:28,marginBottom:18,
        background:T.e8,borderRadius:3,border:'none',cursor:'pointer',
        display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
        <svg width="12" height="14" viewBox="0 0 12 14">
          <path d="M6 1 Q10 3.5 10 7 Q10 11 6 13 Q3.5 11 3 9 Q5 9.5 6.5 8 Q4.5 10 2.5 8 Q1 6.5 2 4.5 Q3.5 2 6 1Z" fill="white"/>
        </svg>
      </button>
      {NAV.map(({ id, Icon, badge }) => (
        <button key={id} onClick={()=>onChange(id)} style={{
          width:44,height:44,border:'none',background:'none',cursor:'pointer',
          display:'flex',alignItems:'center',justifyContent:'center',
          color:active===id?T.ink:T.ink40,
          borderLeft:`2px solid ${active===id?T.e6:'transparent'}`,
          transition:'color 150ms,border-color 150ms',position:'relative',
        }}>
          <Icon/>
          {badge && <div style={{ position:'absolute',top:9,right:9,width:5,height:5,
            borderRadius:99,background:T.e6 }}/>}
        </button>
      ))}
    </div>
  );
}

// ── SMOKE COLUMN ILLUSTRATION ─────────────────────────────────────────────
function SmokeIllustration({ color='currentColor' }) {
  return (
    <svg width="72" height="108" viewBox="0 0 72 108" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Smoke wisps */}
      <path d="M36 88 Q31 74 36 60 Q41 46 34 32 Q30 22 36 10" strokeWidth="1.5"/>
      <path d="M42 88 Q50 70 46 54 Q42 40 48 26" strokeWidth="1" opacity="0.45"/>
      <path d="M30 88 Q22 71 26 56 Q30 43 24 30" strokeWidth="1" opacity="0.45"/>
      {/* Torch body */}
      <path d="M28 98 L44 98 L46 88 Q36 83 26 88 Z" strokeWidth="1.5"/>
      <rect x="33" y="98" width="6" height="8" strokeWidth="1.5"/>
      {/* Ground */}
      <line x1="14" y1="106" x2="58" y2="106" strokeWidth="1" opacity="0.4"/>
      <path d="M4 106 Q18 102 36 106 Q54 110 68 106" strokeWidth="0.75" opacity="0.25"/>
    </svg>
  );
}

// ── AQI SPARKLINE ─────────────────────────────────────────────────────────
function Sparkline({ light }) {
  const ref = useRef(null);
  useEffect(() => {
    if(ref.current) ref.current.style.clipPath = 'inset(0 0% 0 0)';
  }, []);
  const stroke = light ? 'rgba(255,255,255,0.7)' : T.e6;
  const fill = light ? 'rgba(255,255,255,0.12)' : T.e1;
  const tick = light ? 'rgba(255,255,255,0.35)' : T.ink40;
  const pts = "0,52 30,48 60,42 90,38 120,28 150,14 180,8 210,6 240,10 270,22 300,36 330,44 360,50 390,52";
  const area = pts + " 390,64 0,64";
  return (
    <div style={{ position:'relative',width:'100%',height:64 }}>
      <svg ref={ref} viewBox="0 0 390 64" width="100%" height="64" preserveAspectRatio="none"
        style={{ clipPath:'inset(0 100% 0 0)', transition:'clip-path 800ms cubic-bezier(0.77,0,0.175,1)', display:'block' }}>
        <polygon points={area} fill={fill}/>
        <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5"/>
        {/* Time ticks */}
        {[['12:00',0],['14:00',130],['16:00',195],['18:00',260],['20:00',325],['22:00',390]].map(([t,x])=>(
          <g key={t}>
            <line x1={x} y1="58" x2={x} y2="64" stroke={tick} strokeWidth="0.75"/>
            <text x={x} y="62" textAnchor="middle" fontFamily="'Helvetica Neue',Helvetica" fontSize="7" fill={tick} fontVariantNumeric="tabular-nums" style={{pointerEvents:'none'}}>{t}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── SCREEN 1: ONBOARDING ──────────────────────────────────────────────────
function Screen1({ onDone }) {
  const [sel, setSel] = useState([]);
  const chips = ['Asthma','Young children at home','Outdoor athlete','Wildfire-zone resident'];
  const toggle = c => setSel(p => p.includes(c)?p.filter(x=>x!==c):[...p,c]);
  return (
    <div style={{ display:'flex',height:'100%',width:'100%',position:'relative' }}>
      {/* Left 40% */}
      <div style={{ width:'40%',padding:'52px 48px',background:T.paper,display:'flex',
        flexDirection:'column',justifyContent:'space-between',zIndex:2,flexShrink:0 }}>
        <div>
          <Eyebrow n={1} label="Calibrate"/>
          <div style={{ marginTop:36,fontFamily:"'Helvetica Neue',Helvetica",fontSize:52,
            lineHeight:'50px',letterSpacing:'-0.02em',fontWeight:300,color:T.ink,maxWidth:320,
            textWrap:'pretty' }}>
            What do your lungs need?
          </div>
          <div style={{ marginTop:20,fontFamily:"'Helvetica Neue',Helvetica",fontSize:15,
            lineHeight:'22px',color:T.ink60,fontWeight:300,maxWidth:300 }}>
            We'll tune your alerts to your risk level and household.
          </div>
        </div>
        <div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:10,marginBottom:32 }}>
            {chips.map(c=><Chip key={c} label={c} selected={sel.includes(c)} onToggle={()=>toggle(c)}/>)}
          </div>
          <Btn primary onClick={onDone} style={{ width:'100%',borderRadius:24 }}>
            Continue to Smoke Map
          </Btn>
        </div>
      </div>
      {/* Right 60% */}
      <Photo label="coastal fog · california ridge" style={{ flex:1 }}/>
      {/* Skip */}
      <button onClick={onDone} style={{ position:'absolute',top:24,right:28,background:'none',
        border:'none',fontFamily:"'Helvetica Neue',Helvetica",fontSize:11,fontWeight:500,
        letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.38)',cursor:'pointer' }}>
        Skip
      </button>
    </div>
  );
}

// ── SCREEN 2: HOME / SMOKE MAP ────────────────────────────────────────────
function Screen2({ active, onChange }) {
  const [plume, setPlume] = useState(null);
  const panelEmber = plume === 'marin';
  const bg = panelEmber ? T.e8 : T.white;
  const fc = panelEmber ? T.white : T.ink;

  return (
    <div style={{ display:'flex',height:'100%',width:'100%',overflow:'hidden' }}>
      <NavRail active={active} onChange={onChange}/>
      {/* Map */}
      <div style={{ flex:'0 0 62%',position:'relative',background:T.m50,overflow:'hidden' }}>
        <BayAreaMap selectedPlume={plume} onSelectPlume={setPlume}/>
        {/* Floating callout card */}
        {plume==='marin' && (
          <div style={{ position:'absolute',left:195,top:120,width:220,
            background:T.white,padding:'14px 16px',
            borderTop:`2px solid ${T.e6}`,
            boxShadow:'0 2px 12px rgba(0,0,0,0.08)',
            animation:'slideIn 240ms cubic-bezier(0.23,1,0.32,1) forwards' }}>
            <Label style={{ color:T.e6,marginBottom:6 }}>Marin RX Burn</Label>
            <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:13,color:T.ink60,
              fontVariantNumeric:'tabular-nums',lineHeight:'18px' }}>
              38.0625, −122.5647<br/>
              <span style={{ color:T.ink,fontWeight:500 }}>PFIRS #24-0381</span>
            </div>
            <div style={{ marginTop:10,display:'flex',gap:10,alignItems:'center' }}>
              <SmokeIllustration color={T.e6}/>
              <div>
                <div style={{ fontFamily:"'Helvetica Neue',Helvetica",
                  fontSize:11,color:T.ink40,marginBottom:2 }}>Burn window</div>
                <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:15,
                  fontVariantNumeric:'tabular-nums',color:T.ink }}>04:20 → 19:00</div>
              </div>
            </div>
            <button onClick={()=>setPlume(null)} style={{ position:'absolute',top:8,right:10,
              background:'none',border:'none',cursor:'pointer',color:T.ink40,fontSize:16,lineHeight:1 }}>×</button>
          </div>
        )}
        {/* Hint */}
        {!plume && (
          <div style={{ position:'absolute',bottom:20,left:20,
            fontFamily:"'Helvetica Neue',Helvetica",fontSize:11,color:T.ink40,
            letterSpacing:'0.04em',pointerEvents:'none' }}>
            Click a smoke plume for details
          </div>
        )}
      </div>
      {/* Right panel */}
      <div style={{ flex:'0 0 38%',background:bg,borderLeft:`1px solid ${T.rule}`,
        overflow:'hidden',display:'flex',flexDirection:'column',
        transition:'background 200ms ease' }}>
        {/* Header */}
        <div style={{ padding:'28px 28px 0' }}>
          <Eyebrow n={2} label="Nearest Source" light={panelEmber}/>
          <div style={{ marginTop:16,fontFamily:"'Helvetica Neue',Helvetica",fontSize:36,
            lineHeight:'38px',letterSpacing:'-0.015em',fontWeight:400,
            color:panelEmber?T.white:T.ink }}>
            {plume==='marin' ? 'Marin RX 24-0381' : 'No active\nsource nearby'}
          </div>
        </div>
        {/* Stats */}
        <div style={{ padding:'24px 28px',display:'flex',gap:0,
          borderBottom:`1px solid ${panelEmber?'rgba(255,255,255,0.12)':T.rule}` }}>
          {[['Distance','0.8 mi'],['Burn window','04:20→19:00'],['AQI range','62→118']].map(([lbl,val],i)=>(
            <div key={lbl} style={{ flex:1,paddingRight:16,
              borderRight:i<2?`1px solid ${panelEmber?'rgba(255,255,255,0.12)':T.rule}`:'none',
              paddingLeft:i>0?16:0 }}>
              <Label light={panelEmber} style={{ marginBottom:6 }}>{lbl}</Label>
              <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:18,
                fontVariantNumeric:'tabular-nums',fontWeight:400,
                color:panelEmber?T.white:T.ink,lineHeight:1 }}>{val}</div>
            </div>
          ))}
        </div>
        {/* Exposure forecast */}
        <div style={{ flex:1,padding:'24px 28px',display:'flex',flexDirection:'column',gap:16 }}>
          <Eyebrow n={3} label="Your Exposure Forecast" light={panelEmber}/>
          <div>
            <Label light={panelEmber} style={{ marginBottom:8 }}>Peak exposure</Label>
            <Num size={56} thin light={panelEmber}>88</Num>
            <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:13,
              color:panelEmber?'rgba(255,255,255,0.5)':T.ink40,marginTop:2 }}>
              PM2.5 µg/m³ at 18:00
            </div>
          </div>
          <Sparkline light={panelEmber}/>
          <div style={{ display:'flex',alignItems:'center',gap:8,marginTop:4 }}>
            <SmokeIllustration color={panelEmber?'rgba(255,255,255,0.5)':T.e6}/>
            <div>
              <Label light={panelEmber} style={{ marginBottom:4 }}>Risk level</Label>
              <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:13,
                letterSpacing:'0.06em',textTransform:'uppercase',fontWeight:500,
                color:panelEmber?T.white:T.e6 }}>Elevated</div>
            </div>
          </div>
        </div>
        {/* Actions */}
        <div style={{ padding:'0 28px 28px',display:'flex',gap:10 }}>
          <Btn primary onClick={()=>onChange('alert')}
            style={{ flex:1,borderRadius:panelEmber?0:24,
              background:panelEmber?'rgba(255,255,255,0.15)':T.e8,
              border:panelEmber?'1px solid rgba(255,255,255,0.25)':'none' }}>
            Alert me
          </Btn>
          <Btn ghost onClick={()=>onChange('alert')}
            style={{ flex:1,borderRadius:panelEmber?0:24,
              color:panelEmber?T.white:T.ink,
              border:panelEmber?'1px solid rgba(255,255,255,0.25)':`1px solid ${T.rule}` }}>
            Share
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 3: ALERT DETAIL (mobile) ──────────────────────────────────────
function Screen3({ active, onChange }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { const t=setTimeout(()=>setDrawn(true),120); return ()=>clearTimeout(t); }, []);
  const rows = [
    ['Source','Planned burn, Marin RX'],
    ['Clearing by','Thursday 19:00'],
    ['Your risk','ELEVATED'],
  ];
  return (
    <div style={{ display:'flex',height:'100%',width:'100%',background:T.paper,overflow:'hidden' }}>
      <NavRail active={active} onChange={onChange}/>
      {/* Mobile frame centered */}
      <div style={{ flex:1,display:'flex',alignItems:'center',justifyContent:'center',
        padding:'32px 0' }}>
        <div style={{ width:390,height:780,background:T.paper,
          border:`1px solid ${T.rule}`,overflow:'hidden',
          display:'flex',flexDirection:'column' }}>
          {/* Status bar */}
          <div style={{ height:44,padding:'0 24px',display:'flex',alignItems:'center',
            justifyContent:'space-between',borderBottom:`1px solid ${T.rule}`,flexShrink:0 }}>
            <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:11,
              fontVariantNumeric:'tabular-nums',color:T.ink60,letterSpacing:'0.04em' }}>14:22</div>
            <Label>Ember</Label>
          </div>
          <div style={{ flex:1,padding:'28px 28px 0',overflow:'hidden',display:'flex',flexDirection:'column' }}>
            <Eyebrow n={3} label="Alert · 14:22"/>
            <div style={{ marginTop:20,fontFamily:"'Helvetica Neue',Helvetica",fontSize:36,
              lineHeight:'36px',letterSpacing:'-0.02em',fontWeight:200,color:T.ink,maxWidth:280 }}>
              Is this smoke safe?
            </div>
            <div style={{ marginTop:14,fontFamily:"'Helvetica Neue',Helvetica",fontSize:24,
              lineHeight:'28px',letterSpacing:'-0.01em',fontWeight:500,color:T.e8 }}>
              No — not for you.
            </div>
            {/* Rows */}
            <div style={{ marginTop:28,borderTop:`1px solid ${T.rule}` }}>
              {rows.map(([lbl,val],i)=>(
                <div key={lbl} style={{ padding:'14px 0',
                  borderBottom:`1px solid ${T.rule}`,
                  display:'flex',justifyContent:'space-between',alignItems:'baseline' }}>
                  <Label>{lbl}</Label>
                  <div style={{ fontFamily:"'Helvetica Neue',Helvetica",fontSize:15,
                    color:lbl==='Your risk'?T.e6:T.ink,
                    fontWeight:lbl==='Your risk'?500:400,
                    letterSpacing:lbl==='Your risk'?'0.06em':0 }}>{val}</div>
                </div>
              ))}
            </div>
            {/* Sparkline */}
            <div style={{ marginTop:24 }}>
              <Label style={{ marginBottom:10 }}>AQI Forecast Today</Label>
              {drawn && <Sparkline/>}
            </div>
          </div>
          {/* Bottom buttons */}
          <div style={{ padding:'16px 28px 32px',display:'flex',flexDirection:'column',gap:10,flexShrink:0 }}>
            <Btn primary onClick={()=>{}} style={{ width:'100%',borderRadius:24,height:52,
              background:T.e8 }}>
              Hide indoors until 19:00
            </Btn>
            <Btn ghost onClick={()=>onChange('home')} style={{ width:'100%',borderRadius:24,height:52 }}>
              See the smoke on the map
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 4: PROFILE ─────────────────────────────────────────────────────
function Screen4({ active, onChange }) {
  const [threshold, setThreshold] = useState(100);
  const [conditions, setConditions] = useState(['Asthma']);
  const conds = ['Asthma','Young children','Outdoor athlete','Cardiac'];
  const toggle = c => setConditions(p => p.includes(c)?p.filter(x=>x!==c):[...p,c]);

  return (
    <div style={{ display:'flex',height:'100%',width:'100%',overflow:'hidden' }}>
      <NavRail active={active} onChange={onChange}/>
      <div style={{ flex:1,display:'flex',overflow:'hidden' }}>
        {/* Left photo 40% */}
        <Photo label="dried native grasses · backlit · california" style={{ flex:'0 0 40%' }}/>
        {/* Right form 60% */}
        <div style={{ flex:1,background:T.white,padding:'52px 56px',overflow:'auto',
          display:'flex',flexDirection:'column',gap:0 }}>
          <Eyebrow n={4} label="Profile"/>
          <div style={{ marginTop:28,fontFamily:"'Helvetica Neue',Helvetica",fontSize:32,
            letterSpacing:'-0.015em',fontWeight:400,color:T.ink,marginBottom:40 }}>
            Sensitivity Profile
          </div>
          {/* Fields */}
          {[['Address','1842 Telegraph Ave, Oakland CA'],['Household members','2 adults, 1 child']].map(([lbl,ph])=>(
            <div key={lbl} style={{ marginBottom:32 }}>
              <Label style={{ marginBottom:8 }}>{lbl}</Label>
              <input defaultValue={ph} style={{ width:'100%',maxWidth:420,
                fontFamily:"'Helvetica Neue',Helvetica",fontSize:15,color:T.ink,
                background:'none',border:'none',borderBottom:`1px solid ${T.rule}`,
                padding:'8px 0',outline:'none',letterSpacing:0,
                transition:'border-color 150ms ease-out' }}
                onFocus={e=>e.target.style.borderBottom=`2px solid ${T.e6}`}
                onBlur={e=>e.target.style.borderBottom=`1px solid ${T.rule}`}/>
            </div>
          ))}
          {/* Conditions chips */}
          <div style={{ marginBottom:32 }}>
            <Label style={{ marginBottom:10 }}>Health conditions</Label>
            <div style={{ display:'flex',flexWrap:'wrap',gap:8,maxWidth:420 }}>
              {conds.map(c=><Chip key={c} label={c} selected={conditions.includes(c)} onToggle={()=>toggle(c)}/>)}
            </div>
          </div>
          {/* Threshold slider */}
          <div style={{ marginBottom:48,maxWidth:420 }}>
            <Label style={{ marginBottom:10 }}>Alert threshold</Label>
            <div style={{ display:'flex',justifyContent:'space-between',
              fontFamily:"'Helvetica Neue',Helvetica",fontSize:11,color:T.ink40,
              fontVariantNumeric:'tabular-nums',marginBottom:10,letterSpacing:'0.04em' }}>
              {[0,50,100,150,200,250,300].map(v=><span key={v}>{v}</span>)}
            </div>
            <div style={{ position:'relative',height:18,display:'flex',alignItems:'center' }}>
              <div style={{ position:'absolute',left:0,right:0,height:1,background:T.rule }}/>
              <div style={{ position:'absolute',left:0,height:1,
                width:`${(threshold/300)*100}%`,background:T.e6,transition:'width 50ms' }}/>
              <input type="range" min="0" max="300" step="25" value={threshold}
                onChange={e=>setThreshold(+e.target.value)}
                style={{ position:'absolute',left:0,right:0,width:'100%',opacity:0,cursor:'pointer',height:18 }}/>
              <div style={{ position:'absolute',left:`${(threshold/300)*100}%`,
                width:18,height:18,borderRadius:9999,background:T.white,
                border:`1px solid ${T.e6}`,transform:'translateX(-50%)',
                pointerEvents:'none',boxShadow:'0 1px 3px rgba(0,0,0,0.1)' }}/>
            </div>
            <div style={{ marginTop:12,fontFamily:"'Helvetica Neue',Helvetica",fontSize:13,
              color:T.ink60,fontVariantNumeric:'tabular-nums' }}>
              Alert when AQI exceeds <span style={{ color:T.e6,fontWeight:500 }}>{threshold}</span>
            </div>
          </div>
          <div style={{ display:'flex',justifyContent:'flex-end' }}>
            <Btn primary style={{ borderRadius:0,minWidth:140 }}>Save profile</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 5: LANDING PAGE ────────────────────────────────────────────────
function Screen5({ onChange }) {
  const rows = [
    [')01','Real-time burns','We pull from PFIRS, VIIRS satellite, and ground observer networks — refreshed every 4 minutes. No delays.',false],
    [')02','Your risk, not average risk','AQI is a population average. We calculate your personal exposure score based on your household, health profile, and distance from the plume.',true],
    [')03','Clear when clear','We tell you exactly when air quality returns to your personal safe threshold. No vague "improving conditions".',false],
  ];
  return (
    <div style={{ height:'100%',overflowY:'auto',background:T.paper,fontFamily:"'Helvetica Neue',Helvetica" }}>
      {/* Nav */}
      <div style={{ position:'sticky',top:0,zIndex:10,background:T.paper,
        borderBottom:`1px solid ${T.rule}`,padding:'0 52px',
        display:'flex',alignItems:'center',justifyContent:'space-between',height:52,flexShrink:0 }}>
        <button onClick={()=>onChange('home')} style={{ display:'flex',alignItems:'center',gap:10,
          background:'none',border:'none',cursor:'pointer',padding:0 }}>
          <div style={{ width:22,height:22,background:T.e8,borderRadius:3,
            display:'flex',alignItems:'center',justifyContent:'center' }}>
            <svg width="10" height="12" viewBox="0 0 10 12">
              <path d="M5 0.5Q9 3 9 6.5Q9 10.5 5 12Q2.5 10.5 2 8.5Q4 9 5.5 7.5Q3.5 9.5 1.5 8Q0 6.5 1 5Q2.5 2 5 0.5Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize:14,fontWeight:500,color:T.ink,letterSpacing:'-0.01em' }}>Ember</span>
        </button>
        <div style={{ display:'flex',gap:40,alignItems:'center' }}>
          {['Features','How it works','Pricing'].map(l=>(
            <span key={l} style={{ fontSize:13,color:T.ink60,cursor:'pointer',
              letterSpacing:'0.01em' }}>{l}</span>
          ))}
        </div>
        <button onClick={()=>onChange('onboarding')} style={{ height:36,padding:'0 18px',
          background:T.e8,border:'none',color:T.white,fontFamily:"'Helvetica Neue',Helvetica",
          fontSize:13,fontWeight:500,cursor:'pointer',borderRadius:18 }}>
          Reserve — $1
        </button>
      </div>
      {/* Hero */}
      <div style={{ display:'flex',height:'calc(100vh - 52px)',minHeight:560 }}>
        {/* Left */}
        <div style={{ width:'50%',padding:'72px 56px',display:'flex',flexDirection:'column',justifyContent:'center' }}>
          <div style={{ fontSize:68,lineHeight:'64px',letterSpacing:'-0.02em',fontWeight:200,
            color:T.ink,maxWidth:520,textWrap:'pretty' }}>
            The smoke app for people with lungs.
          </div>
          <div style={{ marginTop:24,fontSize:18,lineHeight:'26px',fontWeight:300,
            color:T.ink60,maxWidth:420 }}>
            We tell you what you're smelling, when it clears, and whether it's safe for your body.
            California and Canada. $29 a year.
          </div>
          <div style={{ marginTop:40,display:'flex',gap:14,alignItems:'center' }}>
            <button onClick={()=>onChange('onboarding')} style={{ height:52,padding:'0 28px',
              background:T.e8,border:'none',color:T.white,fontFamily:"'Helvetica Neue',Helvetica",
              fontSize:15,fontWeight:500,cursor:'pointer',
              letterSpacing:0 }}>
              Reserve &nbsp;— &nbsp;$1
            </button>
            <button onClick={()=>onChange('home')} style={{ height:52,padding:'0 24px',
              background:'none',border:`1px solid ${T.rule}`,color:T.ink,
              fontFamily:"'Helvetica Neue',Helvetica",fontSize:15,cursor:'pointer',letterSpacing:0 }}>
              See the map
            </button>
          </div>
          {/* Small social proof */}
          <div style={{ marginTop:48,paddingTop:24,borderTop:`1px solid ${T.rule}`,
            fontSize:11,color:T.ink40,letterSpacing:'0.08em',textTransform:'uppercase' }}>
            In development · Oakland + Vancouver · Est. 2026
          </div>
        </div>
        {/* Right photo */}
        <div style={{ width:'50%',position:'relative' }}>
          <Photo label="wildfire smoke · valley · golden hour" style={{ height:'100%' }}/>
          {/* Floating live alert card */}
          <div style={{ position:'absolute',bottom:32,left:28,width:300,
            background:T.white,padding:'18px 20px',
            borderTop:`2px solid ${T.e6}` }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10 }}>
              <Eyebrow n={0} label="Live · SF"/>
              <div style={{ width:6,height:6,borderRadius:3,background:T.e6,
                animation:'pulse-badge 2s ease-in-out infinite' }}/>
            </div>
            <div style={{ fontSize:15,color:T.ink,fontWeight:400,lineHeight:'20px',marginBottom:12 }}>
              Marin RX clearing 19:00
            </div>
            <Sparkline/>
          </div>
        </div>
      </div>
      {/* Editorial rows */}
      {rows.map(([num,title,flip,desc])=>(
        <div key={num} style={{ display:'flex',height:420,borderTop:`1px solid ${T.rule}`,
          flexDirection:flip?'row-reverse':'row' }}>
          <Photo label={`editorial · ${title.toLowerCase()}`} style={{ width:'50%' }}/>
          <div style={{ width:'50%',padding:'52px 56px',display:'flex',flexDirection:'column',justifyContent:'center',
            background:flip?T.white:T.paper }}>
            <div style={{ fontSize:11,color:T.e6,letterSpacing:'0.12em',
              textTransform:'uppercase',fontWeight:500,marginBottom:16 }}>{num}</div>
            <div style={{ fontSize:32,lineHeight:'34px',letterSpacing:'-0.015em',
              fontWeight:400,color:T.ink,marginBottom:16 }}>{title}</div>
            <div style={{ fontSize:15,lineHeight:'22px',fontWeight:300,
              color:T.ink60,maxWidth:360 }}>{rows.find(r=>r[0]===num)?.[2] || ''}</div>
          </div>
        </div>
      ))}
      {/* Footer */}
      <div style={{ borderTop:`1px solid ${T.rule}`,padding:'20px 52px',
        display:'flex',justifyContent:'space-between',alignItems:'center' }}>
        <div style={{ fontSize:11,color:T.ink40,letterSpacing:'0.04em' }}>
          Ember &nbsp;&nbsp;Est. 2026 &nbsp;&nbsp;Oakland + Vancouver
        </div>
        <div style={{ display:'flex',gap:24 }}>
          {['Privacy','Terms','Contact'].map(l=>(
            <span key={l} style={{ fontSize:11,color:T.ink40,cursor:'pointer',letterSpacing:'0.04em' }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Screen1, Screen2, Screen3, Screen4, Screen5, NavRail,
  Eyebrow, Photo, Btn, Chip, Num, Label, SmokeIllustration, Sparkline
});
