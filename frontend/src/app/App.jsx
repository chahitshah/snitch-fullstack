import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <main className="auth-page">
      <section className="auth-card home-card">
        <Link className="brand" to="/" aria-label="Snitch home">
          <span className="brand-mark" aria-hidden="true">s</span>
          <span>snitch</span>
        </Link>

        <div className="auth-heading">
          <p className="eyebrow">Welcome to Snitch</p>
          <h1>{user?.fullname ? `Hello, ${user.fullname}` : "Hello"}</h1>
          <p className="auth-description">
            You are signed in and ready to use the app.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App