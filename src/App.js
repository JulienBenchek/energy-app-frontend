import { useState } from "react";
import { postCustomer, getBestRate } from "./api";

export default function App() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    provider: "dominion",      // dominion or columbia
    on_nopec: true,            // true/false
    contract_expires: "",      // YYYY-MM-DD or leave blank
    poa_signed: false,         // must be true to submit
  });
  const [status, setStatus] = useState("");
  const [bestRate, setBestRate] = useState(null);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const payload = {
        ...form,
        contract_expires: form.contract_expires || null,
      };
      const resp = await postCustomer(payload);
      setStatus(`✅ Signed up as ID ${resp.id}`);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  const checkBestRate = async () => {
    setBestRate(null);
    setStatus("Checking best rate...");
    try {
      const data = await getBestRate(form.provider);
      setBestRate(data);
      setStatus("✅ Best rate loaded");
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Utilities Pricing — Signup</h1>

      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <label>
          Full name
          <input
            value={form.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Phone (optional)
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Provider
          <select
            value={form.provider}
            onChange={(e) => update("provider", e.target.value)}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="dominion">dominion</option>
            <option value="columbia">columbia</option>
          </select>
        </label>

        <label>
          On NOPEC?
          <select
            value={String(form.on_nopec)}
            onChange={(e) => update("on_nopec", e.target.value === "true")}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <label>
          Contract expires (YYYY-MM-DD, optional)
          <input
            placeholder="2025-12-31"
            value={form.contract_expires}
            onChange={(e) => update("contract_expires", e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={form.poa_signed}
            onChange={(e) => update("poa_signed", e.target.checked)}
            required
          />
          I authorize switching (POA)
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Sign up</button>
          <button type="button" onClick={checkBestRate}>Check best rate</button>
        </div>
      </form>

      <p style={{ marginTop: 16 }}>{status}</p>

      {bestRate && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(bestRate, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
