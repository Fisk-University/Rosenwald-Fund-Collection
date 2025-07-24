    document.addEventListener('DOMContentLoaded', () => {
      // Generic helper: find the FIRST option (or the one with an empty value)
      // and set its label to your placeholder text.
      function setPlaceholder(selectId, text) {
        const sel = document.querySelector(selectId);
        if (!sel) return;
        // pick the option that either has value="" or is simply the first child
        const opt = sel.querySelector('option[value=""], option:first-child');
        if (opt) opt.textContent = text;
        return sel;
      }

      // 1) State
      setPlaceholder('#property-one-select', 'Select state');

      // 2) County (and re-apply if the drop-down is re-populated)
      const county = setPlaceholder('#property-two-select', 'Select county');
      if (county) {
        const mo = new MutationObserver(() => {
          // every time the <option>s change, re-set it
          const opt = county.querySelector('option[value=""], option:first-child');
          if (opt) opt.textContent = 'Select county';
        });
        mo.observe(county, { childList: true });
      }
    });