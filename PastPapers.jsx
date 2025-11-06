import React, { useEffect, useState } from "react";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../firebase";

export default function PastPapers(){
  const [papers, setPapers] = useState([]);

  useEffect(()=>{
    async function load(){
      try{
        const snap = await get(dbRef(db, 'pastPapers'));
        const val = snap.val() || {};
        const items = Object.keys(val).map(k => ({ id:k, ...val[k] }));
        setPapers(items);
      }catch(e){ console.error(e); }
    }
    load();
  },[]);

  return (
    <div style={{maxWidth:900}}>
      <h2>Past Papers (KCSE)</h2>
      <div style={{marginTop:12}}>
        {papers.map(p => (
          <div key={p.id} style={{padding:12, background:"white", borderRadius:6, marginBottom:10}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div>
                <div style={{fontWeight:600}}>{p.title} — {p.subjectId} ({p.year})</div>
              </div>
              <div>
                {p.url ? <a href={p.url} target="_blank" rel="noreferrer">Open PDF</a> : <span style={{color:"#9ca3af"}}>Unavailable</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}