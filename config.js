// PROMPT&PLAY Ai Configuration (Client Version - Secure)


const CONFIG = {

  delays: {
    actionMin: 0,  
    actionMax: 0,  
    afterConfirmMin: 0,  
    afterConfirmMax: 0,  
  },

  automation: {
    afterGeneratePrompt: { min: 0, max: 0 },
    afterFillPrompt: { min: 0, max: 0 },
    afterUploadImage: { min: 0, max: 0 },
    afterClickCreate: { min: 0, max: 0 },
    betweenDownloads: { min: 0, max: 0 },
  },

  bananaAutomation: {
    afterGeneratePrompt: { min: 0, max: 0 },
    afterFillPrompt: { min: 0, max: 0 },
    afterUploadImage: { min: 0, max: 0 },
    afterClickCreate: { min: 0, max: 0 },
    betweenDownloads: { min: 0, max: 0 },
  },


  selectors: {
    uploadButton: '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div:nth-child(1) > div > div:nth-child(1) > button',
    confirmButton: '#radix-\\:r1d\\: > div.sc-5983bb27-4.hUNtLL > div > button.sc-c177465c-1.gdArnN.sc-5983bb27-7.csgOts',
    confirmButtonAlt: 'button.sc-5983bb27-7.csgOts',
    textArea: 'PINHOLE_TEXT_AREA_ELEMENT_ID'
  }
};


function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getActionDelay() {
  return getRandomDelay(CONFIG.delays.actionMin, CONFIG.delays.actionMax);
}

function getAfterConfirmDelay() {
  return getRandomDelay(CONFIG.delays.afterConfirmMin, CONFIG.delays.afterConfirmMax);
}

function getAutomationDelay(step, isBanana = false) {
  const configSource = isBanana ? CONFIG.bananaAutomation : CONFIG.automation;
  const stepConfig = configSource[step];
  if (stepConfig) {
    return getRandomDelay(stepConfig.min, stepConfig.max);
  }
  return 1000; // ค่า Default กัน Error
}