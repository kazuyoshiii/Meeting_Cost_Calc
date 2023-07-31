document.addEventListener('DOMContentLoaded', function () {
    // Get the stored unit price
    chrome.storage.sync.get('unitPrice', function (data) {
        document.getElementById('unit-price').innerText = '¥' + data.unitPrice.toLocaleString();
    });
    // Add click event listener to the update button
    document.getElementById('update-price').addEventListener('click', function () {
        const newUnitPrice = parseFloat(document.getElementById('new-unit-price').value);
        if (!isNaN(newUnitPrice)) {
            chrome.storage.sync.set({ unitPrice: newUnitPrice }, function () {
                // Update the displayed unit price
                document.getElementById('unit-price').innerText = '¥' + newUnitPrice.toLocaleString();
                // Clear the input field
                document.getElementById('new-unit-price').value = '';
            });
        } else {
            alert('Please enter a valid number');
        }
    });
});
