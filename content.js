function getNumberOfPeople() {
  const peopleElement = document.querySelector('.UfeRlc');
  if (peopleElement && /\d+/.test(peopleElement.textContent)) {
    const numberOfPeople = parseInt(peopleElement.textContent.match(/\d+/)[0], 10);
    return numberOfPeople;
  }
  return 0;
}

function getMeetingDuration() {
  const startTimeElement = document.getElementById('xStTiIn');
  const endTimeElement = document.getElementById('xEnTiIn');
  if (startTimeElement && endTimeElement) {
    const startTime = startTimeElement.value;
    const endTime = endTimeElement.value;
    const startDate = new Date(`1970-01-01T${startTime}:00`);
    const endDate = new Date(`1970-01-01T${endTime}:00`);
    return (endDate - startDate) / (1000 * 60 * 60);
  }
  return 0;
}

function insertCost(unitPrice) {
  const targetElement = document.querySelector('.FrSOzf.tdXRXb');
  if (targetElement) {
    let costContainer = document.querySelector('.meeting-cost-container');
    if (costContainer) {
      costContainer.remove();
    }
    costContainer = document.createElement('div');
    costContainer.className = 'meeting-cost-container';
    costContainer.style.display = 'flex';
    costContainer.style.alignItems = 'center';
    costContainer.style.padding = '8px';
    costContainer.style.marginTop = '8px';
    costContainer.style.marginBottom = '8px';

    // ロゴを追加
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    logoContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960"><path d="M140-200q-24 0-42-18t-18-42v-440q0-24 18-42t42-18h680q24 0 42 18t18 42v440q0 24-18 42t-42 18H140Zm0-60h680v-440H140v440Zm470-50h160v-160h-50v110H610v50Zm-129.941-55Q528-365 561.5-398.559t33.5-81.5Q595-528 561.441-561.5t-81.5-33.5Q432-595 398.5-561.441t-33.5 81.5Q365-432 398.559-398.5t81.5 33.5ZM190-485h50v-110h110v-50H190v160Zm-50 225v-440 440Z"/></svg>';
    logoContainer.style.marginRight = '22px';
    logoContainer.style.marginLeft = '14px';
    costContainer.appendChild(logoContainer);


    // コスト詳細を追加
    const numberOfPeople = getNumberOfPeople();
    const duration = getMeetingDuration();
    const cost = unitPrice * duration * numberOfPeople;
    const costDetail = document.createElement('div');
    costDetail.innerHTML = `<strong>会議コスト:</strong> ¥${cost.toLocaleString()}`;
    costDetail.style.color = '#3C4043'; 
    costDetail.style.fontSize = '14px';
    costDetail.style.fontWeight = '400';
    costDetail.style.marginBottom = '4px';
    costContainer.appendChild(costDetail);


    targetElement.insertAdjacentElement('beforebegin', costContainer);
  }
}

let isInserting = false;

chrome.storage.sync.get('unitPrice', function (data) {
  const unitPrice = data.unitPrice || 0;

  const calendarObserver = new MutationObserver(() => {
    if (isInserting) return;

    isInserting = true;

    requestAnimationFrame(() => {
      insertCost(unitPrice);
      isInserting = false;
    });
  });

  const targetToObserve = document.querySelector('#YPCqFe');
  if (targetToObserve) {
    calendarObserver.observe(targetToObserve, { childList: true, subtree: true });
  }
});
