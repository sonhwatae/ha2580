// 학명 표기 규칙 — 속명·종소명·종 아래 이름(변종·아종·품종 이름)만 기울임꼴(이탤릭)로 쓴다.
// 바로 쓰는 것: 명명자(L., Thunb., Siebold & Zucc. …), 계급(var. subsp. f.), 잡종 기호 ×, 원예품종명 'Gold Mound'
// window.sciParts("Acer tataricum subsp. ginnala (Maxim.) Wesm.")
//   → [{t:"Acer",i:true},{t:"tataricum",i:true},{t:"subsp.",i:false},{t:"ginnala",i:true},{t:"(Maxim.) Wesm.",i:false}]
(function () {
  var RANK = /^(var\.|subsp\.|ssp\.|f\.|forma|cv\.)$/;
  function parts(s) {
    var w = String(s || "").trim().split(/\s+/).filter(Boolean), out = [], prev = "";
    for (var k = 0; k < w.length; k++) {
      var t = w[k], kind = "A";
      if ((t === "×" || t === "x") && (k === 0 || prev === "G")) kind = "X";
      else if (/^[A-Z][a-zë-]+$/.test(t) && (k === 0 || (k === 1 && prev === "X"))) kind = "G";
      else if (RANK.test(t) && (prev === "E" || prev === "G")) kind = "R";
      else if (/^[a-zë][a-zë-]+$/.test(t) && (prev === "G" || prev === "X" || prev === "R")) kind = "E";
      out.push({ t: t, i: kind === "G" || kind === "E" });
      prev = kind;
    }
    // 이웃한 같은 꼴끼리 합쳐 띄어쓰기를 살린다
    var m = [];
    out.forEach(function (p) {
      var last = m[m.length - 1];
      if (last && last.i === p.i) last.t += " " + p.t; else m.push({ t: p.t, i: p.i });
    });
    m.forEach(function (p, k) { if (k < m.length - 1) p.t += " "; });
    return m;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  window.sciParts = parts;
  window.sciHtml = function (s) {
    return parts(s).map(function (p) { return p.i ? "<i>" + esc(p.t.trim()) + "</i>" : esc(p.t.trim()); }).join(" ");
  };
})();
