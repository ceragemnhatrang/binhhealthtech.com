/* binhho.vn – nạp header/footer dùng chung cho mọi trang.
   Dùng: <div data-include="partials/header.html"></div>
   Lưu ý: fetch cần chạy qua http(s) (GitHub Pages, hoặc `python3 -m http.server`),
   không chạy khi mở file trực tiếp bằng file://. */
(function () {
  "use strict";

  function include(el) {
    var url = el.getAttribute("data-include");
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error(url + " – " + r.status);
        return r.text();
      })
      .then(function (html) {
        el.outerHTML = html;
      })
      .catch(function (err) {
        console.error("Không nạp được partial:", err);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var slots = document.querySelectorAll("[data-include]");
    Promise.all(Array.prototype.map.call(slots, include)).then(function () {
      document.dispatchEvent(new Event("partials:loaded"));
    });
  });
})();
