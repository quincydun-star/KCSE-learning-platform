import React, { useState } from "react";

export default function MusicMaker(){
  const [tempo, setTempo] = useState(100);
  const [pattern, setPattern] = useState([1,0,0,0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ctxRef, setCtxRef] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const stepCount = 4;

  function toggleStep(i){
    const p = [...pattern]; p[i] = p[i] ? 0 : 1; setPattern(p);
  }

  function playTone(time, frequency){
    const ctx = ctxRef || new (window.AudioContext || window.webkitAudioContext)();
    setCtxRef(ctx);
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = frequency;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.001);
    o.start(time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    o.stop(time + 0.16);
  }

  function playLoop(){
    if(isPlaying){
      setIsPlaying(false);
      if(timerId){ clearInterval(timerId); setTimerId(null); }
      return;
    }
    setIsPlaying(true);
    let step = 0;
    const interval = (60/tempo) * 1000 / (stepCount/1);
    const id = setInterval(() => {
      if(pattern[step]){
        playTone(ctxRef?.currentTime || 0, 100 + Math.random()*10);
      }
      step = (step+1) % stepCount;
    }, interval);
    setTimerId(id);
  }

  return (
    <div style={{maxWidth:760}}>
      <h2>Music Maker (Beat Mini-Lesson)</h2>
      <p>Toggle steps and press Play. Tempo controls speed.</p>
      <div style={{display:"flex", gap:8, alignItems:"center"}}>
        {pattern.map((p,i) => (
          <button key={i} onClick={()=>toggleStep(i)} style={{width:60, height:60, background:p ? "#f97316" : "#e5e7eb", borderRadius:8}}>
            {i+1}
          </button>
        ))}
      </div>
      <div style={{marginTop:10}}>
        <label>Tempo: {tempo} bpm</label>
        <input type="range" min="60" max="160" value={tempo} onChange={e=>setTempo(Number(e.target.value))} />
      </div>
      <div style={{marginTop:10}}>
        <button onClick={playLoop}>{isPlaying ? "Stop" : "Play"}</button>
      </div>

      <div style={{marginTop:12, background:"white", padding:12, borderRadius:8}}>
        <h4>Mini-lesson</h4>
        <p>Try creating simple 4-step rhythm patterns. Use this to teach tempo and beats.</p>
      </div>
    </div>
  )
}