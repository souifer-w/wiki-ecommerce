import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import "./SingUpPage.css";
import gsap from "gsap";

export function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Reference for the complete sign-up page.
  const pageRef = useRef<HTMLElement | null>(null);

  // Reference for the sign-up container.
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reference for the sign-up form.
  const formRef = useRef<HTMLFormElement | null>(null);

  // Animates the sign-up page on initial load.
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".signup-logo", {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".signup-header span",
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
          },
          "-=0.3",
        )
        .from(
          ".signup-header h1",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.25",
        )
        .from(
          ".signup-header p",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
          },
          "-=0.3",
        )
        .from(
          ".signup-field",
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.15",
        )
        .from(
          ".signup-submit",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.2",
        )
        .from(
          ".signup-divider",
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.2",
        )
        .from(
          ".google-signup",
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
          },
          "-=0.2",
        )
        .from(
          ".signup-login",
          {
            opacity: 0,
            y: 10,
            duration: 0.45,
          },
          "-=0.2",
        )
        .from(
          ".signup-back",
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

  // Animates the validation and Firebase message.
  useEffect(() => {
    if (!message || !pageRef.current) return;

    gsap.fromTo(
      ".signup-message",
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

  // Animates the submit button while creating an account.
  useEffect(() => {
    if (!loading || !pageRef.current) return;

    gsap.to(".signup-submit", {
      scale: 0.98,
      opacity: 0.75,
      duration: 0.2,
      ease: "power2.out",
    });

    return () => {
      gsap.to(".signup-submit", {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };
  }, [loading]);

  // Handles email and password account creation.
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (!password) {
      setMessage("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      navigate("/sign-in");
    } catch (error) {
      const firebaseError = error as {
        code?: string;
      };

      if (firebaseError.code === "auth/email-already-in-use") {
        setMessage("This email is already registered. Please sign in.");
      } else if (firebaseError.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else if (firebaseError.code === "auth/weak-password") {
        setMessage("Password is too weak.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handles Google account creation.
  const handleGoogleSignUp = async () => {
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
        setMessage("Google sign up was cancelled.");
      } else if (firebaseError.code === "auth/popup-blocked") {
        setMessage("Please allow popups to continue with Google.");
      } else {
        setMessage("Unable to create your Google account.");
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

      <main className="signup-page" ref={pageRef}>
        <div className="signup-background">
          <div className="signup-circle signup-circle-one"></div>
          <div className="signup-circle signup-circle-two"></div>
          <div className="signup-circle signup-circle-three"></div>
          <div className="signup-grid"></div>
        </div>

        <div className="signup-container" ref={containerRef}>
          <Link to="/" className="signup-logo">
            WIKI
          </Link>

          <div className="signup-header">
            <span>WIKI ACCOUNT</span>

            <h1>CREATE ACCOUNT</h1>

            <p>
              Create your WIKI account to manage your orders and enjoy a more
              personal shopping experience.
            </p>
          </div>

          <form className="signup-form" onSubmit={handleSignUp} ref={formRef}>
            <div className="signup-field">
              <label htmlFor="name">FULL NAME</label>

              <input
                id="name"
                type="text"
                placeholder="YOUR FULL NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="signup-field">
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

            <div className="signup-field">
              <label htmlFor="password">PASSWORD</label>

              <div className="signup-password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="CREATE A PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>

              <div className="signup-password">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="CONFIRM YOUR PASSWORD"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  <span className="material-symbols-outlined">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {message && <p className="signup-message">{message}</p>}

            <button type="submit" className="signup-submit" disabled={loading}>
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>

            <div className="signup-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <button
              type="button"
              className="google-signup"
              onClick={handleGoogleSignUp}
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

          <div className="signup-login">
            <span>ALREADY HAVE AN ACCOUNT?</span>

            <Link to="/sign-in">SIGN IN</Link>
          </div>

          <Link to="/" className="signup-back">
            ← BACK TO WIKI
          </Link>
        </div>
      </main>
    </>
  );
}
