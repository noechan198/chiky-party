(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  const services = document.querySelectorAll(".service");
  if ("IntersectionObserver" in window && services.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const order = Number(el.dataset.order || 0);
          window.setTimeout(() => el.classList.add("is-visible"), order * 120);
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );
    services.forEach((service, i) => {
      service.dataset.order = String(i);
      observer.observe(service);
    });
  } else {
    services.forEach((service) => service.classList.add("is-visible"));
  }

  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");
    let index = 0;
    let timer = null;
    let touchStartX = 0;
    let touchDeltaX = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Ir a foto ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.querySelectorAll(".carousel-dot"));

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    };

    const goTo = (next) => {
      index = (next + slides.length) % slides.length;
      update();
      restartAutoplay();
    };

    const stopAutoplay = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const startAutoplay = () => {
      if (prefersReducedMotion || slides.length < 2) return;
      stopAutoplay();
      timer = window.setInterval(() => goTo(index + 1), 5000);
    };

    const restartAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    prevBtn?.addEventListener("click", () => goTo(index - 1));
    nextBtn?.addEventListener("click", () => goTo(index + 1));

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchDeltaX = 0;
        stopAutoplay();
      },
      { passive: true }
    );

    track.addEventListener(
      "touchmove",
      (e) => {
        touchDeltaX = e.changedTouches[0].screenX - touchStartX;
      },
      { passive: true }
    );

    track.addEventListener("touchend", () => {
      if (Math.abs(touchDeltaX) > 50) {
        goTo(touchDeltaX > 0 ? index - 1 : index + 1);
      } else {
        startAutoplay();
      }
    });

    update();
    startAutoplay();
  }
})();
