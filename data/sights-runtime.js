// 관리자가 저장한 볼거리 설정은 생성된 기본 자료보다 우선한다.
// bloom-survey.js 원본은 변경하지 않는다.
window.applySightsSettings = function () {
  const settings = window.SIGHTS_SETTINGS || {};
  const key = s => s.replace(/[\s'‘’]/g, '');
  const update = (list, name, enabled) => {
    const kept = list.filter(n => key(n) !== key(name));
    if (enabled) kept.push(name);
    return kept;
  };
  for (const [name, value] of Object.entries(settings)) {
    for (const [field, variable] of [['flower', 'BLOOM_GUIDE'], ['leaf', 'LEAF_MONTH'], ['fruit', 'FRUIT_MONTH']]) {
      const months = window[variable] || (window[variable] = {});
      for (let m = 1; m <= 12; m++) months[m] = update(months[m] || [], name, value[field].includes(m));
    }
    window.BANNER_FLOWER_HIDE = update(window.BANNER_FLOWER_HIDE || [], name, !value.show);
    if (!(window.SPECIES_GUIDE[name] || {}).guide) window.BANNER_EXTRA = update(window.BANNER_EXTRA || [], name, true);
  }
};
