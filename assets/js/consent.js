// Consent gate for advertising on bot-creator.fr.
// The Google AdSense script is NOT loaded until the visitor accepts.
// The choice is kept in this browser's localStorage under "bc-consent-ads".
(function () {
  var KEY = "bc-consent-ads";
  var ADS_SRC =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9146609240142753";

  function read() {
    try {
      return window.localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function write(value) {
    try {
      window.localStorage.setItem(KEY, value);
    } catch (e) {
      /* storage blocked: the choice only lasts for this page view */
    }
  }

  function loadAds() {
    if (document.querySelector("script[data-bc-ads]")) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = ADS_SRC;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-bc-ads", "1");
    document.head.appendChild(s);
  }

  function closeBanner() {
    var el = document.getElementById("bc-consent");
    if (el) el.remove();
  }

  function decide(value) {
    write(value);
    closeBanner();
    if (value === "granted") loadAds();
  }

  function openBanner() {
    if (document.getElementById("bc-consent")) return;
    var box = document.createElement("div");
    box.id = "bc-consent";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-labelledby", "bc-consent-title");
    box.setAttribute("aria-describedby", "bc-consent-text");
    box.style.cssText =
      "position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:1000;max-width:42rem;margin:0 auto;" +
      "padding:1.25rem;border-radius:.75rem;background:#16161a;color:#f2f2f5;" +
      "border:1px solid #3a3a44;box-shadow:0 8px 32px rgba(0,0,0,.5);font:14px/1.5 system-ui,sans-serif";

    var title = document.createElement("p");
    title.id = "bc-consent-title";
    title.style.cssText = "margin:0 0 .5rem;font-weight:700;font-size:1rem";
    title.textContent = "Advertising on this website";

    var text = document.createElement("p");
    text.id = "bc-consent-text";
    text.style.cssText = "margin:0 0 1rem";
    text.innerHTML =
      "This website displays ads from Google AdSense. If you accept, Google and its partners may " +
      "set cookies or use identifiers on your device to serve and measure ads. If you refuse, no " +
      "advertising script is loaded. You can change your choice at any time from the footer. " +
      'See the <a href="/privacy-policy.html#website" style="color:#a5b4ff;text-decoration:underline">privacy policy</a>.';

    var row = document.createElement("div");
    row.style.cssText = "display:flex;gap:.75rem;flex-wrap:wrap";

    function button(label, value, primary) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.style.cssText =
        "min-height:2.5rem;padding:0 1.25rem;border-radius:.5rem;font:inherit;font-weight:600;cursor:pointer;" +
        (primary
          ? "background:#a5b4ff;color:#101018;border:1px solid #a5b4ff"
          : "background:transparent;color:#f2f2f5;border:1px solid #6a6a78");
      b.addEventListener("click", function () {
        decide(value);
      });
      return b;
    }

    // Refuse and accept are given equal prominence in size and position.
    var refuse = button("Refuse", "denied", false);
    var accept = button("Accept", "granted", true);
    row.appendChild(refuse);
    row.appendChild(accept);
    box.appendChild(title);
    box.appendChild(text);
    box.appendChild(row);
    document.body.appendChild(box);
    refuse.focus();
  }

  function init() {
    var choice = read();
    if (choice === "granted") loadAds();
    else if (choice !== "denied") openBanner();

    document.addEventListener("click", function (ev) {
      var t = ev.target;
      if (t && t.closest && t.closest("[data-consent-open]")) {
        ev.preventDefault();
        openBanner();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
