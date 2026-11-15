/* Voransicht: Formulare senden nichts. Kein fetch, kein XHR, kein action-Ziel. */
(function () {
  var NACHRICHT = 'Voransicht: Noch wird nichts gesendet.';
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function untertitelAn(video) {
    function zeig() {
      var tracks = video.textTracks;
      if (!tracks || !tracks.length) return;
      for (var i = 0; i < tracks.length; i++) {
        tracks[i].mode = i === 0 ? 'showing' : 'disabled';
      }
    }
    video.addEventListener('loadedmetadata', zeig);
    if (video.textTracks && video.textTracks.addEventListener) {
      video.textTracks.addEventListener('addtrack', zeig);
    }
    var el = video.querySelector('track');
    if (el) el.addEventListener('load', zeig);
    zeig();
  }
  var videos = document.querySelectorAll('video.nils-interview');
  for (var v = 0; v < videos.length; v++) untertitelAn(videos[v]);

  var root = document.querySelector('[data-anfragen]');
  if (!root) return;

  var tabs = [].slice.call(root.querySelectorAll('[role="tab"]'));
  var panels = [].slice.call(root.querySelectorAll('.gw-panel'));

  function panelMitId(id) {
    for (var i = 0; i < panels.length; i++) {
      if (panels[i].id === id) return panels[i];
    }
    return null;
  }

  function aktivieren(id, fokusTab) {
    var panel = panelMitId(id);
    if (!panel) return false;
    root.classList.add('gw-bereit');
    for (var i = 0; i < panels.length; i++) {
      panels[i].classList.toggle('ist-aktiv', panels[i] === panel);
    }
    for (var j = 0; j < tabs.length; j++) {
      var an = tabs[j].getAttribute('aria-controls') === id;
      tabs[j].setAttribute('aria-selected', an ? 'true' : 'false');
      tabs[j].tabIndex = an ? 0 : -1;
      if (an && fokusTab) tabs[j].focus();
    }
    return true;
  }

  function springe(id) {
    var el = document.getElementById(id);
    if (!el || !el.scrollIntoView) return;
    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    el.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
  }

  var start = (location.hash || '').replace(/^#/, '');
  if (aktivieren(start, false)) springe(start);
  else aktivieren('gw-gaeste', false);

  for (var t = 0; t < tabs.length; t++) {
    tabs[t].addEventListener('click', function (ev) {
      aktivieren(ev.currentTarget.getAttribute('aria-controls'), false);
    });
  }

  window.addEventListener('hashchange', function () {
    var id = (location.hash || '').replace(/^#/, '');
    if (aktivieren(id, false)) springe(id);
  });

  var liste = root.querySelector('[role="tablist"]');
  if (liste) {
    liste.addEventListener('keydown', function (ev) {
      var taste = ev.key;
      if (taste !== 'ArrowRight' && taste !== 'ArrowLeft' && taste !== 'Home' && taste !== 'End') return;
      var aktuell = -1;
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i] === document.activeElement) aktuell = i;
      }
      if (aktuell < 0) return;
      ev.preventDefault();
      var neu = aktuell;
      if (taste === 'ArrowRight') neu = (aktuell + 1) % tabs.length;
      else if (taste === 'ArrowLeft') neu = (aktuell - 1 + tabs.length) % tabs.length;
      else if (taste === 'Home') neu = 0;
      else neu = tabs.length - 1;
      tabs[neu].focus();
      if (tabs[neu].click) tabs[neu].click();
    });
  }

  function siehtNachLink(wert, handleOk) {
    if (!wert || /\s/.test(wert)) return false;
    if (handleOk && /^@[\w.]{2,}$/.test(wert)) return true;
    if (/^https?:\/\/[^\s]+\.[^\s]{2,}/i.test(wert)) return true;
    if (/^[a-z0-9.-]+\.[a-z]{2,}([\/?#].*)?$/i.test(wert)) return true;
    return false;
  }

  function setzeFehler(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text || '';
  }

  function markiere(el, schlecht) {
    if (!el) return;
    if (schlecht) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  }

  function pruefe(form, fokussieren) {
    var ok = true;
    var zuerst = null;
    function scheitern(el, text) {
      ok = false;
      if (!zuerst) zuerst = el;
      markiere(el, true);
      return text;
    }
    var knoten = [].slice.call(form.querySelectorAll('[data-gruppe], [data-regel]'));
    for (var i = 0; i < knoten.length; i++) {
      var el = knoten[i];
      if (el.hasAttribute('data-gruppe')) {
        var fid = el.getAttribute('data-fehler');
        var inputs = [].slice.call(el.querySelectorAll('input'));
        var gewaehlt = false;
        for (var k = 0; k < inputs.length; k++) {
          if (inputs[k].checked) gewaehlt = true;
        }
        var meldung = el.getAttribute('data-fehler-text') || 'Bitte wähl eine Antwort.';
        if (!gewaehlt) {
          ok = false;
          if (!zuerst && inputs[0]) zuerst = inputs[0];
          el.setAttribute('aria-invalid', 'true');
          for (var n = 0; n < inputs.length; n++) inputs[n].setAttribute('aria-invalid', 'true');
          setzeFehler(fid, meldung);
        } else {
          el.removeAttribute('aria-invalid');
          for (var m = 0; m < inputs.length; m++) inputs[m].removeAttribute('aria-invalid');
          setzeFehler(fid, '');
        }
        continue;
      }
      var regel = el.getAttribute('data-regel');
      var fehlerId = el.id + '-f';
      var wert = (el.value || '').replace(/^\s+|\s+$/g, '');
      if (regel === 'pflicht') {
        if (wert === '') setzeFehler(fehlerId, scheitern(el, el.getAttribute('data-fehler-text') || 'Bitte füll dieses Feld aus.'));
        else { markiere(el, false); setzeFehler(fehlerId, ''); }
      } else if (regel === 'email') {
        if (wert === '') setzeFehler(fehlerId, scheitern(el, el.getAttribute('data-fehler-leer') || 'Bitte gib deine E-Mail ein.'));
        else if (!EMAIL.test(wert)) setzeFehler(fehlerId, scheitern(el, el.getAttribute('data-fehler-text') || 'Bitte gib eine gültige E-Mail-Adresse ein.'));
        else { markiere(el, false); setzeFehler(fehlerId, ''); }
      } else if (regel === 'wahl') {
        if (wert === '') setzeFehler(fehlerId, scheitern(el, el.getAttribute('data-fehler-text') || 'Bitte wähl eine Antwort.'));
        else { markiere(el, false); setzeFehler(fehlerId, ''); }
      } else if (regel === 'zimmer') {
        var zahl = Number(wert);
        var zahlOk = wert !== '' && Math.round(zahl) === zahl && zahl >= 1 && zahl <= 999;
        if (!zahlOk) setzeFehler(fehlerId, scheitern(el, el.getAttribute('data-fehler-text') || 'Bitte gib die Anzahl der Zimmer an.'));
        else { markiere(el, false); setzeFehler(fehlerId, ''); }
      } else if (regel === 'url' || regel === 'url-optional') {
        var handleOk = regel === 'url-optional';
        if (wert === '' && handleOk) { markiere(el, false); setzeFehler(fehlerId, ''); }
        else if (!siehtNachLink(wert, handleOk)) setzeFehler(fehlerId, scheitern(el, el.getAttribute('data-fehler-text') || 'Bitte setz einen gültigen Link.'));
        else { markiere(el, false); setzeFehler(fehlerId, ''); }
      } else if (regel === 'datenschutz') {
        if (!el.checked) setzeFehler(fehlerId, scheitern(el, el.getAttribute('data-fehler-text') || 'Bitte setz das Häkchen beim Datenschutz.'));
        else { markiere(el, false); setzeFehler(fehlerId, ''); }
      }
    }
    if (fokussieren && zuerst && zuerst.focus) zuerst.focus();
    return ok;
  }

  var formulare = [].slice.call(root.querySelectorAll('form[data-vorschau-form]'));
  for (var f = 0; f < formulare.length; f++) {
    formulare[f].addEventListener('submit', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var form = ev.currentTarget;
      var status = form.querySelector('[data-vorschau-hinweis]');
      if (status) {
        status.setAttribute('hidden', '');
        status.textContent = '';
      }
      if (!pruefe(form, true) || !status) return;
      status.textContent = NACHRICHT;
      status.removeAttribute('hidden');
      status.focus();
    });
    formulare[f].addEventListener('input', function (ev) {
      var ziel = ev.target;
      if (!ziel || ziel.getAttribute('aria-invalid') !== 'true') return;
      pruefe(ev.currentTarget, false);
      var status = ev.currentTarget.querySelector('[data-vorschau-hinweis]');
      if (status) {
        status.setAttribute('hidden', '');
        status.textContent = '';
      }
    });
    formulare[f].addEventListener('change', function (ev) {
      var ziel = ev.target;
      if (!ziel) return;
      if (ziel.getAttribute('aria-invalid') === 'true' || (ziel.closest && ziel.closest('[aria-invalid="true"]'))) {
        pruefe(ev.currentTarget, false);
      }
    });
  }

  var links = [].slice.call(root.querySelectorAll('.gw-check a'));
  for (var a = 0; a < links.length; a++) {
    links[a].addEventListener('click', function (ev) {
      ev.stopPropagation();
    });
  }
})();
