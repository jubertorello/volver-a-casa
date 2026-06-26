"use client";

import { useState } from "react";
import { login } from "../../lib/actions/auth";
import "../../styles/admin.css";

export default function AdminLogin() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setErrorMsg(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <h1 className="admin-title" style={{ fontSize: "1.8rem" }}>Panel de Control</h1>
        <p style={{ color: "var(--ink-soft)", marginBottom: "32px", fontSize: "0.95rem" }}>
          Ingresa tus credenciales para acceder al gestor de contenidos.
        </p>

        <form onSubmit={handleLogin}>
          {errorMsg && (
            <div style={{ padding: "12px", backgroundColor: "#fee2e2", color: "#b91c1c", borderRadius: "var(--r-sm)", marginBottom: "16px", fontSize: "0.9rem" }}>
              {errorMsg}
            </div>
          )}

          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="admin-input" 
              placeholder="ejemplo@fundacionmanantial.org" 
              defaultValue=""
              required 
            />
          </div>
          
          <div className="admin-form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              className="admin-input" 
              placeholder="••••••••" 
              defaultValue=""
              required 
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", marginTop: "16px", padding: "12px" }} disabled={loading}>
            {loading ? "Entrando..." : "Entrar al CMS"}
          </button>
        </form>
      </div>
    </div>
  );
}
