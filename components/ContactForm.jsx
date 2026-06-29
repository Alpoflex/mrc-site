"use client";

import { useState } from "react";
import { company } from "../data/site";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: company.web3formsKey,
          subject: `MRC Web — Teklif Talebi: ${form.name}`,
          from_name: "MRC Makine Sanayi Web Sitesi",
          name: form.name, phone: form.phone, email: form.email || "(belirtilmedi)",
          message: form.message || "(mesaj girilmedi)",
        }),
      });
      const data = await res.json();
      if (data.success) { setStatus("success"); setForm({ name: "", phone: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <form className="cf" onSubmit={submit} noValidate>
      {status === "success" && <div className="note ok">Talebiniz başarıyla iletildi. En kısa sürede dönüş yapacağız.</div>}
      {status === "error" && <div className="note err">Lütfen ad ve telefon alanlarını doldurun. Sorun sürerse bizi telefonla arayabilirsiniz.</div>}

      <div className="row">
        <div className="field">
          <label htmlFor="n">Ad Soyad / Firma *</label>
          <input id="n" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Adınız" />
        </div>
        <div className="field">
          <label htmlFor="p">Telefon *</label>
          <input id="p" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="05XX XXX XX XX" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="e">E-posta</label>
        <input id="e" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ornek@mail.com" />
      </div>
      <div className="field">
        <label htmlFor="m">Mesajınız</label>
        <textarea id="m" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="İhtiyacınızı kısaca yazın" />
      </div>
      <button type="submit" className="btn btn-primary submit" disabled={status === "sending"}>
        {status === "sending" ? "Gönderiliyor…" : "Teklif Talebi Gönder →"}
      </button>

      <style jsx>{`
        .cf { background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 32px 30px; }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { margin-bottom: 18px; }
        .field label { display: block; font-family: var(--font-display); font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 8px; }
        .field input, .field textarea { width: 100%; background: var(--bg); border: 1px solid var(--line-strong); border-radius: 4px; padding: 13px 14px; color: var(--ink); font-size: 15px; font-family: inherit; outline: none; transition: border-color .2s; resize: vertical; }
        .field input:focus, .field textarea:focus { border-color: var(--accent); }
        .submit { width: 100%; justify-content: center; margin-top: 4px; }
        .submit:disabled { opacity: .6; cursor: not-allowed; }
        .note { padding: 14px 16px; border-radius: 4px; font-size: 14px; margin-bottom: 20px; line-height: 1.5; }
        .note.ok { background: #e9f7ee; border: 1px solid #36b37e; color: #1d7a4d; }
        .note.err { background: #fdecea; border: 1px solid var(--accent); color: var(--accent-dark); }
        @media (max-width: 560px) { .row { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  );
}
