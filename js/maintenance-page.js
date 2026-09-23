(() => {
  const STORAGE_KEY = "chiky-lang";
  const config = window.CHIKY_CONFIG || {};
  const phone = config.whatsappNumber || "14374303818";

  const messages = {
    es: {
      title: "Sitio en mantenimiento",
      lead: "Estamos haciendo mejoras para que la fiesta quede aún mejor. Volvemos muy pronto.",
      note: "Gracias por tu paciencia.",
      whatsapp: "Hola CHiky Party! Vi que el sitio está en mantenimiento y me gustaría cotizar.",
      docTitle: "CHiky Party — En mantenimiento",
    },
    en: {
      title: "Site under maintenance",
      lead: "We're making improvements so the party is even better. We'll be back very soon.",
      note: "Thanks for your patience.",
      whatsapp: "Hi CHiky Party! I saw the site is under maintenance and I'd like a quote.",
      docTitle: "CHiky Party — Under maintenance",
    },
  };

  const getLang = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
    return (navigator.language || "es").toLowerCase().startsWith("en") ? "en" : "es";
  };

  const apply = (lang) => {
    const dict = messages[lang] || messages.es;
    document.documentElement.lang = lang;
    document.title = dict.docTitle;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && dict[key] != null) el.textContent = dict[key];
    });

    const wa = document.querySelector("[data-whatsapp]");
    if (wa) {
      wa.href = `https://wa.me/${phone}?text=${encodeURIComponent(dict.whatsapp)}`;
    }

    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    localStorage.setItem(STORAGE_KEY, lang);
  };

  apply(getLang());

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      apply(btn.getAttribute("data-set-lang") || "es");
    });
  });
})();
