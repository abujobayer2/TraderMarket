/*!
 * TraderMarket reviews widget loader — v2
 *
 * Universal, framework-agnostic. Add one placeholder element and load this
 * script once (async). It renders every matching element on the page, keeps
 * watching for new ones (SPA route changes), isolates itself in a Shadow DOM,
 * and pulls no external fonts or CSS.
 *
 *   <div class="tradermarket-reviews"
 *        data-firm="your-slug"
 *        data-variant="mini"
 *        data-theme="light"></div>
 *   <script async src="https://tradermarket.online/reviews-widget.js"></script>
 *
 * Frameworks (React / Next / Vue / …): render the same <div>, then call
 * window.TraderMarketReviews.render() after mount. Full snippets at
 * https://tradermarket.online/widget/reviews
 */
(function () {
  "use strict";

  if (window.TraderMarketReviews && window.TraderMarketReviews.version) return;

  var VERSION = "2.0.0";
  var SELECTOR = ".tradermarket-reviews,[data-tradermarket-reviews]";
  var DEFAULT_VARIANT = "mini";
  var VALID_VARIANTS = [
    "micro-star",
    "micro-count",
    "mini",
    "card",
    "quote",
    "list",
    "grid",
    "carousel",
    "collector",
  ];

  // Resolve our own origin from this script's <src>, so the widget works no
  // matter which domain embeds it.
  var API_BASE = (function () {
    var src = (document.currentScript && document.currentScript.src) || "";
    if (!src) {
      var all = document.getElementsByTagName("script");
      for (var i = all.length - 1; i >= 0; i--) {
        if (all[i].src && /reviews-widget\.js/.test(all[i].src)) {
          src = all[i].src;
          break;
        }
      }
    }
    return src ? src.replace(/\/reviews-widget\.js.*$/, "") : "";
  })();

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
  // System stack only — zero network cost, no render-blocking font request on
  // the host page. The wordmark falls back gracefully if the brand face
  // isn't installed locally.
  var FONT_STACK =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  var BRAND_FONT_STACK = "'Plus Jakarta Sans', 'Segoe UI', " + FONT_STACK;

  var SVG_NS = "http://www.w3.org/2000/svg";

  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        if (key === "style") Object.assign(node.style, props.style);
        else if (key === "text") node.textContent = props.text;
        else if (key === "html") node.innerHTML = props.html;
        else node.setAttribute(key, props[key]);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function svgEl(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    Object.keys(attrs || {}).forEach(function (k) {
      node.setAttribute(k, attrs[k]);
    });
    return node;
  }

  var STAR_D =
    "M12 .587l3.668 7.431 8.2 1.192-5.934 5.783 1.401 8.168L12 18.897l-7.335 3.855 1.401-8.168L.132 9.21l8.2-1.192z";

  // One Trustpilot-style tile: a rounded square, brand colour when filled and
  // muted grey when empty, with a white star knocked out of it. `fill` is the
  // 0..1 fraction of this tile that should read as filled.
  function starTile(size, fill, c) {
    var frac = Math.max(0, Math.min(1, fill));
    var wrap = el("span", {
      style: {
        position: "relative",
        display: "inline-block",
        width: size + "px",
        height: size + "px",
        flexShrink: "0",
      },
    });
    wrap.appendChild(tileFace(size, frac >= 1 ? PRIMARY : c.mute));
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
      over.appendChild(tileFace(size, PRIMARY));
      wrap.appendChild(over);
    }
    return wrap;
  }

  function tileFace(size, bg) {
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

  function stars(value, size, c) {
    var row = el("span", { style: { display: "inline-flex", gap: "3px", alignItems: "center" } });
    for (var i = 0; i < 5; i++) row.appendChild(starTile(size, value - i, c));
    return row;
  }

  function ratingWord(v) {
    if (v >= 4.5) return "Excellent";
    if (v >= 3.5) return "Great";
    if (v >= 2.5) return "Average";
    if (v >= 1.5) return "Poor";
    return "Bad";
  }

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

  function brandLockup(c, sizePx) {
    return el("span", { style: { display: "inline-flex", alignItems: "center", gap: "6px" } }, [
      logoMark(sizePx || 16, c.ink),
      el("span", {
        text: "TraderMarket",
        style: {
          fontFamily: BRAND_FONT_STACK,
          fontSize: (sizePx || 16) * 0.7 + "px",
          fontWeight: "800",
          letterSpacing: "0.3px",
          textTransform: "uppercase",
          color: c.body,
        },
      }),
    ]);
  }

  // Prominent brand lockup: the mark + "TraderMarket" in ink, title-case —
  // the equivalent of Trustpilot's green-star + wordmark in their widgets.
  function wordmark(c, sizePx) {
    var s = sizePx || 22;
    return el(
      "span",
      { style: { display: "inline-flex", alignItems: "center", gap: s * 0.28 + "px" } },
      [
        logoMark(s, c.ink),
        el("span", {
          text: "TraderMarket",
          style: {
            fontFamily: BRAND_FONT_STACK,
            fontSize: s * 0.92 + "px",
            fontWeight: "800",
            letterSpacing: "-0.01em",
            color: c.ink,
          },
        }),
      ]
    );
  }

  function relTime(iso) {
    var then = new Date(iso).getTime();
    if (isNaN(then)) return "";
    var days = Math.floor((Date.now() - then) / 86400000);
    if (days <= 0) return "today";
    if (days === 1) return "1 day ago";
    if (days < 30) return days + " days ago";
    var months = Math.floor(days / 30);
    if (months === 1) return "1 month ago";
    if (months < 12) return months + " months ago";
    var years = Math.floor(days / 365);
    return years === 1 ? "1 year ago" : years + " years ago";
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function card(c, extra) {
    return el("a", {
      class: "tm-card",
      href: "",
      target: "_blank",
      rel: "noopener noreferrer",
      style: Object.assign(
        {
          display: "block",
          fontFamily: FONT_STACK,
          color: c.ink,
          background: c.canvas,
          border: "1px solid " + c.border,
          borderRadius: "14px",
        },
        extra || {}
      ),
    });
  }

  function avatar(name, c, size) {
    var s = size || 40;
    return el("span", {
      text: (name || "?").trim().charAt(0).toUpperCase(),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: s + "px",
        height: s + "px",
        borderRadius: "50%",
        background: c.canvasSoft,
        color: c.ink,
        fontSize: s * 0.4 + "px",
        fontWeight: "700",
        flexShrink: "0",
      },
    });
  }

  function summaryHeader(data, c) {
    return el(
      "div",
      { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 14px" } },
      [
        el("span", {
          text: ratingWord(data.average),
          style: { fontSize: "18px", fontWeight: "800", color: c.ink },
        }),
        stars(data.average, 22, c),
        el("span", { style: { fontSize: "13px", color: c.body } }, [
          el("b", { text: data.average.toFixed(1), style: { color: c.ink } }),
          document.createTextNode(
            " out of 5 · " + data.count + " review" + (data.count === 1 ? "" : "s")
          ),
        ]),
      ]
    );
  }

  // Centred score header used by the carousel.
  function reviewsScoreHeader(data, c) {
    return el(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          textAlign: "center",
        },
      },
      [
        wordmark(c, 22),
        stars(data.average, 32, c),
        el("div", { style: { fontSize: "14px", color: c.body } }, [
          document.createTextNode("TraderMarket Score "),
          el("b", { text: data.average.toFixed(1), style: { color: c.ink } }),
          document.createTextNode("  |  " + data.count + " reviews"),
        ]),
      ]
    );
  }

  // A single review as shown in the carousel: bold title, clamped body, and a
  // "Name, 4 days ago" byline — no avatar, matching the Trustpilot slider.
  function carouselReview(r, c) {
    return el(
      "div",
      { class: "tm-fade", style: { display: "flex", flexDirection: "column", gap: "8px" } },
      [
        stars(r.rating, 20, c),
        r.title
          ? el("div", {
              text: r.title,
              style: { fontSize: "17px", fontWeight: "800", color: c.ink, lineHeight: "1.35" },
            })
          : null,
        el("div", {
          class: "tm-clamp",
          text: r.body,
          style: { fontSize: "15px", lineHeight: "1.55", color: c.body, WebkitLineClamp: "3" },
        }),
        el("div", {
          text: r.author + ", " + relTime(r.date),
          style: { fontSize: "13px", color: c.bodyMid, marginTop: "6px" },
        }),
      ]
    );
  }

  function reviewCard(r, c, opts) {
    opts = opts || {};
    var node = el("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "16px",
        borderRadius: "12px",
        background: c.canvasSoft,
        border: "1px solid " + c.border,
        height: opts.fill ? "100%" : "auto",
      },
    });
    node.appendChild(stars(r.rating, 18, c));
    if (r.title) {
      node.appendChild(
        el("div", {
          text: r.title,
          style: { fontSize: "15px", fontWeight: "700", color: c.ink, lineHeight: "1.35" },
        })
      );
    }
    node.appendChild(
      el("div", {
        class: "tm-clamp",
        text: r.body,
        style: {
          fontSize: "14px",
          lineHeight: "1.5",
          color: c.body,
          WebkitLineClamp: String(opts.clamp || 4),
        },
      })
    );
    var foot = el("div", {
      style: { display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" },
    });
    foot.appendChild(avatar(r.author, c, 30));
    foot.appendChild(
      el("div", { style: { display: "flex", flexDirection: "column", minWidth: "0" } }, [
        el("span", { text: r.author, style: { fontSize: "13px", fontWeight: "700", color: c.ink } }),
        el("span", {
          text: (r.traderType ? r.traderType + " · " : "") + fmtDate(r.date),
          style: { fontSize: "12px", color: c.bodyMid },
        }),
      ])
    );
    node.appendChild(foot);
    return node;
  }

  function footerLine(data, c) {
    return el(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: "16px",
          paddingTop: "14px",
          borderTop: "1px solid " + c.border,
        },
      },
      [
        brandLockup(c, 15),
        el("span", {
          text: "See all reviews →",
          style: { fontSize: "13px", fontWeight: "700", color: PRIMARY },
        }),
      ]
    );
  }

  // ── Variant renderers: (data, colours, cfg) -> Element ───────────────────
  var RENDERERS = {
    "micro-star": function (data, c) {
      var a = el("a", {
        class: "tm-inline",
        href: data.profileUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "14px",
          fontFamily: FONT_STACK,
          textDecoration: "none",
          whiteSpace: "nowrap",
        },
      });
      a.appendChild(
        el("span", {
          text: ratingWord(data.average),
          style: { fontSize: "17px", fontWeight: "800", color: c.ink },
        })
      );
      a.appendChild(stars(data.average, 30, c));
      a.appendChild(wordmark(c, 22));
      return a;
    },

    "micro-count": function (data, c) {
      var a = el("a", {
        class: "tm-inline",
        href: data.profileUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "14px",
          fontFamily: FONT_STACK,
          textDecoration: "none",
          whiteSpace: "nowrap",
        },
      });
      a.appendChild(
        el("span", {
          text: ratingWord(data.average),
          style: { fontSize: "17px", fontWeight: "800", color: c.ink },
        })
      );
      a.appendChild(stars(data.average, 30, c));
      a.appendChild(
        el("span", { style: { fontSize: "14px", color: c.body } }, [
          document.createTextNode("based on "),
          el("b", { text: String(data.count), style: { color: c.ink, fontWeight: "700" } }),
          document.createTextNode(" review" + (data.count === 1 ? "" : "s")),
        ])
      );
      a.appendChild(wordmark(c, 22));
      return a;
    },

    mini: function (data, c) {
      var a = el("a", {
        class: "tm-inline",
        href: data.profileUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          fontFamily: FONT_STACK,
          textDecoration: "none",
          textAlign: "center",
        },
      });
      a.appendChild(wordmark(c, 26));
      a.appendChild(stars(data.average, 38, c));
      a.appendChild(
        el(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: c.body,
            },
          },
          [
            el("span", {}, [
              document.createTextNode("TraderMarket Score "),
              el("b", {
                text: data.average.toFixed(1),
                style: { color: c.ink, fontWeight: "700" },
              }),
            ]),
            el("span", { text: "|", style: { color: c.bodyMid } }),
            el("span", {
              text: data.count + " reviews",
              style: { textDecoration: "underline", textUnderlineOffset: "2px" },
            }),
          ]
        )
      );
      return a;
    },

    card: function (data, c) {
      var a = card(c, { maxWidth: "320px", padding: "20px" });
      a.href = data.profileUrl;

      var top = el("div", {
        style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" },
      });
      if (data.logo) {
        top.appendChild(
          el("img", {
            src: data.logo,
            alt: "",
            loading: "lazy",
            style: { width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" },
          })
        );
      }
      top.appendChild(
        el("div", { style: { display: "flex", flexDirection: "column" } }, [
          el("span", {
            text: data.name,
            style: { fontSize: "16px", fontWeight: "800", color: c.ink },
          }),
          el("span", {
            text: "Trader reviews on TraderMarket",
            style: { fontSize: "12px", color: c.bodyMid },
          }),
        ])
      );
      a.appendChild(top);

      a.appendChild(
        el("div", { style: { display: "flex", alignItems: "center", gap: "10px" } }, [
          stars(data.average, 24, c),
          el("span", {
            text: data.average.toFixed(1),
            style: { fontSize: "18px", fontWeight: "800", color: c.ink },
          }),
        ])
      );
      a.appendChild(
        el("div", {
          text:
            ratingWord(data.average) +
            " · " +
            data.count +
            " review" +
            (data.count === 1 ? "" : "s"),
          style: { fontSize: "13px", color: c.body, marginTop: "6px" },
        })
      );

      a.appendChild(
        el("div", {
          text: "Read reviews →",
          style: {
            display: "block",
            marginTop: "16px",
            padding: "10px 14px",
            borderRadius: "9px",
            background: PRIMARY,
            color: ON_PRIMARY,
            fontSize: "14px",
            fontWeight: "700",
            textAlign: "center",
          },
        })
      );
      a.appendChild(
        el(
          "div",
          { style: { display: "flex", justifyContent: "center", marginTop: "12px" } },
          [brandLockup(c, 14)]
        )
      );
      return a;
    },

    quote: function (data, c) {
      var r = (data.reviews || [])[0];
      var a = card(c, { maxWidth: "420px", padding: "22px" });
      a.href = data.profileUrl;
      if (!r) return RENDERERS.mini(data, c);

      a.appendChild(stars(r.rating, 24, c));
      if (r.title) {
        a.appendChild(
          el("div", {
            text: r.title,
            style: { fontSize: "17px", fontWeight: "800", color: c.ink, margin: "12px 0 6px" },
          })
        );
      }
      a.appendChild(
        el("div", {
          class: "tm-clamp",
          text: r.body,
          style: { fontSize: "15px", lineHeight: "1.55", color: c.body, WebkitLineClamp: "5" },
        })
      );
      var foot = el("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "16px",
          paddingTop: "14px",
          borderTop: "1px solid " + c.border,
        },
      });
      foot.appendChild(avatar(r.author, c, 34));
      foot.appendChild(
        el("div", { style: { display: "flex", flexDirection: "column", flex: "1", minWidth: "0" } }, [
          el("span", {
            text: r.author,
            style: { fontSize: "13px", fontWeight: "700", color: c.ink },
          }),
          el("span", {
            text: (r.traderType ? r.traderType + " · " : "") + fmtDate(r.date),
            style: { fontSize: "12px", color: c.bodyMid },
          }),
        ])
      );
      foot.appendChild(brandLockup(c, 14));
      a.appendChild(foot);
      return a;
    },

    list: function (data, c, cfg) {
      var a = card(c, { maxWidth: "480px", padding: "20px" });
      a.href = data.profileUrl;
      a.appendChild(summaryHeader(data, c));
      var wrap = el("div", {
        style: { display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" },
      });
      (data.reviews || []).slice(0, cfg.count).forEach(function (r) {
        wrap.appendChild(reviewCard(r, c, { clamp: 3 }));
      });
      a.appendChild(wrap);
      a.appendChild(footerLine(data, c));
      return a;
    },

    grid: function (data, c, cfg) {
      var a = card(c, { maxWidth: "760px", padding: "20px" });
      a.href = data.profileUrl;
      a.appendChild(summaryHeader(data, c));
      var g = el("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
          gap: "12px",
          marginTop: "16px",
        },
      });
      (data.reviews || []).slice(0, cfg.count).forEach(function (r) {
        g.appendChild(reviewCard(r, c, { clamp: 4, fill: true }));
      });
      a.appendChild(g);
      a.appendChild(footerLine(data, c));
      return a;
    },

    carousel: function (data, c, cfg) {
      var reviews = (data.reviews || []).slice(0, cfg.count);
      var box = card(c, { maxWidth: "460px", padding: "22px" });
      box.href = data.profileUrl;
      box.appendChild(reviewsScoreHeader(data, c));

      if (reviews.length === 0) return box;

      box.appendChild(
        el("div", { style: { height: "1px", background: c.border, margin: "18px 0" } })
      );

      var slot = el("div", { style: { minHeight: "150px" } });
      box.appendChild(slot);

      var controls = el("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "18px",
        },
      });
      var dots = el("div", { style: { display: "flex", gap: "6px" } });
      var idx = 0;
      var dotEls = reviews.map(function (_, i) {
        var d = el("span", {
          class: "tm-dot",
          style: {
            width: i === 0 ? "18px" : "6px",
            height: "6px",
            borderRadius: "3px",
            background: i === 0 ? PRIMARY : c.mute,
          },
        });
        dots.appendChild(d);
        return d;
      });

      function draw() {
        slot.innerHTML = "";
        slot.appendChild(carouselReview(reviews[idx], c));
        dotEls.forEach(function (d, i) {
          d.style.width = i === idx ? "18px" : "6px";
          d.style.background = i === idx ? PRIMARY : c.mute;
        });
      }

      function go(delta, e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        idx = (idx + delta + reviews.length) % reviews.length;
        draw();
      }

      function arrow(txt, delta) {
        return el("button", {
          text: txt,
          type: "button",
          "aria-label": delta < 0 ? "Previous review" : "Next review",
          style: {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "1px solid " + c.border,
            background: c.canvasSoft,
            color: c.ink,
            fontSize: "15px",
            cursor: "pointer",
            lineHeight: "1",
          },
        });
      }
      var prev = arrow("‹", -1);
      var next = arrow("›", 1);
      prev.addEventListener("click", function (e) {
        go(-1, e);
      });
      next.addEventListener("click", function (e) {
        go(1, e);
      });

      controls.appendChild(prev);
      controls.appendChild(dots);
      controls.appendChild(next);
      box.appendChild(controls);

      draw();
      if (reviews.length > 1) {
        var timer = setInterval(function () {
          if (!box.isConnected) {
            clearInterval(timer);
            return;
          }
          go(1);
        }, 5000);
      }
      return box;
    },

    collector: function (data, c) {
      var a = card(c, { maxWidth: "340px", padding: "22px", textAlign: "center" });
      a.href = data.writeUrl;
      a.appendChild(
        el("div", { style: { display: "flex", justifyContent: "center", marginBottom: "10px" } }, [
          data.logo
            ? el("img", {
                src: data.logo,
                alt: "",
                loading: "lazy",
                style: { width: "44px", height: "44px", borderRadius: "9px", objectFit: "cover" },
              })
            : logoMark(28, c.ink),
        ])
      );
      a.appendChild(
        el("div", {
          text: "Rate your experience with " + data.name,
          style: { fontSize: "16px", fontWeight: "800", color: c.ink, lineHeight: "1.35" },
        })
      );
      a.appendChild(
        el(
          "div",
          { style: { display: "flex", justifyContent: "center", margin: "14px 0" } },
          [stars(0, 30, c)]
        )
      );
      a.appendChild(
        el("div", {
          text: "Write a review →",
          style: {
            padding: "11px 16px",
            borderRadius: "9px",
            background: PRIMARY,
            color: ON_PRIMARY,
            fontSize: "14px",
            fontWeight: "700",
          },
        })
      );
      a.appendChild(
        el(
          "div",
          { style: { display: "flex", justifyContent: "center", marginTop: "14px" } },
          [brandLockup(c, 14)]
        )
      );
      return a;
    },
  };

  // Reserve space so the widget never shifts layout when it renders.
  var SKELETON_DIMS = {
    "micro-star": [230, 34],
    "micro-count": [340, 34],
    mini: [240, 148],
    card: [320, 214],
    quote: [420, 196],
    list: [460, 340],
    grid: [720, 320],
    carousel: [460, 300],
    collector: [320, 244],
  };

  function skeleton(cfg, c) {
    var d = SKELETON_DIMS[cfg.variant] || SKELETON_DIMS.mini;
    return el("div", {
      "aria-hidden": "true",
      style: {
        width: d[0] + "px",
        maxWidth: "100%",
        height: d[1] + "px",
        borderRadius: "14px",
        background: c.canvasSoft,
        animation: "tm-pulse 1.4s ease-in-out infinite",
      },
    });
  }

  function mountStyles(shadow, c, theme) {
    var hoverShadow =
      theme === "dark"
        ? "0 0 0 1px " + PRIMARY + ",0 10px 24px rgba(255,79,0,.22)"
        : "0 10px 24px rgba(32,21,21,.13)";
    shadow.appendChild(
      el("style", {
        text:
          ":host{all:initial;display:block;contain:content;line-height:normal}" +
          "*{box-sizing:border-box}" +
          "a.tm-card{transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease;text-decoration:none}" +
          "a.tm-card:hover{transform:translateY(-2px);border-color:" +
          PRIMARY +
          ";box-shadow:" +
          hoverShadow +
          "}" +
          ".tm-clamp{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}" +
          ".tm-inline{transition:opacity .15s ease}.tm-inline:hover{opacity:.82}" +
          ".tm-dot{transition:background .2s ease,width .2s ease}" +
          "@keyframes tm-fade{from{opacity:0}to{opacity:1}}.tm-fade{animation:tm-fade .35s ease}" +
          "@keyframes tm-pulse{0%,100%{opacity:1}50%{opacity:.5}}" +
          "@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}",
      })
    );
  }

  // ── Data (coalesced + cached per slug) ──────────────────────────────────
  var dataCache = {};
  function fetchData(slug) {
    if (!dataCache[slug]) {
      dataCache[slug] = fetch(
        API_BASE + "/api/widget/" + encodeURIComponent(slug) + "/reviews"
      ).then(function (res) {
        if (!res.ok) throw new Error("tm-reviews " + res.status);
        return res.json();
      });
    }
    return dataCache[slug];
  }

  function readConfig(node) {
    var g = function (k) {
      return node.getAttribute("data-" + k);
    };
    var v = g("variant") || g("style"); // data-style kept as a legacy alias
    var variant = VALID_VARIANTS.indexOf(v) >= 0 ? v : DEFAULT_VARIANT;
    var count = parseInt(g("reviews"), 10);
    if (isNaN(count) || count < 1) count = variant === "grid" ? 6 : 3;
    return {
      firm: g("firm") || node.getAttribute("data-tradermarket-reviews") || "",
      variant: variant,
      theme: g("theme") === "dark" ? "dark" : "light",
      count: Math.min(count, 15),
    };
  }

  function renderOne(node) {
    try {
      renderOneUnsafe(node);
    } catch (e) {
      if (window.console && console.warn) console.warn("[tm-reviews]", e);
    }
  }

  function renderOneUnsafe(node) {
    if (node.getAttribute("data-tm-rendered") != null) return;
    var cfg = readConfig(node);
    node.setAttribute("data-tm-rendered", cfg.firm ? "1" : "error");
    if (!cfg.firm) return;

    var shadow = node.shadowRoot;
    if (!shadow) {
      if (!node.attachShadow) return; // very old browser — skip silently
      shadow = node.attachShadow({ mode: "open" });
    }
    var c = COLORS[cfg.theme];
    mountStyles(shadow, c, cfg.theme);

    var skel = skeleton(cfg, c);
    shadow.appendChild(skel);

    fetchData(cfg.firm)
      .then(function (data) {
        if (data.count === 0 && cfg.variant !== "collector") {
          node.style.display = "none";
          return;
        }
        var out = (RENDERERS[cfg.variant] || RENDERERS.mini)(data, c, cfg);
        if (skel.parentNode === shadow) shadow.replaceChild(out, skel);
        else shadow.appendChild(out);
      })
      .catch(function () {
        node.style.display = "none";
      });
  }

  // Back-compat with the v1 inline form:
  //   <script src=".../reviews-widget.js" data-firm="..." data-variant="...">
  function adoptLegacyScripts() {
    var scripts = document.querySelectorAll(
      'script[src*="reviews-widget.js"][data-firm]:not([data-tm-adopted])'
    );
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      s.setAttribute("data-tm-adopted", "1");
      var div = el("div", { class: "tradermarket-reviews" });
      ["firm", "variant", "style", "theme", "reviews"].forEach(function (k) {
        var val = s.getAttribute("data-" + k);
        if (val != null) div.setAttribute("data-" + (k === "style" ? "variant" : k), val);
      });
      if (s.parentNode) s.parentNode.insertBefore(div, s.nextSibling);
    }
  }

  function render(root) {
    adoptLegacyScripts();
    var scope = root && root.querySelectorAll ? root : document;
    var nodes = scope.querySelectorAll(SELECTOR);
    for (var i = 0; i < nodes.length; i++) renderOne(nodes[i]);
  }

  var queued = 0;
  function schedule() {
    if (queued) return;
    // setTimeout (not requestAnimationFrame) so late-inserted widgets still
    // render while the tab is backgrounded.
    queued = window.setTimeout(function () {
      queued = 0;
      render();
    }, 50);
  }

  window.TraderMarketReviews = { render: render, version: VERSION };

  // Attach the watchers FIRST, so an unexpected throw in the initial pass can
  // never leave the page without live re-scanning.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      render();
    });
  }
  // Catch elements added later by a client-side router / framework.
  if (window.MutationObserver) {
    new MutationObserver(schedule).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  render();
})();
