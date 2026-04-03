// ─── Download VCF ────────────────────────────────────────────
function downloadVCF() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:;Debbie;;;',
    'FN:Debbie',
    'ORG:Germ Eviction',
    'TITLE:Disinfection Specialist',
    'TEL;TYPE=WORK,VOICE:+13036659757',
    'TEL;TYPE=CELL:+13036659757',
    'EMAIL;TYPE=WORK:debbie@germeviction.com',
    'ADR;TYPE=WORK:;;11005 Dover St Unit 200;Westminster;CO;80021;USA',
    'URL:https://germeviction.com',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'Debbie-GermEviction.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  const btn = document.getElementById('saveBtn');
  const original = btn.innerHTML;
  btn.textContent = 'Saved!';
  btn.style.background = '#1fa8a8';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
  }, 2000);
}

// ─── Share Card ──────────────────────────────────────────────
function shareCard() {
  const shareData = {
    title: 'Germ Eviction — Debbie',
    text:  'Debbie | Disinfection Specialist\nGerm Eviction\n📞 (303) 665-9757\n✉️ debbie@germeviction.com',
    url:   window.location.href
  };

  const btn = document.getElementById('shareBtn');
  const original = btn.innerHTML;

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    const text = shareData.text + '\n🌐 ' + shareData.url;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.innerHTML = original; }, 2000);
    }).catch(() => {});
  }
}
