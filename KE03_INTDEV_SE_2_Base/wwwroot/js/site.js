// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener('DOMContentLoaded', () => {
    const selectAll = document.getElementById('selectAll');
    if (!selectAll) return;

    selectAll.addEventListener('change', () => {
        document.querySelectorAll('.row-checkbox').forEach(cb => {
            cb.checked = selectAll.checked;
        });
    });
});

function filterTable() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#orderTable tbody tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}