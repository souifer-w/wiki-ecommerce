import { useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminLoginPage.css";
import gsap from "gsap";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Reference for the complete login page.
  const pageRef = useRef<HTMLDivElement | null>(null);

  // Reference for the background decoration.
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  // Reference for the login card.
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Reference for the login form.
  const formRef = useRef<HTMLFormElement | null>(null);

  // Animates the admin login page on initial load.
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".admin-login-bg", {
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".admin-login-brand",
          {
            opacity: 0,
            y: -25,
            scale: 0.9,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          "-=0.5",
        )
        .from(
          cardRef.current,
          {
            opacity: 0,
            y: 45,
            scale: 0.97,
            duration: 0.8,
          },
          "-=0.35",
        )
        .from(
          ".admin-login-label",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
          },
          "-=0.45",
        )
        .from(
          ".admin-login-top h1",
          {
            opacity: 0,
            y: 18,
            duration: 0.55,
          },
          "-=0.3",
        )
        .from(
          ".admin-login-top p",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
          },
          "-=0.3",
        )
        .from(
          ".admin-login-field",
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.12,
          },
          "-=0.2",
        )
        .from(
          ".admin-login-button",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.25",
        )
        .from(
          ".admin-login-bottom",
          {
            opacity: 0,
            y: 10,
            duration: 0.4,
          },
          "-=0.25",
        )
        .from(
          ".admin-login-footer",
          {
            opacity: 0,
            y: 8,
            duration: 0.4,
          },
          "-=0.2",
        );

      // Adds subtle movement to the decorative background circles.
      gsap.to(".bg-circle-one", {
        x: 35,
        y: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".bg-circle-two", {
        x: -30,
        y: 25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".bg-circle-three", {
        x: 20,
        y: -25,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animates the error message when authentication fails.
  useEffect(() => {
    if (!error || !pageRef.current) return;

    gsap.fromTo(
      ".admin-login-error",
      {
        opacity: 0,
        y: -8,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      ".admin-login-error span",
      {
        scale: 0.5,
        rotation: -15,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "back.out(2)",
      },
    );
  }, [error]);

  // Animates the login button while authentication is loading.
  useEffect(() => {
    if (!loading) return;

    gsap.to(".admin-login-button", {
      scale: 0.98,
      duration: 0.2,
      ease: "power2.out",
    });

    return () => {
      gsap.to(".admin-login-button", {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };
  }, [loading]);

  // Handles administrator authentication.
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/admin");
    } catch {
      setError("Email or password is incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {" "}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        rel="stylesheet"
      />
      <div className="admin-login-page" ref={pageRef}>
        <div className="admin-login-bg" ref={backgroundRef}>
          <div className="bg-circle bg-circle-one"></div>
          <div className="bg-circle bg-circle-two"></div>
          <div className="bg-circle bg-circle-three"></div>
          <div className="bg-grid"></div>
        </div>

        <div className="admin-login-container">
          <div className="admin-login-brand">WIKI</div>

          <div className="admin-login-card" ref={cardRef}>
            <div className="admin-login-top">
              <span className="admin-login-label">ADMIN PANEL</span>

              <h1>
                Welcome <em>back.</em>
              </h1>

              <p>Sign in to access your WIKI store dashboard.</p>
            </div>

            <form
              className="admin-login-form"
              onSubmit={handleLogin}
              ref={formRef}
            >
              <div className="admin-login-field">
                <label htmlFor="admin-email">Email address</label>

                <input
                  id="admin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="admin-login-field">
                <label htmlFor="admin-password">Password</label>

                <div className="password-input-wrapper">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="admin-login-error">
                  <span>!</span>

                  <p>{error}</p>
                </div>
              )}

              <button
                className="admin-login-button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="admin-login-loading">
                    <span className="admin-login-spinner"></span>
                    Signing in...
                  </span>
                ) : (
                  <>
                    <span>Sign in</span>

                    <span className="admin-login-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="admin-login-bottom">
              <span className="login-line"></span>

              <span>Secure WIKI administrator access</span>

              <span className="login-line"></span>
            </div>
          </div>

          <div className="admin-login-footer">
            © {new Date().getFullYear()} WIKI
          </div>
        </div>
      </div>{" "}
    </>
  );
}
