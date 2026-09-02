/*!
 * TraderMarket ranking badge — embeddable leaderboard-rank widget.
 *
 *   <script src="https://tradermarket.online/widget.js"
 *           data-firm="your-slug"
 *           data-theme="light"
 *           data-style="standard"></script>
 *
 * Renders in an isolated Shadow DOM, pulls no external fonts or CSS, and
 * fetches the firm's live rank (and rating, when it has reviews) on load.
 */
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
  var style =
    VALID_STYLES.indexOf(script.getAttribute("data-style")) >= 0
      ? script.getAttribute("data-style")
      : "standard";

  var apiBase = script.src.replace(/\/widget\.js.*$/, "");

  var COLORS = {
    light: {
      canvas: "#fffefb",
      canvasSoft: "#f8f4f0",
      ink: "#201515",
      body: "#605d52",
      bodyMid: "#939084",
      mute: "#e4ded2",
      border: "rgba(32,21,21,0.12)",
    },
    dark: {
      canvas: "#201515",
      canvasSoft: "#2f2a26",
      ink: "#fffefb",
      body: "#c5c0b1",
      bodyMid: "#a39f92",
      mute: "#4a423b",
      border: "rgba(255,254,251,0.14)",
    },
  };
  var PRIMARY = "#ff4f00";
  var ON_PRIMARY = "#fffefb";
  var FONT_STACK =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  var BRAND_FONT_STACK = "'Plus Jakarta Sans', 'Segoe UI', " + FONT_STACK;
  var SVG_NS = "http://www.w3.org/2000/svg";

  var host = document.createElement("span");
  host.style.display = "inline-block";
  host.style.lineHeight = "normal";
  script.parentNode.insertBefore(host, script.nextSibling);
  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;

  var c = COLORS[theme];
  var hoverShadow =
    theme === "dark"
      ? "0 0 0 1px " + PRIMARY + ",0 10px 24px rgba(255,79,0,.22)"
      : "0 10px 24px rgba(32,21,21,.13)";

  var st = document.createElement("style");
  st.textContent =
    ":host{all:initial;contain:content}" +
    "*{box-sizing:border-box}" +
    ".tm-card{transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease;text-decoration:none}" +
    ".tm-card:hover{transform:translateY(-2px);border-color:" +
    PRIMARY +
    ";box-shadow:" +
    hoverShadow +
    "}" +
    "@media (prefers-reduced-motion:reduce){*{transition:none!important}}";
  root.appendChild(st);

  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        if (k === "style") Object.assign(node.style, props.style);
        else if (k === "text") node.textContent = props.text;
        else node.setAttribute(k, props[k]);
      });
    }
    (children || []).forEach(function (ch) {
      if (ch) node.appendChild(ch);
    });
    return node;
  }

  function svgEl(name, attrs) {
    var n = document.createElementNS(SVG_NS, name);
    Object.keys(attrs || {}).forEach(function (k) {
      n.setAttribute(k, attrs[k]);
    });
    return n;
  }

  // The 3-bar TraderMarket mark.
  function logoMark(size, barColor) {
    var svg = svgEl("svg", {
      viewBox: "0 0 40 28",
      width: String(size),
      height: String((size * 28) / 40),
    });
    [
      { x: 16, y: 0, w: 24, h: 8, fill: PRIMARY, o: 1 },
      { x: 0, y: 10, w: 32, h: 8, fill: barColor, o: 1 },
      { x: 0, y: 20, w: 16, h: 8, fill: barColor, o: 0.35 },
    ].forEach(function (b) {
      svg.appendChild(
        svgEl("rect", {
          x: String(b.x),
          y: String(b.y),
          width: String(b.w),
          height: String(b.h),
          rx: "4",
          fill: b.fill,
          opacity: String(b.o),
        })
      );
    });
    return svg;
  }

  function wordmark(px, color) {
    return el("span", {
      text: "TraderMarket",
      style: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: px + "px",
        fontWeight: "800",
        letterSpacing: "-0.01em",
        color: color,
      },
    });
  }

  function brandRow(px) {
    return el("span", { style: { display: "inline-flex", alignItems: "center", gap: "6px" } }, [
      logoMark(px, c.ink),
      wordmark(px * 0.82, c.body),
    ]);
  }

  // Rank chip: a rounded-orange square with "#N" — top-3 get a soft ring.
  function rankChip(rank, size) {
    var s = size || 44;
    var box = el("span", {
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: s + "px",
        height: s + "px",
        borderRadius: s * 0.24 + "px",
        background: rank ? PRIMARY : c.mute,
        color: ON_PRIMARY,
        flexShrink: "0",
        fontFamily: BRAND_FONT_STACK,
        fontWeight: "800",
        lineHeight: "1",
      },
    });
    if (rank && rank <= 3) {
      box.appendChild(
        el("span", {
          style: {
            position: "absolute",
            inset: "-4px",
            borderRadius: s * 0.3 + "px",
            border: "2px solid " + PRIMARY,
            opacity: "0.35",
          },
        })
      );
    }
    box.appendChild(
      el("span", {
        text: rank ? "#" + rank : "—",
        style: { fontSize: (rank && rank > 99 ? s * 0.3 : s * 0.38) + "px" },
      })
    );
    return box;
  }

  // Trustpilot-style star tile row, only shown when the firm has a rating.
  var STAR_D =
    "M12 .587l3.668 7.431 8.2 1.192-5.934 5.783 1.401 8.168L12 18.897l-7.335 3.855 1.401-8.168L.132 9.21l8.2-1.192z";
  function starFace(size, bg) {
    var svg = svgEl("svg", {
      width: String(size),
      height: String(size),
      viewBox: "0 0 " + size + " " + size,
      style: "position:absolute;inset:0;display:block",
    });
    var pad = size * 0.14;
    svg.appendChild(
      svgEl("rect", { width: String(size), height: String(size), rx: String(size * 0.16), fill: bg })
    );
    var inner = svgEl("svg", {
      x: String(pad),
      y: String(pad),
      width: String(size - pad * 2),
      height: String(size - pad * 2),
      viewBox: "0 0 24 24",
    });
    inner.appendChild(svgEl("path", { d: STAR_D, fill: ON_PRIMARY }));
    svg.appendChild(inner);
    return svg;
  }
  function stars(value, size) {
    var row = el("span", { style: { display: "inline-flex", gap: "3px", alignItems: "center" } });
    for (var i = 0; i < 5; i++) {
      var frac = Math.max(0, Math.min(1, value - i));
      var wrap = el("span", {
        style: {
          position: "relative",
          display: "inline-block",
          width: size + "px",
          height: size + "px",
        },
      });
      wrap.appendChild(starFace(size, frac >= 1 ? PRIMARY : c.mute));
      if (frac > 0 && frac < 1) {
        var over = el("span", {
          style: {
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            width: frac * 100 + "%",
            overflow: "hidden",
          },
        });
        over.appendChild(starFace(size, PRIMARY));
        wrap.appendChild(over);
      }
      row.appendChild(wrap);
    }
    return row;
  }

  function ratingRow(data, starSize) {
    if (!data.rating) return null;
    return el(
      "span",
      { style: { display: "inline-flex", alignItems: "center", gap: "7px" } },
      [
        stars(data.rating, starSize || 14),
        el("span", {
          text: data.rating.toFixed(1) + (data.reviews ? " · " + data.reviews : ""),
          style: { fontSize: "12px", fontWeight: "600", color: c.body },
        }),
      ]
    );
  }

  function verifiedTag() {
    return el(
      "span",
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "3px",
          fontSize: "11px",
          fontWeight: "700",
          color: PRIMARY,
        },
      },
      [
        (function () {
          var svg = svgEl("svg", { width: "12", height: "12", viewBox: "0 0 24 24" });
          svg.appendChild(
            svgEl("path", {
              d: "M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z",
              fill: PRIMARY,
            })
          );
          return svg;
        })(),
        el("span", { text: "Verified" }),
      ]
    );
  }

  function baseCard(extra) {
    return el("a", {
      class: "tm-card",
      href: "",
      target: "_blank",
      rel: "noopener noreferrer sponsored",
      style: Object.assign(
        {
          display: "flex",
          fontFamily: FONT_STACK,
          color: c.ink,
          background: c.canvas,
          border: "1px solid " + c.border,
          borderRadius: "14px",
          boxSizing: "border-box",
        },
        extra || {}
      ),
    });
  }

  function firmLogo(data, size, radius) {
    var tile = el("span", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size + "px",
        height: size + "px",
        borderRadius: (radius || 8) + "px",
        background: c.canvasSoft,
        overflow: "hidden",
        flexShrink: "0",
      },
    });
    if (data.logo) {
      tile.appendChild(
        el("img", {
          src: data.logo,
          alt: "",
          loading: "lazy",
          style: { width: "100%", height: "100%", objectFit: "cover" },
        })
      );
    } else {
      tile.appendChild(
        el("span", {
          text: (data.name || "?").charAt(0).toUpperCase(),
          style: { fontSize: size * 0.42 + "px", fontWeight: "800", color: c.ink },
        })
      );
    }
    return tile;
  }

  var RENDERERS = {
    small: function (data) {
      var card = baseCard({
        flexDirection: "column",
        gap: "10px",
        width: "210px",
        padding: "14px",
        background: c.canvasSoft,
      });
      card.href = data.profileUrl;
      card.appendChild(
        el("span", { style: { display: "flex", alignItems: "center", gap: "10px" } }, [
          rankChip(data.rank, 38),
          el("span", { style: { display: "flex", flexDirection: "column" } }, [
            el("span", {
              text: data.rank ? "Ranked #" + data.rank : "Listed firm",
              style: { fontSize: "14px", fontWeight: "800", color: c.ink },
            }),
            el("span", {
              text: "prop firm",
              style: { fontSize: "11px", color: c.bodyMid, textTransform: "uppercase", letterSpacing: "0.06em" },
            }),
          ]),
        ])
      );
      var meta = ratingRow(data, 13);
      if (meta) card.appendChild(meta);
      card.appendChild(brandRow(14));
      return card;
    },

    standard: function (data) {
      var card = baseCard({
        flexDirection: "column",
        gap: "12px",
        width: "268px",
        padding: "18px",
      });
      card.href = data.profileUrl;

      card.appendChild(
        el("span", { style: { display: "flex", alignItems: "center", gap: "12px" } }, [
          rankChip(data.rank, 46),
          el("span", { style: { display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" } }, [
            el("span", {
              text: data.name,
              style: {
                fontSize: "16px",
                fontWeight: "800",
                color: c.ink,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }),
            el("span", {
              text: data.rank ? "#" + data.rank + " ranked prop firm" : "Listed prop firm",
              style: { fontSize: "12px", fontWeight: "600", color: c.body },
            }),
          ]),
        ])
      );

      var meta = el("span", {
        style: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" },
      });
      var r = ratingRow(data, 15);
      if (r) meta.appendChild(r);
      if (data.verified) meta.appendChild(verifiedTag());
      if (meta.childNodes.length) card.appendChild(meta);

      card.appendChild(
        el("span", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            paddingTop: "12px",
            borderTop: "1px solid " + c.border,
          },
        }, [
          brandRow(15),
          el("span", {
            text: "View profile →",
            style: { fontSize: "13px", fontWeight: "700", color: PRIMARY },
          }),
        ])
      );
      return card;
    },

    horizontal: function (data) {
      var card = baseCard({
        alignItems: "center",
        gap: "14px",
        width: "330px",
        padding: "12px 16px",
      });
      card.href = data.profileUrl;
      card.appendChild(rankChip(data.rank, 42));
      card.appendChild(
        el("span", { style: { display: "flex", flexDirection: "column", gap: "2px", minWidth: "0", flex: "1" } }, [
          el("span", {
            text: data.name,
            style: {
              fontSize: "14px",
              fontWeight: "800",
              color: c.ink,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }),
          el("span", {
            text: data.rank ? "#" + data.rank + " on TraderMarket" : "Listed on TraderMarket",
            style: { fontSize: "12px", fontWeight: "600", color: c.body },
          }),
          ratingRow(data, 12) || undefined,
        ])
      );
      card.appendChild(logoMark(20, c.ink));
      return card;
    },

    // Co-branded lockup: TraderMarket mark × the firm's own logo.
    badge: function (data) {
      var card = baseCard({
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        background: c.canvasSoft,
        whiteSpace: "nowrap",
      });
      card.href = data.profileUrl;
      card.appendChild(logoMark(22, c.ink));
      card.appendChild(
        el("span", { text: "×", style: { fontSize: "13px", fontWeight: "700", color: c.bodyMid } })
      );
      card.appendChild(firmLogo(data, 26, 6));
      card.appendChild(
        el("span", { style: { width: "1px", height: "20px", background: c.border } })
      );
      card.appendChild(rankChip(data.rank, 26));
      card.appendChild(
        el("span", {
          text: data.rank ? "Ranked" : "Listed",
          style: { fontSize: "13px", fontWeight: "800", color: c.ink },
        })
      );
      return card;
    },
  };

  fetch(apiBase + "/api/widget/" + encodeURIComponent(firmSlug))
    .then(function (res) {
      if (!res.ok) throw new Error("widget fetch failed");
      return res.json();
    })
    .then(function (data) {
      root.appendChild((RENDERERS[style] || RENDERERS.standard)(data));
    })
    .catch(function () {
      host.style.display = "none";
    });
})();
