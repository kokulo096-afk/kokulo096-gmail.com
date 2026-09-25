const checkboxes = Array.from(document.querySelectorAll("[data-safety-check]"));
const progress = document.querySelector("#safety-progress");
const status = document.querySelector("#safety-status");
const resetButton = document.querySelector("#reset-checklist");
const storageKey = "my-first-website-safety-checklist";

function updateProgress() {
    const checkedCount = checkboxes.filter((checkbox) => checkbox.checked).length;
    progress.value = checkedCount;
    status.textContent = `${checkedCount} of ${checkboxes.length} habits checked.`;
}

function saveChecklist() {
    const savedState = Object.fromEntries(
        checkboxes.map((checkbox) => [checkbox.dataset.safetyCheck, checkbox.checked])
    );

    try {
        localStorage.setItem(storageKey, JSON.stringify(savedState));
    } catch {
        // The checklist still works when browser storage is unavailable.
    }
}

try {
    const savedState = JSON.parse(localStorage.getItem(storageKey) || "{}");
    checkboxes.forEach((checkbox) => {
        checkbox.checked = savedState[checkbox.dataset.safetyCheck] === true;
    });
} catch {
    // Start with an empty checklist if saved data cannot be read.
}

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        saveChecklist();
        updateProgress();
    });
});

resetButton.addEventListener("click", () => {
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    try {
        localStorage.removeItem(storageKey);
    } catch {
        // Reset the visible state even when browser storage is unavailable.
    }

    updateProgress();
});

updateProgress();