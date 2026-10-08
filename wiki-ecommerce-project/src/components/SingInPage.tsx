import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import "./SingInPage.css";
import gsap from "gsap";

export function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Reference for the complete sign-in page.
  const pageRef = useRef<HTMLElement | null>(null);

  // Reference for the sign-in container.
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reference for the sign-in form.
  const formRef = useRef<HTMLFormElement | null>(null);

  // Animates the sign-in page on initial load.
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".signin-logo", {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".signin-header span",
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
          },
          "-=0.3",
        )
        .from(
          ".signin-header h1",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.25",
        )
        .from(
          ".signin-header p",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
          },
          "-=0.3",
        )
        .from(
          ".signin-field",
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.12,
          },
          "-=0.15",
        )
        .from(
          ".signin-submit",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.2",
        )
        .from(
          ".signin-divider",
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.2",
        )
        .from(
          ".google-signin",
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
          },
          "-=0.2",
        )
        .from(
          ".signin-create",
          {
            opacity: 0,
            y: 10,
            duration: 0.45,
          },
          "-=0.2",
        )

        .from(
          ".signin-back",
          {
            opacity: 0,
            y: 8,
            duration: 0.4,
          },
          "-=0.2",
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animates validation and Firebase messages.
  useEffect(() => {
    if (!message || !pageRef.current) return;

    gsap.fromTo(
      ".signin-message",
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
  }, [message]);

  // Animates the submit button while signing in.
  useEffect(() => {
    if (!loading || !pageRef.current) return;

    gsap.to(".signin-submit", {
      scale: 0.98,
      duration: 0.2,
      ease: "power2.out",
    });

    gsap.to(".signin-submit", {
      opacity: 0.75,
      duration: 0.2,
      ease: "power2.out",
    });

    return () => {
      gsap.to(".signin-submit", {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };
  }, [loading]);

  // Handles email and password authentication.
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email.trim(), password);

      navigate("/");
    } catch (error) {
      const firebaseError = error as {
        code?: string;
      };

      if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/wrong-password"
      ) {
        setMessage("Incorrect email or password.");
      } else if (firebaseError.code === "auth/user-not-found") {
        setMessage("No account found. Please create an account first.");
      } else if (firebaseError.code === "auth/too-many-requests") {
        setMessage("Too many attempts. Please try again later.");
      } else if (firebaseError.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handles Google authentication.
  const handleGoogleSignIn = async () => {
    setMessage("");

    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (error) {
      const firebaseError = error as {
        code?: string;
      };

      if (firebaseError.code === "auth/popup-closed-by-user") {
        setMessage("Google sign in was cancelled.");
      } else if (firebaseError.code === "auth/popup-blocked") {
        setMessage("Please allow popups to continue with Google.");
      } else if (
        firebaseError.code === "auth/account-exists-with-different-credential"
      ) {
        setMessage(
          "An account already exists with this email. Please sign in with your email and password.",
        );
      } else {
        setMessage("Unable to sign in with Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        rel="stylesheet"
      />
      ;
      <main className="signin-page" ref={pageRef}>
        <div className="signin-container" ref={containerRef}>
          <Link to="/" className="signin-logo">
            WIKI
          </Link>

          <div className="signin-header">
            <span>WIKI ACCOUNT</span>

            <h1>WELCOME BACK</h1>

            <p>Sign in to access your account and manage your orders.</p>
          </div>

          <form className="signin-form" onSubmit={handleSignIn} ref={formRef}>
            <div className="signin-field">
              <label htmlFor="email">EMAIL</label>

              <input
                id="email"
                type="email"
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="signin-field">
              <label htmlFor="password">PASSWORD</label>

              <div className="signin-password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="YOUR PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="signin-password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {message && <p className="signin-message">{message}</p>}

            <button type="submit" className="signin-submit" disabled={loading}>
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>

            <div className="signin-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <button
              type="button"
              className="google-signin"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <span className="google-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.75 9.75 0 0 0 12 21.5Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.53 13.59A5.86 5.86 0 0 1 6.22 12c0-.55.11-1.09.31-1.59V7.88H3.28A9.5 9.5 0 0 0 2.25 12c0 1.48.35 2.88 1.03 4.12l3.25-2.53Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.38c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.47 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.72 5.38l3.25 2.53C7.3 8.1 9.46 6.38 12 6.38Z"
                  />
                </svg>
              </span>

              <span>CONTINUE WITH GOOGLE</span>
            </button>
          </form>

          <div className="signin-create">
            <span>DON'T HAVE AN ACCOUNT?</span>

            <Link to="/sign-up">CREATE ACCOUNT</Link>
          </div>

          <Link to="/" className="signin-back">
            ← BACK TO WIKI
          </Link>
        </div>
      </main>{" "}
    </>
  );
}
