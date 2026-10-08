import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../firebase";
import "./Header.css";
import { type CartItem } from "../backend/Products";
import gsap from "gsap";

type CartPageProps = {
  cart: CartItem[];
};

export function Header({ cart }: CartPageProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const accountDropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // Listens for Firebase authentication changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  // Handles clicks outside the account dropdown.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Animates the header when it first appears.
  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".announcement", {
          opacity: 0,
          y: -12,
          duration: 0.45,
        })
        .from(
          ".logo",
          {
            opacity: 1,
            y: 10,
            duration: 0.55,
          },
          "-=0.2",
        )
        .from(
          ".nav-actions > *",
          {
            opacity: 0,
            y: 10,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.35",
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Animates the search box when it opens or closes.
  useEffect(() => {
    if (!searchBoxRef.current) return;

    if (searchOpen) {
      gsap.to(searchBoxRef.current, {
        width: window.innerWidth <= 430 ? 130 : 260,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(searchBoxRef.current, {
        width: 38,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [searchOpen]);

  // Animates the account dropdown when it opens.
  useEffect(() => {
    if (!accountDropdownRef.current || !accountOpen) return;

    gsap.fromTo(
      accountDropdownRef.current,
      {
        opacity: 0,
        y: -8,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      },
    );
  }, [accountOpen]);

  // Searches for products from the header.
  const searchProduct = () => {
    const value = search.trim();

    if (!value) {
      setSearchOpen(false);
      return;
    }

    navigate(`/collectionsPage?search=${encodeURIComponent(value)}`);

    setSearchOpen(false);
  };

  // Closes and resets the search box.
  const closeSearch = () => {
    setSearchOpen(false);
    setSearch("");
  };

  // Signs the current user out of Firebase.
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setAccountOpen(false);
    } catch {
      setAccountOpen(false);
    }
  };

  // Gets the first character used for the account avatar.
  const getUserInitial = () => {
    return (
      user?.displayName?.charAt(0) ||
      user?.email?.charAt(0) ||
      "U"
    ).toUpperCase();
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        rel="stylesheet"
      />
      <header className="site-header" ref={headerRef}>
        <div className="announcement">
          FREE DELIVERY ACROSS MOROCCO
          <span>•</span>
          CASH ON DELIVERY (COD) ONLY
          <span>•</span>
          PAY UPON ARRIVAL
        </div>

        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <span>WIKI</span>
          </Link>

          {/* Navigation */}
          <nav className="main-nav"></nav>

          {/* Header actions */}
          <div className="nav-actions">
            {/* Search */}
            <div
              className={`search-box ${searchOpen ? "active" : ""}`}
              ref={searchBoxRef}
            >
              <input
                type="text"
                placeholder="SEARCH PRODUCTS..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    searchProduct();
                  }

                  if (event.key === "Escape") {
                    closeSearch();
                  }
                }}
                tabIndex={searchOpen ? 0 : -1}
              />

              <button
                type="button"
                className="icon-btn"
                onClick={() => {
                  if (searchOpen) {
                    closeSearch();
                  } else {
                    setSearchOpen(true);
                  }
                }}
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                <span className="material-symbols-outlined">
                  {searchOpen ? "close" : "search"}
                </span>
              </button>
            </div>

            {/* Currency */}
            <button type="button" className="currency-btn">
              MAD (DH)
            </button>

            {/* Account */}
            <div className="account-wrapper" ref={accountRef}>
              {!user ? (
                <Link to="/sign-in" className="account-btn">
                  <span className="material-symbols-outlined">person</span>

                  <span className="account-text">SIGN IN</span>
                </Link>
              ) : (
                <>
                  {/* Google profile button */}
                  <button
                    type="button"
                    className="account-user-btn"
                    onClick={() => setAccountOpen((previous) => !previous)}
                    aria-label="Open account menu"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "Account"}
                        className="account-avatar"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="account-avatar-fallback">
                        {getUserInitial()}
                      </span>
                    )}
                  </button>

                  {/* Account dropdown */}
                  {accountOpen && (
                    <div className="account-dropdown" ref={accountDropdownRef}>
                      <div className="account-info">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || "Account"}
                            className="account-dropdown-avatar"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="account-dropdown-avatar account-avatar-fallback">
                            {getUserInitial()}
                          </span>
                        )}

                        <div className="account-details">
                          <strong>{user.displayName || "WIKI CUSTOMER"}</strong>

                          <span>{user.email || "No email"}</span>
                        </div>
                      </div>

                      <div className="account-dropdown-line"></div>

                      <button
                        type="button"
                        className="account-logout"
                        onClick={handleSignOut}
                      >
                        <span className="material-symbols-outlined">
                          logout
                        </span>
                        SIGN OUT
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Cart */}
            <Link to="/cartPage" className="bag-btn">
              <span className="material-symbols-outlined">shopping_bag</span>

              <span className="quantity-total">{totalQuantity}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
