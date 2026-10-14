/* ==========================================================================
   ui.js — 보험개발원 대물보상 모바일 AOS 퍼블리싱 공통 스크립트
   퍼블리싱 확인용 최소 동작만 담았습니다. 데이터 연동은 개발에서 대체하세요.
   모든 동작은 data-ui 속성으로 위임 처리합니다. (동적으로 추가된 DOM 도 동작)
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;

  /* ---------------------------------------------------------------
     util
     --------------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function closest(el, sel) { return el && el.closest ? el.closest(sel) : null; }

  /* 트랜지션을 발생시키려면 클래스를 붙이기 전에 강제로 레이아웃을 한 번 계산해야 합니다 */
  function reflow(el) { return el && el.offsetHeight; }

  /* 트랜지션이 끝난 뒤 실행. 트랜지션이 없거나 취소돼도 타이머로 반드시 실행됩니다 */
  function afterTransition(el, fn) {
    if (!el) { return; }
    var done = false;
    var run = function (e) {
      if (e && e.target !== el) { return; }
      if (done) { return; }
      done = true;
      el.removeEventListener('transitionend', run);
      fn();
    };
    el.addEventListener('transitionend', run);
    setTimeout(run, 420);
  }

  /* ---------------------------------------------------------------
     dim (오버레이) — 시트·드로어·다이얼로그가 공유합니다
     --------------------------------------------------------------- */
  var dimEl = null;

  function showDim(onClick) {
    if (!dimEl) {
      dimEl = doc.createElement('div');
      dimEl.className = 'dim';
      doc.body.appendChild(dimEl);
    }
    dimEl.hidden = false;
    dimEl.onclick = onClick || null;
    reflow(dimEl);
    dimEl.classList.add('is-open');
    doc.body.style.overflow = 'hidden';
  }

  function hideDim() {
    if (dimEl) {
      dimEl.classList.remove('is-open');
      dimEl.onclick = null;
      afterTransition(dimEl, function () { dimEl.hidden = true; });
    }
    /* 마크업에 직접 넣은 dim(정적 시트 화면)도 함께 닫습니다 */
    $$('.dim').forEach(function (d) {
      if (d === dimEl) { return; }
      d.classList.remove('is-open');
      afterTransition(d, function () { d.hidden = true; });
    });
    doc.body.style.overflow = '';
  }

  /* ---------------------------------------------------------------
     bottom sheet — [data-ui="sheet-open"][data-target="#id"]
     --------------------------------------------------------------- */
  function openSheet(id) {
    var sheet = doc.getElementById(id);
    if (!sheet) { return; }
    sheet.hidden = false;
    showDim(function () { closeSheet(sheet); });
    reflow(sheet);
    sheet.classList.add('is-open');
    var first = $('button, a, input', sheet);
    if (first) { first.focus(); }
  }

  function closeSheet(sheet) {
    if (!sheet || sheet.hidden) { return; }
    sheet.classList.remove('is-open');
    hideDim();
    afterTransition(sheet, function () { sheet.hidden = true; });
  }

  /* ---------------------------------------------------------------
     drawer (좌측 메뉴)
     --------------------------------------------------------------- */
  function openDrawer(id) {
    var d = doc.getElementById(id);
    if (!d) { return; }
    d.hidden = false;
    showDim(function () { closeDrawer(d); });
    reflow(d);
    d.classList.add('is-open');
    var t = $('[data-ui="drawer-open"][data-target="#' + id + '"]');
    if (t) { t.setAttribute('aria-expanded', 'true'); }
    var first = $('a, button', d);
    if (first) { first.focus(); }
  }

  function closeDrawer(d) {
    if (!d || d.hidden) { return; }
    d.classList.remove('is-open');
    hideDim();
    var t = $('[data-ui="drawer-open"][data-target="#' + d.id + '"]');
    if (t) { t.setAttribute('aria-expanded', 'false'); }
    afterTransition(d, function () { d.hidden = true; });
  }

  /* ---------------------------------------------------------------
     dialog
     --------------------------------------------------------------- */
  function openDialog(id) {
    var d = doc.getElementById(id);
    if (!d) { return; }
    d.hidden = false;
    showDim(function () { d.hidden = true; hideDim(); });
  }

  /* ---------------------------------------------------------------
     toast — UI.toast('저장되었습니다.')
     --------------------------------------------------------------- */
  var toastTimer = null;
  function toast(msg, actionLabel, onAction) {
    var el = $('.toast[data-ui="toast"]');
    if (!el) {
      el = doc.createElement('div');
      el.className = 'toast';
      el.setAttribute('data-ui', 'toast');
      el.setAttribute('role', 'status');
      el.innerHTML = '<span class="toast-msg"></span>';
      doc.body.appendChild(el);
    }
    $('.toast-msg', el).textContent = msg;
    var act = $('.toast-action', el);
    if (actionLabel) {
      if (!act) {
        act = doc.createElement('button');
        act.type = 'button';
        act.className = 'toast-action';
        el.appendChild(act);
      }
      act.textContent = actionLabel;
      act.onclick = function () { el.hidden = true; if (onAction) { onAction(); } };
      act.hidden = false;
    } else if (act) {
      act.hidden = true;
    }
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 2400);
  }

  /* ---------------------------------------------------------------
     클릭 위임
     --------------------------------------------------------------- */
  doc.addEventListener('click', function (e) {
    var t = closest(e.target, '[data-ui]');
    if (!t) { return; }
    var ui = t.getAttribute('data-ui');
    var target = t.getAttribute('data-target');

    switch (ui) {

      /* 시트 */
      case 'sheet-open':
        e.preventDefault();
        openSheet((target || '').replace('#', ''));
        break;
      case 'sheet-close':
        e.preventDefault();
        closeSheet(closest(t, '.sheet'));
        break;

      /* 드로어 */
      case 'drawer-open':
        e.preventDefault();
        openDrawer((target || 'gnbDrawer').replace('#', ''));
        break;
      case 'drawer-close':
        e.preventDefault();
        closeDrawer(closest(t, '.drawer'));
        break;

      /* 다이얼로그 */
      case 'dialog-open':
        e.preventDefault();
        openDialog((target || '').replace('#', ''));
        break;
      case 'dialog-close':
        e.preventDefault();
        closest(t, '.dialog').hidden = true;
        hideDim();
        break;

      /* 아코디언 — 검색 조건 더보기 */
      case 'accordion': {
        e.preventDefault();
        var panel = doc.getElementById((target || '').replace('#', ''));
        if (!panel) { break; }
        var willOpen = panel.hidden;
        panel.hidden = !willOpen;
        t.setAttribute('aria-expanded', String(willOpen));
        /* 화살표 방향은 CSS 가 aria-expanded 로 바꿉니다 (.ico--chevron) */
        var lb = $('.accordion-label', t);
        if (lb) { lb.textContent = willOpen ? '검색 조건 접기' : '검색 조건 더보기'; }
        break;
      }

      /* 탭 */
      case 'tab': {
        e.preventDefault();
        var tabs = closest(t, '.tabs');
        if (!tabs) { break; }
        $$('.tab', tabs).forEach(function (x) {
          x.classList.toggle('is-active', x === t);
          x.setAttribute('aria-selected', String(x === t));
        });
        break;
      }

      /* 칩 — data-single="true" 면 라디오처럼 하나만 선택 */
      case 'chip': {
        var row = closest(t, '.chip-row');
        if (row && row.getAttribute('data-single') !== 'false') {
          $$('.chip', row).forEach(function (x) {
            x.classList.toggle('is-selected', x === t);
            x.setAttribute('aria-pressed', String(x === t));
          });
        } else {
          var on = !t.classList.contains('is-selected');
          t.classList.toggle('is-selected', on);
          t.setAttribute('aria-pressed', String(on));
        }
        break;
      }

      /* 비밀번호 보기 토글 */
      case 'pw-toggle': {
        e.preventDefault();
        var box = closest(t, '.login-field, .field-box');
        var input = $('input', box);
        if (!input) { break; }
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        var img = $('img', t);
        if (img) { img.src = '../img/icon/' + (show ? 'icon_eye_off_24.svg' : 'icon_eye_24.svg'); }
        t.setAttribute('aria-pressed', String(show));
        break;
      }

      /* 인풋 지우기 */
      case 'clear': {
        e.preventDefault();
        var b = closest(t, '.login-field, .field-box');
        var i = $('input', b);
        if (i) { i.value = ''; i.focus(); }
        break;
      }

      /* 토스트 데모 */
      case 'toast-demo':
        e.preventDefault();
        toast(t.getAttribute('data-msg') || '저장되었습니다.');
        break;

      /* 라이트/다크 전환 — 이번 퍼블리싱 범위 아님.
         Dark 토큰 확인용으로만 남겨 둡니다. 실제 화면에는 이 버튼이 없습니다. */
      case 'mode': {
        e.preventDefault();
        doc.documentElement.classList.toggle('is-dark');
        break;
      }

      default:
        break;
    }
  });

  /* ---------------------------------------------------------------
     전체 동의 체크박스 — [data-ui="check-all"][data-group="#id"]
     --------------------------------------------------------------- */
  doc.addEventListener('change', function (e) {
    var el = e.target;

    if (el.matches('[data-ui="check-all"]')) {
      var group = doc.getElementById((el.getAttribute('data-group') || '').replace('#', ''));
      if (!group) { return; }
      $$('input[type="checkbox"]', group).forEach(function (c) {
        if (!c.disabled) { c.checked = el.checked; }
      });
      return;
    }

    /* 선택 카드(라디오) — .is-selected 클래스를 실제 checked 와 맞춥니다.
       CSS 는 :has(input:checked) 로도 처리하지만, 클래스를 함께 유지해
       :has() 미지원 환경과 스크립트에서의 상태 조회를 모두 지원합니다. */
    if (el.type === 'radio' && closest(el, '.biz-type')) {
        var name = el.name;
        $$('.biz-type').forEach(function (card) {
            var input = $('input[name="' + name + '"]', card);
            if (input) { card.classList.toggle('is-selected', input.checked); }
        });
        return;
    }

    /* 개별 체크 → 전체 동의 상태 동기화 */
    var g = closest(el, '[data-check-group]');
    if (g && el.type === 'checkbox') {
      var all = doc.querySelector('[data-ui="check-all"][data-group="#' + g.id + '"]');
      if (all) {
        var boxes = $$('input[type="checkbox"]:not(:disabled)', g);
        all.checked = boxes.length > 0 && boxes.every(function (c) { return c.checked; });
      }
    }
  });

  /* ---------------------------------------------------------------
     ESC 로 오버레이 닫기
     --------------------------------------------------------------- */
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    var sheet = $('.sheet.is-open');
    if (sheet) { closeSheet(sheet); return; }
    var drawer = $('.drawer.is-open');
    if (drawer) { closeDrawer(drawer); return; }
    var open = $('.dialog:not([hidden])');
    if (open) { open.hidden = true; hideDim(); }
  });

  /* ---------------------------------------------------------------
     마크업에 처음부터 열려 있는 시트(정적 시트 화면)를 활성화합니다.
     .sheet 는 기본이 화면 밖(translateY 100%)이라 클래스가 없으면 보이지 않습니다.
     --------------------------------------------------------------- */
  function openStaticOverlays() {
    var any = $$('.sheet:not([hidden]), .drawer:not([hidden])')
                .filter(function (el) { return !el.classList.contains('is-open'); });
    $$('.dim').forEach(function (d) { reflow(d); d.classList.add('is-open'); });
    any.forEach(function (el) { reflow(el); el.classList.add('is-open'); });
    if (any.length || $('.dim')) { doc.body.style.overflow = 'hidden'; }
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', openStaticOverlays);
  } else {
    openStaticOverlays();
  }

  /* ------------------------------------------------------------------
     청구합계 — 할인율·부가세를 체크박스로 켜고 끄면 청구금액이 바뀝니다.
     체크를 풀면 해당 입력이 회색 비활성이 되고 합계에서 빠집니다.
     ------------------------------------------------------------------ */
  function digits(v) { return parseInt(String(v).replace(/[^0-9]/g, ''), 10) || 0; }
  function won(n) { return n.toLocaleString('ko-KR') + '원'; }

  function setFieldEnabled(input, on) {
    if (!input) { return; }
    input.readOnly = !on;
    var box = input.closest ? input.closest('.field-box') : null;
    if (box) { box.classList.toggle('field-box--readonly', !on); }
  }

  function recalc() {
    var box = $('[data-ui="calc"]');
    if (!box) { return; }
    var base = digits(box.dataset.labor) + digits(box.dataset.part) + digits(box.dataset.sealant);

    var dcOn = $('[data-ui="calc-switch"][data-calc="discount"]');
    var dcIn = $('[data-ui="calc-input"][data-calc="discount"]');
    var vatOn = $('[data-ui="calc-switch"][data-calc="vat"]');
    var vatIn = $('[data-ui="calc-input"][data-calc="vat"]');

    var rate = (dcOn && dcOn.checked) ? Math.min(100, digits(dcIn && dcIn.value)) : 0;
    var discount = Math.round(base * rate / 100);
    var supply = base - discount;
    var vat = (vatOn && vatOn.checked) ? Math.round(supply * 0.1) : 0;

    setFieldEnabled(dcIn, !!(dcOn && dcOn.checked));
    if (vatIn) { vatIn.value = vat.toLocaleString('ko-KR'); }

    var supplyOut = $('[data-calc-out="supply"]');
    if (supplyOut) { supplyOut.value = supply.toLocaleString('ko-KR'); }

    var rows = { discount: discount ? '-' + won(discount) : won(0),
                 supply: won(supply), vat: won(vat), total: won(supply + vat) };
    Object.keys(rows).forEach(function (k) {
      var el = $('[data-row="' + k + '"]', box);
      if (el) { el.textContent = rows[k]; }
    });
  }

  doc.addEventListener('change', function (e) {
    if (e.target.matches('[data-ui="calc-switch"]')) { recalc(); }
  });
  doc.addEventListener('input', function (e) {
    if (e.target.matches('[data-ui="calc-input"][data-calc="discount"]')) { recalc(); }
  });

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', recalc);
  } else {
    recalc();
  }

  /* 외부 공개 */
  window.UI = { toast: toast, openSheet: openSheet, closeSheet: closeSheet,
                openDialog: openDialog, openDrawer: openDrawer, closeDrawer: closeDrawer };
}());
