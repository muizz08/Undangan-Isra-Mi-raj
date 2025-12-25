document.addEventListener("DOMContentLoaded", () => {
  const btnOpen = document.getElementById("btnOpen");
  const opening = document.getElementById("buka-undangan");
  const main = document.getElementById("main");

  // Lock scroll saat opening muncul
  document.body.classList.add("lock-scroll");

  btnOpen.addEventListener("click", () => {
    // Ubah teks tombol
    btnOpen.innerText = "Selamat Datang";

    // Fade out opening
    opening.style.transition = "opacity 0.6s ease";
    opening.style.opacity = "0";

    setTimeout(() => {
      // Hapus opening dari DOM
      opening.remove();

      // Tampilkan main dengan fade-in
      main.classList.remove("hidden");
      main.style.opacity = 0;
      main.style.transition = "opacity 0.6s ease";
      setTimeout(() => {
        main.style.opacity = 1;

        // Scroll otomatis ke atas
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Hapus lock scroll
        document.body.classList.remove("lock-scroll");

        const bgMusic = document.getElementById("bgMusic");
      if (bgMusic) {
        bgMusic.play().catch(err => console.log("Audio play failed:", err));
      }
      }, 50);
    }, 600);
  });

  // === Countdown ===
  const target = new Date("2026-01-30T19:00:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateTimer() {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }
  updateTimer();
  setInterval(updateTimer, 1000);

  // === Fade-up on scroll ===
  const faders = document.querySelectorAll(".fade-up, .gallery-item, .card-ev, .section-penutup .penutup-inner");
  const appearOptions = { threshold: 0.15 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(f => appearOnScroll.observe(f));

  // === Gallery Lightbox ===
  const lightbox = document.getElementById("lightbox-modal"); 
const lbImg = document.querySelector("#lightbox-modal .lb-img");
const lbCaption = document.querySelector("#lightbox-modal .lb-caption");
const lbClose = document.querySelector("#lightbox-modal .lb-close");

if (lightbox && lbImg && lbClose) {
    const galleryItems = document.querySelectorAll(".gallery-card"); // Menggunakan .gallery-card karena lebih dekat ke gambar

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            
            // Perbaikan di sini: Ambil teks dari p di dalam .overlay
            const cap = item.querySelector(".overlay p") ? item.querySelector(".overlay p").textContent : "Dokumentasi"; 
            
            if (img) {
                lbImg.src = img.src;
                lbCaption.textContent = cap;
                lightbox.classList.add("active");
                lightbox.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
            }
        });
    });

    lbClose.addEventListener("click", closeLB);
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLB();
    });

    function closeLB() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}

  // === Nama tamu dari query string ===
  const params = new URLSearchParams(window.location.search);
  const nama = params.get("to");
  if (nama) {
    const el = document.querySelector(".nama-tamu");
    if (el) el.textContent = decodeURIComponent(nama);
  }

  // === Stagger animation gallery ===
  const imgs = document.querySelectorAll(".gallery-item");
  imgs.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    el.classList.add("fade-up");
  });
});
const appearOptions = { threshold: 0.15 };
