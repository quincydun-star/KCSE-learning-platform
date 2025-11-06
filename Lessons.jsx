import React, { useEffect, useState } from "react";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../firebase";

export default function Lessons(){
  const [lessons, setLessons] = useState([]);

  useEffect(()=>{
    async function load(){
      try{
        const snap = await get(dbRef(db, 'lessons'));
        const val = snap.val() || {};
        const items = Object.keys(val).map(k => ({ id:k, ...val[k] }));
        setLessons(items);
      }catch(e){ console.error(e); }
    }
    load();
  },[]);

  return (
    <div style={{maxWidth:1000}}>
      <h2>Lessons</h2>
      <p>Audio and video lessons (using public links).</p>
      {lessons.map(l => (
        <div key={l.id} style={{background:"white", padding:12, borderRadius:8, marginBottom:10}}>
          <div style={{fontWeight:600}}>{l.title} — {l.subjectId}</div>
          <div style={{marginTop:8}}>
            {l.type === "video" ? (
              l.url ? <iframe width="560" height="315" src={l.url} title={l.title} frameBorder="0" allowFullScreen></iframe> : <div>Video not available</div>
            ) : (
              l.url ? <audio controls src={l.url} /> : <div>Audio not available</div>
            )}
          </div>
        </div>
      ))}
      <div style={{marginTop:12, fontSize:13, color:"#6b7280"}}>
        To add lessons: add entries in Realtime DB under /lessons with fields: title, subjectId, type ('video'|'audio'), url (public link).
      </div>
    </div>
  )
}