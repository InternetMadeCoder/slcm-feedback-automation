(() => {
  let yesSelected = 0;
  let dropdownsSet = 0;
  let skipped = 0;

  const labels = [...new Set(
    [...document.querySelectorAll("span")]
      .filter(el => el.textContent.trim().toUpperCase() === "YES")
      .map(el => el.closest("label"))
      .filter(Boolean)
  )];

  const radios = [...document.querySelectorAll(
    'input[type="radio"]'
  )];

  labels.forEach(label => {
    const radio = label.querySelector('input[type="radio"]');

    if (!radio || radio.checked) {
      skipped++;
      return;
    }

    const alreadyAnswered = radios.some(
      input => input.name === radio.name && input.checked
    );

    if (alreadyAnswered) {
      skipped++;
      return;
    }

    label.click();

    if (radio.checked) yesSelected++;
  });

  const dropdowns = [...document.querySelectorAll("select")];

  dropdowns.forEach(select => {
    const yesOption = [...select.options].find(
      option => option.text.trim().toUpperCase() === "YES"
    );

    if (!yesOption || select.value === yesOption.value) return;

    select.value = yesOption.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    dropdownsSet++;
  });

  console.log("Finished:", {
    radioOptionsFound: labels.length,
    yesRadiosSelected: yesSelected,
    skipped,
    dropdownsFound: dropdowns.length,
    dropdownsSetToYes: dropdownsSet,
    submitted: false
  });
})();