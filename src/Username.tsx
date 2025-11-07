import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = { setUsername: (v: string) => void };

export default function Username({ setUsername }: Props) {
  const [value, setValue] = useState("");
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    setUsername(name);
    localStorage.setItem("username", name);
    nav("/chat");
  };

  return (
    <main className="app" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <form onSubmit={submit} style={{display:"flex",gap:12,alignItems:"center"}}>
        <input
          type="text"
          placeholder="Choose a username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{height:48,width:260,marginBottom:0,paddingLeft:16}}
        />
        <button className="button-sidebar" type="submit">Enter</button>
      </form>
    </main>
  );
}
