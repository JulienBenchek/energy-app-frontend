import { useEffect, useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://<YOUR_BACKEND_URL>";

export default function Admin() {
  const [customers, setCustomers] = useState([]);
  const [rates, setRates] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchCustomers = async () => {
    const r = await fetch(`${API_BASE_URL}/admin/customers`);
    const j = await r.json();
    setCustomers(j.customers || []);
  };

  const fetchRates = async () => {
    const r = await fetch(`${API_BASE_URL}/admin/rates`);
    const j = await r.json();
    setRates(j.rates || []);
  };

  const runRates = async () => {
    setMsg("Running rates job...");
    const r = await fetch(`${API_BASE_URL}/admin/run/rates`, { method: "POST" });
    const j = await r.json();
    setMsg(j.message || "Done");
    fetchRates();
  };

  const runChecks = async () => {
    setMsg("Running expiration checks...");
    const r = await fetch(`${API_BASE_URL}/admin/run/checks`, { method: "POST" });
    const j = await r.json();
    setMsg(j.message || "Done");
  };

  useEffect(() => {
    fetchCustomers();
    fetchRates();
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: "32px auto", fontFamily: "system-ui" }}>
      <h1>Admin</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={runRates}>Run Rates Update</button>
        <button onClick={runChecks}>Run Expiration Checks</button>
        <button onClick={() => { fetchCustomers(); fetchRates(); }}>Refresh Tables</button>
      </div>
      {msg && <p>{msg}</p>}

      <h2>Rates</h2>
      <table border="1" cellPadding="6" style={{ width: "100%", marginBottom: 24 }}>
        <thead>
          <tr>
            <th>ID</th><th>Provider</th><th>Plan</th><th>Rate/MCF</th><th>Fee</th><th>Source</th><th>Fetched</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td><td>{r.provider}</td><td>{r.plan_name}</td>
              <td>{r.rate_per_mcf}</td><td>{r.monthly_fee}</td><td>{r.source}</td><td>{String(r.fetched_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Customers</h2>
      <table border="1" cellPadding="6" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Provider</th><th>NOPEC</th><th>Expires</th><th>POA</th><th>Created</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.full_name}</td><td>{c.email}</td><td>{c.provider}</td>
              <td>{String(c.on_nopec)}</td><td>{c.contract_expires || ""}</td><td>{String(c.poa_signed)}</td>
              <td>{String(c.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// ss