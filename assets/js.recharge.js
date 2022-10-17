
const oneTimePurchase = document.querySelector('#one-time-purchase')
const subscribeAndSave = document.querySelector('#subscribe-and-save')
const oneTimePurchaseFormBlock = document.querySelector('#one-time-purchase-form-block');
const subscribeAndSaveFormBlock = document.querySelector('#subscribe-and-save-form-block');

oneTimePurchase.addEventListener('click', (e) => {
    subscribeAndSaveFormBlock.style.display = 'none';
    oneTimePurchaseFormBlock.style.display = 'block';
})

subscribeAndSave.addEventListener('click', (e) => {
    subscribeAndSaveFormBlock.style.display = 'block';
    oneTimePurchaseFormBlock.style.display = 'none';
})