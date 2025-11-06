import React, { useEffect, useState } from "react";
import { ref as dbRef, get, push } from "firebase/database";
import { db } from "../firebase";
import { auth } from "../firebase";

export default function QuizPage(){
  const [quizzes, setQuizzes] = useState([]);
  const [active, setActive] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(()=>{
    async function load(){
      try{
        const snap = await get(dbRef(db, 'quizzes'));
        const val = snap.val() || {};
        const items = Object.keys(val).map(k => ({ id:k, ...val[k] }));
        setQuizzes(items);
      }catch(e){ console.error(e); }
    }
    load();
  },[]);

  async function submitQuiz(){
    const q = active;
    let score = 0;
    q.questions.forEach((qq, i) => { if (answers[i] === qq.correct) score++; });
    await push(dbRef(db, 'quizResults'), {
      quizId: q.id,
      user: auth.currentUser ? auth.currentUser.uid : null,
      score,
      max: q.questions.length,
      createdAt: Date.now()
    });
    alert(`You scored ${score}/${q.questions.length}`);
    setActive(null);
    setAnswers({});
  }

  return (
    <div style={{maxWidth:900}}>
      <h2>Quizzes</h2>
      <div style={{display:"flex", gap:14}}>
        <div style={{flex:1}}>
          <h4>Available quizzes</h4>
          {quizzes.map(q => (
            <div key={q.id} style={{padding:10, background:"white", marginBottom:8, borderRadius:6}}>
              <div style={{fontWeight:600}}>{q.title}</div>
              <div style={{fontSize:13, color:"#6b7280"}}>{q.description}</div>
              <div style={{marginTop:6}}>
                <button onClick={() => { setActive(q); setAnswers({}); }}>Start</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{flex:2}}>
          {active ? (
            <div style={{background:"white", padding:12, borderRadius:6}}>
              <h4>{active.title}</h4>
              {active.questions.map((qq, i) => (
                <div key={i} style={{marginBottom:10}}>
                  <div style={{fontWeight:600}}>{i+1}. {qq.text}</div>
                  {qq.options.map((opt, idx) => (
                    <label key={idx} style={{display:"block"}}>
                      <input type="radio" name={`q${i}`} checked={answers[i]===opt} onChange={()=> setAnswers(a=>({ ...a, [i]: opt }))} /> {opt}
                    </label>
                  ))}
                </div>
              ))}
              <div>
                <button onClick={submitQuiz}>Submit Quiz</button>
                <button onClick={()=> setActive(null)}>Cancel</button>
              </div>
            </div>
          ) : <div style={{padding:12}}>Select a quiz to begin.</div>}
        </div>
      </div>
      <div style={{marginTop:12, color:"#6b7280"}}>To add quizzes: add entries under /quizzes in Realtime DB with fields: title, description, questions.</div>
    </div>
  )
}