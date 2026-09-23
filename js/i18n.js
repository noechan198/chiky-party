(() => {
  const STORAGE_KEY = "chiky-lang";

  const messages = {
    es: {
      "meta.title": "¡CHiky Party! — Renta de Inflables, Juegos y Caballetes",
      "meta.description": "CHiky Party — Renta de inflables, juegos y caballetes para fiestas infantiles. ¡La diversión está por llegar!",
      "brand.home": "CHiky Party inicio",
      "nav.label": "Principal",
      "nav.services": "Servicios",
      "nav.gallery": "Galería",
      "nav.book": "Reservar",
      "nav.menu": "Abrir menú",
      "lang.label": "Idioma",
      "hero.imgAlt": "Niños disfrutando inflables, trampolín y caballetes en una fiesta CHiky Party",
      "hero.kicker": "Próximamente",
      "hero.date": "20 de octubre",
      "hero.tagline": "¡La diversión está por llegar!",
      "hero.ctaBook": "Quiero reservar",
      "hero.ctaServices": "Ver servicios",
      "services.title": "Renta de Inflables, Juegos y Caballetes",
      "services.lead": "Todo lo que necesitas para que la fiesta de tus peques sea inolvidable.",
      "services.inflatables.title": "Inflables",
      "services.inflatables.text": "Castillos saltarines coloridos para que los niños brinquen sin parar y la energía de la fiesta se sienta desde el primer minuto.",
      "services.games.title": "Juegos",
      "services.games.text": "Trampolines y más actividades para mover el cuerpo, reírse juntos y llenar el jardín de emoción.",
      "services.easels.title": "Caballetes",
      "services.easels.text": "Estaciones de arte con pinturas y lienzos para que cada niño cree su propia obra maestra en la fiesta.",
      "benefits.label": "Lo que ofrecemos",
      "benefits.fun": "Diversión garantizada",
      "benefits.quality": "Materiales de calidad",
      "benefits.punctuality": "Puntualidad",
      "benefits.service": "Excelente servicio",
      "gallery.title": "Así se vive una fiesta CHiky",
      "gallery.lead": "Inflables, juegos y arte bajo el sol: diversión garantizada.",
      "gallery.carousel": "Fotos de fiestas CHiky Party",
      "gallery.prev": "Foto anterior",
      "gallery.next": "Foto siguiente",
      "gallery.dots": "Elegir foto",
      "gallery.dot": "Ir a foto {n}",
      "gallery.alt1": "Niños pintando en caballetes con inflable y trampolín al fondo",
      "gallery.alt2": "Niños brindando en la mesa de fiesta con castillo inflable detrás",
      "gallery.alt3": "Niños saltando en un trampolín con red de seguridad",
      "gallery.alt4": "Estación de caballetes artísticos al aire libre en un evento",
      "contact.title": "Agenda tu fecha",
      "contact.lead": "Escríbenos y arma la fiesta perfecta con inflables, juegos y caballetes.",
      "contact.note": "Abre el 20 de octubre · Reserva con anticipación",
      "contact.whatsapp": "Hola CHiky Party! Quiero cotizar una renta para mi fiesta.",
      "footer.tagline": "Renta de Inflables, Juegos y Caballetes",
    },
    en: {
      "meta.title": "CHiky Party! — Inflatable, Games & Easel Rentals",
      "meta.description": "CHiky Party — Rentals of inflatables, games, and easels for kids' parties. The fun is almost here!",
      "brand.home": "CHiky Party home",
      "nav.label": "Main",
      "nav.services": "Services",
      "nav.gallery": "Gallery",
      "nav.book": "Book now",
      "nav.menu": "Open menu",
      "lang.label": "Language",
      "hero.imgAlt": "Kids enjoying inflatables, a trampoline, and easels at a CHiky Party event",
      "hero.kicker": "Coming soon",
      "hero.date": "October 20",
      "hero.tagline": "The fun is almost here!",
      "hero.ctaBook": "Book now",
      "hero.ctaServices": "See services",
      "services.title": "Inflatable, Games & Easel Rentals",
      "services.lead": "Everything you need to make your little ones' party unforgettable.",
      "services.inflatables.title": "Inflatables",
      "services.inflatables.text": "Colorful bounce castles so kids can jump nonstop and the party energy kicks in from the very first minute.",
      "services.games.title": "Games",
      "services.games.text": "Trampolines and more activities to get everyone moving, laughing, and filling the yard with excitement.",
      "services.easels.title": "Easels",
      "services.easels.text": "Art stations with paints and canvases so every child can create their own masterpiece at the party.",
      "benefits.label": "What we offer",
      "benefits.fun": "Guaranteed fun",
      "benefits.quality": "Quality materials",
      "benefits.punctuality": "Punctuality",
      "benefits.service": "Excellent service",
      "gallery.title": "This is how a CHiky party feels",
      "gallery.lead": "Inflatables, games, and art under the sun: guaranteed fun.",
      "gallery.carousel": "CHiky Party event photos",
      "gallery.prev": "Previous photo",
      "gallery.next": "Next photo",
      "gallery.dots": "Choose photo",
      "gallery.dot": "Go to photo {n}",
      "gallery.alt1": "Kids painting at easels with an inflatable and trampoline in the background",
      "gallery.alt2": "Kids toasting at the party table with a bounce castle behind them",
      "gallery.alt3": "Kids jumping on a trampoline with a safety net",
      "gallery.alt4": "Outdoor art easel station set up for an event",
      "contact.title": "Book your date",
      "contact.lead": "Message us and build the perfect party with inflatables, games, and easels.",
      "contact.note": "Opening October 20 · Book ahead",
      "contact.whatsapp": "Hi CHiky Party! I'd like a quote for a party rental.",
      "footer.tagline": "Inflatable, Games & Easel Rentals",
    },
  };

  const getSavedLang = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
    const browser = (navigator.language || "es").toLowerCase();
    return browser.startsWith("en") ? "en" : "es";
  };

  const t = (lang, key) => messages[lang]?.[key] ?? messages.es[key] ?? key;

  const applyLanguage = (lang) => {
    const dict = messages[lang] || messages.es;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key && dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (key && dict[key] != null) el.setAttribute("alt", dict[key]);
    });

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const key = el.getAttribute("data-i18n-content");
      if (key && dict[key] != null) el.setAttribute("content", dict[key]);
    });

    const titleEl = document.querySelector("title[data-i18n]");
    if (titleEl) {
      const key = titleEl.getAttribute("data-i18n");
      if (key && dict[key] != null) document.title = dict[key];
    }

    const wa = document.querySelector("[data-whatsapp]");
    if (wa && dict["contact.whatsapp"]) {
      wa.href = `https://wa.me/14374303818?text=${encodeURIComponent(dict["contact.whatsapp"])}`;
    }

    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      const template = dict["gallery.dot"] || "Go to photo {n}";
      dot.setAttribute("aria-label", template.replace("{n}", String(i + 1)));
    });

    localStorage.setItem(STORAGE_KEY, lang);
    document.dispatchEvent(new CustomEvent("chiky:langchange", { detail: { lang } }));
  };

  const init = () => {
    const lang = getSavedLang();
    applyLanguage(lang);

    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLanguage(btn.getAttribute("data-set-lang") || "es");
      });
    });
  };

  window.ChikyI18n = { applyLanguage, t, getSavedLang };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
