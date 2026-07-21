(function () {
  "use strict";

  var data = window.HELP_DATA;
  if (!data || !data.sections) {
    document.getElementById("content").innerHTML =
      "<p class=\"welcome\">Данные справки не загружены. Пересоберите пакет: <code>python _build_help.py</code></p>";
    return;
  }

  var navEl = document.getElementById("nav");
  var contentEl = document.getElementById("content");
  var titleEl = document.getElementById("page-title");
  var leadEl = document.getElementById("page-lead");
  var searchEl = document.getElementById("search");
  var resultsEl = document.getElementById("search-results");

  var currentId = null;

  function byId(id) {
    for (var i = 0; i < data.sections.length; i++) {
      if (data.sections[i].id === id) return data.sections[i];
    }
    return null;
  }

  function setHash(sectionId, anchor) {
    var h = "#" + sectionId;
    if (anchor) h += "/" + anchor;
    if (location.hash !== h) {
      location.hash = h;
    }
  }

  function parseHash() {
    var raw = (location.hash || "").replace(/^#/, "");
    if (!raw) return { sectionId: null, anchor: null };
    var parts = raw.split("/");
    return { sectionId: parts[0] || null, anchor: parts[1] || null };
  }

  function renderNav() {
    navEl.innerHTML = "";
    data.sections.forEach(function (sec) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = sec.title;
      btn.dataset.id = sec.id;
      if (sec.id === currentId) btn.className = "active";
      btn.addEventListener("click", function () {
        showSection(sec.id, null, true);
      });
      navEl.appendChild(btn);
    });
  }

  function showWelcome() {
    currentId = null;
    titleEl.textContent = data.title || "UniServer Script API";
    leadEl.textContent = "Выберите раздел слева или воспользуйтесь поиском.";
    var list = data.sections
      .map(function (s) {
        return "<li><strong>" + escapeHtml(s.title) + "</strong> — " + s.entryCount + " элементов</li>";
      })
      .join("");
    contentEl.innerHTML =
      '<div class="welcome"><p>Автономная справка Script API. Открывается через <code>index.html</code> без веб-сервера.</p><ul>' +
      list +
      "</ul></div>";
    renderNav();
  }

  function showSection(sectionId, anchor, updateHash) {
    var sec = byId(sectionId);
    if (!sec) {
      showWelcome();
      return;
    }
    currentId = sectionId;
    titleEl.textContent = sec.title;
    leadEl.textContent = sec.intro || "";
    contentEl.innerHTML = sec.html;
    renderNav();
    if (updateHash) setHash(sectionId, anchor || null);
    if (anchor) {
      requestAnimationFrame(function () {
        var el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ block: "start" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/ё/g, "е");
  }

  function search(query) {
    var q = normalize(query).trim();
    if (!q) {
      resultsEl.classList.add("hidden");
      resultsEl.innerHTML = "";
      return;
    }
    var tokens = q.split(/\s+/).filter(Boolean);
    var hits = [];

    data.entries.forEach(function (e) {
      var hay = normalize(e.title + " " + e.text);
      var ok = tokens.every(function (t) {
        return hay.indexOf(t) !== -1;
      });
      if (ok) {
        var sec = byId(e.sectionId);
        hits.push({
          kind: "entry",
          title: e.title,
          sectionId: e.sectionId,
          anchor: e.id,
          sectionTitle: sec ? sec.title : e.sectionId,
        });
      }
    });

    data.sections.forEach(function (s) {
      var hay = normalize(s.title + " " + s.intro + " " + s.text);
      var ok = tokens.every(function (t) {
        return hay.indexOf(t) !== -1;
      });
      if (ok) {
        hits.push({
          kind: "section",
          title: s.title,
          sectionId: s.id,
          anchor: null,
          sectionTitle: "Раздел",
        });
      }
    });

    // уникальность по sectionId+anchor
    var seen = {};
    hits = hits.filter(function (h) {
      var k = h.sectionId + "::" + (h.anchor || "");
      if (seen[k]) return false;
      seen[k] = true;
      return true;
    });

    hits = hits.slice(0, 40);
    if (!hits.length) {
      resultsEl.classList.remove("hidden");
      resultsEl.innerHTML = '<div class="search-hit"><strong>Ничего не найдено</strong></div>';
      return;
    }

    resultsEl.classList.remove("hidden");
    resultsEl.innerHTML = "";
    hits.forEach(function (h) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "search-hit";
      btn.innerHTML =
        "<strong>" +
        escapeHtml(h.title) +
        "</strong><span>" +
        escapeHtml(h.sectionTitle) +
        "</span>";
      btn.addEventListener("click", function () {
        showSection(h.sectionId, h.anchor, true);
        searchEl.value = "";
        resultsEl.classList.add("hidden");
      });
      resultsEl.appendChild(btn);
    });
  }

  searchEl.addEventListener("input", function () {
    search(searchEl.value);
  });

  searchEl.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") {
      searchEl.value = "";
      resultsEl.classList.add("hidden");
    }
  });

  window.addEventListener("hashchange", function () {
    var p = parseHash();
    if (p.sectionId) showSection(p.sectionId, p.anchor, false);
    else showWelcome();
  });

  var initial = parseHash();
  if (initial.sectionId) showSection(initial.sectionId, initial.anchor, false);
  else showWelcome();
})();
