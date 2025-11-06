import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AuthPage(){
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(""); 
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr(""); 
    try{
      if(mode==="login"){
        await signInWithEmailAndPassword(auth, email, pass);
      } else {
        await createUserWithEmailAndPassword(auth, email, pass);
      }
      nav("/");
    }catch(error){
      setErr(error.message);
    }
  }

  return (
    <div style={{maxWidth:420, margin:"30px auto", background:"white", padding:20, borderRadius:8}}>
      <h3>{mode==="login" ? "Sign in" : "Register"}</h3>
      <form onSubmit={submit}>
        <div style={{marginBottom:8}}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%", padding:8}} />
        </div>
        <div style={{marginBottom:8}}>
          <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" style={{width:"100%", padding:8}} />
        </div>
        {err && <div style={{color:"red"}}>{err}</div>}
        <div style={{display:"flex", gap:8}}>
          <button type="submit">{mode==="login" ? "Sign in" : "Create account"}</button>
          <button type="button" onClick={()=>setMode(mode==="login" ? "register" : "login")}>
            {mode==="login" ? "Register" : "Back to sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}