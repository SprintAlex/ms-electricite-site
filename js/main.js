/* ABRASIVE DESIGN — interactions minimales, vanilla, sans dépendance */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("menu-open", open);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- Compteurs animés ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = (el.getAttribute("data-decimals") | 0);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.firstChild ? el.childNodes[0].nodeValue = target.toFixed(decimals).replace(".", ",") : el.textContent = target.toFixed(decimals).replace(".", ","); return; }
    var start = null, dur = 1400;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = (target * eased).toFixed(decimals).replace(".", ",");
      setNum(el, val, suffix);
      if (p < 1) requestAnimationFrame(frame);
      else setNum(el, target.toFixed(decimals).replace(".", ","), suffix);
    }
    requestAnimationFrame(frame);
  }
  function setNum(el, val, suffix) {
    el.childNodes[0].nodeValue = val;
    if (suffix && el.querySelector(".suf")) el.querySelector(".suf").textContent = suffix;
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var cObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); cObs.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cObs.observe(el); });
    }
  }

  /* ---------- Formulaire devis (Web3Forms) ---------- */
  var form = document.getElementById("devis-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var key = form.querySelector('input[name="access_key"]');
      // Garde-fou : clé non configurée
      if (!key || key.value.indexOf("WEB3FORMS_ACCESS_KEY") !== -1) {
        showStatus("err", "Formulaire non encore connecté. Contactez-nous par téléphone au 06 61 16 90 17.");
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.disabled = true; btn.textContent = "Envoi…";
      var data = new FormData(form);
      fetch("https://api.web3forms.com/submit", { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json.success) {
            form.reset();
            showStatus("ok", "Merci, votre demande est bien reçue. Nous vous recontactons rapidement.");
          } else {
            showStatus("err", "Une erreur est survenue. Appelez-nous au 06 61 16 90 17.");
          }
        })
        .catch(function () {
          showStatus("err", "Connexion impossible. Appelez-nous au 06 61 16 90 17.");
        })
        .finally(function () { btn.disabled = false; btn.textContent = original; });
    });
    function showStatus(kind, msg) {
      if (!status) return;
      status.className = "form-status " + kind;
      status.textContent = msg;
      status.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }
  }

  /* ---------- Année footer ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
