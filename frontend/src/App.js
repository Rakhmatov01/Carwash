import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&w=1200&q=80";

const emptyAuth = { username: "", email: "", password: "", role: "user" };

export default function App() {
  const [authForm, setAuthForm] = useState(emptyAuth);
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem("carwashTokens");
    return saved ? JSON.parse(saved) : null;
  });
  const [me, setMe] = useState(null);
  const [carwashes, setCarwashes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [comments, setComments] = useState([]);
  const [serviceSelection, setServiceSelection] = useState([]);
  const [quote, setQuote] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const authHeader = useMemo(
    () => (tokens?.access ? { Authorization: `Bearer ${tokens.access}` } : {}),
    [tokens]
  );

  const api = useCallback(
    async (path, options = {}) => {
      const response = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json", ...authHeader, ...(options.headers || {}) },
        ...options,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || JSON.stringify(data));
      return data;
    },
    [authHeader]
  );

  const runAction = async (fn) => {
    setMessage("");
    try {
      await fn();
    } catch (error) {
      setMessage(error.message || "Xatolik yuz berdi");
    }
  };

  const fetchCarwashes = useCallback(
    () =>
      runAction(async () => {
        const data = await api("/carwash/");
        setCarwashes(data);
        if (!activeId && data.length) setActiveId(data[0].id);
      }),
    [activeId, api]
  );

  const fetchMe = useCallback(
    () =>
      runAction(async () => {
        const user = await api("/user/me/");
        setMe(user);
      }),
    [api]
  );

  const fetchComments = useCallback(
    (id) =>
      runAction(async () => {
        const data = await api(`/carwash/${id}/comments/`);
        setComments(data);
      }),
    [api]
  );

  useEffect(() => {
    fetchCarwashes();
  }, [fetchCarwashes]);

  useEffect(() => {
    if (tokens) {
      localStorage.setItem("carwashTokens", JSON.stringify(tokens));
      fetchMe();
    } else {
      localStorage.removeItem("carwashTokens");
      setMe(null);
    }
  }, [tokens, fetchMe]);

  useEffect(() => {
    if (activeId) {
      fetchComments(activeId);
      setServiceSelection([]);
      setQuote(null);
    }
  }, [activeId, fetchComments]);

  const filteredCarwashes = useMemo(
    () =>
      carwashes.filter((wash) =>
        `${wash.name} ${wash.address}`.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [carwashes, search]
  );

  const activeWash = useMemo(() => carwashes.find((wash) => wash.id === activeId) || null, [carwashes, activeId]);
  const myCarwashes = useMemo(() => carwashes.filter((wash) => wash.owner === me?.id), [carwashes, me]);

  const handleRegister = (event) => {
    event.preventDefault();
    runAction(async () => {
      await api("/user/register/", { method: "POST", body: JSON.stringify(authForm) });
      setMessage("Ro'yxatdan o'tdingiz. Endi login qiling.");
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    runAction(async () => {
      const data = await api("/user/login/", {
        method: "POST",
        body: JSON.stringify({ username: authForm.username, password: authForm.password }),
      });
      setTokens(data);
      setMessage("Tizimga kirdingiz");
    });
  };

  const handleLogout = () =>
    runAction(async () => {
      if (tokens?.refresh) {
        await api("/user/logout/", { method: "POST", body: JSON.stringify({ refresh: tokens.refresh }) });
      }
      setTokens(null);
      setMessage("Chiqdingiz");
    });

  const requestQuote = () =>
    runAction(async () => {
      if (!activeId) return;
      const data = await api(`/carwash/${activeId}/quote/`, {
        method: "POST",
        body: JSON.stringify({ service_ids: serviceSelection }),
      });
      setQuote(data);
    });

  const submitRating = (event) => {
    event.preventDefault();
    runAction(async () => {
      if (!activeId) return;
      await api(`/carwash/${activeId}/rate/`, {
        method: "POST",
        body: JSON.stringify({ score: Number(rating) }),
      });
      await fetchCarwashes();
      setMessage("Baho yuborildi");
    });
  };

  const submitComment = (event) => {
    event.preventDefault();
    runAction(async () => {
      if (!activeId || !commentText.trim()) return;
      await api(`/carwash/${activeId}/comments/`, {
        method: "POST",
        body: JSON.stringify({ text: commentText }),
      });
      setCommentText("");
      await fetchComments(activeId);
      setMessage("Komment qo'shildi");
    });
  };

  return (
    <div className="page">
      <h1 className="title">Oddiy foydalanuvchi</h1>

      <section className="panel">
        <div className="topbar">
          <div className="brand">🧾 MoykaTop</div>
          <nav>
            <span className="active">Moykalar</span>
            <span>Kontaktlar</span>
            <span>Profil</span>
          </nav>
        </div>

        <div className="auth card">
          <form onSubmit={handleRegister}>
            <input placeholder="Username" value={authForm.username} onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })} />
            <input placeholder="Email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
            <input type="password" placeholder="Password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
            <select value={authForm.role} onChange={(e) => setAuthForm({ ...authForm, role: e.target.value })}>
              <option value="user">user</option>
              <option value="partner">partner</option>
            </select>
            <button type="submit">Register</button>
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleLogout}>Logout</button>
          </form>
          <small>{me ? `${me.username} (${me.role})` : "Login qilinmagan"}</small>
        </div>

        <h2>Avtomoykalar</h2>
        <input className="search" placeholder="Manzil bo‘yicha qidirish..." value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="cards">
          {filteredCarwashes.map((wash) => (
            <article key={wash.id} className="wash-card" onClick={() => setActiveId(wash.id)}>
              <img src={wash.image ? `${API_BASE}${wash.image}` : PLACEHOLDER_IMG} alt={wash.name} />
              <div className="body">
                <div className="head-row">
                  <h3>{wash.name}</h3>
                  <span>{"★".repeat(Math.round(wash.rating_avg || 0)).padEnd(5, "☆")}</span>
                </div>
                <p>{wash.address}</p>
                <small>hamkor{wash.owner} | {new Date(wash.created_at).toLocaleDateString("en-GB")}</small>
              </div>
            </article>
          ))}
        </div>

        {activeWash && (
          <div className="detail card">
            <h3>{activeWash.name} - xizmatlar</h3>
            <div className="services">
              {activeWash.services.map((service) => (
                <label key={service.id}>
                  <input
                    type="checkbox"
                    checked={serviceSelection.includes(service.id)}
                    onChange={() =>
                      setServiceSelection((prev) =>
                        prev.includes(service.id) ? prev.filter((id) => id !== service.id) : [...prev, service.id]
                      )
                    }
                  />
                  {service.title} ({service.price} so'm)
                </label>
              ))}
            </div>
            <div className="actions">
              <button onClick={requestQuote}>Quote</button>
              {quote && <strong>Jami: {quote.total} so'm</strong>}
              <form onSubmit={submitRating}>
                <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
                <button type="submit" disabled={!tokens}>Rate</button>
              </form>
            </div>
            <form className="comment-form" onSubmit={submitComment}>
              <textarea placeholder="Komment yozing" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
              <button type="submit" disabled={!tokens}>Comment</button>
            </form>
            <ul className="comment-list">
              {comments.map((item) => (
                <li key={item.id}><b>{item.username}</b>: {item.text}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <h1 className="title">Hamkor</h1>
      <section className="panel">
        <div className="topbar">
          <div className="brand">🧾 MoykaTop</div>
          <nav>
            <span className="active">Moykalarim</span>
            <span>Moykalar</span>
            <span>Importlar</span>
            <span>Profil</span>
          </nav>
        </div>
        <div className="partner-header">
          <h2>Salom, {me?.username || "hamkor"}</h2>
          <button className="new-btn">+ Yangi Moyka Qo'shish</button>
        </div>

        <div className="partner-grid">
          <div className="card">
            <h3>Moykalarim</h3>
            {myCarwashes.map((wash) => (
              <div key={wash.id} className="my-item">
                <div>
                  <strong>{wash.name}</strong>
                  <p>{wash.address}</p>
                </div>
                <span>{"★".repeat(Math.round(wash.rating_avg || 0)).padEnd(5, "☆")}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Administratsiya Paneli</h3>
            <div className="stats">
              <div><b>{comments.length}</b><span>Bugungi buyurtmalar</span></div>
              <div><b>{carwashes.length}</b><span>Jami buyurtmalar</span></div>
              <div><b>{carwashes.reduce((sum, x) => sum + (x.rating_count || 0), 0)}</b><span>Mijozlar</span></div>
              <div className="wide"><b>{carwashes.reduce((sum, x) => sum + (x.rating_avg || 0), 0).toFixed(1)} ball</b><span>Jami reyting</span></div>
            </div>
          </div>
        </div>
      </section>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
