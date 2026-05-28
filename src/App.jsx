import { useState, useRef } from "react";

const defaultData = {
  header: {
    company: "STAR CO., LTD. PRESENTS",
    title: "STAR展示会　S-Net説明会",
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
    time: "受付 11:30〜　開会 12:00〜　閉会 17:00",
    venue: "三和ボデー",
    venueUrl: "https://maps.app.goo.gl/CPfB6Ewx5KbmoXTP6?g_st=ic",
    party: "18:00〜　従業員参加型",
    partyFee: "参加費 お一人様 7,000円",
  },
  schedule: [
    { time: "11:30", label: "受付開始", detail: "", gold: true },
    { time: "12:00", label: "S-Net 事業説明会", detail: "レンタカー事業をされていない事業主様必見！\n1年で200万売上があがった実際の声をお届けします。", url: "https://s-netr.com/", gold: false },
    { time: "13:00", label: "ツール説明会", detail: "こんな商品売ってます。\n便利グッズ　時短グッズ\n変わった商品もたくさんあります。\n見て触って確かめてください", url: "https://drive.google.com/file/d/1i0VZMgkb2n6ZYjx2Rzy2lyE0grdR_BpT/view?usp=sharing", gold: false },
    { time: "14:00", label: "商品デモンストレーション", detail: "実際に使ってみよう", gold: false },
    { time: "17:00", label: "閉会", detail: "", gold: false },
    { time: "18:00", label: "親睦会（従業員参加型）", detail: "高松市内", url: "", gold: true },
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

// ---- tiny inline edit helpers ----
function EditText({ value, onChange, multiline, style, className, placeholder }) {
  const [editing, setEditing] = useState(false);
  const ref = useRef();

  if (editing) {
    const props = {
      ref,
      autoFocus: true,
      value,
      onChange: (e) => onChange(e.target.value),
      onBlur: () => setEditing(false),
      style: {
        background: "rgba(255,220,0,0.15)",
        border: "2px solid #FFD700",
        borderRadius: 4,
        padding: "4px 8px",
        width: "100%",
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        color: "inherit",
        lineHeight: "inherit",
        outline: "none",
        resize: "none",
        ...style,
      },
    };
    return multiline
      ? <textarea rows={3} {...props} />
      : <input {...props} />;
  }

  return (
    <span
      className={className}
      onClick={() => setEditing(true)}
      title="タップして編集"
      style={{
        cursor: "text",
        borderBottom: "1.5px dashed rgba(200,150,62,0.5)",
        display: "inline-block",
        minWidth: 40,
        whiteSpace: "pre-wrap",
        ...style,
      }}
    >
      {value || <span style={{ color: "#aaa", fontStyle: "italic" }}>{placeholder || "タップして入力"}</span>}
    </span>
  );
}

function EditUrl({ value, onChange, label }) {
  const [open, setOpen] = useState(false);

  const handleBlur = (e) => {
    const val = e.target.value.trim();
    // 「無し」「なし」「削除」「なし」空欄 → リンク削除
    const deleteWords = ["無し", "なし", "削除", "delete", "none", ""];
    if (deleteWords.includes(val.toLowerCase())) {
      onChange("");
    } else {
      onChange(val);
    }
    setOpen(false);
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      {value
        ? <a href={value} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>{label}</a>
        : <span style={{ opacity: 0.5 }}>{label}</span>
      }
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          background: value ? "#FFD700" : "#aaa", border: "none", borderRadius: 3,
          fontSize: 10, padding: "2px 6px", cursor: "pointer", color: "#000", fontWeight: 700,
        }}
      >{value ? "🔗 URL変更" : "🔗 URL設定"}
      </button>
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            background: "#ff4444", border: "none", borderRadius: 3,
            fontSize: 10, padding: "2px 6px", cursor: "pointer", color: "#fff", fontWeight: 700,
          }}
        >✕ 削除</button>
      )}
      {open && (
        <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
          <input
            autoFocus
            defaultValue={value}
            onBlur={handleBlur}
            placeholder="https:// または「無し」で削除"
            style={{
              border: "2px solid #FFD700", borderRadius: 4, padding: "3px 8px",
              fontSize: 12, width: 220,
            }}
          />
        </span>
      )}
    </span>
  );
}

// ---- deep update helper ----
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
  const setArr = (key, idx, field, value) =>
    setData(d => {
      const arr = [...d[key]];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...d, [key]: arr };
    });
  const setWho = (idx, value) =>
    setData(d => {
      const arr = [...d.whoItems];
      arr[idx] = value;
      return { ...d, whoItems: arr };
    });

  const s = {
    red: "#D0021B",
    dark: "#111",
    gold: "#C8963E",
    light: "#F5F2EE",
    gray: "#888",
  };

  const banner = editMode ? (
    <div style={{
      position: "sticky", top: 0, zIndex: 999,
      background: "#FFD700", padding: "10px 16px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontWeight: 700, fontSize: 13, color: "#000",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    }}>
      <span>✏️ 編集モード ON｜テキストをタップして編集、🔗 URLでリンク設定</span>
      <button
        onClick={() => setEditMode(false)}
        style={{ background: "#000", color: "#FFD700", border: "none", borderRadius: 4, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
      >プレビュー</button>
    </div>
  ) : (
    <div style={{
      position: "sticky", top: 0, zIndex: 999,
      background: s.dark, padding: "10px 16px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontSize: 13, color: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
    }}>
      <span style={{ color: s.gold }}>👁 プレビューモード</span>
      <button
        onClick={() => setEditMode(true)}
        style={{ background: "#FFD700", color: "#000", border: "none", borderRadius: 4, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
      >✏️ 編集する</button>
    </div>
  );

  const E = editMode
    ? (props) => <EditText {...props} />
    : ({ value, style, className }) => (
        <span className={className} style={{ whiteSpace: "pre-wrap", ...style }}>{value}</span>
      );

  const U = editMode
    ? (props) => <EditUrl {...props} />
    : ({ value, label }) => value
        ? <a href={value} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>{label}</a>
        : <span>{label}</span>;

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", background: s.light, maxWidth: 680, margin: "0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {banner}

      {/* HEADER */}
      <div style={{ background: s.dark, padding: "36px 28px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${s.red}, ${s.gold})` }} />
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 4, color: s.gold, marginBottom: 10 }}>
          <E value={data.header.company} onChange={v => set("header.company", v)} />
        </div>
        <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
          <E value={data.header.title} onChange={v => set("header.title", v)} />
          <br />
          <E value={data.header.subtitle} onChange={v => set("header.subtitle", v)} style={{ color: s.red }} />
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.55)", letterSpacing: 2 }}>
          <E value={data.header.season} onChange={v => set("header.season", v)} />
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${s.red}, ${s.gold})` }} />

      {/* CATCH */}
      <div style={{ background: s.red, padding: "32px 28px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontSize: 24, fontWeight: 900, lineHeight: 1.4, marginBottom: 14 }}>
          <E value={data.catch.main} onChange={v => set("catch.main", v)} multiline />
        </div>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.8 }}>
          <E value={data.catch.sub} onChange={v => set("catch.sub", v)} multiline />
        </div>
      </div>

      {/* WHO */}
      <div style={{ background: s.dark, padding: "28px" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: s.gold, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 14 }}>
          こんな方におすすめの展示会です
        </div>
        {data.whoItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.5, marginBottom: 10 }}>
            <span style={{ color: s.gold, flexShrink: 0 }}>✔</span>
            <E value={item} onChange={v => setWho(i, v)} style={{ flex: 1 }} />
          </div>
        ))}
      </div>

      {/* INFO */}
      <div style={{ padding: "36px 28px 28px", background: s.light }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: s.gray, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 20, borderLeft: `3px solid ${s.red}`, paddingLeft: 10 }}>
          開催概要
        </div>
        <div style={{ display: "grid", gap: 1, background: "#ddd", border: "1px solid #ddd" }}>
          {[
            { key: "日時", val: <><strong style={{ fontSize: 16 }}><E value={data.info.date} onChange={v => set("info.date", v)} /></strong><br /><E value={data.info.time} onChange={v => set("info.time", v)} /></> },
            { key: "会場", val: <strong style={{ fontSize: 16 }}><U value={data.info.venueUrl} onChange={v => set("info.venueUrl", v)} label={<E value={data.info.venue} onChange={v => set("info.venue", v)} />} /></strong> },
            { key: "親睦会", val: <><E value={data.info.party} onChange={v => set("info.party", v)} /><br /><span style={{ color: s.gray, fontSize: 12 }}><E value={data.info.partyFee} onChange={v => set("info.partyFee", v)} /></span></> },
          ].map(({ key, val }) => (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "110px 1fr", background: "white" }}>
              <div style={{ background: s.dark, color: "white", fontSize: 12, fontWeight: 700, padding: "14px 12px", display: "flex", alignItems: "center", letterSpacing: 1 }}>{key}</div>
              <div style={{ padding: "14px 16px", fontSize: 14, lineHeight: 1.7 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TIMETABLE */}
      <div style={{ padding: "0 28px 36px", background: s.light }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: s.gray, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 20, borderLeft: `3px solid ${s.red}`, paddingLeft: 10 }}>
          タイムスケジュール
        </div>
        {data.schedule.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "12px 0", borderBottom: i < data.schedule.length - 1 ? "1px dashed #ccc" : "none", fontSize: 14 }}>
            <div style={{ background: row.gold ? s.gold : s.dark, color: "white", fontWeight: 900, fontSize: 13, padding: "4px 10px", minWidth: 74, textAlign: "center", flexShrink: 0 }}>
              <E value={row.time} onChange={v => setArr("schedule", i, "time", v)} />
            </div>
            <div style={{ lineHeight: 1.6 }}>
              <strong>
                {row.url && !editMode
                  ? <a href={row.url} target="_blank" rel="noreferrer" style={{ color: s.dark, textDecoration: "none" }}>{row.label}</a>
                  : <E value={row.label} onChange={v => setArr("schedule", i, "label", v)} />
                }
              </strong>
              {editMode && (
                <span style={{ marginLeft: 8 }}>
                  <U value={row.url || ""} onChange={v => setArr("schedule", i, "url", v)} label="🔗 詳細リンク" />
                </span>
              )}
              {row.url && !editMode && (
                <a href={row.url} target="_blank" rel="noreferrer" style={{ marginLeft: 8, color: s.gold, fontSize: 12 }}>詳しくはこちら →</a>
              )}
              {row.detail && <div style={{ color: s.gray, fontSize: 12, marginTop: 2 }}><E value={row.detail} onChange={v => setArr("schedule", i, "detail", v)} multiline /></div>}
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{ background: s.dark, padding: "36px 28px" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "rgba(255,255,255,0.4)", fontFamily: "'Bebas Neue', sans-serif", marginBottom: 20, borderLeft: `3px solid ${s.gold}`, paddingLeft: 10 }}>
          展示・販売製品
        </div>
        {data.products.map((p, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderTop: `3px solid ${s.gold}`, padding: 20, marginBottom: 16 }}>
            {p.badge && (
              <div style={{ display: "inline-block", background: s.red, color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", marginBottom: 8 }}>
                <E value={p.badge} onChange={v => setArr("products", i, "badge", v)} />
              </div>
            )}
            <div style={{ fontSize: 18, fontWeight: 900, color: "white", marginBottom: 6 }}>
              <E value={p.name} onChange={v => setArr("products", i, "name", v)} />
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8 }}>
              <E value={p.meta} onChange={v => setArr("products", i, "meta", v)} />
            </div>
            {p.discount && (
              <div style={{ fontSize: 24, fontWeight: 900, color: s.red, marginBottom: 6 }}>
                <E value={p.discount} onChange={v => setArr("products", i, "discount", v)} />
              </div>
            )}
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>
              <E value={p.desc} onChange={v => setArr("products", i, "desc", v)} multiline />
            </div>
            {editMode && (
              <div style={{ marginTop: 8 }}>
                <U value={p.demoUrl} onChange={v => setArr("products", i, "demoUrl", v)} label="🎬 動画デモリンク" />
              </div>
            )}
            {!editMode && p.demoUrl && (
              <a href={p.demoUrl} target="_blank" rel="noreferrer" style={{ color: s.gold, fontSize: 13 }}>🎬 動画デモを見る</a>
            )}
          </div>
        ))}
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", padding: 16, color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.7 }}>
          📦 他の商品も値引き販売予定！！<br />
          🎁 購入でおまけ商品あり<br />
          📹 現場のリアルな使い方紹介なども予定しています！
        </div>
      </div>

      {/* PRICE */}
      <div style={{ padding: "36px 28px", background: s.light }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: s.gray, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 20, borderLeft: `3px solid ${s.red}`, paddingLeft: 10 }}>
          参加費
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          {[
            { type: "組合員", key: "union" },
            { type: "青年部員", key: "youth" },
          ].map(({ type, key }) => (
            <div key={key} style={{ background: "white", border: "1px solid #ddd", padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: s.gray, marginBottom: 6, letterSpacing: 1 }}>{type}</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>
                <E value={data.prices[key]} onChange={v => set(`prices.${key}`, v)} />
                <small style={{ fontSize: 13, fontWeight: 400 }}>円</small>
              </div>

            </div>
          ))}
        </div>
        <div style={{ background: "white", border: "1px solid #ddd", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: s.gray, marginBottom: 4 }}>組合外</div>
            <div style={{ fontSize: 22, fontWeight: 900 }}>
              <E value={data.prices.outside} onChange={v => set("prices.outside", v)} />
              <small style={{ fontSize: 13, fontWeight: 400 }}>円</small>
            </div>
          </div>

        </div>
        <div style={{ fontSize: 12, color: s.gray, lineHeight: 1.7, padding: 12, background: "white", border: "1px solid #eee" }}>
          <E value={data.prices.note} onChange={v => set("prices.note", v)} multiline style={{ width: "100%" }} />
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: s.red, padding: "40px 28px", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "white", marginBottom: 8, lineHeight: 1.4 }}>
          ▼ 事前参加登録はこちら
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 24 }}>
          <E value={data.cta.deadline} onChange={v => set("cta.deadline", v)} />
        </div>
        <div>
          <U
            value={data.cta.formUrl}
            onChange={v => set("cta.formUrl", v)}
            label={
              <div style={{ display: "inline-block", background: "white", color: s.red, fontSize: 15, fontWeight: 900, padding: "16px 40px", letterSpacing: 1, cursor: "pointer" }}>
                受付フォームで申込む
              </div>
            }
          />
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 16 }}>
          FAXでの回答をご希望の方は{" "}
          <U value={data.cta.faxUrl} onChange={v => set("cta.faxUrl", v)} label="こちら" />
          {" "}を印刷してFAXお願いします
        </div>
      </div>

      {/* CONTACT */}
      <div style={{ background: s.dark, padding: "28px", textAlign: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 8, letterSpacing: 2 }}>お問い合わせ</div>
        <U value={data.contact.lineUrl} onChange={v => set("contact.lineUrl", v)} label={<span style={{ color: s.gold, fontSize: 13 }}>LINE: {data.contact.lineUrl || "URLを設定"}</span>} />
      </div>

      {/* FOOTER */}
      <div style={{ background: "#000", padding: "20px 28px", textAlign: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: 2 }}>
          皆さまのご来場をお待ちしております！
        </div>
      </div>
    </div>
  );
}
