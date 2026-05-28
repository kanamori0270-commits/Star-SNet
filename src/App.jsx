import { useState, useRef } from "react";

const defaultData = {
  header: {
    company: "STAR CO., LTD. PRESENTS",
    title: "STAR展示会",
    subtitle: "開催案内",
    season: "2025 SUMMER EXHIBITION",
  },
  catch: {
    main: "最先端技術を\nこの目で確認してください！！",
    sub: "現場で働いてる方、知らないと\n時代から取り残されるよ",
  },
  whoItems: [
    "気になっていた工具を実際に試したい",
    "現場で使いやすい商品を探したい",
    "作業効率UP・時短につながる道具を見たい",
    "メーカー説明や実演を見てみたい",
  ],
  info: {
    date: "7月4日（土）",
    time: "受付 9:30〜　開会 10:00〜　閉会 16:00",
    venue: "三和ボデー",
    venueUrl: "https://maps.app.goo.gl/CPfB6Ewx5KbmoXTP6?g_st=ic",
    party: "18:00〜　従業員参加型",
    partyFee: "参加費 お一人様 7,000円",
  },
  schedule: [
    { time: "9:30", label: "受付開始", detail: "", gold: true },
    { time: "10:00", label: "S-Net 事業説明会", detail: "レンタカー事業をされていない事業主様必見！\n1年で200万売上があがった実際の声をお届けします。", url: "https://s-netr.com/", gold: false },
    { time: "11:00", label: "ツール説明会", detail: "", url: "https://drive.google.com/file/d/1i0VZMgkb2n6ZYjx2Rzy2lyE0grdR_BpT/view?usp=sharing", gold: false },
    { time: "13:00", label: "製品デモンストレーション", detail: "グルーシステム デモ／ミラクルシステム デモ／新世代のパワーツール デモ", gold: false },
    { time: "16:00", label: "閉会", detail: "", gold: false },
    { time: "18:00", label: "親睦会（従業員参加型）", detail: "", gold: true },
  ],
  products: [
    {
      badge: "当日目玉商品",
      name: "ミラクルシステム",
      meta: "✅ 実演デモ",
      discount: "50% OFF　セット購入で",
      desc: "石原式板金修正システム。初めて握った時からプロの仕事ができる究極の板金修正機！",
      demoUrl: "https://m.youtube.com/watch?v=TNSA85WHH4s&utm_source=chatgpt.com",
    },
    {
      badge: "",
      name: "ミラクル グルー システム",
      meta: "✅ 実演デモ　✅ 動画紹介",
      discount: "50% OFF　セット購入で",
      desc: "誰でも簡単に板金修正ができるシステム。強力な接着剤と高性能グルーカンが強力な接着力を実現。",
      demoUrl: "https://youtu.be/RiRgSZr82g0?si=5kmSaTKvHAsVQbsT",
    },
    {
      badge: "",
      name: "新世代のパワーツール AiroPower",
      meta: "✅ 実演デモ　✅ 動画紹介",
      discount: "",
      desc: "日本国内・世界各国にて特許取得済みの革命品。空圧式ボディリペアシステム。",
      demoUrl: "https://youtu.be/HM_lWEMvrkk?si=Dppl2gULHydh2riz",
    },
  ],
  prices: {
    union: "2,000",
    youth: "1,000",
    outside: "4,000",
    note: "※ 1社2名以降：組合員 2,000円／人、青年部 1,000円／人、組合外 4,000円／人",
  },
  cta: {
    deadline: "6月26日頃までに回答お願いします",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScAy-lG95copzWo5_JT5IAsrLMzxFrWJ6inTCXG1mmuWn9qVw/viewform?usp=publish-editor",
    faxUrl: "https://docs.google.com/document/d/1nS9bY59kafrRZKKQn_K2XWJpDXVTAknDlbig-eotjCo/edit?usp=sharing",
  },
  contact: {
    lineUrl: "https://line.me/ti/p/k-ZGaEyc2_",
  },
};

function EditText({ value, onChange, multiline, style, className, placeholder }) {
  const [editing, setEditing] = useState(false);
  const ref = useRef();
  if (editing) {
    const props = {
      ref, autoFocus: true, value,
      onChange: (e) => onChange(e.target.value),
      onBlur: () => setEditing(false),
      style: { background: "rgba(255,220,0,0.15)", border: "2px solid #FFD700", borderRadius: 4, padding: "4px 8px", width: "100%", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", color: "inherit", lineHeight: "inherit", outline: "none", resize: "none", ...style },
    };
    return multiline ? <textarea rows={3} {...props} /> : <input {...props} />;
  }
  return (
    <span className={className} onClick={() => setEditing(true)} title="タップして編集"
      style={{ cursor: "text", borderBottom: "1.5px dashed rgba(200,150,62,0.5)", display: "inline-block", minWidth: 40, whiteSpace: "pre-wrap", ...style }}>
      {value || <span style={{ color: "#aaa", fontStyle: "italic" }}>{placeholder || "タップして入力"}</span>}
    </span>
  );
}

function EditUrl({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const handleBlur = (e) => {
    const val = e.target.value.trim();
    const deleteWords = ["無し", "なし", "削除", "delete", "none", ""];
    if (deleteWords.includes(val.toLowerCase())) { onChange(""); } else { onChange(val); }
    setOpen(false);
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      {value ? <a href={value} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>{label}</a> : <span style={{ opacity: 0.5 }}>{label}</span>}
      <button onClick={() => setOpen(v => !v)} style={{ background: value ? "#FFD700" : "#aaa", border: "none", borderRadius: 3, fontSize: 10, padding: "2px 6px", cursor: "pointer", color: "#000", fontWeight: 700 }}>{value ? "🔗 URL変更" : "🔗 URL設定"}</button>
      {value && <button onClick={() => onChange("")} style={{ background: "#ff4444", border: "none", borderRadius: 3, fontSize: 10, padding: "2px 6px", cursor: "pointer", color: "#fff", fontWeight: 700 }}>✕ 削除</button>}
      {open && <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><input autoFocus defaultValue={value} onBlur={handleBlur} placeholder="https:// または「無し」で削除" style={{ border: "2px solid #FFD700", borderRadius: 4, padding: "3px 8px", fontSize: 12, width: 220 }} /></span>}
    </span>
  );
}

function update(obj, path, value) {
  const keys = path.split(".");
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  if (keys.length === 1) { clone[keys[0]] = value; return clone; }
  clone[keys[0]] = update(clone[keys[0]], keys.slice(1).join("."), value);
  return clone;
}

export default function App() {
  const [data, setData] = useState(defaultData);
  const [editMode, setEditMode] = useState(false);
  const set = (path, value) => setData(d => update(d, path, value));
  const setArr = (key, idx, field, value) => setData(d => { const arr = [...d[key]]; arr[idx] = { ...arr[idx], [field]: value }; return { ...d, [key]: arr }; });
  const setWho = (idx, value) => setData(d => { const arr = [...d.whoItems]; arr[idx] = value; return { ...d, whoItems: arr }; });
  const s = { red: "#D0021B", dark: "#111", gold: "#C8963E", light: "#F5F2EE", gray: "#888" };
  const banner = editMode ? (
    <div style={{ position: "sticky", top: 0, zIndex: 999, background: "#FFD700", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 700, fontSize: 13, color: "#000", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
      <span>✏️ 編集モード ON｜テキストをタップして編集、🔗 URLでリンク設定</span>
      <button onClick={() => setEditMode(false)} style={{ background: "#000", color: "#FFD700", border: "none", borderRadius: 4, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>プレビュー</button>
    </div>
  ) : (
    <div style={{ position: "sticky", top: 0, zIndex: 999, background: s.dark, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
      <span style={{ color: s.gold }}>👁 プレビューモード</span>
      <button onClick={() => setEditMode(true)} style={{ background: "#FFD700", color: "#000", border: "none", borderRadius: 4, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>✏️ 編集する</button>
    </div>
  );
  const E = editMode ? (props) => <EditText {...props} /> : ({ value, style, className }) => <span className={className} style={{ whiteSpace: "pre-wrap", ...style }}>{value}</span>;
  const U = editMode ? (props) => <EditUrl {...props} /> : ({ value, label }) => value ? <a href={value} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>{label}</a> : <span>{label}</span>;
  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", background: s.light, maxWidth: 680, margin: "0 auto" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Bebas+Neue&display=swap'); * { box-sizing: border-box; } body { margin: 0; }`}</style>
      {banner}
      <div style={{ background: s.dark, padding: "36px 28px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: linear-gradient(90deg, ${s.red}, ${s.gold}) }} />
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 4, color: s.gold, marginBottom: 10 }}><E value={data.header.company} onChange={v => set("header.company", v)} /></div>
        <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
          <E value={data.header.title} onChange={v => set("header.title", v)} /><br />
          <E value={data.header.subtitle} onChange={v => set("header.subtitle", v)} style={{ color: s.red }} />
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.55)", letterSpacing: 2 }}><E value={data.header.season} onChange={v => set("header.season", v)} /></div>
      </div>
      <div style={{ height: 4, background: linear-gradient(90deg, ${s.red}, ${s.gold}) }} />
      <div style={{ background: s.red, padding: "32px 28px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontSize: 24, fontWeight: 900, lineHeight: 1.4, marginBottom: 14 }}><E value={data.catch.main} onChange={v => set("catch.main", v)} multiline /></div>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.8 }}><E value={data.catch.sub} onChange={v => set("catch.sub", v)} multiline /></div>
      </div>
      <div style={{ background: s.dark, padding: "28px" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: s.gold, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 14 }}>こんな方におすすめの展示会です</div>
        {data.whoItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,
