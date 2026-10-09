// Consent on bot-creator.fr is handled by Google's certified consent
// management platform (Funding Choices), delivered with the AdSense script.
// This file only wires the footer link "Ad & cookie settings" so that a
// visitor can reopen the Google consent message and change their choice.
(function () {
  document.addEventListener("click", function (ev) {
    var t = ev.target;
    if (!t || !t.closest || !t.closest("[data-consent-open]")) return;
    ev.preventDefault();
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({
      CONSENT_DATA_READY: function () {
        if (typeof window.googlefc.showRevocationMessage === "function") {
          window.googlefc.showRevocationMessage();
        }
      },
    });
  });
})();
