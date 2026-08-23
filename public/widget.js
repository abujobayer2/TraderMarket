(function () {
  "use strict";

  var script = document.currentScript;
  if (!script) return;

  var firmSlug = script.getAttribute("data-firm");
  if (!firmSlug) {
    console.error("[TraderMarket widget] missing required data-firm attribute");
    return;
  }

  var theme = script.getAttribute("data-theme") === "dark" ? "dark" : "light";
  var VALID_STYLES = ["small", "standard", "horizontal", "badge"];
  var style = VALID_STYLES.indexOf(script.getAttribute("data-style")) >= 0
    ? script.getAttribute("data-style")
    : "standard";

  var apiBase = script.src.replace(/\/widget\.js.*$/, "");

  var COLORS = {
    light: { canvas: "#fffefb", canvasSoft: "#f8f4f0", ink: "#201515", body: "#605d52", border: "rgba(32,21,21,0.12)" },
    dark: { canvas: "#201515", canvasSoft: "#2f2a26", ink: "#fffefb", body: "#c5c0b1", border: "rgba(255,254,251,0.14)" },
  };
  var PRIMARY = "#ff4f00";
  var FONT_STACK = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  var BRAND_FONT_STACK = "'Plus Jakarta Sans', " + FONT_STACK;

  // Load the same webfonts the main site uses so the embed doesn't fall
  // back to the host page's default sans-serif. Guarded so multiple badges
  // on one page only fetch it once. Only the weights actually rendered by
  // the RENDERERS below are requested — every extra weight is a font file
  // this script forces onto someone else's site for nothing.
  if (!document.getElementById("tm-widget-fonts")) {
    var fontLink = document.createElement("link");
    fontLink.id = "tm-widget-fonts";
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=Plus+Jakarta+Sans:wght@700&display=swap";
    document.head.appendChild(fontLink);
  }

  var host = document.createElement("div");
  host.style.display = "inline-block";
  host.style.lineHeight = "normal";
  script.parentNode.insertBefore(host, script.nextSibling);

  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;

  // Light cards lift with a soft dark drop-shadow; dark cards get an orange
  // glow instead, since a dark shadow disappears against a dark card.
  var hoverShadow =
    theme === "dark" ? "0 0 0 1px " + PRIMARY + ", 0 8px 20px rgba(255,79,0,0.25)" : "0 8px 20px rgba(32,21,21,0.14)";

  var hoverStyle = document.createElement("style");
  hoverStyle.textContent =
    ".tm-widget-card { transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease; }" +
    ".tm-widget-card:hover { transform: translateY(-2px); box-shadow: " +
    hoverShadow +
    "; border-color: " +
    PRIMARY +
    " !important; }";
  root.appendChild(hoverStyle);

  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        if (key === "style") {
          Object.assign(node.style, props.style);
        } else if (key === "text") {
          node.textContent = props.text;
        } else {
          node.setAttribute(key, props[key]);
        }
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function logoMark(size, barColor) {
    var svgNs = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("viewBox", "0 0 40 28");
    svg.setAttribute("width", String(size));
    svg.setAttribute("height", String((size * 28) / 40));
    var bars = [
      { x: 16, y: 0, w: 24, h: 8, fill: PRIMARY, o: 1 },
      { x: 0, y: 10, w: 32, h: 8, fill: barColor, o: 1 },
      { x: 0, y: 20, w: 16, h: 8, fill: barColor, o: 0.35 },
    ];
    bars.forEach(function (b) {
      var rect = document.createElementNS(svgNs, "rect");
      rect.setAttribute("x", b.x);
      rect.setAttribute("y", b.y);
      rect.setAttribute("width", b.w);
      rect.setAttribute("height", b.h);
      rect.setAttribute("rx", 4);
      rect.setAttribute("fill", b.fill);
      rect.setAttribute("opacity", b.o);
      svg.appendChild(rect);
    });
    return svg;
  }

  function baseLink(extraStyle) {
    return el(
      "a",
      Object.assign(
        {
          href: "",
          target: "_blank",
          rel: "noopener noreferrer sponsored",
          class: "tm-widget-card",
        },
        {
          style: Object.assign(
            {
              textDecoration: "none",
              fontFamily: FONT_STACK,
              boxSizing: "border-box",
            },
            extraStyle
          ),
        }
      )
    );
  }

  var MEDALS = { 1: "🥇", 2: "🥈", 3: "🥉" };

  function rankEmoji(rank) {
    return MEDALS[rank] || "🏆";
  }

  function rankLabel(data, suffix) {
    return data.rank ? "#" + data.rank + suffix : "Listed on TraderMarket";
  }

  function metaRow(c, data) {
    if (!data.verified && !data.rating) return null;
    var row = el("div", { style: { display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: c.body } });
    if (data.rating) row.appendChild(el("span", { text: "⭐ " + data.rating + " / 5" }));
    if (data.verified) row.appendChild(el("span", { text: "✓ Verified", style: { color: PRIMARY, fontWeight: "600" } }));
    return row;
  }

  var RENDERERS = {
    small: function (data, c) {
      var card = baseLink({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "200px",
        padding: "12px 14px",
        borderRadius: "12px",
        border: "1px solid " + c.border,
        background: c.canvasSoft,
      });
      card.href = data.profileUrl;

      var brandRow = el("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, [
        logoMark(16, c.ink),
        el("span", {
          text: "TraderMarket",
          style: {
            fontFamily: BRAND_FONT_STACK,
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            color: c.body,
          },
        }),
      ]);

      var rankRow = el("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "600", color: c.ink } }, [
        el("span", { text: rankEmoji(data.rank) }),
        el("span", { text: rankLabel(data, " Prop Firm") }),
      ]);

      card.appendChild(rankRow);
      card.appendChild(brandRow);
      return card;
    },

    standard: function (data, c) {
      var card = baseLink({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "260px",
        padding: "16px 18px",
        borderRadius: "12px",
        border: "1px solid " + c.border,
        background: c.canvasSoft,
      });
      card.href = data.profileUrl;

      card.appendChild(
        el("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "15px", fontWeight: "600", color: c.ink } }, [
          el("span", { text: rankEmoji(data.rank) }),
          el("span", { text: rankLabel(data, " Ranked Prop Firm") }),
        ])
      );

      var nameRow = el("div", { style: { display: "flex", alignItems: "center", gap: "8px" } });
      if (data.logo) nameRow.appendChild(el("img", { src: data.logo, alt: "", style: { width: "20px", height: "20px", borderRadius: "4px", objectFit: "cover" } }));
      nameRow.appendChild(el("span", { text: data.name, style: { fontSize: "16px", fontWeight: "700", color: c.ink } }));
      card.appendChild(nameRow);

      var meta = metaRow(c, data);
      if (meta) card.appendChild(meta);

      card.appendChild(
        el("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, [
          logoMark(18, c.ink),
          el("span", {
            text: "TraderMarket",
            style: {
              fontFamily: BRAND_FONT_STACK,
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
              color: c.body,
            },
          }),
        ])
      );

      card.appendChild(el("span", { text: "View Profile →", style: { fontSize: "13px", fontWeight: "700", color: PRIMARY, marginTop: "2px" } }));
      return card;
    },

    // Wide single-row layout — reads well in a footer or sidebar.
    horizontal: function (data, c) {
      var card = baseLink({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "320px",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid " + c.border,
        background: c.canvasSoft,
      });
      card.href = data.profileUrl;

      var iconTile = el("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          background: c.canvas,
          flexShrink: "0",
          overflow: "hidden",
        },
      });
      if (data.logo) {
        iconTile.appendChild(el("img", { src: data.logo, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }));
      } else {
        iconTile.appendChild(logoMark(20, c.ink));
      }
      card.appendChild(iconTile);

      var textCol = el("div", { style: { display: "flex", flexDirection: "column", gap: "2px", minWidth: "0", flex: "1" } });
      textCol.appendChild(
        el("span", {
          text: data.name,
          style: { fontSize: "14px", fontWeight: "700", color: c.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
        })
      );
      textCol.appendChild(
        el("span", { style: { fontSize: "12px", fontWeight: "600", color: c.body, display: "flex", alignItems: "center", gap: "4px" } }, [
          el("span", { text: rankEmoji(data.rank) }),
          el("span", { text: rankLabel(data, " on TraderMarket") }),
        ])
      );
      card.appendChild(textCol);

      card.appendChild(el("span", { text: "→", style: { fontSize: "18px", fontWeight: "700", color: PRIMARY, flexShrink: "0" } }));
      return card;
    },

    // Co-branded logo lockup: TraderMarket mark × the firm's own logo,
    // like a partner/verification badge — single line, rank included.
    badge: function (data, c) {
      var card = baseLink({
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "12px",
        border: "1px solid " + c.border,
        background: c.canvasSoft,
        whiteSpace: "nowrap",
      });
      card.href = data.profileUrl;

      card.appendChild(logoMark(20, c.ink));
      card.appendChild(el("span", { text: "×", style: { fontSize: "14px", fontWeight: "600", color: c.body, flexShrink: "0" } }));

      var firmMark = el("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          borderRadius: "6px",
          background: c.canvas,
          overflow: "hidden",
          flexShrink: "0",
        },
      });
      if (data.logo) {
        firmMark.appendChild(el("img", { src: data.logo, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }));
      } else {
        firmMark.appendChild(el("span", { text: data.name.slice(0, 1), style: { fontSize: "12px", fontWeight: "700", color: c.ink } }));
      }
      card.appendChild(firmMark);

      card.appendChild(el("span", { text: "|", style: { fontSize: "13px", color: c.border, flexShrink: "0" } }));
      card.appendChild(el("span", { text: rankEmoji(data.rank), style: { fontSize: "13px", flexShrink: "0" } }));
      card.appendChild(
        el("span", { text: rankLabel(data, " Ranked"), style: { fontSize: "13px", fontWeight: "700", color: c.ink } })
      );
      return card;
    },
  };

  function renderFallback() {
    // Fail quietly on the host site rather than showing a broken box.
    host.style.display = "none";
  }

  fetch(apiBase + "/api/widget/" + encodeURIComponent(firmSlug))
    .then(function (res) {
      if (!res.ok) throw new Error("widget fetch failed");
      return res.json();
    })
    .then(function (data) {
      var render = RENDERERS[style] || RENDERERS.standard;
      root.appendChild(render(data, COLORS[theme]));
    })
    .catch(renderFallback);
})();
