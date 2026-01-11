

// ============================================
// 1. SYSTEM: VISUAL UI CONTROLLER
// ============================================

// A. เปลี่ยนแท็บคาแรคเตอร์
function switchCharTab(tabName) {
    const tabs = document.querySelectorAll('.char-tab-btn');
    const groups = document.querySelectorAll('.char-group');
    
    tabs.forEach(btn => {
        const target = btn.dataset.target || btn.getAttribute('data-target');
        if (target === tabName) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    groups.forEach(group => group.style.display = 'none');
    const targetGroup = document.getElementById(`char-group-${tabName}`);
    if (targetGroup) targetGroup.style.display = 'block';
}



// B. เลือกคาแรคเตอร์ (ฉบับอัปเดต: ล็อคชุดให้ Job และ Senior)
function selectCharacter(element, value) {
    // 1. เก็บค่าลง Input หลัก
    const hiddenInput = document.getElementById('banana-character-select');
    if (hiddenInput) hiddenInput.value = value;

    // 2. เปลี่ยนสีปุ่ม Active
    document.querySelectorAll('.char-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    // ========================================================
    // 🟢 [อัปเดต] Logic ล็อคช่องเลือกชุด (Job + Senior)
    // ========================================================
    
    // 1. เช็คว่าเป็นหมวด "อาชีพ" หรือไม่?
    const isJobGroup = element.closest('#char-group-job') !== null;
    
    // 2. เช็คว่าเป็นหมวด "สูงวัย" (มนุษย์ป้า/ลุง/ยาย/ตา) หรือไม่?  <-- เพิ่มตรงนี้
    const isSeniorGroup = element.closest('#char-group-senior') !== null;
    
    // หา Wrapper ของส่วนเลือกชุด
    const outfitContent = document.getElementById('config-content-outfit');
    const outfitWrapper = outfitContent ? outfitContent.closest('.input-group') : null;

    if (outfitWrapper) {
        // 🔒 ถ้าเป็น "อาชีพ" หรือ "สูงวัย" -> ให้ล็อคช่องชุดทันที!
        if (isJobGroup || isSeniorGroup) {
            outfitWrapper.classList.add('disabled-section');
            
            // รีเซ็ตปุ่มชุดให้กลับไปเป็น "สุ่ม" (Auto) เพื่อความเรียบร้อย
            const outfitAutoBtn = document.querySelector('#config-content-outfit .config-option[data-value="auto"]');
            if (outfitAutoBtn) outfitAutoBtn.click(); 
            
        } else {
            // 🔓 ถ้าเป็นหมวดอื่น (วัยรุ่น, ไฮโซ) -> ปลดล็อคให้เลือกชุดได้ปกติ
            outfitWrapper.classList.remove('disabled-section');
        }
    }

    // 3. Logic เดิม: เคลียร์รูปนางแบบถ้าเลือกคาแรคเตอร์
    if (typeof modelUploadedImages !== 'undefined' && modelUploadedImages.length > 0 && value !== 'auto') {
        try {
            modelUploadedImages = [];
            if (typeof modelUpdateUI === 'function') modelUpdateUI();
        } catch(e) {}
    }
}



// C. Toggle Config
function toggleConfig(id) {
    const content = document.getElementById(`config-content-${id}`);
    const header = document.getElementById(`header-${id}`);
    if(!content) return;

    document.querySelectorAll('.config-content').forEach(el => {
        if(el !== content && el.classList.contains('show')) {
            el.classList.remove('show');
            const otherId = el.id.replace('config-content-', '');
            const otherHeader = document.getElementById(`header-${otherId}`);
            if(otherHeader) otherHeader.classList.remove('open');
        }
    });

    content.classList.toggle('show');
    if(header) header.classList.toggle('open');
}

// D. Select Config Option
function selectConfigOption(element) {
    const type = element.dataset.type;
    const value = element.dataset.value;
    const label = element.dataset.label;

    // 1. ลองหา Input แบบปกติ (Banana)
    let input = document.getElementById(`banana-${type}-select`);
    
    // 2. ถ้าไม่เจอ ให้ลองหา Input ของ Video (กรณี vstyle)
    // 🟢 แก้ไข: เพิ่มการเช็คตรงนี้ เพื่อให้ Video Style ทำงานได้
    if (!input && type === 'vstyle') {
        input = document.getElementById('video-style-select');
    }

    if(input) input.value = value;

    const display = document.getElementById(`display-${type}`);
    if(display) {
        let cleanLabel = label;
        if(label.includes(' ')) cleanLabel = label.split(' ').slice(1).join(' ');
        display.innerHTML = label; 
    }

    const container = document.getElementById(`config-content-${type}`);
    if(container) {
        container.querySelectorAll('.config-option').forEach(opt => opt.classList.remove('active'));
    }
    element.classList.add('active');
    
    // ถ้าไม่ใช่ vstyle ค่อย toggle (เพราะ vstyle โชว์ตลอด)
    if (type !== 'vstyle') {
        toggleConfig(type);
    }
}


// E. Switch Config Tab (แก้ไข: Auto Select ถ้ามีตัวเลือกเดียว)
function switchConfigTab(element) {
    const type = element.dataset.type; // 'style', 'bg', 'outfit', 'vstyle'
    const groupName = element.dataset.group;
    
    const container = document.getElementById(`config-content-${type}`);
    if(!container) return;

    // 1. เปลี่ยนสถานะปุ่ม Tab ให้ Active
    container.querySelectorAll('.config-tab-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    // 2. กำหนดรายการกลุ่มของแต่ละประเภท
    let groups = [];
    if(type === 'style') {
        groups = ['auto', 'general', 'ugc', 'special'];
    } else if (type === 'bg') {
        groups = ['auto', 'indoor', 'urban', 'nature', 'local'];
    } else if (type === 'outfit') {
        groups = ['auto', 'daily', 'work', 'uniform', 'local', 'fashion'];
    } else if (type === 'vstyle') { 
        groups = ['auto', 'promo', 'review', 'demo', 'fun'];
    }

    // 3. วนลูปเปิด/ปิด Group และ Auto Select
    groups.forEach(g => {
        const groupId = `${type}-group-${g}`;
        const el = document.getElementById(groupId);
        
        if(el) {
            if (g === groupName) {
                // เปิดแสดงผล Group นี้
                el.style.display = (g === 'auto') ? 'block' : 'grid';

                // 🟢 [เพิ่มใหม่] Auto Select: ถ้ามีตัวเลือกแค่ 1 อัน หรือเป็นโหมด auto -> กดให้เลย
                const options = el.querySelectorAll('.config-option');
                if (options.length > 0) {
                    // ถ้าในกลุ่มนี้มีตัวเลือกแค่อันเดียว (เช่น ปุ่มสุ่ม) หรือเป็นกลุ่ม 'auto'
                    if (options.length === 1 || g === 'auto') {
                        // สั่ง Click อัตโนมัติ (ใส่ Timeout นิดนึงกันรวน)
                        setTimeout(() => {
                            options[0].click();
                        }, 50);
                    }
                }

            } else {
                // ปิด Group อื่น
                el.style.display = 'none';
            }
        }
    });
}


// F. Select Segment (Rounds & Clips) - แก้ไขรองรับทั้ง Video และ Banana
function selectSegment(element) {
    const type = element.dataset.type;   // 'rounds' หรือ 'clips'
    const value = element.dataset.value; // '1', '3', '5', 'custom'

    // 1. เช็คว่ากดมาจากหน้าไหน? (Video หรือ Banana)
    const isVideoTab = element.closest('#tab-content-video') !== null;
    
    // 2. กำหนด ID เป้าหมายให้ถูกฝั่ง
    let mainInputId, customInputId;

    if (isVideoTab) {
        // ฝั่ง Video
        mainInputId = (type === 'rounds') ? 'video-round-count' : 'video-download-count-auto';
        customInputId = 'video-custom-round-input';
    } else {
        // ฝั่ง Banana
        mainInputId = (type === 'rounds') ? 'banana-round-count' : 'banana-download-count';
        customInputId = 'banana-custom-round-input';
    }

    // 3. จัดการกรณีเลือก 'custom' (+)
    if (value === 'custom') {
        const customInput = document.getElementById(customInputId);
        if (customInput) {
            customInput.classList.remove('hidden'); // เปิดช่องกรอก
            customInput.style.display = 'block';    // บังคับโชว์
            customInput.focus();
        }
        
        // อัปเดต UI ปุ่ม
        const parent = element.parentElement;
        parent.querySelectorAll('.segment-opt').forEach(b => b.classList.remove('active'));
        element.classList.add('active');
        
        // บอก input หลักว่าเป็น custom
        const mainInput = document.getElementById(mainInputId);
        if (mainInput) mainInput.value = 'custom';
        
        return; // จบงาน
    }

    // 4. จัดการกรณีเลือกตัวเลขปกติ (1, 3, 5)
    // ซ่อนช่อง custom กลับไป
    const customInput = document.getElementById(customInputId);
    if (customInput) {
        customInput.classList.add('hidden');
        customInput.style.display = 'none';
    }

    // อัปเดตค่าลง Input หลัก
    const mainInput = document.getElementById(mainInputId);
    if (mainInput) {
        mainInput.value = value;
        
        // อัปเดต UI ปุ่ม active
        const parent = element.parentElement;
        parent.querySelectorAll('.segment-opt').forEach(b => b.classList.remove('active'));
        element.classList.add('active');

        // สั่งอัปเดตข้อความสรุปทันที
        if (isVideoTab && typeof videoUpdateRoundInfo === 'function') videoUpdateRoundInfo();
        if (!isVideoTab && typeof bananaUpdateRoundInfo === 'function') bananaUpdateRoundInfo();
    }
}

// G. Setup Visual UI
function setupAllVisualUI() {
    console.log("🛠️ Setting up Visual UI...");
    function addSafeClick(selector, callback) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
            newEl.addEventListener('click', (e) => callback(newEl, e));
        });
    }

    addSafeClick('.char-tab-btn:not(.config-tab-btn)', (btn) => switchCharTab(btn.dataset.target || btn.getAttribute('data-target')));
    addSafeClick('.char-card', (card) => selectCharacter(card, card.dataset.value));
    addSafeClick('.config-header', (header) => toggleConfig(header.dataset.target));
    addSafeClick('.config-option', (opt) => selectConfigOption(opt));
    addSafeClick('.config-tab-btn', (btn) => switchConfigTab(btn));
    addSafeClick('.segment-opt', (seg) => selectSegment(seg));
}

// ============================================
// 2. MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupAllVisualUI();

    if(typeof setupSettingsModal === 'function') setupSettingsModal();
    const overlay = document.getElementById('login-overlay');
    if (overlay) overlay.style.display = 'none';
    
    if(document.getElementById('banana-upload-zone')) {
        bananaSetupUploadZone();
        bananaSetupEventListeners();
        bananaUpdateImageCount();
    }
    if(document.getElementById('model-upload-zone')) {
        modelSetupUploadZone();
    }
    if(document.getElementById('video-upload-zone')) {
        videoSetupUploadZone();
        videoSetupEventListeners();
        videoUpdateImageCount();
    }
// 🟢 Tab Switching Logic
    const tabButtons = document.querySelectorAll('.segment-btn');
    const tabContents = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => {
           content.classList.remove('active');
           if (content.id === `tab-content-${btn.dataset.tab}`) {
               content.classList.add('active');
           }
        });
      });
    });
    
    console.log("System Ready: V4.0.9 (Duplicate Fixed)"); 
});
// ============================================
// SHARED UTILITIES
// ============================================


//function getAutomationDelay(key) {
   // const defaults = { actionMin: 2000, actionMax: 4000, afterUploadImage: 3000, afterFillPrompt: 2000, betweenDownloads: 2000 };
  //  return defaults[key] || 3000;
//}

function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}




// Get Gemini API Key
function getGeminiApiKey() {
  return localStorage.getItem('gemini_api_key') || '';
}

// Settings Modal Elements (Shared)
const btnSettings = document.getElementById('btn-settings');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings');
const cancelSettingsBtn = document.getElementById('btn-cancel-settings');
const saveSettingsBtn = document.getElementById('btn-save-settings');
const geminiApiKeyInput = document.getElementById('gemini-api-key');

// Quota Modal Elements
const quotaModal = document.getElementById('quota-modal');
const closeQuotaModalBtn = document.getElementById('close-quota-modal');
const btnCloseQuotaModal = document.getElementById('btn-close-quota-modal');









const veo3AspectRatioSelect = document.getElementById('veo3-aspect-ratio');

// Setup Settings Modal
function setupSettingsModal() {
  btnSettings.addEventListener('click', openSettingsModal);
  closeSettingsBtn.addEventListener('click', closeSettingsModal);
  cancelSettingsBtn.addEventListener('click', closeSettingsModal);
  saveSettingsBtn.addEventListener('click', saveSettings);

  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      closeSettingsModal();
    }
  });
}

function openSettingsModal() {
  const savedApiKey = localStorage.getItem('gemini_api_key') || '';
  geminiApiKeyInput.value = savedApiKey;
  const savedAspectRatio = localStorage.getItem('veo3_aspect_ratio') || '9:16';
  veo3AspectRatioSelect.value = savedAspectRatio;
  settingsModal.classList.add('show');
}

function closeSettingsModal() {
  settingsModal.classList.remove('show');
}

function saveSettings() {
  const apiKey = geminiApiKeyInput.value.trim();
  const aspectRatio = veo3AspectRatioSelect.value;
  localStorage.setItem('gemini_api_key', apiKey);
  localStorage.setItem('veo3_aspect_ratio', aspectRatio);
  closeSettingsModal();
  showToast('Settings saved!', 'success');
}

// ============================================
// VIDEO PROMPT&PLAY MODULE
// ============================================

// DOM Elements (Video Tab - prefix: video-)
const videoUploadZone = document.getElementById('video-upload-zone');
const videoFileInput = document.getElementById('video-file-input');
const videoImageCount = document.getElementById('video-image-count');
const videoClearImagesBtn = document.getElementById('video-clear-images');
const videoStatusText = document.getElementById('video-status-text');
const videoBtnAutomation = document.getElementById('video-btn-automation');
const videoDownloadCountAuto = document.getElementById('video-download-count-auto');
const videoBtnStop = document.getElementById('video-btn-stop');
const videoPromptStatus = document.getElementById('video-prompt-status');
const videoRoundCountSelect = document.getElementById('video-round-count');
const videoCustomRoundInput = document.getElementById('video-custom-round-input');
const videoRoundInfo = document.getElementById('video-round-info');
const videoProductNameInput = document.getElementById('video-product-name');
const videoBtnGeneratePrompt = document.getElementById('video-btn-generate-prompt');
const videoPromptResultContainer = document.getElementById('video-prompt-result-container');
const videoPromptResult = document.getElementById('video-prompt-result');
const videoBtnCopyPrompt = document.getElementById('video-btn-copy-prompt');
const videoLogContainer = document.getElementById('video-log-container');
const videoLogClearBtn = document.getElementById('video-log-clear');
// [ส่วนเพิ่มใหม่] ตัวแปรสำหรับเลือกเสียง/สำเนียง
const videoVoiceStyleSelect = document.getElementById('video-voice-style-select');
const videoRandomVoiceCheckbox = document.getElementById('video-random-voice-checkbox');

// Store uploaded images (Video)
let videoUploadedImages = [];
let videoCurrentImageIndex = 0;
let videoIsAutomationRunning = false;
let videoShouldStopAutomation = false;
let videoStatusTimeoutId = null;
let videoLogs = [];


// Video PROMPT&PLAY: Setup upload zone events
function videoSetupUploadZone() {
  videoUploadZone.addEventListener('click', () => {
    videoFileInput.click();
  });

  videoFileInput.addEventListener('change', (e) => {
    videoHandleFiles(e.target.files);
  });

  videoUploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    videoUploadZone.classList.add('dragover');
  });

  videoUploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    videoUploadZone.classList.remove('dragover');
  });

  videoUploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    videoUploadZone.classList.remove('dragover');
    videoHandleFiles(e.dataTransfer.files);
  });
}

// ============================================
// VIDEO IMAGE PREVIEW SYSTEM (เพิ่มใหม่)
// ============================================
const videoPreviewContainer = document.getElementById('video-preview-container');

// ฟังก์ชันจัดการไฟล์ที่อัปโหลด (Video)
function videoHandleFiles(files) {
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

  imageFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: e.target.result
      };
      videoUploadedImages.push(imageData);
      videoUpdateImageCount(); // เรียกอัปเดตหน้าจอ
    };
    reader.readAsDataURL(file);
  });

  videoFileInput.value = '';
}

// ฟังก์ชันลบรูปทั้งหมด (Video)
function videoClearAllImages() {
  videoUploadedImages = [];
  videoUpdateImageCount();
  videoUpdateStatus('All images cleared');
}

// ฟังก์ชันลบทีละรูป (Video)
function videoRemoveOneImage(index) {
  videoUploadedImages.splice(index, 1);
  videoUpdateImageCount();
}

// ฟังก์ชันอัปเดตหน้าจอและแสดงรูปตัวอย่าง (Video)
function videoUpdateImageCount() {
  // 1. อัปเดตตัวเลข
  videoImageCount.textContent = videoUploadedImages.length;

  // 2. จัดการปุ่ม Clear All
  if (videoUploadedImages.length > 0) {
    if(videoClearImagesBtn) videoClearImagesBtn.style.display = 'flex';
  } else {
    if(videoClearImagesBtn) videoClearImagesBtn.style.display = 'none';
  }

  // 3. อัปเดตข้อมูลรอบ
  videoUpdateRoundInfo();

  // 4. สร้างรูปตัวอย่าง (Render Previews)
  if (videoPreviewContainer) {
    videoPreviewContainer.innerHTML = ''; // เคลียร์ของเก่า

    videoUploadedImages.forEach((img, index) => {
      const item = document.createElement('div');
      item.className = 'preview-item'; // ใช้ Style เดียวกับหน้า Banana

      const imgEl = document.createElement('img');
      imgEl.src = img.dataUrl;
      imgEl.title = img.name;

      // ปุ่มลบ
      const delBtn = document.createElement('button');
      delBtn.className = 'preview-remove-btn';
      delBtn.innerHTML = '✕';
      delBtn.onclick = () => videoRemoveOneImage(index);

      item.appendChild(imgEl);
      item.appendChild(delBtn);
      videoPreviewContainer.appendChild(item);
    });
  }
}


// Video PROMPT&PLAY: Update round info display
function videoUpdateRoundInfo() {
	if (!videoRoundCountSelect || !videoCustomRoundInput || !videoRoundInfo) return;
  const imageTotal = videoUploadedImages.length;
  const selectValue = videoRoundCountSelect.value;

  if (selectValue === 'custom') {
    videoCustomRoundInput.style.display = 'block';
    videoRoundInfo.style.display = 'none';
  } else {
    videoCustomRoundInput.style.display = 'none';
    videoRoundInfo.style.display = 'none'; // ซ่อนไว้ เผื่อวันหน้าจะโชว์
  }

  const roundsPerImage = videoGetRoundsPerImage();
  const totalRounds = imageTotal * roundsPerImage;

  if (imageTotal === 0) {
    videoRoundInfo.textContent = `เลือก ${roundsPerImage} รอบต่อภาพ`;
  } else {
    videoRoundInfo.textContent = `${imageTotal} ภาพ × ${roundsPerImage} รอบ = ${totalRounds} รอบทั้งหมด`;
  }
}

// Video PROMPT&PLAY: Get rounds per image (ฉบับแก้ไข: อ่านค่าจากกล่อง Custom เสมอ)
function videoGetRoundsPerImage() {
  const select = document.getElementById('video-round-count');
  const customInput = document.getElementById('video-custom-round-input');

  if (!select) return 1;

  // ถ้าเลือกโหมด Custom หรือถ้า Custom Input เปิดแสดงผลอยู่
  if (select.value === 'custom' || (customInput && !customInput.classList.contains('hidden'))) {
      if (customInput) {
          const val = parseInt(customInput.value);
          // ถ้าเป็นตัวเลขและมากกว่า 0 ให้ใช้ค่านั้น, ถ้าไม่ใช่ (เช่นช่องว่าง) ให้ใช้ 1
          return (val > 0) ? val : 1;
      }
  }

  // กรณีเลือกแบบปกติ 1, 3, 5
  const rounds = parseInt(select.value);
  return (rounds > 0) ? rounds : 1;
}



// Video PROMPT&PLAY: Add log entry
function videoAddLog(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString('th-TH');
  const logEntry = {
    time: timestamp,
    message: message,
    type: type
  };
  
  videoLogs.push(logEntry);
  
  // Keep only last 500 logs
  if (videoLogs.length > 500) {
    videoLogs = videoLogs.slice(-500);
  }
  
  // Update UI
  videoUpdateLogDisplay();
  
  // Also log to console
  const consoleMethod = type === 'error' ? 'error' : type === 'warning' ? 'warn' : 'log';
  console[consoleMethod](`[${timestamp}] ${message}`);
}

// Video PROMPT&PLAY: Update log display
function videoUpdateLogDisplay() {
  if (!videoLogContainer) return;
  
  if (videoLogs.length === 0) {
    videoLogContainer.innerHTML = '<div class="log-empty">ยังไม่มี log</div>';
    return;
  }
  
  const logHTML = videoLogs.map(log => {
    let typeClass = 'log-entry-info';
    if (log.type === 'error') typeClass = 'log-entry-error';
    else if (log.type === 'success') typeClass = 'log-entry-success';
    else if (log.type === 'warning') typeClass = 'log-entry-warning';
    else if (log.type === 'step') typeClass = 'log-entry-step';
    
    return `<div class="log-entry ${typeClass}">
      <span class="log-entry-time">[${log.time}]</span>
      <span class="log-entry-message">${log.message}</span>
    </div>`;
  }).join('');
  
  videoLogContainer.innerHTML = logHTML;
  
  // Auto scroll to bottom
  videoLogContainer.scrollTop = videoLogContainer.scrollHeight;
}

// Video NPROMPT&PLAY: Clear logs
function videoClearLogs() {
  videoLogs = [];
  videoUpdateLogDisplay();
}

// Video PROMPT&PLAY: Update status
function videoUpdateStatus(message, persistent = false) {
  if (videoStatusTimeoutId) {
    clearTimeout(videoStatusTimeoutId);
    videoStatusTimeoutId = null;
  }

  videoStatusText.textContent = message;
  
  // Add to log
  videoAddLog(message, persistent ? 'step' : 'info');

  if (!videoIsAutomationRunning && !persistent) {
    videoStatusTimeoutId = setTimeout(() => {
      videoStatusText.textContent = 'Ready to use';
    }, 3000);
  }
}

// Video PROMPT&PLAY: Setup event listeners
function videoSetupEventListeners() {
  // ใส่ if เพื่อเช็คว่าปุ่มมีอยู่จริงไหมก่อนสั่งงาน (ป้องกัน Error จอแดง)
  if (videoClearImagesBtn) videoClearImagesBtn.addEventListener('click', videoClearAllImages);
  if (videoBtnAutomation) videoBtnAutomation.addEventListener('click', videoRunAutomation);
  if (videoBtnStop) videoBtnStop.addEventListener('click', videoStopAutomation);
  
  // จุดที่เคยเกิดปัญหา: เพิ่มการเช็ค if (videoRoundCountSelect)
  if (videoRoundCountSelect) {
      videoRoundCountSelect.addEventListener('change', videoUpdateRoundInfo);
  }
  
  // จุดที่เคยเกิดปัญหา: เพิ่มการเช็ค if (videoCustomRoundInput)
  if (videoCustomRoundInput) {
      videoCustomRoundInput.addEventListener('input', videoUpdateRoundInfo);
  }

  if (videoBtnCopyPrompt) videoBtnCopyPrompt.addEventListener('click', videoHandleCopyPrompt);
  
  // Log clear button
  if (videoLogClearBtn) {
    videoLogClearBtn.addEventListener('click', videoClearLogs);
  }
  
  // Generate Prompt Only button
  if (videoBtnGeneratePrompt) {
    videoBtnGeneratePrompt.addEventListener('click', videoGeneratePromptOnly);
  }
  
  // No Character toggle - show/hide presentation container
  const videoNoCharacter = document.getElementById('video-no-character');
  const videoPresentationContainer = document.getElementById('video-presentation-container');
  if (videoNoCharacter && videoPresentationContainer) {
    videoNoCharacter.addEventListener('change', (e) => {
      videoPresentationContainer.style.display = e.target.checked ? 'block' : 'none';
    });
  }
}

// ============================================
// Video: Generate Prompt Only (ไม่รัน Automation)
// ============================================
async function videoGeneratePromptOnly() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    showToast('กรุณาตั้งค่า Gemini API Key ก่อน', 'error');
    return;
  }
  
  if (videoUploadedImages.length === 0) {
    showToast('กรุณาอัพโหลดภาพก่อน', 'error');
    return;
  }
  
  showToast('กำลังสร้าง Prompt...', 'info');
  
  try {
    const imageData = videoUploadedImages[0];
    const productName = videoProductNameInput?.value?.trim() || '';
    const isSmartAuto = document.getElementById('video-smart-auto-checkbox')?.checked || false;
    
    let userMessage = '';
    const noText = document.getElementById('video-no-text')?.checked || false;
    const textEffectValue = document.getElementById('video-text-effect')?.value || 'none';
    const textEffectData = window.getTextEffect ? window.getTextEffect(textEffectValue) : { prompt: '' };
    
    let textInstruction = '';
    if (noText) {
      textInstruction = '\n⚠️ สำคัญ: ห้ามใส่ข้อความใดๆ ลงบนวีดีโอ (no text overlay)';
    } else if (textEffectValue !== 'none') {
      textInstruction = `\nเอฟเฟกต์ข้อความ: ${textEffectData.prompt}`;
    }
    
    // No Character mode - CRITICAL: Must exclude all character/model instructions from prompt
    const noCharacter = document.getElementById('video-no-character')?.checked || false;
    const presentationValue = document.getElementById('video-presentation-style')?.value || 'product_present';
    const presentationData = window.getVideoPresentationStyle ? window.getVideoPresentationStyle(presentationValue) : { prompt: '' };
    
    let characterInstruction = '';
    if (noCharacter) {
      // CRITICAL: Strong instructions to absolutely exclude any person/model/character
      characterInstruction = `

⚠️⚠️⚠️ CRITICAL INSTRUCTION - ABSOLUTELY NO PEOPLE ⚠️⚠️⚠️
- DO NOT include ANY person, model, character, human, man, woman, or any part of human body in the video
- NO hands holding product (unless "ซูมสินค้า" is selected)
- NO face, NO body parts
- PRODUCT ONLY - The product must be the ONLY subject in the video
- 8 seconds video length
- If I see ANY human in the video, it is a FAILURE

Presentation Style: ${presentationData.prompt}`;
    }
    
    if (isSmartAuto) {
      if (noCharacter) {
        userMessage = `Create a product-only video from this photo. NO HUMAN. NO MODEL. NO PERSON. Product only focus. 8 seconds.${productName ? ` Product name: ${productName}` : ''}${textInstruction}${characterInstruction}`;
      } else {
        userMessage = `สร้าง prompt สำหรับวิดีโอจากภาพนี้ ให้ AI คิดสไตล์การเคลื่อนไหวและบรรยากาศที่เหมาะสม${productName ? ` ชื่อ: ${productName}` : ''}${textInstruction}`;
      }
    } else {
      if (noCharacter) {
        userMessage = `Create a product-only video. NO HUMAN. NO MODEL. NO PERSON. 8 seconds.
Product name: ${productName || 'Product'}${textInstruction}${characterInstruction}`;
      } else {
        userMessage = `สร้าง prompt สำหรับวิดีโอจากภาพนี้
${productName ? `ชื่อ: ${productName}` : ''}
สไตล์: วิดีโอโฆษณาสินค้า${textInstruction}`;
      }
    }
    
    const base64Data = imageData.dataUrl.split(',')[1];
    const mimeType = imageData.dataUrl.split(';')[0].split(':')[1];
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: userMessage },
            { inline_data: { mime_type: mimeType, data: base64Data } }
          ]
        }]
      })
    });
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const generatedPrompt = data.candidates[0].content.parts[0].text;
      
      // Display the prompt
      if (videoPromptResultContainer) videoPromptResultContainer.style.display = 'block';
      if (videoPromptResult) videoPromptResult.textContent = generatedPrompt;
      
      showToast('สร้าง Prompt สำเร็จ!', 'success');
    } else {
      throw new Error('ไม่สามารถสร้าง Prompt ได้');
    }
  } catch (error) {
    console.error('Generate Prompt Error:', error);
    showToast('เกิดข้อผิดพลาด: ' + error.message, 'error');
  }
}

// Video PROMPT&PLAY: Handle test fill - fills prompt result into target element
async function videoHandleTestFill() {
  const generatedPrompt = videoPromptResult.textContent;

  if (!generatedPrompt || generatedPrompt.includes('กำลังวิเคราะห์') || generatedPrompt.startsWith('Error:')) {
    showToast('กรุณาสร้าง Prompt ก่อน', 'error');
    return;
  }

  // Parse YAML to extract only values (without field names)
  const parsedPrompt = parseYAMLToPlainText(generatedPrompt, true);

  videoUpdateStatus('Filling prompt...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (textToFill) => {
        const targetElement = document.getElementById('PINHOLE_TEXT_AREA_ELEMENT_ID');

        if (targetElement) {
          targetElement.focus();

          if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
            targetElement.value = textToFill;
            targetElement.dispatchEvent(new Event('input', { bubbles: true }));
            targetElement.dispatchEvent(new Event('change', { bubbles: true }));
          } else if (targetElement.isContentEditable) {
            targetElement.textContent = textToFill;
            targetElement.dispatchEvent(new Event('input', { bubbles: true }));
          } else {
            targetElement.textContent = textToFill;
          }

          return { success: true, message: 'Prompt filled successfully!' };
        } else {
          return { success: false, message: 'Element #PINHOLE_TEXT_AREA_ELEMENT_ID not found' };
        }
      },
      args: [parsedPrompt]
    });

    if (result && result[0]) {
      const { success, message } = result[0].result;
      videoUpdateStatus(message);
      showToast(message, success ? 'success' : 'error');
    }
  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to fill text', 'error');
  }
}

// Video PROMPT&PLAY: Handle test upload - uploads images to target element
async function videoHandleTestUpload() {
  if (videoUploadedImages.length === 0) {
    videoUpdateStatus('No images to upload');
    showToast('Please add images first', 'error');
    return;
  }

  videoUpdateStatus('Uploading images...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const imagesData = videoUploadedImages.map(img => ({
      name: img.name,
      type: img.type,
      dataUrl: img.dataUrl
    }));

    // Get delay settings from config
    const actionDelay = getActionDelay();
    const confirmDelay = getActionDelay();
    const afterConfirmDelay = getAfterConfirmDelay();

    const aspectRatio = getVeo3AspectRatio();
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (images, delays, aspectRatio) => {
        // Helper function to get random delay
        function getRandomDelay(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return new Promise((resolve) => {
          // Upload button selector (directly click the button)
          const uploadBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div:nth-child(1) > div > div:nth-child(1) > button';
          const uploadBtn = document.querySelector(uploadBtnSelector);

          if (!uploadBtn) {
            resolve({ success: false, message: 'Upload button not found' });
            return;
          }

          // Click upload button
          uploadBtn.click();

          // Wait for file input to appear (2-3 seconds random)
          const fileInputDelay = getRandomDelay(delays.actionMin, delays.actionMax);
          setTimeout(() => {
            const fileInputs = document.querySelectorAll('input[type="file"]');
            let targetInput = null;

            // Find file input that accepts images
            for (const input of fileInputs) {
              if (input.accept && input.accept.includes('image')) {
                targetInput = input;
                break;
              }
            }

            if (!targetInput && fileInputs.length > 0) {
              targetInput = fileInputs[fileInputs.length - 1];
            }

            if (targetInput) {
              // Convert base64 images to File objects
              const dataTransfer = new DataTransfer();

              images.forEach((img) => {
                const byteString = atob(img.dataUrl.split(',')[1]);
                const mimeType = img.type;
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                  ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeType });
                const file = new File([blob], img.name, { type: mimeType });
                dataTransfer.items.add(file);
              });

              targetInput.files = dataTransfer.files;

              // Trigger events
              targetInput.dispatchEvent(new Event('change', { bubbles: true }));
              targetInput.dispatchEvent(new Event('input', { bubbles: true }));

              // Wait for upload to process, then open orientation dropdown (2-3 seconds random)
              const orientationClickDelay = getRandomDelay(delays.actionMin, delays.actionMax);
              setTimeout(() => {
                // Determine which orientation to select based on aspect ratio
                const isPortrait = aspectRatio === '9:16';
                const targetOrientation = isPortrait ? 'Portrait' : 'Landscape';
                const targetCropIcon = isPortrait ? 'crop_9_16' : 'crop_16_9';

                // Step 2.5: Click orientation dropdown button (find current orientation button)
                let orientationBtn = null;
                const allButtons = document.querySelectorAll('button');

                // Find the button that matches the current orientation (usually Landscape button is shown by default)
                for (const btn of allButtons) {
                  const text = btn.textContent || '';
                  const hasLandscape = text.includes('Landscape');
                  const hasCropIcon = btn.querySelector('i[class*="crop_16_9"]') || text.includes('crop_16_9');

                  if (hasLandscape && hasCropIcon && btn.getAttribute('role') !== 'combobox') {
                    orientationBtn = btn;
                    break;
                  }
                }

                // If not found, try to find button near "Crop and Save"
                if (!orientationBtn) {
                  const cropAndSaveBtn = Array.from(allButtons).find(btn => btn.textContent.includes('Crop and Save'));
                  if (cropAndSaveBtn) {
                    const parent = cropAndSaveBtn.parentElement;
                    if (parent) {
                      const siblingBtns = parent.querySelectorAll('button');
                      for (const btn of siblingBtns) {
                        if ((btn.textContent.includes('Landscape') || btn.textContent.includes('Portrait')) && btn !== cropAndSaveBtn) {
                          orientationBtn = btn;
                          break;
                        }
                      }
                    }
                  }
                }

                if (orientationBtn) {
                  orientationBtn.click();
                  console.log('Orientation dropdown opened');
                } else {
                  console.log('Orientation button not found');
                }

                // Wait for dropdown to open, then select target orientation (2-3 seconds random)
                const selectOrientationDelay = getRandomDelay(delays.actionMin, delays.actionMax);
                setTimeout(() => {
                  let targetOption = null;

                  // Method 1: Find any clickable element with target orientation text
                  const allElements = document.querySelectorAll('div, button, span, li, a');
                  for (const el of allElements) {
                    const text = el.textContent || '';
                    // Check if this element directly contains target orientation (not nested)
                    if (text.trim() === targetOrientation || (text.includes(targetOrientation) && !text.includes(isPortrait ? 'Landscape' : 'Portrait') && text.length < 20)) {
                      const rect = el.getBoundingClientRect();
                      if (rect.width > 0 && rect.height > 0) {
                        targetOption = el;
                        break;
                      }
                    }
                  }

                  // Method 2: Find by crop icon in dropdown
                  if (!targetOption) {
                    const cropIcons = document.querySelectorAll('i');
                    for (const icon of cropIcons) {
                      if (icon.textContent && icon.textContent.includes(targetCropIcon)) {
                        targetOption = icon.closest('button') || icon.closest('div[role]') || icon.parentElement;
                        if (targetOption) break;
                      }
                    }
                  }

                  if (targetOption) {
                    targetOption.click();
                    console.log(targetOrientation + ' selected');
                  } else {
                    console.log(targetOrientation + ' option not found in dropdown');
                  }

                  // Wait then click "Crop and Save" button (2-3 seconds random)
                  const confirmClickDelay = getRandomDelay(delays.actionMin, delays.actionMax);
                  setTimeout(() => {
                    // Try multiple selectors for Crop and Save button
                        const confirmSelectors = [
                          '#radix-\\:r1k\\: > div.sc-19de2353-4.boKhUT > div > button.sc-c177465c-1.gdArnN.sc-19de2353-7.jcyPCc',
                          '#radix-\\:r1d\\: > div.sc-5983bb27-4.hUNtLL > div > button.sc-c177465c-1.gdArnN.sc-5983bb27-7.csgOts',
                          'button.sc-19de2353-7.jcyPCc',
                          'button.sc-5983bb27-7.csgOts'
                        ];

                        let confirmBtn = null;
                        for (const sel of confirmSelectors) {
                          try {
                            confirmBtn = document.querySelector(sel);
                            if (confirmBtn) break;
                          } catch(e) {}
                        }

                        // Fallback: find button with text (Crop/Save/บันทึก/เสร็จ/ต่อไป)
                        if (!confirmBtn) {
                          const allButtons = document.querySelectorAll('button');
                          const textCandidates = ['Crop and Save', 'บันทึก', 'ต่อไป', 'เสร็จ', 'Save', 'Confirm'];
                          for (const btn of allButtons) {
                            const text = (btn.textContent || '').trim();
                            if (!text) continue;
                            if (textCandidates.some(t => text.includes(t))) {
                              const rect = btn.getBoundingClientRect();
                              if (rect.width > 0 && rect.height > 0) {
                                confirmBtn = btn;
                                break;
                              }
                            }
                          }
                        }

                        // Final fallback: pick any visible primary button in modal footer
                        if (!confirmBtn) {
                          const candidateBtns = document.querySelectorAll('button');
                          for (const btn of candidateBtns) {
                            const rect = btn.getBoundingClientRect();
                            if (rect.width > 80 && rect.height > 24 && rect.left >= 0 && rect.top >= 0) {
                              confirmBtn = btn;
                              break;
                            }
                          }
                        }

                    if (confirmBtn) {
                      confirmBtn.click();

                      // Wait after confirm (5-8 seconds random)
                      const afterConfirmWait = getRandomDelay(delays.afterConfirmMin, delays.afterConfirmMax);
                      setTimeout(() => {
                        resolve({ success: true, message: `Uploaded ${images.length} image(s) and confirmed!` });
                      }, afterConfirmWait);
                    } else {
                      resolve({ success: true, message: `Uploaded ${images.length} image(s)! (Crop and Save button not found)` });
                    }
                  }, confirmClickDelay);
                }, selectPortraitDelay);
              }, orientationClickDelay);
            } else {
              resolve({ success: false, message: 'File input not found' });
            }
          }, fileInputDelay);
        });
      },
      args: [imagesData, CONFIG.delays, aspectRatio]
    });

    if (result && result[0] && result[0].result) {
      const { success, message } = result[0].result;
      videoUpdateStatus(message);
      showToast(message, success ? 'success' : 'error');
    }
  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to upload images', 'error');
  }
}

// Video PROMPT&PLAY: Handle test create - clicks create button with retry
async function videoHandleTestCreate() {
  videoUpdateStatus('Clicking create button...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const maxRetries = 3;
    const retryDelay = 5000; // 5 seconds

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (maxRetries, retryDelay) => {
        return new Promise((resolve) => {
          const createBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div.sc-408537d4-1.eiHkev > button';

          let attempts = 0;

          function tryClickCreate() {
            attempts++;
            const createBtn = document.querySelector(createBtnSelector);

            if (createBtn && !createBtn.disabled) {
              createBtn.click();
              resolve({ success: true, message: `Create button clicked! (attempt ${attempts})` });
            } else if (attempts < maxRetries) {
              // Button not ready, wait and retry
              console.log(`Create button not ready, retrying in 5s... (attempt ${attempts}/${maxRetries})`);
              setTimeout(tryClickCreate, retryDelay);
            } else {
              // Max retries reached
              resolve({ success: false, message: `Create button not clickable after ${maxRetries} attempts` });
            }
          }

          tryClickCreate();
        });
      },
      args: [maxRetries, retryDelay]
    });

    if (result && result[0] && result[0].result) {
      const { success, message } = result[0].result;
      videoUpdateStatus(message);
      showToast(message, success ? 'success' : 'error');
    }
  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to click create button', 'error');
  }
}

// Show toast notification (Shared)
function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Video PROMPT&PLAY: Handle test download - hover video, click download button, then select 720p
async function videoHandleTestDownload() {
  videoUpdateStatus('Finding video...');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (delays) => {
        function getRandomDelay(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return new Promise((resolve) => {
          // Step 1: Find video card to hover
          let videoCard = null;

          // Find container with video element
          const videos = document.querySelectorAll('video');
          if (videos.length > 0) {
            // Get parent container of video
            videoCard = videos[0].closest('div[class*="sc-"]');
            if (!videoCard) {
              videoCard = videos[0].parentElement.parentElement.parentElement;
            }
          }

          if (!videoCard) {
            resolve({ success: false, message: 'Video not found' });
            return;
          }

          // Step 2: Hover on video card to show buttons
          videoCard.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          videoCard.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

          // Wait for hover buttons to appear
          setTimeout(() => {
            // Step 3: Find and click download button
            const allButtons = document.querySelectorAll('button');
            let downloadBtn = null;

            for (const btn of allButtons) {
              const icon = btn.querySelector('i');
              if (icon && icon.textContent && icon.textContent.trim() === 'download') {
                const rect = btn.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                  downloadBtn = btn;
                  break;
                }
              }
            }

            if (!downloadBtn) {
              resolve({ success: false, message: 'Download button not found' });
              return;
            }

            // Click download button
            downloadBtn.click();

            // Step 4: Wait for menu, then click 720p
            const menuDelay = getRandomDelay(delays.actionMin, delays.actionMax);
            setTimeout(() => {
              let option720p = null;

              // Find menuitem with "720p" text
              const menuItems = document.querySelectorAll('[role="menuitem"]');
              for (const item of menuItems) {
                const text = item.textContent || '';
                if (text.includes('720p')) {
                  option720p = item;
                  break;
                }
              }

              if (option720p) {
                option720p.click();
                resolve({ success: true, message: 'Download 720p started!' });
              } else {
                resolve({ success: true, message: 'Download clicked! (720p not found)' });
              }
            }, menuDelay);
          }, 500); // Wait 500ms for hover buttons
        });
      },
      args: [CONFIG.delays]
    });

    if (result && result[0] && result[0].result) {
      const { success, message } = result[0].result;
      videoUpdateStatus(message);
      showToast(message, success ? 'success' : 'error');
    }
  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to click download', 'error');
  }
}

// Video PROMPT&PLAY: Handle test download multi - download selected number of videos
async function videoHandleTestDownloadMulti() {
  const maxDownloads = parseInt(videoDownloadCountAuto?.value || '1');
  videoUpdateStatus(`กำลังเตรียมดาวน์โหลด ${maxDownloads} คลิป...`);

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // First, get the count of videos
    const countResult = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const videos = document.querySelectorAll('video');
        return videos.length;
      }
    });

    const videoCount = countResult[0].result;
    if (videoCount === 0) {
      videoUpdateStatus('ไม่พบวิดีโอ');
      showToast('No videos found on page', 'error');
      return;
    }

    const toDownload = Math.min(maxDownloads, videoCount);
    let downloadedCount = 0;

    // Download each video one by one with status updates
    for (let i = 0; i < toDownload; i++) {
      videoUpdateStatus(`กำลังดาวน์โหลดคลิป ${i + 1}/${toDownload}...`);

      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (videoIndex, delays) => {
          function getRandomDelay(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

          return new Promise(async (resolve) => {
            const videos = document.querySelectorAll('video');
            if (videoIndex >= videos.length) {
              resolve({ success: false, message: 'Video not found' });
              return;
            }

            const video = videos[videoIndex];

            // Get parent container - go up until we find a sizable container
            let videoCard = video;
            for (let j = 0; j < 10; j++) {
              videoCard = videoCard.parentElement;
              if (!videoCard) break;
              const rect = videoCard.getBoundingClientRect();
              if (rect.width > 150 && rect.height > 150) {
                break;
              }
            }

            if (!videoCard) {
              resolve({ success: false, message: 'Video card not found' });
              return;
            }

            // Scroll video into view
            videoCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await sleep(300);

            // Hover on video card
            videoCard.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, clientX: 100, clientY: 100 }));
            videoCard.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

            // Wait for hover buttons to appear
            await sleep(500);

            // Find download button INSIDE this video card
            let downloadBtn = null;
            const buttonsInCard = videoCard.querySelectorAll('button');

            for (const btn of buttonsInCard) {
              const icon = btn.querySelector('i');
              if (icon && icon.textContent && icon.textContent.trim() === 'download') {
                const rect = btn.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                  downloadBtn = btn;
                  break;
                }
              }
            }

            // If not found in card, look for visible download button near the video
            if (!downloadBtn) {
              const videoRect = videoCard.getBoundingClientRect();
              const allButtons = document.querySelectorAll('button');

              for (const btn of allButtons) {
                const icon = btn.querySelector('i');
                if (icon && icon.textContent && icon.textContent.trim() === 'download') {
                  const btnRect = btn.getBoundingClientRect();
                  if (btnRect.width > 0 && btnRect.height > 0) {
                    if (btnRect.top >= videoRect.top - 50 &&
                        btnRect.bottom <= videoRect.bottom + 50 &&
                        btnRect.left >= videoRect.left - 50 &&
                        btnRect.right <= videoRect.right + 50) {
                      downloadBtn = btn;
                      break;
                    }
                  }
                }
              }
            }

            if (!downloadBtn) {
              videoCard.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
              resolve({ success: false, message: 'Download button not found' });
              return;
            }

            // Click download button
            downloadBtn.click();

            // Wait for menu to appear
            await sleep(getRandomDelay(delays.actionMin, delays.actionMax));

            // Find and click 720p option
            const menuItems = document.querySelectorAll('[role="menuitem"]');
            let option720p = null;

            for (const item of menuItems) {
              const text = item.textContent || '';
              if (text.includes('720p')) {
                option720p = item;
                break;
              }
            }

            if (option720p) {
              option720p.click();
            }

            // Move mouse away
            videoCard.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

            // Wait before returning
            await sleep(getRandomDelay(delays.afterConfirmMin, delays.afterConfirmMax));

            resolve({ success: true, downloaded: option720p !== null });
          });
        },
        args: [i, CONFIG.delays]
      });

      if (result && result[0] && result[0].result && result[0].result.downloaded) {
        downloadedCount++;
      }

      // Update status after each download
      videoUpdateStatus(`ดาวน์โหลดแล้ว ${downloadedCount}/${toDownload} คลิป`);
    }

    // Final status
    const finalMessage = `ดาวน์โหลดเสร็จ ${downloadedCount}/${toDownload} คลิป!`;
    videoUpdateStatus(finalMessage);
    showToast(finalMessage, downloadedCount > 0 ? 'success' : 'error');

  } catch (error) {
    videoUpdateStatus(`Error: ${error.message}`);
    showToast('Failed to download videos', 'error');
  }
}

// Setup Settings Modal
function setupSettingsModal() {
  // Open modal
  btnSettings.addEventListener('click', openSettingsModal);

  // Close modal
  closeSettingsBtn.addEventListener('click', closeSettingsModal);
  cancelSettingsBtn.addEventListener('click', closeSettingsModal);

  // Save settings
  saveSettingsBtn.addEventListener('click', saveSettings);

  // Close on overlay click
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      closeSettingsModal();
    }
  });
}

// Open settings modal
function openSettingsModal() {
  // Load saved API key
  const savedApiKey = localStorage.getItem('gemini_api_key') || '';
  geminiApiKeyInput.value = savedApiKey;

  // Load saved aspect ratio (default to 9:16)
  const savedAspectRatio = localStorage.getItem('veo3_aspect_ratio') || '9:16';
  veo3AspectRatioSelect.value = savedAspectRatio;

  // Show modal
  settingsModal.classList.add('show');
}

// Close settings modal
function closeSettingsModal() {
  settingsModal.classList.remove('show');
}

// Save settings
function saveSettings() {
  const apiKey = geminiApiKeyInput.value.trim();
  const aspectRatio = veo3AspectRatioSelect.value;

  // Save to localStorage
  localStorage.setItem('gemini_api_key', apiKey);
  localStorage.setItem('veo3_aspect_ratio', aspectRatio);

  // Close modal
  closeSettingsModal();

  // Show success message
  showToast('Settings saved!', 'success');
}

// Get Gemini API Key
function getGeminiApiKey() {
  return localStorage.getItem('gemini_api_key') || '';
}

// Get Veo3 Aspect Ratio (default to 9:16)
function getVeo3AspectRatio() {
  return localStorage.getItem('veo3_aspect_ratio') || '9:16';
}

// Parse YAML prompt to extract only values (without field names)
function parseYAMLToPlainText(yamlText, isVideo = true) {
  if (!yamlText || typeof yamlText !== 'string') {
    return yamlText;
  }

  const lines = yamlText.split('\n');
  const values = [];
  let currentField = null;
  let currentValue = [];

  // Fields to extract for video prompt
  const videoFields = ['dialogue', 'emotion', 'voice_type', 'action', 'character', 'setting', 'camera'];
  // Fields to extract for image prompt
  const imageFields = ['emotion', 'action', 'character', 'setting', 'camera', 'style'];
  
  const fieldsToExtract = isVideo ? videoFields : imageFields;

  function finishCurrentField() {
    if (currentField && currentValue.length > 0) {
      const value = currentValue.join(' ').trim();
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '');
      if (cleanValue) {
        values.push(cleanValue);
      }
      currentValue = [];
      currentField = null;
    }
  }

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      if (currentField) {
        // Continue multiline value
        continue;
      }
      continue;
    }

    // Check if line starts with a new field
    let foundField = false;
    for (const field of fieldsToExtract) {
      const fieldRegex = new RegExp(`^${field}\\s*:\\s*(.*)$`, 'i');
      const match = trimmedLine.match(fieldRegex);
      
      if (match) {
        // Finish previous field if any
        finishCurrentField();
        
        // Start new field
        currentField = field;
        const valuePart = match[1].trim();
        if (valuePart) {
          currentValue.push(valuePart);
        }
        foundField = true;
        break;
      }
    }

    // If not a field start, check if it's a continuation of current field
    if (!foundField && currentField) {
      // Check if line is indented (continuation) or starts a new field
      if (trimmedLine.match(/^\s+/) || !trimmedLine.includes(':')) {
        // Continuation of multiline value
        currentValue.push(trimmedLine);
      } else {
        // New field or end of current field
        finishCurrentField();
      }
    }
  }

  // Finish last field
  finishCurrentField();

  // If no values extracted, return original text (fallback)
  if (values.length === 0) {
    return yamlText;
  }

  // Join values with spaces
  return values.join(' ');
}



// Video PROMPT&PLAY: Handle Copy Prompt
function videoHandleCopyPrompt() {
  const text = videoPromptResult.textContent;
  if (!text || text.includes('กำลังวิเคราะห์')) {
    showToast('ไม่มี Prompt ให้คัดลอก', 'error');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast('คัดลอก Prompt แล้ว!', 'success');
    videoBtnCopyPrompt.textContent = '✅';
    setTimeout(() => {
      videoBtnCopyPrompt.textContent = '📋';
    }, 2000);
  }).catch(() => {
    showToast('ไม่สามารถคัดลอกได้', 'error');
  });
}

// ============================================
// AUTOMATION FUNCTIONS
// ============================================

// Video PROMPT&PLAY: Sleep helper (ฉบับแก้: ตื่นทันทีที่กด Stop)
function videoSleep(ms) {
  return new Promise((resolve, reject) => {
    // เช็คก่อนเลย ถ้ากดหยุดแล้ว ให้ Reject ทันที
    if (videoShouldStopAutomation) {
        return reject(new Error('STOPPED'));
    }

    const checkInterval = 100; // เช็คทุก 0.1 วินาที
    let elapsed = 0;

    const intervalId = setInterval(() => {
      // เช็คปุ่ม Stop ทุกๆ 0.1 วิ
      if (videoShouldStopAutomation) {
        clearInterval(intervalId);
        reject(new Error('STOPPED')); // 🔴 สั่งหยุดทันที!
      } else if (elapsed >= ms) {
        clearInterval(intervalId);
        resolve(); // ครบเวลา
      }
      elapsed += checkInterval;
    }, checkInterval);
  });
}

// Video PROMPT&PLAY: Stop automation
function videoStopAutomation() {
  if (videoIsAutomationRunning) {
    videoShouldStopAutomation = true;
    videoUpdateStatus('กำลังหยุด...');
    showToast('กำลังหยุด Automation...', 'error');
  }
}

// ============================================
// Video PROMPT&PLAY: Run Automation (ฉบับแก้จบ: แก้เบิ้ล + หน่วงเวลา 15 วิ)
// ============================================
async function videoRunAutomation() {
  // 1. เช็คเว็บ
  const isCorrect = await checkCorrectWebsite(); 
  if (!isCorrect) return;

  if (videoIsAutomationRunning) {
    showToast('กำลังรันอยู่แล้ว กรุณารอสักครู่', 'error');
    return;
  }

  const productName = videoProductNameInput.value.trim();

  if (videoUploadedImages.length === 0) {
    showToast('กรุณาอัพโหลดภาพสินค้าก่อน', 'error');
    return;
  }

  // เริ่มทำงาน
  videoIsAutomationRunning = true;
  videoShouldStopAutomation = false;
  videoBtnAutomation.disabled = true;
  await toggleWebPageLock(true); 
  
  videoBtnAutomation.innerHTML = '<span class="loading"></span> <span>กำลังรัน...</span>';

  if (videoBtnStop) videoBtnStop.style.display = 'flex';
  if (videoPromptStatus) videoPromptStatus.style.display = 'none';

  const totalImages = videoUploadedImages.length;
  const downloadCount = parseInt(videoDownloadCountAuto?.value || '1');
  const roundsPerImage = videoGetRoundsPerImage();
  const totalRounds = totalImages * roundsPerImage;
  let completedRounds = 0;
  let totalDownloaded = 0;
  
  const tiktokSafetyRules = `
  IMPORTANT VISUAL RULES:
  1. PRESERVE TEXT: Keep ALL existing text in the image (Label, Title) 100% STATIC and SHARP. Do NOT blur or distort existing text.
  2. NO NEW TEXT: Do NOT add ANY NEW subtitles or floating text.
  
  IMPORTANT POLICY: 
  1. STRICTLY DO NOT mention any specific prices.
  2. STRICTLY DO NOT make medical claims.
  
  Negative Prompt: watermark, username, gibberish, blurry, distorted, low quality, morphing text, moving text.
  `;
  
try {
    for (let imgIndex = 0; imgIndex < totalImages; imgIndex++) {
      const currentImage = videoUploadedImages[imgIndex];

      for (let round = 0; round < roundsPerImage; round++) {
        let downloadedInRound = 0;
        const currentRound = imgIndex * roundsPerImage + round + 1;
        const roundLabel = `[รอบ ${currentRound}/${totalRounds}]`;

        try {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		  
// ============================================
          // STEP 1.5: Select "Frames to Video"
          // ============================================
          videoUpdateStatus(`${roundLabel} Step 1.5/5: ตรวจสอบโหมด Frames to Video...`);
          
          const selectMenuResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              return new Promise((resolve) => {
                function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
                let dropdownBtn = document.querySelector('button[role="combobox"]');
                if (!dropdownBtn) dropdownBtn = document.querySelector("div[class*='bHqejI']");
                
                if (!dropdownBtn) {
                     const allButtons = document.querySelectorAll('button');
                     for (const btn of allButtons) {
                         const txt = (btn.textContent||'').trim().toLowerCase();
                         if (txt.includes('สร้าง') || txt.includes('เปลี่ยน') || txt.includes('video') || txt.includes('image')) {
                             dropdownBtn = btn;
                             break;
                         }
                     }
                }

                if (dropdownBtn) {
                    const currentText = (dropdownBtn.textContent || "").trim();
                    const isVideoMode = currentText.includes('เปลี่ยนเฟรม') || currentText.includes('Frames to Video') || currentText.includes('เปลี่ยนภาพ'); 

                    if (isVideoMode) {
                        resolve({ success: true, message: 'อยู่ในโหมด Frames to Video แล้ว' });
                        return;
                    }

                    dropdownBtn.click();
                    setTimeout(() => {
                      let targetOption = null;
                      const xpath = "//*[contains(text(), 'เปลี่ยนเฟรม') or contains(text(), 'Frames to Video') or contains(text(), 'เปลี่ยนภาพ')]";
                      const result = document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                      for (let i = 0; i < result.snapshotLength; i++) {
                          const node = result.snapshotItem(i);
                          if (!dropdownBtn.contains(node) && node.offsetParent !== null) {
                              let p = node;
                              while(p && p !== document.body) {
                                  if(p.getAttribute('role') === 'menuitem' || p.getAttribute('role') === 'option') {
                                      targetOption = p;
                                      break;
                                  }
                                  p = p.parentElement;
                              }
                              if (!targetOption) targetOption = node.parentElement;
                              break;
                          }
                      }
                      
                      if (targetOption) {
                        const pOpts = { bubbles: true, cancelable: true, view: window, pointerId: 1, width: 1, height: 1, pressure: 0.5 };
                        targetOption.dispatchEvent(new PointerEvent('pointerdown', pOpts));
                        targetOption.dispatchEvent(new PointerEvent('pointerup', pOpts));
                        targetOption.click();
                        setTimeout(() => {
                            document.body.click();
                            resolve({ success: true, message: 'เปลี่ยนโหมดสำเร็จ' });
                        }, 2000);
                      } else {
                          resolve({ success: false, message: 'หาปุ่มเมนูไม่เจอ' });
                      }
                    }, 1500);
                } else {
                    resolve({ success: false, message: 'หาปุ่มเมนูไม่เจอ' });
                }
              });
            }
          });
		
		

// ==========================================================================================
          // 🟢 GRAND LOOP: วนลูปสร้างทีละคลิป (อัพรูป -> สร้าง -> รอวีดีโอ -> โหลด -> เริ่มใหม่)
          // ==========================================================================================
          videoUpdateStatus(`${roundLabel} เริ่มดำเนินการสร้าง ${downloadCount} คลิป (อัพโหลดใหม่ทุกรอบ)...`);

          // วนลูปตามจำนวนคลิปที่ตั้งไว้
        
              if (videoShouldStopAutomation) throw new Error('STOPPED');
              
            const clipLabel = `[Batch]`;

              // -----------------------------------------------------------------------
              // PART 1: อัพโหลดรูปสินค้า (Upload Image)
              // -----------------------------------------------------------------------
              videoUpdateStatus(`${roundLabel} ${clipLabel} 1/4: กำลังอัพโหลดรูปสินค้า...`);

              
			  
			 // -----------------------------------------------------------------------
          // PART A: อัพโหลดรูปสินค้า (Upload Image) - 🟢 แก้ไข: หาปุ่มเมนูไทย/อังกฤษ และลบโค้ดซ้ำ
          // -----------------------------------------------------------------------
          const singleImageData = [{
            name: currentImage.name, type: currentImage.type, dataUrl: currentImage.dataUrl
          }];
          const aspectRatio = getVeo3AspectRatio(); 
          
          const uploadResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (images, delays, aspectRatio) => {
              function getRandomDelay(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
              function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
              
              return new Promise(async (resolve) => {
                // 1. กดปุ่ม Upload
                const uploadBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div:nth-child(1) > div > div:nth-child(1) > button';
                let uploadBtn = document.querySelector(uploadBtnSelector);
                if (!uploadBtn) {
                    const allBtns = document.querySelectorAll('button');
                    for(const b of allBtns) {
                        if(b.querySelector('input[type="file"]')) continue;
                        const icon = b.querySelector('i');
                        if(icon && (icon.textContent.includes('image') || icon.textContent.includes('add'))) {
                            uploadBtn = b; break;
                        }
                    }
                }
                if (!uploadBtn) { resolve({ success: false, message: '❌ หาปุ่ม Upload ไม่เจอ' }); return; }

                uploadBtn.click();
                
                // 2. ใส่ไฟล์
                const fileInputDelay = getRandomDelay(delays.actionMin, delays.actionMax);
                setTimeout(() => {
                    const fileInputs = document.querySelectorAll('input[type="file"]');
                    let targetInput = null;
                    if (fileInputs.length > 0) targetInput = fileInputs[fileInputs.length - 1];

                    if (targetInput) {
                        const dataTransfer = new DataTransfer();
                        images.forEach((img) => {
                          const byteString = atob(img.dataUrl.split(',')[1]);
                          const ab = new ArrayBuffer(byteString.length);
                          const ia = new Uint8Array(ab);
                          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                          const blob = new Blob([ab], { type: img.type });
                          const file = new File([blob], img.name, { type: img.type });
                          dataTransfer.items.add(file);
                        });
                        targetInput.files = dataTransfer.files;
                        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                        
                     // 3. รอและจัดการ Popup (ฉบับแก้: หาจากข้อความล้วนๆ ไม่สน Tag)
                        const orientationClickDelay = getRandomDelay(3000, 5000);
                        setTimeout(async () => {
                            const isPortrait = aspectRatio === '9:16';
                            // คำที่ต้องการกด (Target)
                            const targetText = isPortrait ? ['Portrait', 'แนวตั้ง'] : ['Landscape', 'แนวนอน'];
                            // คำสำหรับหาปุ่มเปิดเมนู (Trigger)
                            const allRatioKeywords = ['Portrait', 'Landscape', 'แนวตั้ง', 'แนวนอน', 'Ratio', 'Crop'];
                            
                            function heavyClick(element) {
                                const opts = { bubbles: true, cancelable: true, view: window };
                                element.dispatchEvent(new PointerEvent('pointerdown', opts));
                                element.dispatchEvent(new MouseEvent('mousedown', opts));
                                element.dispatchEvent(new PointerEvent('pointerup', opts));
                                element.dispatchEvent(new MouseEvent('mouseup', opts));
                                element.click();
                            }

                            // 3.1 หาและกดปุ่มเมนู (Trigger)
                            let orientationBtn = null;
                            const allButtons = document.querySelectorAll('button');
                            for (const btn of allButtons) {
                                const text = (btn.textContent || '').trim();
                                const icon = btn.querySelector('i');
                                const iconText = icon ? (icon.textContent || icon.className || '') : '';

                                // ปุ่มต้องมีคำว่า Crop หรือ แนวตั้ง/แนวนอน
                                const hasKeyword = allRatioKeywords.some(kw => text.includes(kw));
                                const hasCropIcon = iconText.includes('crop') || text.includes('crop');

                                // และต้องไม่ใช่ตัวเลือกในเมนู (role ไม่ใช่ menuitem)
                                if ((hasKeyword || hasCropIcon) && btn.getAttribute('role') !== 'menuitem') {
                                    orientationBtn = btn; break;
                                }
                            }

                            if (orientationBtn) {
                                console.log("🔘 เจอเมนู กดเปิด...");
                                heavyClick(orientationBtn); // เปิดเมนู
                                await sleep(1000); 
                                
                                // 3.2 วนลูปหา "ตัวเลือก" จากข้อความ (Text Search Strategy)
                                let targetOption = null;
                                
                                // ลองหา 15 รอบ (3 วินาที)
                                for(let attempt=0; attempt<15; attempt++) { 
                                    // กวาดหาทุก Element ที่มีตัวหนังสือ (div, span, p, li)
                                    const candidates = document.querySelectorAll('div, span, p, li, button');
                                    
                                    for(const el of candidates) {
                                        // 1. ข้อความตรงกับที่เราอยากได้ไหม? (เช่น "แนวตั้ง")
                                        const t = (el.textContent || '').trim();
                                        if(!targetText.some(kw => t === kw || (t.includes(kw) && t.length < 20))) continue;

                                        // 2. 🛑 สำคัญมาก: ต้องไม่ใช่ปุ่ม Trigger ตัวเดิม!
                                        if (el === orientationBtn || orientationBtn.contains(el)) continue;

                                        // 3. ต้องมองเห็น (ไม่ถูกซ่อน)
                                        if (el.offsetParent === null) continue;

                                        // เจอแล้ว!
                                        targetOption = el;
                                        break;
                                    }
                                    
                                    if(targetOption) break;
                                    await sleep(200);
                                }

                                if (targetOption) {
                                    console.log("✅ เจอตัวเลือก! กดที่:", targetOption);
                                    // เน้นกดที่ Parent ของ Text นั้นด้วย เผื่อ Text กดไม่ได้
                                    heavyClick(targetOption); 
                                    if(targetOption.parentElement) heavyClick(targetOption.parentElement);
                                } else {
                                    console.log("⚠️ หาตัวเลือกไม่เจอ (อาจจะเลือกอยู่แล้ว)");
                                    document.body.click(); // ปิดเมนู
                                }
                                await sleep(1500);
                            }

                            // 3.3 กดปุ่ม Save/ยืนยัน (ส่วนนี้เหมือนเดิม)
                            let confirmBtn = null;
                            const confirmSelectors = ['button.sc-19de2353-7.jcyPCc', 'button.sc-5983bb27-7.csgOts'];
                            for(const sel of confirmSelectors) {
                                const btn = document.querySelector(sel);
                                if(btn) { confirmBtn = btn; break; }
                            }
                            if(!confirmBtn) {
                                const allBtns = document.querySelectorAll('button');
                                for(const btn of allBtns) {
                                    const t = (btn.textContent || '').trim();
                                    if(t.includes('Save') || t.includes('Crop') || t.includes('บันทึก') || t.includes('ยืนยัน') || t.includes('เสร็จ') || t.includes('ต่อไป')) {
                                        confirmBtn = btn; break;
                                    }
                                }
                            }

                            if (confirmBtn) {
                                heavyClick(confirmBtn);
                                // รอโหลดเสร็จ
                                for(let w=0; w < 60; w++) {
                                    await sleep(500);
                                    const textArea = document.querySelector('textarea') || document.querySelector('#PINHOLE_TEXT_AREA_ELEMENT_ID');
                                    if (textArea) {
                                        let p = textArea.parentElement;
                                        for(let level=0; level<4; level++) {
                                            if(!p) break;
                                            const thumbs = p.querySelectorAll('img');
                                            const loaded = Array.from(thumbs).some(i => i.width > 20 && i.width < 150);
                                            if(loaded) return resolve({ success: true, message: '✅ อัพโหลดเสร็จสิ้น' });
                                            p = p.parentElement;
                                        }
                                    }
                                }
                                resolve({ success: true, message: '✅ (Timeout) อัพโหลดเสร็จ' });
                            } else {
                                resolve({ success: false, message: '⚠️ หาปุ่ม Save ไม่เจอ' });
                            }
                        }, orientationClickDelay);

                    } else {
                        resolve({ success: false, message: 'หาช่อง Input ไม่เจอ' });
                    }
                }, fileInputDelay);
              });
            },
            args: [singleImageData, CONFIG.delays, aspectRatio]
          });

          if (!uploadResult[0]?.result?.success) throw new Error('อัพโหลดรูปสินค้าล้มเหลว');
          await videoSleep(2000);

              // -----------------------------------------------------------------------
              // PART 2: อัพโหลดนางแบบ (Upload Model)
              // -----------------------------------------------------------------------
              if (modelUploadedImages.length > 0) {
                  videoUpdateStatus(`${roundLabel} ${clipLabel} 2/4: กำลังอัพโหลดนางแบบ...`);
                  const modelData = [{
                      name: modelUploadedImages[0].name, type: modelUploadedImages[0].type, dataUrl: modelUploadedImages[0].dataUrl
                  }];

                  const uploadModelResult = await chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      func: (images) => {
                          function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
                          return new Promise(async (resolve) => {
                              const btnSelector = "#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div.sc-76e54377-0.bLqbvC > div > div:nth-child(2) > button";
                              let targetBtn = document.querySelector(btnSelector);
                              if (!targetBtn) {
                                  const allBtns = document.querySelectorAll('button');
                                  for(const btn of allBtns) {
                                      if(btn.innerHTML.toLowerCase().includes('reference') || btn.innerHTML.toLowerCase().includes('character')) { targetBtn = btn; break; }
                                  }
                              }

                              if (!targetBtn) { resolve({ success: false }); return; }
                              targetBtn.click();
                              await sleep(1000);

                              const fileInputs = document.querySelectorAll('input[type="file"]');
                              const targetInput = fileInputs[fileInputs.length - 1];
                              if (targetInput) {
                                  const dataTransfer = new DataTransfer();
                                  images.forEach((img) => {
                                      const byteString = atob(img.dataUrl.split(',')[1]);
                                      const ab = new ArrayBuffer(byteString.length);
                                      const ia = new Uint8Array(ab);
                                      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                                      const blob = new Blob([ab], { type: img.type });
                                      const file = new File([blob], img.name, { type: img.type });
                                      dataTransfer.items.add(file);
                                  });
                                  targetInput.files = dataTransfer.files;
                                  targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                                  targetInput.dispatchEvent(new Event('input', { bubbles: true }));

                                  await sleep(3000);
                                  const allBtns = document.querySelectorAll('button');
                                  let confirmBtn = null;
                                  for(const btn of allBtns) {
                                      if(btn.textContent.includes('Crop and Save') || btn.textContent.includes('ยืนยัน')) {
                                          confirmBtn = btn; break;
                                      }
                                  }
                                  if(confirmBtn) {
                                      confirmBtn.click();
                                      for(let w=0; w<40; w++) {
                                          await sleep(500);
                                          const textArea = document.querySelector('textarea') || document.querySelector('#PINHOLE_TEXT_AREA_ELEMENT_ID');
                                          if(textArea && textArea.parentElement) {
                                              const thumbs = textArea.parentElement.parentElement.querySelectorAll('img');
                                              let count = 0;
                                              thumbs.forEach(i => { if(i.width > 20 && i.width < 150) count++; });
                                              if(count >= 2) return resolve({ success: true });
                                          }
                                      }
                                      resolve({ success: true });
                                  } else {
                                      resolve({ success: true });
                                  }
                              } else {
                                  resolve({ success: false });
                              }
                          });
                      },
                      args: [modelData]
                  });
                  await videoSleep(2000);
              }

              // -----------------------------------------------------------------------
              // PART 3: เตรียม Prompt & กดสร้าง (Create)
              // -----------------------------------------------------------------------
              videoUpdateStatus(`${roundLabel} ${clipLabel} 3/4: กำลังเตรียมและสร้าง...`);
              
              // 🔴 [จุดสำคัญ 1] Snapshot: จำทุกอย่างที่มีอยู่เดิม
              const preCreateResult = await chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  func: () => {
                      const vids = Array.from(document.querySelectorAll('video')).map(v => v.src || v.currentSrc);
                      const imgs = Array.from(document.querySelectorAll('img')).filter(img => img.width > 200).map(i => i.src);
                      return [...vids, ...imgs];
                  }
              });
              const oldUrls = new Set(preCreateResult[0]?.result || []);

              // --- (1) เตรียม Text Prompt ---
              // (ผมใส่ Template เต็มให้แล้วตรงนี้ เพื่อไม่ให้เกิด Error)
              const styleSelect = document.getElementById('video-style-select');
              const videoTemplates = {
                '1': "High energy presenter, extremely excited, hyping up [product], speaking in Thai, fast movement, all text on screen is 100% static and frozen in place. " + tiktokSafetyRules,
                '2': "Realistic product demonstration, character actively using [product], explaining usage, speaking in Thai, active hands, all text on screen is 100% static. " + tiktokSafetyRules,
                '3': "Professional salesperson, confident sales pitch, holding [product], persuasive eye contact, speaking in Thai. " + tiktokSafetyRules,
                '4': "Emotional testimonial, wow face, amazed expression, holding [product] close to heart, nodding, speaking in Thai. " + tiktokSafetyRules,
                '5': "Casual friend-to-friend recommendation, leaning towards camera, whispering secret about [product], speaking in Thai. " + tiktokSafetyRules,
                '6': "Informative review, listing benefits, counting on fingers, pointing to [product] details, speaking in Thai. " + tiktokSafetyRules,
                '7': "Satisfaction review, thumbs up gesture, OK hand sign, happy expression, holding [product], speaking in Thai. " + tiktokSafetyRules,
                '8': "Comparison review, weighing options gestures, choosing [product] as winner, analytical look, speaking in Thai. " + tiktokSafetyRules,
                '9': "Sincere recommendation, sharing a secret discovery about [product], trustworthy look, gentle gestures, speaking in Thai. " + tiktokSafetyRules,
                '10': "Urgency, must-have vibe, holding [product] possessively, excited eyes, persuasive look, speaking in Thai. " + tiktokSafetyRules,
                '11': "Acting out a problem then finding a solution, facial expression shifting from worried to relieved, pointing to [product], speaking in Thai. " + tiktokSafetyRules,
                '12': "Stand-up comedy style, sitcom vibe, telling a hilarious story with a plot twist about [product], laughing, speaking in Thai. " + tiktokSafetyRules,
                '13': "Deadpan humor, saying something ridiculous or funny about [product] but keeping a serious straight face, speaking in Thai. " + tiktokSafetyRules,
                '14': "Sassy and witty character, complaining or making funny sarcastic comments before praising [product], speaking in Thai. " + tiktokSafetyRules,
                '15': "Sassy character, complaining funny comments, perfect comedic timing, rolling eyes playfully then praising [product], speaking in Thai. " + tiktokSafetyRules,
                '16': "Authentic user-generated content (UGC) review of [product]. The character feels like a real person sharing honest feedback. Genuine excitement, unscripted vibe, very natural and relatable. Speaking in Thai. " + tiktokSafetyRules
              };

              let selectedId = styleSelect ? styleSelect.value : 'auto';
              if (selectedId === 'auto') {
                  const keys = Object.keys(videoTemplates);
                  selectedId = keys[Math.floor(Math.random() * keys.length)];
                  videoAddLog(`🎲 สุ่มสไตล์: ${selectedId}`, 'info');
              }
              const chosenTemplate = videoTemplates[selectedId] || videoTemplates['1'];
              let finalPrompt = chosenTemplate;
              
              if (productName) finalPrompt = finalPrompt.replace(/\[product\]/g, productName);
              else finalPrompt = finalPrompt.replace(/\[product\]/g, 'the product');

              // Voice Logic
              const videoVoiceStyleSelect = document.getElementById('video-voice-style-select');
              const videoRandomVoiceCheckbox = document.getElementById('video-random-voice-checkbox');
              const voiceOptions = ['central', 'isan', 'northern']; 
              let selectedVoice = videoVoiceStyleSelect ? videoVoiceStyleSelect.value : 'central';
              if (videoRandomVoiceCheckbox && videoRandomVoiceCheckbox.checked) {
                  const rIndex = Math.floor(Math.random() * voiceOptions.length);
                  selectedVoice = voiceOptions[rIndex];
              }
              let dialectPhrase = "speaking in Thai"; 
              if (selectedVoice === 'isan') dialectPhrase = "speaking in Isan Thai dialect, fun and lively vibe";
              else if (selectedVoice === 'northern') dialectPhrase = "speaking in Northern Thai dialect, gentle and polite vibe";
              else dialectPhrase = "speaking in standard Thai, clear and professional";

              const customScriptInput = document.getElementById('video-custom-script');
              const customScript = customScriptInput ? customScriptInput.value.trim() : "";
              if (customScript) finalPrompt += ` The character is talking to the camera, saying exactly: "${customScript}".`;

              if (finalPrompt.includes('speaking in Thai')) finalPrompt = finalPrompt.replace('speaking in Thai', dialectPhrase);
              else finalPrompt += `, ${dialectPhrase}`;
              finalPrompt += ", (Masterpiece: keep all text and logos in the image 100% STATIC, FROZEN, and SHARP).";

              // ใส่ Prompt
               await chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  func: (txt) => {
                      const el = document.getElementById('PINHOLE_TEXT_AREA_ELEMENT_ID');
                      if(el) { el.value = txt; el.dispatchEvent(new Event('input', {bubbles:true})); }
                  },
                  args: [finalPrompt] 
              });
              await videoSleep(1000);

              // กด Create
              const createResult = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                  return new Promise((resolve) => {
                    const btn = document.querySelector('#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div.sc-408537d4-1.eiHkev > button');
                    if (btn && !btn.disabled) {
                        btn.click();
                        resolve({ success: true });
                    } else {
                        resolve({ success: false, message: 'ปุ่มยังเทาอยู่' });
                    }
                  });
                }
              });

              if (!createResult[0]?.result?.success) throw new Error('กดปุ่มสร้างไม่ได้ (ปุ่มเทา)');
              videoAddLog(`${roundLabel} ${clipLabel} กดสร้างสำเร็จ!`, 'success');

// =======================================================================
              // 🟢 PART 4: รอผลลัพธ์ & ดาวน์โหลด (ฉบับรอจนครบจำนวน)
              // =======================================================================
              videoUpdateStatus(`⏳ ${roundLabel} 4/4: รอ AI สร้างคลิป...`);
              
              let foundVideo = false;
              let detectedCount = 0; // เก็บจำนวนที่เจอ

              // 1. วนลูปรอจนกว่าจะเจอไฟล์ใหม่ (รอสูงสุด 4 นาที)
              for(let w=0; w<120; w++) { 
                  if (videoShouldStopAutomation) throw new Error('STOPPED');
                  
                  const check = await chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      func: (old) => {
                          const oldSet = new Set(old);
                          const elements = Array.from(document.querySelectorAll('video, img'));
                          // กรองเฉพาะตัวใหม่ที่มีขนาดใหญ่พอ
                          const newItems = elements.filter(el => {
                              const rect = el.getBoundingClientRect();
                              if(rect.width < 200) return false;
                              const src = el.src || el.currentSrc;
                              return src && !oldSet.has(src);
                          });
                          return { hasNew: newItems.length > 0, count: newItems.length };
                      },
                      args: [Array.from(oldUrls)]
                  });
                  
                  if(check[0]?.result?.hasNew) {
                      foundVideo = true;
                      detectedCount = check[0]?.result?.count || 0;
                      
                      // 🟢 LOGIC แก้ไข: ถ้าเจอแล้ว ยังไม่หยุดทันที! เช็คก่อนว่าครบยอดที่ตั้งไว้ไหม?
                      if (detectedCount >= downloadCount) {
                          videoUpdateStatus(`✅ เจอครบ ${detectedCount}/${downloadCount} คลิปแล้ว!`);
                          break; // เจอครบแล้ว ถึงค่อยหยุดรอ
                      } else {
                          // ถ้ายังไม่ครบ ให้รอต่อ (เผื่อ AI กำลังเจนตัวที่ 3, 4)
                          videoUpdateStatus(`⏳ เจอแล้ว ${detectedCount}/${downloadCount} คลิป... กำลังรอที่เหลือ... (${w*2}s)`);
                      }
                  }
                  
                  await videoSleep(2000);
              }

              if (foundVideo) {
                  // ใช้จำนวนที่เจอจริง (detectedCount) ในการวนลูป
                  const finalCount = detectedCount > 0 ? detectedCount : downloadCount;

                  videoUpdateStatus(`⏳ ${roundLabel} สรุปยอด ${finalCount} คลิป! รอ 15 วินาทีให้โหลดสมบูรณ์...`);
                  await videoSleep(15000); 

                  // 2. เริ่ม Loop ดาวน์โหลด
                  videoUpdateStatus(`${roundLabel} เริ่มไล่ดาวน์โหลด ${finalCount} คลิป...`);

                  for (let i = 0; i < finalCount; i++) {
                      if (videoShouldStopAutomation) throw new Error('STOPPED');
                      
                      videoUpdateStatus(`${roundLabel} กำลังโหลดคลิปที่ ${i + 1}/${finalCount}...`);

                      const dl = await chrome.scripting.executeScript({
                          target: { tabId: tab.id },
                          func: (targetIndex) => {
                              function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
                              
                              function heavyClick(element) {
                                  if(!element) return;
                                  const opts = { bubbles: true, cancelable: true, view: window };
                                  element.dispatchEvent(new PointerEvent('pointerdown', opts));
                                  element.dispatchEvent(new PointerEvent('mousedown', opts));
                                  element.dispatchEvent(new PointerEvent('pointerup', opts));
                                  element.dispatchEvent(new PointerEvent('mouseup', opts));
                                  element.click();
                              }

                              return new Promise(async (resolve) => {
                                  const allCards = [];
                                  document.querySelectorAll('img, video').forEach(el => {
                                      if(el.getBoundingClientRect().width > 200) allCards.push(el);
                                  });
                                  
                                  if (targetIndex >= allCards.length) return resolve({ success: false, message: 'ไม่เจอคลิปลำดับนี้' });

                                  const target = allCards[targetIndex]; 
                                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  await sleep(500);

                                  let card = target.parentElement;
                                  let foundBtn = false;
                                  
                                  for(let k=0; k<6; k++) {
                                      if(!card) break;
                                      
                                      card.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                                      card.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                                      
                                      const btns = card.querySelectorAll('button');
                                      let dlBtn = null;
                                      for(const b of btns) {
                                          const txt = (b.textContent || '').toLowerCase();
                                          const icon = b.querySelector('i');
                                          const iconTxt = icon ? (icon.textContent || icon.className) : '';
                                          if(txt.includes('download') || txt.includes('ดาวน์โหลด') || 
                                             iconTxt.includes('download') || iconTxt.includes('get_app')) {
                                              dlBtn = b; break;
                                          }
                                      }
                                      
                                      if(dlBtn) {
                                          heavyClick(dlBtn);
                                          foundBtn = true;
                                          break; 
                                      }
                                      card = card.parentElement;
                                  }
                                  
                                  if(foundBtn) {
                                      await sleep(1500);
                                      const menus = document.querySelectorAll('[role="menuitem"], li');
                                      let clicked = false;
                                      for(const m of menus) {
                                          if(m.offsetParent === null) continue;
                                          const t = (m.textContent || '').toLowerCase();
                                          if(t.includes('original') || t.includes('ขนาดเดิม') || t.includes('720p') || t.includes('download')) {
                                              heavyClick(m);
                                              clicked = true;
                                              break;
                                          }
                                      }
                                      await sleep(1000);
                                      document.body.click(); 
                                      resolve({ success: true });
                                  } else {
                                      resolve({ success: false, message: 'ไม่เจอปุ่มโหลด' });
                                  }
                              });
                          },
                          args: [i]
                      });

                      if(dl[0]?.result?.success) {
                          videoAddLog(`⬇️ โหลดคลิปที่ ${i+1} สำเร็จ`, 'success');
                          if(typeof totalDownloaded !== 'undefined') totalDownloaded++;
                      } else {
                          videoAddLog(`⚠️ โหลดคลิปที่ ${i+1} ไม่สำเร็จ`, 'warning');
                      }
                      
                      await videoSleep(3000);
                  }
                  
              } else {
                  videoAddLog(`⚠️ สร้างไม่สำเร็จ (หมดเวลา)`, 'warning');
              }
              
              await videoSleep(5000);
		  
		  
          
          completedRounds++;
		  
		  
		  
		  

    } catch (roundError) {
            if (roundError.message === 'STOPPED') throw roundError;
            videoUpdateStatus(`❌ Error รอบ ${currentRound}: ${roundError.message}`);
            await videoSleep(2000);
        }
      }
    }


	
	

videoUpdateStatus(`🎉 เสร็จสิ้น! โหลดได้ ${totalDownloaded} คลิป`);
    showToast('เสร็จสิ้นภารกิจ!', 'success');

} catch (error) {
    if (error.message === 'STOPPED') {
      videoUpdateStatus('หยุดการทำงานแล้ว');
      videoAddLog('🛑 หยุดโดยผู้ใช้', 'warning');
      showToast('หยุดการทำงานแล้ว', 'warning');
    } else {
      videoUpdateStatus(`Error: ${error.message}`);
      videoAddLog(`❌ Error: ${error.message}`, 'error');
    }
  } finally {
   // คืนค่าปุ่ม
    videoIsAutomationRunning = false;
    videoShouldStopAutomation = false;
    if (videoBtnAutomation) {
        videoBtnAutomation.disabled = false;
        videoBtnAutomation.innerHTML = '<span>START VIDEO</span>'; 
    }
    if (videoBtnStop) videoBtnStop.style.display = 'none';
    try { await toggleWebPageLock(false); } catch (e) {}
  }
}

// Video PROMPT&PLAY: Call Gemini API with retry for overloaded errors


// Get Veo3 Aspect Ratio (default to 9:16)
function getVeo3AspectRatio() {
  return localStorage.getItem('veo3_aspect_ratio') || '9:16';
}

// ============================================
// BANANA PROMPT&PLAY MODULE
// ============================================

// DOM Elements (Banana Tab - prefix: banana-)
const bananaUploadZone = document.getElementById('banana-upload-zone');
const bananaFileInput = document.getElementById('banana-file-input');
const bananaImageCount = document.getElementById('banana-image-count');
const bananaClearImagesBtn = document.getElementById('banana-clear-images');
const bananaStatusText = document.getElementById('banana-status-text');
const bananaBtnAutomation = document.getElementById('banana-btn-automation');
const bananaToVideoCheckbox = document.getElementById('banana-to-video-checkbox');
const bananaDownloadCount = document.getElementById('banana-download-count');
const bananaBtnStop = document.getElementById('banana-btn-stop');
const bananaPromptStatus = document.getElementById('banana-prompt-status');
const bananaRoundCountSelect = document.getElementById('banana-round-count');
const bananaCustomRoundInput = document.getElementById('banana-custom-round-input');
const bananaRoundInfo = document.getElementById('banana-round-info');
const bananaProductNameInput = document.getElementById('banana-product-name');
const bananaStyleSelect = document.getElementById('banana-style-select');
const bananaRandomStyleCheckbox = document.getElementById('banana-random-style-checkbox');
const bananaBtnGeneratePrompt = document.getElementById('banana-btn-generate-prompt');
const bananaPromptResultContainer = document.getElementById('banana-prompt-result-container');
const bananaPromptResult = document.getElementById('banana-prompt-result');
const bananaBtnCopyPrompt = document.getElementById('banana-btn-copy-prompt');
const bananaLogContainer = document.getElementById('banana-log-container');
const bananaLogClearBtn = document.getElementById('banana-log-clear');

// [ส่วนเพิ่มใหม่] ตัวแปรสำหรับเลือกฉากหลัง (Banana)
const bananaBgSelect = document.getElementById('banana-bg-select');
const bananaRandomBgCheckbox = document.getElementById('banana-random-bg-checkbox');

// Store uploaded images (Banana)
let bananaUploadedImages = [];
let bananaCurrentImageIndex = 0;
let modelUploadedImages = []; // ตัวแปรเก็บรูปนางแบบ
let bananaIsAutomationRunning = false;
let bananaShouldStopAutomation = false;
let bananaStatusTimeoutId = null;
let bananaLogs = [];

// Banana PROMPT&PLAY: Setup upload zone events
function bananaSetupUploadZone() {
  bananaUploadZone.addEventListener('click', () => {
    bananaFileInput.click();
  });

  bananaFileInput.addEventListener('change', (e) => {
    bananaHandleFiles(e.target.files);
  });

  bananaUploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    bananaUploadZone.classList.add('dragover');
  });

  bananaUploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    bananaUploadZone.classList.remove('dragover');
  });

  bananaUploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    bananaUploadZone.classList.remove('dragover');
    bananaHandleFiles(e.dataTransfer.files);
  });
}

// ============================================
// IMAGE MANAGEMENT (แก้ไข: แสดงรูป + ลบทีละรูป)
// ============================================
const bananaPreviewContainer = document.getElementById('banana-preview-container');

// ฟังก์ชันอัปเดตหน้าจอ (เรียกใช้เมื่อมีการเพิ่มหรือลบรูป)
function bananaUpdateImageCount() {
  // 1. อัปเดตตัวเลข
  bananaImageCount.textContent = bananaUploadedImages.length;

  // 2. จัดการปุ่ม Clear All
  if (bananaUploadedImages.length > 0) {
    bananaClearImagesBtn.style.display = 'flex';
  } else {
    bananaClearImagesBtn.style.display = 'none';
  }

  bananaUpdateRoundInfo(); // อัปเดตจำนวนรอบ

  // 3. สร้างรูปตัวอย่าง (Render Previews)
  renderBananaPreviews();
}

// ฟังก์ชันวาดรูปตัวอย่าง
function renderBananaPreviews() {
  if (!bananaPreviewContainer) return;
  bananaPreviewContainer.innerHTML = ''; // เคลียร์ของเก่า

  bananaUploadedImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'preview-item';

    // สร้างรูปภาพ
    const imgEl = document.createElement('img');
    imgEl.src = img.dataUrl;
    imgEl.title = img.name;

    // สร้างปุ่มลบ (X)
    const delBtn = document.createElement('button');
    delBtn.className = 'preview-remove-btn';
    delBtn.innerHTML = '✕';
    delBtn.onclick = () => bananaRemoveOneImage(index); // เรียกฟังก์ชันลบ

    item.appendChild(imgEl);
    item.appendChild(delBtn);
    bananaPreviewContainer.appendChild(item);
  });
}

// ฟังก์ชันลบทีละรูป
function bananaRemoveOneImage(index) {
  // ลบออกจาก Array ตามตำแหน่ง index
  bananaUploadedImages.splice(index, 1);
  // อัปเดตหน้าจอใหม่
  bananaUpdateImageCount();
}

// ฟังก์ชันจัดการไฟล์ที่อัปโหลด
function bananaHandleFiles(files) {
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

  imageFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: e.target.result
      };
      bananaUploadedImages.push(imageData);
      // เรียกฟังก์ชันอัปเดต (ซึ่งจะไปวาดรูปให้เอง)
      bananaUpdateImageCount();
    };
    reader.readAsDataURL(file);
  });

  bananaFileInput.value = '';
}

// ฟังก์ชันลบรูปทั้งหมด
function bananaClearAllImages() {
  bananaUploadedImages = [];
  bananaUpdateImageCount(); // หน้าจอจะเคลียร์รูปออกหมดเอง
  bananaUpdateStatus('All images cleared');
}


// ==========================================
// MODEL UPLOAD FUNCTIONS (เพิ่มใหม่)
// ==========================================
const modelUploadZone = document.getElementById('model-upload-zone');
const modelFileInput = document.getElementById('model-file-input');
const modelImageCount = document.getElementById('model-image-count');
const modelCounterDiv = document.getElementById('model-image-counter');
const modelClearBtn = document.getElementById('model-clear-images');

function modelSetupUploadZone() {
  if(!modelUploadZone) return;

  modelUploadZone.addEventListener('click', () => modelFileInput.click());

  modelFileInput.addEventListener('change', (e) => {
    modelHandleFiles(e.target.files);
  });

  // Drag & Drop Effect
  modelUploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    modelUploadZone.style.borderColor = '#e65100';
    modelUploadZone.style.backgroundColor = '#fff3e0';
  });

  modelUploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    modelUploadZone.style.borderColor = '#ff9800';
    modelUploadZone.style.backgroundColor = '';
  });

  modelUploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    modelUploadZone.style.borderColor = '#ff9800';
    modelUploadZone.style.backgroundColor = '';
    modelHandleFiles(e.dataTransfer.files);
  });
  
  if(modelClearBtn) {
      modelClearBtn.addEventListener('click', () => {
          modelUploadedImages = [];
          modelUpdateUI();
      });
  }
}

function modelHandleFiles(files) {
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
  if(imageFiles.length > 0) {
      const file = imageFiles[0]; // รับแค่รูปเดียวล่าสุด
      const reader = new FileReader();
      reader.onload = (e) => {
        modelUploadedImages = [{
          name: file.name,
          type: file.type,
          dataUrl: e.target.result
        }];
        modelUpdateUI();
      };
      reader.readAsDataURL(file);
  }
  modelFileInput.value = '';
}


// ============================================
// MODEL PREVIEW SYSTEM (ระบบแสดงรูปนางแบบ)
// ============================================
const modelPreviewContainer = document.getElementById('model-preview-container');



// ============================================
// MODEL UPDATE UI (Fixed: Render to Grid)
// ============================================
function modelUpdateUI() {
    // 1. หา Container ที่จะวางรูป
    const container = document.getElementById('model-preview-container');
    const countBadge = document.getElementById('model-image-count');
    const uploadText = document.querySelector('#model-upload-zone .upload-text');
    const clearBtn = document.getElementById('model-clear-images');

    if (!container) return;
    container.innerHTML = ''; // เคลียร์ของเก่า

    if (modelUploadedImages.length > 0) {
        // อัปเดต UI ปุ่มอัพโหลด
        if(countBadge) { countBadge.textContent = '1'; countBadge.style.display = 'inline-block'; }
        if(uploadText) uploadText.textContent = "เปลี่ยนรูปนางแบบ";
        if(clearBtn) clearBtn.classList.remove('hidden');

        // 2. สร้างการ์ดรูปภาพ (ใช้ class preview-item เพื่อรับค่า CSS 60px)
        const item = document.createElement('div');
        item.className = 'preview-item'; 

        const img = document.createElement('img');
        img.src = modelUploadedImages[0].dataUrl;

        const delBtn = document.createElement('button');
        delBtn.className = 'preview-remove-btn';
        delBtn.innerHTML = '✕';
        delBtn.onclick = () => {
            modelUploadedImages = [];
            modelUpdateUI();
        };

        item.appendChild(img);
        item.appendChild(delBtn);
        
        // 3. ยัดลงใน Grid ด้านล่างปุ่ม
        container.appendChild(item);

    } else {
        // กรณีไม่มีรูป (Reset)
        if(countBadge) countBadge.style.display = 'none';
        if(uploadText) uploadText.textContent = "เพิ่มรูปนางแบบ (Ref)";
        if(clearBtn) clearBtn.classList.add('hidden');
    }
	
	
	
	
	// -------------------------------------------------------
    // จัดการเปิด/ปิด ส่วนเลือกคาแรคเตอร์
    // -------------------------------------------------------
    const charSelectInput = document.getElementById('banana-character-select');
    const charUIBox = charSelectInput ? charSelectInput.nextElementSibling : null;

    if (charUIBox && charUIBox.classList.contains('char-tab-container')) {
        if (modelUploadedImages.length > 0) {
            // 🔒 มีรูป -> ใส่สีเทา (Disable)
            charUIBox.classList.add('disabled-section');
            // รีเซ็ตค่าเป็น Auto
            selectCharacter(document.querySelector('.char-card[data-value="auto"]'), 'auto');
        } else {
            // 🔓 ไม่มีรูป -> เอาสีเทาออก (Enable)
            charUIBox.classList.remove('disabled-section');
        }
    }
	

}




// Banana PROMPT&PLAY: Update round info display
function bananaUpdateRoundInfo() {
  const imageTotal = bananaUploadedImages.length;
  const selectValue = bananaRoundCountSelect.value;

  if (selectValue === 'custom') {
    bananaCustomRoundInput.style.display = 'block';
    bananaRoundInfo.style.display = 'none';
  } else {
    bananaCustomRoundInput.style.display = 'none';
    bananaRoundInfo.style.display = 'none'; // ซ่อนไว้ เผื่อวันหน้าจะโชว์
  }

  const roundsPerImage = bananaGetRoundsPerImage();
  const totalRounds = imageTotal * roundsPerImage;

  if (imageTotal === 0) {
    bananaRoundInfo.textContent = `เลือก ${roundsPerImage} รอบต่อภาพ`;
  } else {
    bananaRoundInfo.textContent = `${imageTotal} ภาพ × ${roundsPerImage} รอบ = ${totalRounds} รอบทั้งหมด`;
  }
}

// Banana PROMPT&PLAY: Get rounds per image (ฉบับแก้ไข: อ่านค่าจากกล่อง Custom เสมอ)
function bananaGetRoundsPerImage() {
  const select = document.getElementById('banana-round-count');
  const customInput = document.getElementById('banana-custom-round-input');

  if (!select) return 1;

  // ถ้าเลือกโหมด Custom หรือถ้า Custom Input เปิดแสดงผลอยู่
  if (select.value === 'custom' || (customInput && !customInput.classList.contains('hidden'))) {
      if (customInput) {
          const val = parseInt(customInput.value);
          // ถ้าเป็นตัวเลขและมากกว่า 0 ให้ใช้ค่านั้น, ถ้าไม่ใช่ (เช่นช่องว่าง) ให้ใช้ 1
          return (val > 0) ? val : 1;
      }
  }

  // กรณีเลือกแบบปกติ 1, 3, 5
  const rounds = parseInt(select.value);
  return (rounds > 0) ? rounds : 1;
}

// Banana PROMPT&PLAY: Add log entry
function bananaAddLog(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString('th-TH');
  const logEntry = {
    time: timestamp,
    message: message,
    type: type
  };
  
  bananaLogs.push(logEntry);
  
  // Keep only last 500 logs
  if (bananaLogs.length > 500) {
    bananaLogs = bananaLogs.slice(-500);
  }
  
  // Update UI
  bananaUpdateLogDisplay();
  
  // Also log to console
  const consoleMethod = type === 'error' ? 'error' : type === 'warning' ? 'warn' : 'log';
  console[consoleMethod](`[${timestamp}] ${message}`);
}

// Banana PROMPT&PLAY: Update log display
function bananaUpdateLogDisplay() {
  if (!bananaLogContainer) return;
  
  if (bananaLogs.length === 0) {
    bananaLogContainer.innerHTML = '<div class="log-empty">ยังไม่มี log</div>';
    return;
  }
  
  const logHTML = bananaLogs.map(log => {
    let typeClass = 'log-entry-info';
    if (log.type === 'error') typeClass = 'log-entry-error';
    else if (log.type === 'success') typeClass = 'log-entry-success';
    else if (log.type === 'warning') typeClass = 'log-entry-warning';
    else if (log.type === 'step') typeClass = 'log-entry-step';
    
    return `<div class="log-entry ${typeClass}">
      <span class="log-entry-time">[${log.time}]</span>
      <span class="log-entry-message">${log.message}</span>
    </div>`;
  }).join('');
  
  bananaLogContainer.innerHTML = logHTML;
  
  // Auto scroll to bottom
  bananaLogContainer.scrollTop = bananaLogContainer.scrollHeight;
}

// Banana PROMPT&PLAY: Clear logs
function bananaClearLogs() {
  bananaLogs = [];
  bananaUpdateLogDisplay();
}

// Banana PROMPT&PLAY: Update status
function bananaUpdateStatus(message) {
  if (bananaStatusTimeoutId) {
    clearTimeout(bananaStatusTimeoutId);
    bananaStatusTimeoutId = null;
  }

  bananaStatusText.textContent = message;
  
  // Add to log
  bananaAddLog(message, 'info');

  if (!bananaIsAutomationRunning) {
    bananaStatusTimeoutId = setTimeout(() => {
      bananaStatusText.textContent = 'Ready to use';
    }, 3000);
  }
}

// Banana PROMPT&PLAY: Get Style Prompts


// Banana PROMPT&PLAY: Get Random Style ID


// Banana PROMPT&PLAY: Get UGC System Prompt (Image Prompt)


// Banana PROMPT&PLAY: Call Gemini API with retry for overloaded errors


// Banana PROMPT&PLAY: Call Gemini API


// Banana PROMPT&PLAY: Handle Copy Prompt
function bananaHandleCopyPrompt() {
  const text = bananaPromptResult.textContent;
  if (!text || text.includes('กำลังวิเคราะห์')) {
    showToast('ไม่มี Prompt ให้คัดลอก', 'error');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast('คัดลอก Prompt แล้ว!', 'success');
    bananaBtnCopyPrompt.textContent = '✅';
    setTimeout(() => {
      bananaBtnCopyPrompt.textContent = '📋';
    }, 2000);
  }).catch(() => {
    showToast('ไม่สามารถคัดลอกได้', 'error');
  });
}

// Banana PROMPT&PLAY: Sleep helper (ฉบับแก้: ตื่นทันทีที่กด Stop)
function bananaSleep(ms) {
  return new Promise((resolve, reject) => {
    if (bananaShouldStopAutomation) {
        return reject(new Error('STOPPED'));
    }

    const checkInterval = 100;
    let elapsed = 0;

    const intervalId = setInterval(() => {
      if (bananaShouldStopAutomation) {
        clearInterval(intervalId);
        reject(new Error('STOPPED'));
      } else if (elapsed >= ms) {
        clearInterval(intervalId);
        resolve();
      }
      elapsed += checkInterval;
    }, checkInterval);
  });
}

// Banana PROMPT&PLAY: Stop automation
function bananaStopAutomation() {
  if (bananaIsAutomationRunning) {
    bananaShouldStopAutomation = true;
    bananaUpdateStatus('กำลังหยุด...');
    showToast('กำลังหยุด Automation...', 'error');
  }
}

// Banana PROMPT&PLAY: Get generated images from page (แก้ไข: ดึงทั้งหมด + Scroll)
async function bananaGetGeneratedImages() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => { // 🟢 เพิ่ม async เพื่อรองรับการรอ
        
        // 1. สั่ง Scroll ลงล่างสุดเพื่อให้รูป Lazy Load โหลดขึ้นมาให้ครบ
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 1000)); // รอ 1 วินาทีให้โหลด

        const images = [];
        
        // Method: กวาดหาทุกรูปในหน้าจอที่มีขนาดใหญ่พอ
        const allImgs = document.querySelectorAll('img');
        for (const img of allImgs) {
          const rect = img.getBoundingClientRect();
          // เงื่อนไข: ต้องเป็นรูปที่ขนาดใหญ่กว่า 200x200 (กันพวกไอคอน/โลโก้)
          if (rect.width >= 200 && rect.height >= 200) {
            const src = img.src || img.getAttribute('src') || img.getAttribute('data-src');
            
            // กรองรูปที่ไม่ใช่ผลลัพธ์ออก
            if (src && !src.includes('icon') && !src.includes('avatar') && !src.includes('logo') && !src.includes('profile')) {
              images.push({
                src: src,
                width: rect.width,
                height: rect.height
              });
            }
          }
        }
        
        // ลบรูปซ้ำ (Remove duplicates)
        const uniqueImages = [];
        const seenSrcs = new Set();
        for (const img of images) {
          if (!seenSrcs.has(img.src)) {
            seenSrcs.add(img.src);
            uniqueImages.push(img);
          }
        }
        
        // 🟢 ส่งกลับทั้งหมด (ลบ .slice(0, 10) ออกแล้ว)
        return uniqueImages; 
      }
    });
    
    return result[0]?.result || [];
  } catch (error) {
    console.error('Error getting generated images:', error);
    return [];
  }
}

// Banana PROMPT&PLAY: Convert image URL to data URL
async function bananaConvertImageToDataUrl(imageUrl) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            try {
              const dataUrl = canvas.toDataURL('image/png');
              resolve(dataUrl);
            } catch (e) {
              resolve(null);
            }
          };
          img.onerror = () => resolve(null);
          img.src = url;
        });
      },
      args: [imageUrl]
    });
    
    return result[0]?.result || null;
  } catch (error) {
    console.error('Error converting image:', error);
    return null;
  }
}




// Banana to Video: Run continuous automation (ฉบับแก้ไข: แก้ปุ่มค้างเมื่อกด Stop)
async function bananaToVideoAutomation() {
  if (bananaIsAutomationRunning || videoIsAutomationRunning) {
    showToast('กำลังรันอยู่แล้ว กรุณารอสักครู่', 'error');
    return;
  }

  // ดึงค่ามาเฉยๆ (เว้นว่างได้ ไม่แจ้ง Error)
  const productName = bananaProductNameInput.value.trim();
  
  if (bananaUploadedImages.length === 0) {
    showToast('กรุณาอัพโหลดภาพสินค้าก่อน', 'error');
    return;
  }

  // Set product name for video tab
  videoProductNameInput.value = productName;

  // Set round count for video tab to match banana tab
  const bananaRoundValue = bananaRoundCountSelect.value;
  videoRoundCountSelect.value = bananaRoundValue;
  
  if (bananaRoundValue === 'custom') {
    const bananaCustomValue = bananaCustomRoundInput.value;
    videoCustomRoundInput.value = bananaCustomValue;
    videoCustomRoundInput.style.display = 'block';
  } else {
    videoCustomRoundInput.style.display = 'none';
  }

  // Set download count for video tab to match banana tab
  if (videoDownloadCountAuto && bananaDownloadCount) {
    const bananaDownloadValue = bananaDownloadCount.value;
    videoDownloadCountAuto.value = bananaDownloadValue;

    // อัปเดตปุ่ม UI ให้ตรงกัน
    const videoDownloadSegments = document.querySelectorAll('#tab-content-video .segment-opt[data-type="downloads"]');
    if(videoDownloadSegments.length > 0) {
        videoDownloadSegments.forEach(btn => {
            if(btn.dataset.value === bananaDownloadValue) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }
  }
  
  // Update video round info display
  videoUpdateRoundInfo();

  try {
    // ============================================
    // STEP 0.5: Capture Pre-existing Images (Snapshot)
    // ============================================
    bananaUpdateStatus('🎬 [0/2] กำลังจดจำรายการรูปเดิม...');
    const preExistingImages = await bananaGetGeneratedImages();
    const preExistingSrcs = new Set(preExistingImages.map(img => img.src));
    console.log("Pre-existing images count:", preExistingImages.length);

    // ============================================
    // STEP 1: รัน Banana (สร้างภาพ)
    // ============================================
    bananaUpdateStatus('🎬 [1/2] กำลังสร้างภาพ...');
    
    // เรียกใช้ฟังก์ชันสร้างภาพ
    await bananaHandleAutomation();

    // เช็คดักไว้: ถ้าผู้ใช้กด Stop ในขั้นตอนสร้างภาพ ให้หยุดตรงนี้เลย ไม่ไปต่อ
    if (bananaShouldStopAutomation) throw new Error('STOPPED');

    // Wait a bit for images to be fully generated and displayed
    bananaUpdateStatus('🎬 [1/2] รอภาพแสดงผล...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 2: Get generated images from page
    bananaUpdateStatus('🎬 [2/2] กำลังดึงภาพที่สร้างเสร็จ...');
    const allCurrentImages = await bananaGetGeneratedImages();

    // FILTER: Get ONLY NEW images
    const generatedImages = allCurrentImages.filter(img => !preExistingSrcs.has(img.src));
    console.log("New images found:", generatedImages.length);

    if (generatedImages.length === 0) {
      // Fallback: If no new images found (maybe replaced?), try using all if pre-existing was 0
      if (preExistingImages.length === 0 && allCurrentImages.length > 0) {
          console.log("Fallback: Using all images as new");
           // Assign to generatedImages reference logic (need to manage array)
           generatedImages.push(...allCurrentImages);
      } else {
           throw new Error('ไม่พบภาพที่สร้างใหม่ (New Generated Images Not Found)');
      }
    }

    // Step 3: Convert images to data URLs and add to video upload
    bananaUpdateStatus(`🎬 [2/2] พบ ${generatedImages.length} ภาพ กำลังแปลงเป็นข้อมูล...`);
    videoUploadedImages = []; // Clear existing images

    for (let i = 0; i < generatedImages.length; i++) {
      if (bananaShouldStopAutomation) throw new Error('STOPPED'); // เช็ค Stop อีกที

      const img = generatedImages[i];
      bananaUpdateStatus(`🎬 [2/2] กำลังแปลงภาพ ${i + 1}/${generatedImages.length}...`);
      
      let dataUrl = img.src;
      
      // Convert to data URL if it's not already a data URL
      if (!dataUrl.startsWith('data:')) {
        dataUrl = await bananaConvertImageToDataUrl(img.src);
        if (!dataUrl) {
          bananaUpdateStatus(`⚠️ [2/2] ไม่สามารถแปลงภาพ ${i + 1} ได้ ข้าม...`);
          continue;
        }
      }
      
      if (!dataUrl.startsWith('data:image/')) {
        bananaUpdateStatus(`⚠️ [2/2] ภาพ ${i + 1} ไม่ใช่ format ที่ถูกต้อง ข้าม...`);
        continue;
      }

      const imageData = {
        id: Date.now() + Math.random() + i,
        name: `generated_image_${i + 1}.png`,
        size: 0,
        type: 'image/png',
        dataUrl: dataUrl
      };
      
      videoUploadedImages.push(imageData);
    }

    if (videoUploadedImages.length === 0) {
      throw new Error('ไม่สามารถแปลงภาพได้');
    }

    videoUpdateImageCount();
    bananaUpdateStatus(`🎬 [2/2] แปลงภาพเสร็จ ${videoUploadedImages.length} ภาพ`);

    // Step 4: Switch to video tab and run video automation
    bananaUpdateStatus('🎬 [2/2] กำลังเริ่มสร้างวิดีโอ...');
    
    const videoTab = document.querySelector('[data-tab="video"]');
    if (videoTab) {
      videoTab.click();
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // ============================================
    // STEP 4.5: สลับโหมดเป็น "Frames to Video" (TH/EN Support)
    // ============================================
    bananaUpdateStatus('🎬 [2/2] กำลังเลือกเมนู Frames to Video (TH/EN)...');
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const selectMenuResult = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => {
        function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
        let logMsg = ""; 

        function heavyClick(element) {
            if (!element) return;
            try { element.focus(); } catch(e){}
            const pOpts = { bubbles: true, cancelable: true, view: window, pointerId: 1, width: 1, height: 1, pressure: 0.5 };
            element.dispatchEvent(new PointerEvent('pointerdown', pOpts));
            element.dispatchEvent(new PointerEvent('pointerup', pOpts));
            element.click();
        }

        let triggerBtn = document.querySelector('button[role="combobox"]');
        if (!triggerBtn) triggerBtn = document.querySelector("div[class*='bHqejI']"); 
        
        if (!triggerBtn) {
             const allButtons = document.querySelectorAll('button');
             for (const btn of allButtons) {
                 const txt = (btn.textContent||'').trim().toLowerCase();
                 if (txt.includes('สร้าง') || txt.includes('เปลี่ยน') || txt.includes('video') || txt.includes('frames')) {
                     triggerBtn = btn;
                     break;
                 }
             }
        }

        if (triggerBtn) {
            let currentText = (triggerBtn.textContent || "").trim();
            const isVideoMode = currentText.includes('เปลี่ยนเฟรม') || currentText.includes('Frames to Video');

            if (isVideoMode) {
                return { success: true, message: "ถูกต้องอยู่แล้ว (Frames to Video)" };
            }

            triggerBtn.click(); 
            await sleep(1500);

            let targetOption = null;
            const xpath = "//*[contains(text(), 'เปลี่ยนเฟรม') or contains(text(), 'Frames to Video')]";
            const result = document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            
            for (let i = 0; i < result.snapshotLength; i++) {
                const node = result.snapshotItem(i);
                if (!triggerBtn.contains(node) && node.offsetParent !== null) {
                    let p = node;
                    while(p && p !== document.body) {
                        if(p.getAttribute('role') === 'menuitem' || p.getAttribute('role') === 'option') {
                            targetOption = p;
                            break;
                        }
                        p = p.parentElement;
                    }
                    if (!targetOption) targetOption = node.parentElement; 
                    break;
                }
            }

            if (targetOption) {
                heavyClick(targetOption);
                await sleep(4000); 
                document.body.click(); 
                logMsg = "เปลี่ยนโหมดสำเร็จ";
            } else {
                logMsg = "หาตัวเลือก Frames to Video ไม่เจอ";
            }
        }
        return { success: true, message: logMsg };
      },
      args: []
    });

    if (selectMenuResult[0]?.result?.message) {
        bananaAddLog(`⚙️ ${selectMenuResult[0].result.message}`, 'info');
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    // ============================================
    // 🟢 บังคับเปิดโหมดสุ่ม (Random) ให้หน้า Video
    // ============================================
    const vRandomCheckbox = document.getElementById('video-random-style-checkbox');
    if (vRandomCheckbox) {
        vRandomCheckbox.checked = true; 
        bananaAddLog('🔀 เปิดโหมด Video Random Style อัตโนมัติ', 'info');
    }

    // Run video automation
    await videoRunAutomation();

    bananaUpdateStatus('🎬 เสร็จสิ้น! สร้างภาพและวิดีโอเสร็จแล้ว');
    showToast('สร้างภาพและวิดีโอเสร็จแล้ว!', 'success');

  } catch (error) {
    if (error.message === 'STOPPED') {
        bananaUpdateStatus('หยุดการทำงานแล้ว');
        showToast('หยุดตามคำสั่งผู้ใช้', 'warning');
    } else {
        bananaUpdateStatus(`❌ Error: ${error.message}`);
        showToast('เกิดข้อผิดพลาด: ' + error.message, 'error');
    }
  } finally {
    // 🟢 ส่วนนี้สำคัญที่สุด! คืนค่าปุ่มเสมอ ไม่ว่าจะ Error หรือ Stop
    bananaIsAutomationRunning = false;
    bananaShouldStopAutomation = false;
    
    // ปลดล็อคหน้าจอ
    await toggleWebPageLock(false); 

    // คืนค่าปุ่ม Start ให้กดใหม่ได้
    if (bananaBtnAutomation) {
        bananaBtnAutomation.disabled = false;
        bananaBtnAutomation.innerHTML = '<span>START GENERATE</span>'; // หรือข้อความเดิมที่คุณใช้
    }

    // ซ่อนปุ่ม Stop
    if (bananaBtnStop) {
        bananaBtnStop.style.display = 'none';
    }
  }
}

// ============================================
// 🍌 BANANA SETUP: EVENT LISTENERS
// ============================================
function bananaSetupEventListeners() {
	
	const smartAutoCheckbox = document.getElementById('banana-smart-auto-checkbox');
  const manualContainer = document.getElementById('manual-config-container');

  if (smartAutoCheckbox && manualContainer) {
      smartAutoCheckbox.addEventListener('change', (e) => {
          if (e.target.checked) {
              // ถ้าเปิด -> ปิดการใช้งานส่วนเลือกเอง
              manualContainer.classList.add('disabled-section');
          } else {
              // ถ้าปิด -> เปิดให้เลือกเองได้ปกติ
              manualContainer.classList.remove('disabled-section');
          }
      });
  }

	
	
  if(bananaClearImagesBtn) bananaClearImagesBtn.addEventListener('click', bananaClearAllImages);

  // Price & Details toggle - show/hide container
  const bananaPriceTagToggle = document.getElementById('banana-price-tag-toggle');
  const bananaPriceTagContainer = document.getElementById('banana-price-tag-container');
  if (bananaPriceTagToggle && bananaPriceTagContainer) {
    bananaPriceTagToggle.addEventListener('change', (e) => {
        bananaPriceTagContainer.style.display = e.target.checked ? 'block' : 'none';
    });
  }
  
  // No Character toggle - show/hide presentation container AND disable character selection
  const bananaNoCharacter = document.getElementById('banana-no-character');
  const bananaPresentationContainer = document.getElementById('banana-presentation-container');
  const bananaCharacterContainer = document.querySelector('.input-group:has(#banana-character-select)') || document.getElementById('banana-character-select')?.closest('.input-group');
  const bananaCharacterTabs = document.querySelectorAll('.char-tab-container .char-tabs, .char-tab-container .char-content-area');
  
  if (bananaNoCharacter) {
    bananaNoCharacter.addEventListener('change', (e) => {
      // Show/hide presentation container
      if (bananaPresentationContainer) {
        bananaPresentationContainer.style.display = e.target.checked ? 'block' : 'none';
      }
      // Disable/enable character selection
      if (bananaCharacterTabs) {
        bananaCharacterTabs.forEach(el => {
          if (e.target.checked) {
            el.style.opacity = '0.4';
            el.style.pointerEvents = 'none';
          } else {
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
          }
        });
      }
    });
  }
  
  // ปุ่ม START (จัดการทั้งแบบธรรมดา และแบบต่อเนื่อง)
  if(bananaBtnAutomation) {
      bananaBtnAutomation.addEventListener('click', async () => {
        if (bananaToVideoCheckbox && bananaToVideoCheckbox.checked) {
          await bananaToVideoAutomation(); // แบบต่อเนื่อง
        } else {
          await bananaHandleAutomation();  // แบบสร้างรูปอย่างเดียว
        }
      });
  }

  if(bananaBtnStop) bananaBtnStop.addEventListener('click', bananaStopAutomation);
  if(bananaRoundCountSelect) bananaRoundCountSelect.addEventListener('change', bananaUpdateRoundInfo);
  if(bananaCustomRoundInput) bananaCustomRoundInput.addEventListener('input', bananaUpdateRoundInfo);
  if(bananaBtnCopyPrompt) bananaBtnCopyPrompt.addEventListener('click', bananaHandleCopyPrompt);
  
  if (bananaLogClearBtn) {
    bananaLogClearBtn.addEventListener('click', bananaClearLogs);
  }
  
  // Generate Prompt Only button
  if (bananaBtnGeneratePrompt) {
    bananaBtnGeneratePrompt.addEventListener('click', bananaGeneratePromptOnly);
  }
}




// ============================================
// Banana: Generate Prompt Only (ไม่รัน Automation)
// ============================================
async function bananaGeneratePromptOnly() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    showToast('กรุณาตั้งค่า Gemini API Key ก่อน', 'error');
    return;
  }
  
  if (bananaUploadedImages.length === 0) {
    showToast('กรุณาอัพโหลดภาพสินค้าก่อน', 'error');
    return;
  }
  
  showToast('กำลังสร้าง Prompt...', 'info');
  
  try {
    const imageData = bananaUploadedImages[0];
    const productName = bananaProductNameInput?.value?.trim() || '';
    const isSmartAuto = document.getElementById('banana-smart-auto-checkbox')?.checked || false;
    
    // Build prompt request
    let userMessage = '';
    const noText = document.getElementById('banana-no-text')?.checked || false;
    const textEffectValue = document.getElementById('banana-text-effect')?.value || 'none';
    const textEffectData = window.getTextEffect ? window.getTextEffect(textEffectValue) : { prompt: '' };
    
    let textInstruction = '';
    if (noText) {
      textInstruction = '\n⚠️ สำคัญ: ห้ามใส่ข้อความใดๆ ลงบนภาพ (no text overlay)';
    } else if (textEffectValue !== 'none') {
      textInstruction = `\nเอฟเฟกต์ข้อความ: ${textEffectData.prompt}`;
    }
    
    // Price & Details Logic
    const showPriceTag = document.getElementById('banana-price-tag-toggle')?.checked || false;
    if (showPriceTag && !noText) { // Only add if enabled and Text Disabled is OFF
        const priceText = document.getElementById('banana-product-price')?.value?.trim() || '';
        const detailText = document.getElementById('banana-product-detail')?.value?.trim() || '';
        const priceStyleValue = document.getElementById('banana-price-style')?.value || 'auto';
        const priceStyleData = window.getPriceTagStyle ? window.getPriceTagStyle(priceStyleValue) : { prompt: '' };

        if (priceText || detailText) {
            textInstruction += `\n\n📌 PRICE & DETAILS OVERLAY:
- Display Price: "${priceText}"
- Display Details: "${detailText}"
- Tag Style: ${priceStyleData.prompt}
- Ensure the text is clearly visible, stylish, and suitable for commercial advertisement.
- Use appropriate currency symbol if provided.`;
        }
    }
    
    // No Character mode - CRITICAL: Must exclude all character/model instructions from prompt
    const noCharacter = document.getElementById('banana-no-character')?.checked || false;
    const presentationValue = document.getElementById('banana-presentation-style')?.value || 'product_only';
    const presentationData = window.getImagePresentationStyle ? window.getImagePresentationStyle(presentationValue) : { prompt: '' };
    
    let characterInstruction = '';
    if (noCharacter) {
      // CRITICAL: Strong instructions to absolutely exclude any person/model/character
      characterInstruction = `

⚠️⚠️⚠️ CRITICAL INSTRUCTION - ABSOLUTELY NO PEOPLE ⚠️⚠️⚠️
- DO NOT include ANY person, model, character, human, man, woman, or any part of human body in the image
- NO hands holding product (unless "เสนอเพียงสินค้า" is selected)
- NO face, NO body parts
- PRODUCT ONLY - The product must be the ONLY subject in the image
- If I see ANY human in the image, it is a FAILURE

Presentation Style: ${presentationData.prompt}`;
    }
    
    if (isSmartAuto) {
      // When no-character is on, DO NOT include any character selection in prompt
      if (noCharacter) {
        userMessage = `Create a product-only advertising image from this photo. NO HUMAN. NO MODEL. NO PERSON. Product only focus.${productName ? ` Product name: ${productName}` : ''}${textInstruction}${characterInstruction}`;
      } else {
        userMessage = `สร้าง prompt สำหรับภาพโฆษณาสินค้าจากภาพนี้ ให้ AI คิดสไตล์และฉากหลังที่เหมาะสมเอง${productName ? ` ชื่อสินค้า: ${productName}` : ''}${textInstruction}`;
      }
    } else {
      const selectedStyle = bananaStyleSelect?.value || 'studio';
      const selectedBg = bananaBgSelect?.value || 'white';
      
      if (noCharacter) {
        // DO NOT include style/character when no-character mode is on
        userMessage = `Create a product-only advertising image. NO HUMAN. NO MODEL. NO PERSON.
Product name: ${productName || 'Product'}
Background: ${selectedBg}${textInstruction}${characterInstruction}`;
      } else {
        userMessage = `สร้าง prompt สำหรับภาพโฆษณาสินค้าจากภาพนี้
${productName ? `ชื่อสินค้า: ${productName}` : ''}
สไตล์: ${selectedStyle}
ฉากหลัง: ${selectedBg}${textInstruction}`;
      }
    }
    
    const base64Data = imageData.dataUrl.split(',')[1];
    const mimeType = imageData.dataUrl.split(';')[0].split(':')[1];
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: userMessage },
            { inline_data: { mime_type: mimeType, data: base64Data } }
          ]
        }]
      })
    });
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const generatedPrompt = data.candidates[0].content.parts[0].text;
      
      // Display the prompt
      if (bananaPromptResultContainer) bananaPromptResultContainer.style.display = 'block';
      if (bananaPromptResult) bananaPromptResult.textContent = generatedPrompt;
      
      showToast('สร้าง Prompt สำเร็จ!', 'success');
    } else {
      throw new Error('ไม่สามารถสร้าง Prompt ได้');
    }
  } catch (error) {
    console.error('Generate Prompt Error:', error);
    showToast('เกิดข้อผิดพลาด: ' + error.message, 'error');
  }
}

// ============================================
// Banana: Main Automation Logic (ส่วนที่ 1: เริ่มต้น + เตรียม Prompt)
// ============================================
async function bananaHandleAutomation() {
  
  // 1. เช็คเว็บ (Safety Check)
  const isCorrect = await checkCorrectWebsite();
  if (!isCorrect) return; 
  
  const productName = bananaProductNameInput.value.trim();

  if (bananaUploadedImages.length === 0) {
    showToast('กรุณาอัพโหลดภาพสินค้าก่อน', 'error');
    return;
  }

  const maxDownloads = parseInt(bananaDownloadCount.value);
  const roundsPerImage = bananaGetRoundsPerImage();
  const totalImages = bananaUploadedImages.length;
  const totalRounds = totalImages * roundsPerImage;

  // เริ่มทำงาน
  // 🟢 เพิ่มบรรทัดนี้: ดึงข้อมูล Tab ปัจจุบันมาเก็บไว้ในตัวแปร tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  bananaIsAutomationRunning = true;
  bananaShouldStopAutomation = false;
  bananaBtnAutomation.disabled = true;
  await toggleWebPageLock(true); 
  const originalBtnContent = bananaBtnAutomation.innerHTML;
  bananaBtnAutomation.innerHTML = '<span class="loading"></span> <span>กำลังทำงาน...</span>';

  if (bananaBtnStop) bananaBtnStop.style.display = 'flex';

  let completedRounds = 0;
  let totalDownloaded = 0;
  let processedImageUrls = []; 

  // เคลียร์ Log
  bananaClearLogs();
  bananaAddLog('🚀 เริ่มสร้างภาพอัตโนมัติ', 'step');
  
  const isSmartAuto = document.getElementById('banana-smart-auto-checkbox')?.checked;
  const EXCLUDED_BG_PREFIXES = ['fashion_', 'tool_', 'large_', 'review_'];

  // 🟢 1. คลังตัวละคร (Character Templates) - ฉบับครบถ้วน
  const charTemplates = {
      // --- 👩 หญิง (Female) ---
      'office_lady': "a smart Thai working woman, professional look, wearing office attire, confident and elegant",
      'net_idol': "a beautiful Thai net idol / influencer, glowing skin, trendy hairstyle, very attractive and charming",
      'hiso_girl': "a wealthy sophisticated Thai woman (Hi-So), wearing luxury brand clothing and jewelry, elegant and expensive look",
      'sport_girl': "a fit Thai woman in gym activewear, healthy skin, toned body, energetic and sporty vibe",
      'real_size': "a confident chubby Thai woman (Plus Size model), beautiful smile, fashionable outfit, body positivity vibe",
      'mom': "a warm and caring young Thai mother, kind smile, soft features, approachable look",
      'hijab': "a beautiful modern Muslim woman wearing a stylish hijab, modest yet fashionable, kind expression",
      'villager_girl': "an authentic Thai rural woman (villager style), tanned weather-beaten skin, messy unstyled hair, no makeup, wearing simple old clothes, natural hard-working look, high detailed skin texture",

      // --- 👨 ชาย (Male) ---
      'thai_guy': "a handsome young Thai man, clean cut, casual t-shirt, friendly smile, approachable look",
      'smart_man': "a smart professional Thai businessman in a suit, confident, well-groomed, trustworthy look",
      'oppa': "a handsome Thai man with Korean Idol style (K-Pop look), fair skin, trendy hair, stylish fashion",
      'muscle_man': "a strong Thai man with visible muscles, fitness trainer look, wearing a tank top, healthy and active",
      'street_boy': "a cool Thai street-style guy, wearing trendy streetwear, edgy and confident look",
      'dad': "a kind Asian father figure, warm smile, family-man vibe, trustworthy",
      'villager_boy': "an authentic Thai rural man (villager style), rough weather-beaten face, tanned skin, messy unkempt hair, stubble or beard, wearing old casual clothes, hard-working vibe, realistic skin texture",

      // --- 🛠️ อาชีพ (Job) ---
      'student_female': [
          "a cute Thai female university student wearing a tight fit uniform, white button-down shirt and black skirt, fresh look",
          "a Thai female university student wearing an oversized student uniform, holding books, natural look",
          "a beautiful Thai female student wearing a neat university uniform with a belt buckle, bright smile"
      ],
      'student_male': [
          "a handsome Thai male university student wearing a white shirt and black trousers, clean cut",
          "a cool Thai male student wearing a university uniform with a tie, smart look",
          "a casual Thai male student wearing an untucked white shirt and black slacks, friendly vibe"
      ],
      'seller_woman': [
          "an enthusiastic Thai female online seller wearing a bright apron and holding a package",
          "a Thai female seller wearing a casual polo shirt with a shop logo",
          "a friendly Thai female merchant wearing a stylish t-shirt ready to ship items"
      ],
      'seller_man': [
          "an active Thai male online seller wearing a packing apron",
          "a Thai male merchant wearing a smart casual shirt holding a box",
          "an energetic Thai male seller wearing a graphic t-shirt"
      ],
      'doctor_female': [
          "a professional Thai female doctor wearing a white medical coat and stethoscope",
          "a Thai female doctor wearing blue medical scrubs, clean look"
      ],
      'doctor_male': [
          "a professional Thai male doctor wearing a formal white coat",
          "a Thai male doctor wearing green surgical scrubs"
      ],
      'nurse_female': [
           "a Thai female nurse wearing a traditional white nurse uniform and cap",
           "a modern Thai female nurse wearing a light blue nursing tunic"
      ],
      'nurse_male': [
           "a Thai male nurse wearing a white nursing uniform",
           "a Thai male nurse wearing light blue medical scrubs"
      ],
      'chef_female': [
          "a professional Thai female chef wearing a classic white chef jacket and hat",
          "a modern Thai female chef wearing a black chef uniform",
          "a Thai female cook wearing a striped apron and bandana"
      ],
      'chef_male': [
          "a professional Thai male chef wearing a pristine white chef uniform",
          "a cool Thai male chef wearing a black chef jacket and apron"
      ],
      'technician_female': [
          "a skilled Thai female technician wearing a dark blue mechanic jumpsuit",
          "a Thai female engineer wearing a safety vest and hard hat"
      ],
      'technician_male': [
          "a skilled Thai male technician wearing a workshop uniform with reflective strips",
          "a Thai male engineer wearing a grey polo and tool belt"
      ],
      'rider_female': [
          "a Thai female delivery rider wearing a green rider jacket holding a helmet",
          "a Thai female rider wearing an orange delivery jacket"
      ],
      'rider_male': [
          "a Thai male delivery rider wearing a green rider jacket",
          "a Thai male rider wearing an orange delivery jacket"
      ],
      'teacher_female': [
          "a Thai female teacher wearing a formal khaki government uniform",
          "a Thai female teacher wearing a polite silk blouse and skirt"
      ],
      'teacher_male': [
          "a Thai male teacher wearing a formal khaki government uniform",
          "a Thai male teacher wearing a polite white shirt and tie"
      ],
      'farmer_female': [
          "a Thai female farmer wearing a wide-brimmed straw hat and long-sleeved shirt",
          "a Thai female gardener wearing a plaid shirt and gardening gloves"
      ],
      'farmer_male': [
          "a Thai male farmer wearing a straw hat and protective outdoor clothes",
          "a Thai male farmer wearing a plaid shirt and holding a tool"
      ],
	  
	  // ✈️ ลูกเรือ (Air Crew)
              'flight_attendant_female': [
                  "a beautiful Thai flight attendant wearing a smart airline uniform with a silk scarf, professional and friendly smile, airport background",
                  "a Thai air hostess wearing a traditional Thai silk airline uniform, elegant and welcoming, standing in an airport terminal",
                  "a modern female flight attendant pulling a cabin crew luggage, ready for flight"
              ],
              'flight_attendant_male': [
                  "a handsome Thai male flight attendant (steward) wearing a smart airline suit and tie, professional look",
                  "a friendly Thai cabin crew member standing with good posture, welcoming service vibe",
                  "a smart Thai steward holding a pilot case, airport background"
              ],

   
         // 👵 คุณยาย (มีทั้งชุดอยู่บ้าน / ชุดผ้าถุง / ชุดลูกไม้ไปวัด)
              'grandma': [
                  "a healthy and happy Asian grandmother, silver hair, kind smile, wearing comfortable floral home clothes, gentle look",
                  "a traditional Thai grandmother, wearing a simple blouse and a Sarong (Pha Tung), authentic local look",
                  "a polite Thai grandmother, wearing a white lace blouse and long skirt, elegant and kind"
              ],

              // 💃 คุณยายสายซิ่ง (แฟชั่นจัดเต็ม / แว่นกันแดด / ยีนส์)
              'active_grandma': [
                  "a modern cool Asian grandmother, wearing stylish sunglasses and a colorful silk scarf, fashionista vibe",
                  "an energetic Asian grandmother, wearing a bright tracksuit and a visor hat, active lifestyle",
                  "a trendy Thai grandmother, wearing a denim jacket and modern glasses, young at heart vibe"
              ],

              // 👴 คุณตา (เสื้อโปโล / ผ้าขาวม้า / หมวกติงลี่)
              'grandpa': [
                  "a healthy Asian grandfather, wisdom look, kind smile, wearing a casual polo shirt and reading glasses",
                  "a traditional Thai grandfather, wearing a white sleeveless shirt and a Pa Kao Ma (checkered sash) around waist, relaxing at home",
                  "a smart Asian grandfather, wearing a clean button-down shirt and a vintage flat cap, gentleman look"
              ],

              // 🏮 เถ้าแก่/เจ้าสัว (ชุดจีน / สูทลำลอง / ใส่ทอง)
              'chinese_boss': [
                  "a wealthy Chinese-Thai senior businessman (Jao Sua), wearing a traditional Chinese silk Tang suit (red or gold pattern), authoritative",
                  "a wealthy senior businessman, wearing a premium polo shirt tucked in, showing a gold watch and rings, rich uncle vibe",
                  "a sophisticated senior man, wearing a smart casual blazer over a t-shirt, holding a walking cane, luxury lifestyle"
              ],
			'human_paa': [
			"a middle-aged Thai woman (Auntie style), short curly permed hair, wearing a colorful floral pattern shirt, wearing gold jewelry, intense confident expression",
			"a middle-aged Thai woman (Auntie style), curly hair, wearing a bright lace blouse and long skirt, holding a luxury handbag, demanding look",
			"a middle-aged Thai woman (Auntie style), wearing a vibrant tracksuit and a large visor hat, morning exercise vibe, energetic and bossy"
			],
			'human_lung': [
			"a middle-aged Thai man (Uncle style), wearing a polo shirt tucked into high-waisted trousers, leather belt with a phone case holder, hands on hips, grumpy expression",
			"a middle-aged Thai man (Uncle style), wearing a plaid button-down shirt (Kamnan style), serious opinionated expression, authoritative vibe",
			"a middle-aged Thai man (Uncle style), wearing a white sleeveless undershirt and shorts, holding a folding fan, relaxed but complaining look"
		]
  };
  
	const defaultChar = "Professional model, Thai ethnicity";
try {
    for (let imgIndex = 0; imgIndex < totalImages; imgIndex++) {
      const currentImage = bananaUploadedImages[imgIndex];

      for (let round = 0; round < roundsPerImage; round++) {
        const currentRound = imgIndex * roundsPerImage + round + 1;
        const roundLabel = `[รอบ ${currentRound}/${totalRounds}]`;

        try {
			
			
          // ============================================
          // 🟢 STEP 1: เตรียม Prompt
          // ============================================
          bananaUpdateStatus(`🤖 ${roundLabel} [1/5] กำลังเตรียม Prompt...`);
          if (bananaPromptStatus) bananaPromptStatus.style.display = 'block';

          const imgSafety = " (IMPORTANT: Character must be Thai/Asian ethnicity. Black hair, dark eyes. Do NOT show specific price numbers. Use generic promotional text only.)";
          const imgNegative = ", price tag, price label, specific numbers, currency, baht sign, medical claims, before after, cure, treat, child, kid, baby, westerner, blonde hair, blue eyes, beard";

          let generatedPrompt = "";
          let finalBgText = "";
          let selectedStyleId = "auto";
          let currentOutfit = "";

          // ------------------------------------
          // 1.1 CHECK NO-CHARACTER MODE FIRST
          // ------------------------------------
          const noCharacterMode = document.getElementById('banana-no-character')?.checked || false;
          const presentationStyleValue = document.getElementById('banana-presentation-style')?.value || 'product_only';
          const presentationStyleData = window.getImagePresentationStyle ? window.getImagePresentationStyle(presentationStyleValue) : { prompt: '' };
          
          // 🚫 NO CHARACTER MODE - Skip ALL character/model logic
          if (noCharacterMode) {
              bananaAddLog(`🚫 โหมดไม่ใช้ตัวละคร: เน้นสินค้าเท่านั้น`, 'info');
              
              // Get background if selected
              const bananaBgSelectNoChar = document.getElementById('banana-bg-select');
              let bgForProductOnly = 'clean professional studio background with soft lighting';
              if (bananaBgSelectNoChar && bananaBgSelectNoChar.value !== 'auto') {
                  // Use selected background
                  bgForProductOnly = bananaBgSelectNoChar.value;
              }
              
              // Generate PRODUCT-ONLY prompt - ABSOLUTELY NO PERSON/MODEL/CHARACTER
              generatedPrompt = `Professional product photography. PRODUCT ONLY. ABSOLUTELY NO PERSON, NO MODEL, NO HUMAN, NO CHARACTER, NO HANDS, NO BODY PARTS in this image.
              
[product] as the ONLY subject in the frame.

${presentationStyleData.prompt}

Background: ${bgForProductOnly}

CRITICAL REQUIREMENTS:
- The product must be the ONLY subject - NO PEOPLE ALLOWED
- NO hands holding the product
- NO model, NO person, NO human figure
- Focus purely on the product itself
- Professional lighting highlighting product details
- Clean composition showcasing product features`;

              // Price & Details Logic (For No-Character Mode)
              const showPriceTag = document.getElementById('banana-price-tag-toggle')?.checked || false;
              const noText = document.getElementById('banana-no-text')?.checked || false;
              
              if (showPriceTag && !noText) {
                  const priceText = document.getElementById('banana-product-price')?.value?.trim() || '';
                  const detailText = document.getElementById('banana-product-detail')?.value?.trim() || '';
                  const priceStyleValue = document.getElementById('banana-price-style')?.value || 'auto';
                  const priceStyleData = window.getPriceTagStyle ? window.getPriceTagStyle(priceStyleValue) : { prompt: '' };

                  if (priceText || detailText) {
                    generatedPrompt += `\n\n📌 PRICE & DETAILS OVERLAY:
- Display Price: "${priceText}"
- Display Details: "${detailText}"
- Tag Style: ${priceStyleData.prompt}
- Ensure the text is clearly visible, stylish, and suitable for commercial advertisement.`;
                      bananaAddLog(`🏷️ ใส่ป้ายราคา: ${priceText} / ${detailText}`, 'info');
                  }
              }

              generatedPrompt += `\n\nStyle: High-end commercial product photography, 8k resolution, professional studio quality.

Negative Prompt: "person, human, model, woman, man, hands, fingers, face, body, character, people${imgNegative}."`;
              
              // Replace product name
              generatedPrompt = generatedPrompt.replace(/\\[product\\]/g, productName || 'product');
              
              bananaPromptResult.textContent = generatedPrompt;
              bananaAddLog(`📸 Prompt สินค้าเท่านั้น: ${presentationStyleValue}`, 'success');
              
              // Skip to next step (don't continue with character selection)
              await bananaSleep(500);
              
          } else {
              // NORMAL MODE - Continue with character selection
              
          // ------------------------------------
          // 1.2 เลือกคาแรคเตอร์ (Logic ใหม่) - ONLY IF NOT NO-CHARACTER MODE
          // ------------------------------------
          let characterDesc = "a professional model (Thai/Asian ethnicity)";
          let isJobCharacter = false;
          const bananaCharacterSelect = document.getElementById('banana-character-select');

          if (modelUploadedImages && modelUploadedImages.length > 0) {
              characterDesc = "the character from the reference image"; 
              bananaAddLog(`👤 ใช้รูปนางแบบ (Ref Image)`, 'info');
          } else {
              const selectedCharKey = bananaCharacterSelect ? bananaCharacterSelect.value : 'auto';
              if (selectedCharKey !== 'auto' && charTemplates[selectedCharKey]) {
                  const templateValue = charTemplates[selectedCharKey];
                  
                  // สุ่มถ้าเป็น Array
                  if (Array.isArray(templateValue)) {
                      characterDesc = templateValue[Math.floor(Math.random() * templateValue.length)];
                      isJobCharacter = true; // ✅ เป็นอาชีพ (ห้ามเลือกชุดซ้ำ)
                  } else {
                      characterDesc = templateValue;
                  }
                  bananaAddLog(`👤 คาแรคเตอร์: ${selectedCharKey}`, 'info');
              }
          }

          // ------------------------------------
          // 1.2 เลือกโหมด (Smart Auto vs Manual)
          // ------------------------------------
          if (isSmartAuto) {
              // --- 🚀 Smart Auto ---
              bananaAddLog(`🚀 Smart Auto: AI คิดชุดและฉากให้`, 'info');
              const adTextStyle = `(Text Style): Extreme Advertising Thai Typography, Masterpiece, Bold & Catchy.`;
              
              generatedPrompt = `Professional high-end commercial photography of [product]. 
              The shot features ${characterDesc} interacting with the product naturally.
              (Outfit): The model is wearing a stylish outfit that perfectly matches the product's mood.
              (Background): A suitable real-world environment fitting the product.
              ${adTextStyle} 
              (Vibe): Cinematic lighting, authentic atmosphere, high quality, 8k resolution.
              ${imgSafety}
              Negative Prompt: "low quality, text overlay, watermark, wrong context, mismatched outfit${imgNegative}."`;

          } else {
              // --- 🛠️ Manual Mode ---
              
              // A. เลือกชุด (Outfit)
              const bananaOutfitSelect = document.getElementById('banana-outfit-select');
              // (วางรายการชุดฉบับเต็มของคุณที่นี่)
              const outfitTemplates = {
                  'casual': "wearing a simple, stylish t-shirt and jeans in neutral colors, comfortable daily look", 
                  'polo': "wearing a smart casual polo shirt in neutral tone, neat and friendly look",
                  'shirt': "wearing a clean button-down shirt or blouse, smart and polite vibe",
                  'hoodie': "wearing a cozy oversized hoodie, comfortable modern look",
                  'pajamas': "wearing comfortable cute pajamas or sleepwear, relaxed home look, cozy vibe",
                  'suit': "wearing a professional suit or smart blazer in dark navy or grey, business attire, trustworthy look",
                  'turtleneck': "wearing a stylish turtleneck sweater, modern and sleek look",
                  'leather': "wearing a black leather jacket, edgy and confident biker look",
                  'student': "wearing a standard Thai university student uniform, crisp white button-down shirt and black skirt or trousers, belt with university buckle",
                  'doctor': "wearing a professional white medical coat (lab coat) with a stethoscope, smart doctor look",
                  'nurse': "wearing a clean white professional nurse uniform with a nurse cap, caring look",
                  'teacher': "wearing a formal Thai government official khaki uniform (civil servant), polite and respectful look",
                  'police': "wearing a Royal Thai Police uniform (brown tight uniform) with badges, authoritative look",
                  'chef': "wearing a professional white chef uniform jacket and hat, clean hygienic look",
                  'engineer': "wearing a blue workshop shirt with a high-visibility safety vest (orange or yellow) and a hard hat, industrial engineer look",
                  'rider': "wearing a delivery rider jacket (green or orange) with reflective strips, holding a motorcycle helmet, active service look",
                  'technician': "wearing a dark blue mechanic jumpsuit or workshop uniform, handy and professional technician look",
                  'seller': "wearing a casual outfit with a full-body apron, ready to serve, shop owner vibe",
                  'morhom': "wearing a traditional Thai indigo-dyed Mor Hom shirt (dark blue cotton), authentic local look",
                  'isan': "wearing local Thai style clothing with a Pa Kao Ma (checkered sash), vibrant countryside vibe",
                  'northern': "wearing traditional Northern Thai Lanna clothing, cotton fabric, gentle cultural look",
                  'southern': "wearing a colorful Batik patterned shirt, vibrant tropical design, coastal vibe",
                  'thai_dress': "wearing a traditional Thai silk dress (Chut Thai) with gold ornaments, elegant cultural look",
                  // 🟢 เพิ่มใหม่: ชุดเด็กดอย (Hill Tribe)
				  'hill_tribe': "wearing traditional Thai Hill Tribe costume (Hmong or Karen style), colorful embroidered fabric, silver ornaments and beads, authentic highland vibe",
				  'korean': "wearing trendy Korean style fashion, oversized fit, clean minimalist aesthetic",
                  'oldmoney': "wearing a classic old money aesthetic outfit, cable-knit sweater or polo in cream or earth tones, quiet luxury vibe",
                  'street': "wearing trendy streetwear, baggy fit, cool and confident style",
                  'y2k': "wearing trendy Y2K fashion, retro 2000s aesthetic, playful vibe",
                  'sport': "wearing activewear or tracksuit, fit and healthy lifestyle vibe",
                  'vacation': "wearing a breathable linen shirt or summer dress, relaxed vacation vibe"
              };

              // 🟢 ถ้าเป็นอาชีพ (Job) -> ข้ามการเลือกชุด
              if (isJobCharacter) {
                  bananaAddLog(`👕 ใช้ชุดประจำอาชีพ (ข้ามการเลือกชุดภายนอก)`, 'info');
                  currentOutfit = ""; 
              } else {
                  // ถ้าไม่ใช่ Job -> เลือกชุดได้
                  let selectedOutfitVal = bananaOutfitSelect ? bananaOutfitSelect.value : 'auto';
                  if (selectedOutfitVal === 'auto' || selectedOutfitVal === 'casual') {
                      // สุ่มชุดทั่วไป (ตัดชุดอาชีพออก)
                      const safeOutfits = ['casual', 'polo', 'shirt', 'hoodie', 'suit', 'korean', 'street', 'morhom'];
                      const randomKey = safeOutfits[Math.floor(Math.random() * safeOutfits.length)];
                      currentOutfit = outfitTemplates[randomKey];
                      bananaAddLog(`👕 สุ่มชุด: ${randomKey}`, 'info');
                  } else {
                      currentOutfit = outfitTemplates[selectedOutfitVal] || "wearing casual clothes";
                      bananaAddLog(`👕 เลือกชุด: ${selectedOutfitVal}`, 'info');
                  }
              }
			  

              // B. เลือกฉากหลัง (Background)
              const bananaBgSelect = document.getElementById('banana-bg-select');
              const bgTemplates = {
                  // --- 🏠 ภายใน (Indoor) ---
                  'living_room': "modern minimalist living room with soft sunlight, cozy atmosphere",
                  'bedroom': "cozy bedroom corner with warm lighting, comfortable vibe",
                  'kitchen': "luxury marble kitchen counter, clean and bright cooking area",
                  'bathroom': "modern luxury bathroom counter with mirror, bright lighting, clean marble texture, spa atmosphere, white tone",
                  'dining_room': "warm dining table setting with delicious food background, cozy family atmosphere",
                  'closet': "luxury walk-in closet with clothes racks, soft lighting, fashion boutique vibe, organized and chic",
                  'studio': "clean white professional photo studio background, soft lighting, product photography style",
                  'gym': "modern fitness gym background with equipment, active atmosphere",
				  'classroom': "inside a modern bright classroom with desks, chairs and whiteboard, educational atmosphere, soft daylight",
				  'meeting_room': "modern professional meeting room conference table, glass walls, business atmosphere, blurred office background",
                  'home_office': "cozy home office setup, wooden desk with computer monitor and gadgets, warm lighting, productive workspace vibe",

                  // --- 🏙️ เมือง & ไลฟ์สไตล์ (Urban & Lifestyle) ---
                  'cafe': "trendy cafe with glass windows and city view, aesthetic coffee shop vibe",
                  'office': "modern workspace office environment, professional business look",
                  'luxury_hotel': "luxury hotel lobby or lounge, expensive furniture, golden warm lighting, premium atmosphere",
                  'supermarket': "aisles of a modern supermarket or convenience store, bright lighting, shelves with products",
                  'city': "urban street style with blurred city lights, bokeh effect, modern bangkok vibe",
                  'street': "bustling modern city street in Bangkok, blurred cars and buildings, urban vibe",
                  'subway': "modern BTS Skytrain or subway station in Bangkok, clean urban transport background",
				  'restaurant': "luxury fine dining restaurant or trendy bistro, warm lighting, elegant table setting, blurred background, premium atmosphere",
				  'airport': "modern international airport terminal (Suvarnabhumi style), bright lighting, glass windows with airplanes visible outside, travel atmosphere",
				  // 🚗 บนรถ (เน้นเบาะหนัง แสงสวยๆ)
                  'in_car': "inside a modern luxury car, sitting on the leather passenger seat, sunlight coming through the window, blurred road background, travel lifestyle vibe",   
                  // 🛵 บนมอไซค์ (เน้นสตรีท เท่ๆ)
                  'on_bike': "sitting on a stylish motorcycle (scooter) on a city street, outdoor daylight, blurred urban background, active lifestyle",
			  
                  // --- 🌳 ธรรมชาติ (Nature) ---
                  'garden': "bright outdoor garden with greenery and flowers, fresh nature vibe",
                  'beach': "tropical beach resort atmosphere with blue sky and white sand, vacation vibe",
                  'mountain': "majestic mountains in northern Thailand, misty morning, scenic nature view, camping vibe",
                  'waterfall': "beautiful tropical waterfall in Thailand, surrounding rainforest, fresh water",
				  'yacht': "sitting on the deck of a luxury private yacht or speedboat in the middle of the ocean, blue sky and sea background, rich vacation lifestyle",
				  // ⚔️ สนามรบ (Epic Battlefield) - เหมาะกับ Gaming Gear / อาหารเสริม / หรือคอนเทนต์ตลก
                  'battlefield': "epic cinematic battlefield, smoke and dust in the air, dramatic lighting, explosions in background, action movie atmosphere, war zone",

                  // --- 🇹🇭 ท้องถิ่น (Local) ---
                  'rice_field': "lush green rice paddy field in Thailand, bright blue sky, jasmine rice farm, rural countryside aesthetic",
                  'thai_house': "traditional Thai wooden house style, vintage countryside home, warm nostalgic vibe, rural village setting",
                  'isan_house': "authentic Northeastern Thai rural house (Isan style), simple wooden house raised on stilts, galvanized iron roof, rustic countryside atmosphere",
                  'orchard': "lush green Thai fruit orchard (Durian or Mango garden), sunlight filtering through leaves, fresh agricultural atmosphere, nature background",
				  'wooden_boat': "sitting on a traditional Thai wooden boat floating on a canal (Khlong), rustic wooden texture, authentic floating market vibe, water background",
                  
				  // 🥬 ตลาดสด (เช้า/ของสด)
                  'market': "bustling Thai local fresh market (Talat Sod), colorful fruit and vegetable stalls, authentic daily life vibe, daylight",
                  
                  // 🎪 ตลาดนัด (เย็น/ไฟสวย) -> ตามที่คุณขอเปลี่ยนจากวัด
                  'night_market': "vibrant Thai night market walking street (Talat Nad), colorful street food stalls, warm hanging string lights, lively shopping atmosphere, blurred crowd background",
             // 🛵 ฉากเด็ด! วินมอไซค์ (ตามที่คุณขอ)
                  'win_moto': "POV sitting on the back of a Thai motorcycle taxi (Win Motosai), the driver in front is wearing a bright orange vest with number, chaotic Bangkok street traffic background, motion blur, wind blowing, comedic and realistic rush hour vibe",
                  
                  // 🛺 ตุ๊กตุ๊ก (ยอดฮิตต่างชาติ)
                  'tuk_tuk': "sitting inside a colorful Thai Tuk Tuk driving at night, neon lights from the vehicle, blurred chinatown street background, fun travel vibe",
                  
                  // 🏪 หน้าเซเว่น/ร้านสะดวกซื้อ (ฟีลหิวดึกๆ)
                  'convenience_store': "standing in front of a modern bright convenience store at night in Thailand, automatic glass doors, glowing city lights, urban lifestyle",
                  
                  // ☕ คาเฟ่สังกะสี/วินเทจ (กำลังฮิต)
                  'old_coffee': "traditional old Thai coffee shop (Kopi), vintage wooden tables, zinc walls, condensed milk cans, nostalgic classic mood"


			 };
			  
			  

              let selectedBgVal = bananaBgSelect ? bananaBgSelect.value : 'auto';
              if (selectedBgVal === 'auto' || selectedBgVal === 'default') {
                   // สุ่มฉาก (กรอง Blacklist ออก)
                   const allKeys = Object.keys(bgTemplates);
                   const validKeys = allKeys.filter(key => !EXCLUDED_BG_PREFIXES.some(prefix => key.startsWith(prefix)));
                   const randomKey = validKeys[Math.floor(Math.random() * validKeys.length)];
                   finalBgText = bgTemplates[randomKey];
                   bananaAddLog(`🎲 สุ่มฉาก: ${randomKey}`, 'info');
              } else {
                   finalBgText = bgTemplates[selectedBgVal] || "modern room";
              }

            // C. เลือกสไตล์ (Style) - ฉบับครบ 17 แบบ + แก้หัวโตคนจริง
          const styleTemplates = {
              // --- Group 1: General (ทั่วไป) ---
              '1': `High-end commercial photography. [product] hovering weightlessly in mid-air. ${characterDesc} is interacting with it naturally. Thai promotional text overlay.${imgSafety} Cinematic lighting, photorealistic, 8k resolution.`,
              
              '2': `Candid lifestyle photography. ${characterDesc} is actively engaged in the authentic use of [product]. Lifestyle environment. Bold Thai language promotional text.${imgSafety} Natural lighting, photorealistic.`,
              
              '3': `Promotional shot. ${characterDesc} holding [product] clearly. Dressed in an outfit that matches the scene. With Thai text – a highly promotional style.${imgSafety} Studio lighting.`,        
              
              // 🟢 4. หัวโต (Bobblehead) - เน้นผิวคนจริง ตัดการ์ตูนออก
              '4': `Funny photorealistic photography. A funny "Big Head" photo edit (Bobblehead style) of ${characterDesc} holding [product]. 
              The head is enlarged to be funny, but the face must have **100% real human skin texture**, visible pores, and realistic eyes. 
              (Body is smaller). Excited expression. 
              Thai text advertising style.${imgSafety} 
              High quality, 8k resolution, raw photo style.
              Negative Prompt: "cartoon, drawing, painting, illustration, cgi, 3d render, anime, sketch, fake, plastic skin${imgNegative}."`,
              
              '5': `Review style. ${characterDesc} presenting [product] to camera like a YouTuber. Blurred scenic background. Bold Thai promotional text overlay.${imgSafety} Soft studio lighting.`,
              
              '6': `Live commerce broadcast style. ${characterDesc} acting as a charismatic host holding [product]. Home studio background. Thai promotional text.${imgSafety} Energetic atmosphere.`,        
              
              '7': `Surreal CGI advertising photography. A giant huge [product] is placed in the middle of a bustling city street. Cinematic lighting, 3D render style.${imgSafety}`,

              // --- Group 2: UGC (รีวิวจากทางบ้าน) ---
              '8': `Professional lifestyle photography. ${characterDesc} interacting with [product]. Stylish outfit. Clean aesthetic setting. Soft lighting. No text overlays.${imgSafety} Clean look.`,
              
              '9': `A candid, user-generated content (UGC) style photo taken with a smartphone. ${characterDesc} is holding [product] close to the camera lens, smiling enthusiastically. (Outfit: ${currentOutfit}). Natural home lighting, authentic vibe.${imgSafety}`,

              '10': `Extreme close-up macro shot of [product]. Focusing on the texture, material, or droplets. Highlighting the quality. Background is blurred. Aesthetic, sensory, high definition texture.${imgSafety}`,

              '11': `First-person point of view (POV) shot. Looking down at a pair of hands holding or unboxing [product] on a messy but aesthetic desk. (Hands belong to ${characterDesc}). Natural indoor lighting, candid style.${imgSafety}`,

              '12': `A trendy mirror selfie taken with a smartphone. ${characterDesc} is standing in front of a mirror, holding [product] visible in the reflection. (Outfit: ${currentOutfit}). Flash photography aesthetic, cool and casual vibe.${imgSafety}`,

              // --- Group 3: Special (สินค้าเฉพาะทาง) ---
              '13': `Fashion Lookbook photography. ${characterDesc} is wearing [product] (as clothing/accessory) as the main outfit. Full body shot showing the fit. Model is posing confidently.${imgSafety}`,

              '14': `Beauty influencer photography. Close-up shot of ${characterDesc} applying [product] to the skin. Showing texture and glow. Soft ring light. (Action: Swatching or applying).${imgSafety}`,
              
              '15': `Low angle street fashion photography. Close-up shot of feet wearing [product] (shoes). (Feet belong to ${characterDesc}). Walking on street. Focus sharply on the shoes. Background blurred.${imgSafety}`,

              '16': `Interior design lifestyle photography. Wide shot showing [product] (furniture/home item) placed naturally in a room. ${characterDesc} is standing next to it. (Action: Interacting, NOT lifting).${imgSafety}`,

              '17': `Professional action lifestyle photography. ${characterDesc} is holding or operating [product] (tool/equipment). Active posture, demonstrating usage. Workshop or garden setting.${imgSafety}`
          };

              // สุ่มสไตล์ (General Only สำหรับโหมด Auto)
              let bananaStyleSelect = document.getElementById('banana-style-select');
              selectedStyleId = bananaStyleSelect ? bananaStyleSelect.value : 'auto';
              
              if (selectedStyleId === 'auto') {
                   const safeKeys = ['1', '2', '3', '4', '5']; // สุ่มเฉพาะ General
                   selectedStyleId = safeKeys[Math.floor(Math.random() * safeKeys.length)];
                   bananaAddLog(`🎲 สุ่มสไตล์: ${selectedStyleId}`, 'info');
              } else {
                   bananaAddLog(`🖌️ เลือกสไตล์: ${selectedStyleId}`, 'info');
              }
              
              generatedPrompt = styleTemplates[selectedStyleId] || styleTemplates['1'];
              
              // เติมฉากหลัง
              if (finalBgText) {
                  generatedPrompt += ` . The scene is set in a ${finalBgText}. Background matching the description.`;
              }
              // เติมชุด (ถ้ามี)
              if (currentOutfit) {
                   generatedPrompt += ` (Outfit details: ${currentOutfit}).`;
              }
          }
          } // End of else block (normal mode with character)

          // แทนที่ชื่อสินค้า
          generatedPrompt = generatedPrompt.replace(/\[product\]/g, productName || 'product');
          

          // Price & Details Logic (For Normal Mode)
          const showPriceTag = document.getElementById('banana-price-tag-toggle')?.checked || false;
          const noText = document.getElementById('banana-no-text')?.checked || false;
          
          if (showPriceTag && !noText) {
              const priceText = document.getElementById('banana-product-price')?.value?.trim() || '';
              const detailText = document.getElementById('banana-product-detail')?.value?.trim() || '';
              const priceStyleValue = document.getElementById('banana-price-style')?.value || 'auto';
              const priceStyleData = window.getPriceTagStyle ? window.getPriceTagStyle(priceStyleValue) : { prompt: '' };

              if (priceText || detailText) {
                generatedPrompt += `\n\n📌 PRICE & DETAILS OVERLAY:
- Display Price: "${priceText}"
- Display Details: "${detailText}"
- Tag Style: ${priceStyleData.prompt}
- Ensure the text is clearly visible, stylish, and suitable for commercial advertisement.`;
                  bananaAddLog(`🏷️ ใส่ป้ายราคา: ${priceText} / ${detailText}`, 'info');
              }
          }

          bananaPromptResult.textContent = generatedPrompt;
          await bananaSleep(500);
		  
		  
		// ============================================
          // 🟢 STEP 1.5: สลับโหมด (เพิ่มคำศัพท์ English: Create Image)
          // ============================================
          bananaUpdateStatus(`${roundLabel} Step 1.5/5: เช็คโหมดสร้างรูป...`);
          
          const selectModeResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async () => {
              function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
              function heavyClick(element) {
                  if (!element) return;
                  const pOpts = { bubbles: true, cancelable: true, view: window, pointerId: 1, width: 1, height: 1, pressure: 0.5 };
                  element.dispatchEvent(new PointerEvent('pointerdown', pOpts));
                  element.dispatchEvent(new PointerEvent('pointerup', pOpts));
                  element.click();
              }

              // 1. คำค้นหา (เพิ่ม 'create image' ให้รองรับภาษาอังกฤษ)
              const keywords = {
                  menuTrigger: ['image', 'video', 'สร้าง', 'เปลี่ยน', 'switch', 'create', 'frames'],
                  targetMode: ['image generation', 'สร้างรูป', 'generate image', 'รูปภาพ', 'create image'], // 🟢 เพิ่ม 'create image' ตรงนี้
                  excludeMode: ['scene', 'ฉาก', 'background', 'video', 'frames', 'ingredients'] // ⛔ ห้ามกดพวกนี้
              };

              // 2. เช็คปุ่มเมนูหลัก
              let dropdownBtn = document.querySelector('button[role="combobox"]');
              if (!dropdownBtn) {
                   const allButtons = document.querySelectorAll('button');
                   for (const btn of allButtons) {
                       const txt = (btn.textContent||'').trim().toLowerCase();
                       if (keywords.menuTrigger.some(k => txt.includes(k))) {
                           dropdownBtn = btn;
                           break;
                       }
                   }
              }

              if (dropdownBtn) {
                  const currentText = (dropdownBtn.textContent || "").trim().toLowerCase();
                  
                  // เช็คว่าตอนนี้ถูกโหมดหรือยัง? (ต้องมีคำว่า Image และต้องไม่มีคำว่า Video/Frames)
                  if (keywords.targetMode.some(k => currentText.includes(k)) && 
                      !keywords.excludeMode.some(ex => currentText.includes(ex))) {
                      return { success: true, message: `✅ อยู่ในโหมดถูกต้องแล้ว: "${currentText}"` };
                  }

                  // 3. กดเปิดเมนู
                  heavyClick(dropdownBtn);
                  await sleep(1500); 
                  
                  // 4. หาตัวเลือกในเมนู (Create Image)
                  let targetOption = null;
                  let foundText = "";
                  
                  const allOptions = document.querySelectorAll('[role="menuitem"], [role="option"], li, button');
                  
                  for (const opt of allOptions) {
                      const optTxt = (opt.textContent || '').trim().toLowerCase();
                      
                      // เงื่อนไข: ต้องมีคำว่า Create Image และ **ต้องไม่มี** คำว่า Video/Frames/Ingredients
                      if (keywords.targetMode.some(k => optTxt.includes(k)) && 
                          !keywords.excludeMode.some(ex => optTxt.includes(ex))) {
                          targetOption = opt;
                          foundText = optTxt;
                          break;
                      }
                  }
                  
                  if (targetOption) {
                    heavyClick(targetOption);
                    await sleep(1000);
                    document.body.click(); // ปิดเมนู
                    return { success: true, message: `🖱️ กดปุ่มเมนูชื่อ: "${foundText}"` };
                  } else {
                      return { success: false, message: '❌ หาเมนู Create Image ไม่เจอ' };
                  }
              }
              return { success: false, message: 'หาปุ่มเปลี่ยนโหมดไม่เจอ' };
            }
          });
          
          if (selectModeResult[0]?.result?.message) {
             const msg = selectModeResult[0].result.message;
             if (msg.includes('❌')) {
                 showToast(msg, 'error');
                 throw new Error(msg);
             }
             bananaAddLog(`${roundLabel} ${msg}`, 'info');
          }
          await bananaSleep(2000);

          // ============================================
          // 🟢 STEP 2: Fill Prompt
          // ============================================
          bananaUpdateStatus(`🤖 ${roundLabel} [2/5] กรอก Prompt...`);
          // Helper Function สำหรับ Parse YAML (ถ้ามี)
          let finalText = generatedPrompt;
          if (typeof parseYAMLToPlainText === 'function') {
              finalText = parseYAMLToPlainText(generatedPrompt, false);
          }

          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (text) => {
                const el = document.getElementById('PINHOLE_TEXT_AREA_ELEMENT_ID');
                if(el) { 
                    el.value = text; 
                    el.dispatchEvent(new Event('input', {bubbles:true})); 
                } else {
                    const ta = document.querySelector('textarea');
                    if(ta) { ta.value = text; ta.dispatchEvent(new Event('input', {bubbles:true})); }
                }
            },
            args: [finalText]
          });
          await bananaSleep(2000);
		  
		  
         // ============================================
          // 🟢 STEP 3: Upload & Crop (เพิ่ม: ระบบรอรูปโหลดเสร็จ 100%)
          // ============================================
          bananaUpdateStatus(`🤖 ${roundLabel} [3/5] กำลังอัพโหลดภาพ...`);

          const singleImageData = [{
            name: currentImage.name, type: currentImage.type, dataUrl: currentImage.dataUrl
          }];
          const aspectRatio = getVeo3AspectRatio(); 
          
          const uploadResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (images, delays, aspectRatio) => {
              function getRandomDelay(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
              function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

              return new Promise(async (resolve) => {
                
                // 1. กดปุ่ม Upload
                const uploadBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div:nth-child(1) > div > div:nth-child(1) > button';
                let uploadBtn = document.querySelector(uploadBtnSelector);

                if (!uploadBtn) { 
                    resolve({ success: false, message: '❌ หาปุ่ม Upload ไม่เจอ' }); 
                    return; 
                }

                uploadBtn.click();
                
                // 2. รอและใส่ไฟล์
                const fileInputDelay = getRandomDelay(delays.actionMin, delays.actionMax);
                setTimeout(() => {
                    const fileInputs = document.querySelectorAll('input[type="file"]');
                    let targetInput = null;
                    if (fileInputs.length > 0) targetInput = fileInputs[fileInputs.length - 1];

                    if (targetInput) {
                        const dataTransfer = new DataTransfer();
                        images.forEach((img) => {
                          const byteString = atob(img.dataUrl.split(',')[1]);
                          const ab = new ArrayBuffer(byteString.length);
                          const ia = new Uint8Array(ab);
                          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                          const blob = new Blob([ab], { type: img.type });
                          const file = new File([blob], img.name, { type: img.type });
                          dataTransfer.items.add(file);
                        });
                        
                        targetInput.files = dataTransfer.files;
                        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                        
                     // 3. รอและจัดการ Popup (ฉบับแก้: หาจากข้อความล้วนๆ ไม่สน Tag)
                        const orientationClickDelay = getRandomDelay(3000, 5000);
                        setTimeout(async () => {
                            const isPortrait = aspectRatio === '9:16';
                            // คำที่ต้องการกด (Target)
                            const targetText = isPortrait ? ['Portrait', 'แนวตั้ง'] : ['Landscape', 'แนวนอน'];
                            // คำสำหรับหาปุ่มเปิดเมนู (Trigger)
                            const allRatioKeywords = ['Portrait', 'Landscape', 'แนวตั้ง', 'แนวนอน', 'Ratio', 'Crop'];
                            
                            function heavyClick(element) {
                                const opts = { bubbles: true, cancelable: true, view: window };
                                element.dispatchEvent(new PointerEvent('pointerdown', opts));
                                element.dispatchEvent(new MouseEvent('mousedown', opts));
                                element.dispatchEvent(new PointerEvent('pointerup', opts));
                                element.dispatchEvent(new MouseEvent('mouseup', opts));
                                element.click();
                            }

                            // 3.1 หาและกดปุ่มเมนู (Trigger)
                            let orientationBtn = null;
                            const allButtons = document.querySelectorAll('button');
                            for (const btn of allButtons) {
                                const text = (btn.textContent || '').trim();
                                const icon = btn.querySelector('i');
                                const iconText = icon ? (icon.textContent || icon.className || '') : '';

                                // ปุ่มต้องมีคำว่า Crop หรือ แนวตั้ง/แนวนอน
                                const hasKeyword = allRatioKeywords.some(kw => text.includes(kw));
                                const hasCropIcon = iconText.includes('crop') || text.includes('crop');

                                // และต้องไม่ใช่ตัวเลือกในเมนู (role ไม่ใช่ menuitem)
                                if ((hasKeyword || hasCropIcon) && btn.getAttribute('role') !== 'menuitem') {
                                    orientationBtn = btn; break;
                                }
                            }

                            if (orientationBtn) {
                                console.log("🔘 เจอเมนู กดเปิด...");
                                heavyClick(orientationBtn); // เปิดเมนู
                                await sleep(1000); 
                                
                                // 3.2 วนลูปหา "ตัวเลือก" จากข้อความ (Text Search Strategy)
                                let targetOption = null;
                                
                                // ลองหา 15 รอบ (3 วินาที)
                                for(let attempt=0; attempt<15; attempt++) { 
                                    // กวาดหาทุก Element ที่มีตัวหนังสือ (div, span, p, li)
                                    const candidates = document.querySelectorAll('div, span, p, li, button');
                                    
                                    for(const el of candidates) {
                                        // 1. ข้อความตรงกับที่เราอยากได้ไหม? (เช่น "แนวตั้ง")
                                        const t = (el.textContent || '').trim();
                                        if(!targetText.some(kw => t === kw || (t.includes(kw) && t.length < 20))) continue;

                                        // 2. 🛑 สำคัญมาก: ต้องไม่ใช่ปุ่ม Trigger ตัวเดิม!
                                        if (el === orientationBtn || orientationBtn.contains(el)) continue;

                                        // 3. ต้องมองเห็น (ไม่ถูกซ่อน)
                                        if (el.offsetParent === null) continue;

                                        // เจอแล้ว!
                                        targetOption = el;
                                        break;
                                    }
                                    
                                    if(targetOption) break;
                                    await sleep(200);
                                }

                                if (targetOption) {
                                    console.log("✅ เจอตัวเลือก! กดที่:", targetOption);
                                    // เน้นกดที่ Parent ของ Text นั้นด้วย เผื่อ Text กดไม่ได้
                                    heavyClick(targetOption); 
                                    if(targetOption.parentElement) heavyClick(targetOption.parentElement);
                                } else {
                                    console.log("⚠️ หาตัวเลือกไม่เจอ (อาจจะเลือกอยู่แล้ว)");
                                    document.body.click(); // ปิดเมนู
                                }
                                await sleep(1500);
                            }

                            // 3.3 กดปุ่ม Save/ยืนยัน (ส่วนนี้เหมือนเดิม)
                            let confirmBtn = null;
                            const confirmSelectors = ['button.sc-19de2353-7.jcyPCc', 'button.sc-5983bb27-7.csgOts'];
                            for(const sel of confirmSelectors) {
                                const btn = document.querySelector(sel);
                                if(btn) { confirmBtn = btn; break; }
                            }
                            if(!confirmBtn) {
                                const allBtns = document.querySelectorAll('button');
                                for(const btn of allBtns) {
                                    const t = (btn.textContent || '').trim();
                                    if(t.includes('Save') || t.includes('Crop') || t.includes('บันทึก') || t.includes('ยืนยัน') || t.includes('เสร็จ') || t.includes('ต่อไป')) {
                                        confirmBtn = btn; break;
                                    }
                                }
                            }

                            if (confirmBtn) {
                                heavyClick(confirmBtn);
                                // รอโหลดเสร็จ
                                for(let w=0; w < 60; w++) {
                                    await sleep(500);
                                    const textArea = document.querySelector('textarea') || document.querySelector('#PINHOLE_TEXT_AREA_ELEMENT_ID');
                                    if (textArea) {
                                        let p = textArea.parentElement;
                                        for(let level=0; level<4; level++) {
                                            if(!p) break;
                                            const thumbs = p.querySelectorAll('img');
                                            const loaded = Array.from(thumbs).some(i => i.width > 20 && i.width < 150);
                                            if(loaded) return resolve({ success: true, message: '✅ อัพโหลดเสร็จสิ้น' });
                                            p = p.parentElement;
                                        }
                                    }
                                }
                                resolve({ success: true, message: '✅ (Timeout) อัพโหลดเสร็จ' });
                            } else {
                                resolve({ success: false, message: '⚠️ หาปุ่ม Save ไม่เจอ' });
                            }
                        }, orientationClickDelay);
                    } else {
                        resolve({ success: false, message: 'หาช่อง Input File ไม่เจอ' });
                    }
                }, fileInputDelay);
              });
            },
            args: [singleImageData, CONFIG.delays, aspectRatio]
          });

          if (!uploadResult[0]?.result?.success) {
              bananaAddLog(`⚠️ ${uploadResult[0]?.result?.message}`, 'warning');
          } else {
              bananaAddLog(`${uploadResult[0]?.result?.message}`, 'success');
          }
		  
		  
		  
		  
// ============================================
          // STEP 3.5: อัพโหลดรูปนางแบบ (ฉบับแก้ไข: เช็คว่ารูปขึ้นจริงถึงไปต่อ)
          // ============================================
          if (modelUploadedImages.length > 0) {
            
            bananaUpdateStatus(`🤖 ${roundLabel} [3.5/5] กำลังอัพโหลดนางแบบ...`);

            const modelData = [{
                name: modelUploadedImages[0].name,
                type: modelUploadedImages[0].type,
                dataUrl: modelUploadedImages[0].dataUrl
            }];

            const uploadModelResult = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (images, delays) => {
                    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

                    return new Promise(async (resolve) => {
                        // 1. รอให้ปุ่มอัพโหลดที่ 2 ปรากฏ
                        // Selector ปุ่มนางแบบ
                        const btnSelector = "#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div.sc-76e54377-0.bLqbvC > div > div:nth-child(2) > button";
                        
                        let targetBtn = null;
                        for(let i=0; i<15; i++) {
                            targetBtn = document.querySelector(btnSelector);
                            if (!targetBtn) {
                                // Fallback หาปุ่ม Reference/Character
                                const allBtns = document.querySelectorAll('button');
                                for(const btn of allBtns) {
                                    const html = (btn.innerHTML || '').toLowerCase();
                                    if(html.includes('reference') || html.includes('character')) {
                                        targetBtn = btn;
                                        break;
                                    }
                                }
                            }
                            if(targetBtn) break; 
                            await sleep(1000); 
                        }

                        if (!targetBtn) {
                            resolve({ success: false, message: 'ไม่พบปุ่มอัพโหลดนางแบบ' });
                            return;
                        }

                        // 2. กดปุ่มเปิด File Input
                        targetBtn.click();
                        await sleep(1000); 

                        // 3. ยัดไฟล์ใส่ Input
                        const fileInputs = document.querySelectorAll('input[type="file"]');
                        let targetInput = null;
                        if(fileInputs.length > 0) targetInput = fileInputs[fileInputs.length - 1];

                        if (!targetInput) {
                            resolve({ success: false, message: 'ไม่พบช่องใส่ไฟล์' });
                            return;
                        }

                        const dataTransfer = new DataTransfer();
                        images.forEach((img) => {
                            const byteString = atob(img.dataUrl.split(',')[1]);
                            const mimeType = img.type;
                            const ab = new ArrayBuffer(byteString.length);
                            const ia = new Uint8Array(ab);
                            for (let i = 0; i < byteString.length; i++) {
                                ia[i] = byteString.charCodeAt(i);
                            }
                            const blob = new Blob([ab], { type: mimeType });
                            const file = new File([blob], img.name, { type: mimeType });
                            dataTransfer.items.add(file);
                        });

                        targetInput.files = dataTransfer.files;
                        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                        targetInput.dispatchEvent(new Event('input', { bubbles: true }));

                        // 4. กดยืนยัน (Crop and Save)
                        let confirmBtn = null;
                        const confirmSelectors = [
                            'button.sc-19de2353-7.jcyPCc', 
                            'button.sc-5983bb27-7.csgOts',
                            '#radix-\\:r1k\\: > div.sc-19de2353-4.boKhUT > div > button.sc-c177465c-1.gdArnN.sc-19de2353-7.jcyPCc'
                        ];

                        // วนลูปรอให้ปุ่ม Confirm โผล่ (สูงสุด 20 วิ)
                        for(let k=0; k<40; k++) {
                             for (const sel of confirmSelectors) {
                                try {
                                    const btn = document.querySelector(sel);
                                    if(btn && btn.offsetParent !== null) { confirmBtn = btn; break; }
                                } catch(e){}
                             }
                             if(!confirmBtn) {
                                 const allBtns = document.querySelectorAll('button');
                                 for(const btn of allBtns) {
                                     const txt = (btn.textContent || '').trim();
                                     if(btn.offsetParent !== null && (txt.includes('Crop and Save') || txt.includes('ยืนยัน') || txt.includes('Save'))) {
                                         confirmBtn = btn; break;
                                     }
                                 }
                             }
                             if(confirmBtn) break;
                             await sleep(500); 
                        }

                        if (confirmBtn) {
                            confirmBtn.click();
                            
                            // ====================================================
                            // 🟢 จุดแก้สำคัญ: เช็คหน้าจอ รอจนกว่ารูปจะโหลดเสร็จ (หายหมุน)
                            // ====================================================
                            // เราจะวนลูปเช็คว่า ในแถบ Input ด้านล่าง มีรูป (img) โผล่ขึ้นมาครบ 2 รูปหรือยัง
                            let imageLoaded = false;
                            
                            for(let w=0; w < 60; w++) { // รอสูงสุด 30 วินาที (60 * 500ms)
                                // 1. หาพื้นที่ Input Bar (โดยอ้างอิงจาก Textarea)
                                const textArea = document.querySelector('textarea') || document.querySelector('#PINHOLE_TEXT_AREA_ELEMENT_ID');
                                
                                if (textArea) {
                                    // 2. ไต่ขึ้นไปหา Container ที่เก็บรูป thumbnail
                                    let parent = textArea.parentElement;
                                    // ลองไต่ขึ้นไปสัก 3-4 ชั้นเพื่อหา wrapper ที่คลุมทั้ง input และรูปภาพ
                                    for(let p=0; p<4; p++) {
                                        if(!parent) break;
                                        
                                        // 3. นับจำนวนรูปภาพเล็กๆ (Thumbnail) ในแถบนั้น
                                        const imgs = parent.querySelectorAll('img');
                                        let thumbCount = 0;
                                        for(const img of imgs) {
                                            // เช็คว่าเป็นรูป thumbnail (ขนาดเล็ก) ไม่ใช่รูปใหญ่
                                            // รูปสินค้า + รูปนางแบบ ควรจะมีขนาดประมาณ 40-100px
                                            if(img.width > 20 && img.width < 150) {
                                                thumbCount++;
                                            }
                                        }
                                        
                                        // ถ้าเจอรูป thumbnail ตั้งแต่ 2 รูปขึ้นไป (สินค้า 1 + นางแบบ 1) แสดงว่าโหลดเสร็จแล้ว!
                                        if (thumbCount >= 2) {
                                            imageLoaded = true;
                                            break;
                                        }
                                        parent = parent.parentElement;
                                    }
                                }
                                
                                if (imageLoaded) break; // เสร็จแล้ว ออกจากลูป
                                await sleep(500); // ยังไม่เสร็จ รออีก 0.5 วิ
                            }
                            
                            // รอแถมอีกนิดเพื่อความชัวร์
                            await sleep(2000);
                            
                            resolve({ success: true, message: 'อัพโหลดและยืนยันนางแบบสำเร็จ' });
                        } else {
                            // หาปุ่มยืนยันไม่เจอ (อาจจะอัพเสร็จไปเองแล้ว)
                            await sleep(3000);
                            resolve({ success: true, message: 'ไม่พบปุ่มยืนยัน (ข้าม)' });
                        }
                    });
                },
                args: [modelData, CONFIG.delays]
            });

            if (!uploadModelResult[0]?.result?.success) {
                bananaAddLog(`⚠️ ${roundLabel} [3.5/5] ${uploadModelResult[0]?.result?.message}`, 'warning');
            } else {
                bananaUpdateStatus(`🤖 ${roundLabel} [3.5/5] อัพโหลดนางแบบเรียบร้อย`);
                await bananaSleep(1000);
            }

          } else {
              // กรณีไม่เลือกรูป
          }
		  

         


	
// ============================================
          // 🟢 STEP 4: กดปุ่มสร้าง (Image Mode)
          // ============================================
          bananaUpdateStatus(`🤖 ${roundLabel} [4/5] ตรวจสอบรูปเดิม & กดสร้าง...`);

          // 1. จำ URL รูปเดิมไว้ (เพื่อเช็คว่ารูปใหม่มาหรือยัง)
          const preCreateResult = await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: () => {
                  return Array.from(document.querySelectorAll('img'))
                      .filter(img => img.width > 200 && img.height > 200) // รูปผลลัพธ์มักจะใหญ่กว่า 200px
                      .map(img => img.src);
              }
          });
          const oldImageUrls = new Set(preCreateResult[0]?.result || []);
          bananaAddLog(`📸 จำรูปเดิมไว้ ${oldImageUrls.size} รูป`, 'info');

          // 2. กดปุ่มสร้าง (Create)
          const createResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (maxRetries, retryDelay) => {
              return new Promise((resolve) => {
                // Selector ปุ่ม Create
                const createBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div.sc-408537d4-1.eiHkev > button';
                
                let attempts = 0;
                function tryClick() {
                    attempts++;
                    const btn = document.querySelector(createBtnSelector);
                    // ต้องมีปุ่ม และ ไม่ Disabled
                    if (btn && !btn.disabled) {
                        btn.click();
                        resolve({ success: true });
                    } else if (attempts < maxRetries) {
                        setTimeout(tryClick, retryDelay);
                    } else {
                        resolve({ success: false });
                    }
                }
                tryClick();
              });
            },
            args: [20, 2000] // ลองกด 20 ครั้ง (40 วิ)
          });

          if (!createResult[0]?.result?.success) {
               bananaAddLog(`⚠️ กดปุ่มสร้างไม่สำเร็จ (ปุ่มอาจจะไม่พร้อม)`, 'warning');
          } else {
               bananaAddLog(`🖱️ กดปุ่มสร้างสำเร็จ!`, 'success');
          }

          // พักสักนิดหลังกด
          await bananaSleep(3000);

// ============================================
          // 🟢 STEP 5: รอรูปใหม่ & ดาวน์โหลด (ฉบับ Click Spy: เจาะจง role="menuitem")
          // ============================================
          bananaUpdateStatus(`⏳ ${roundLabel} [5/5] กำลังรอรูปใหม่...`);
          
          let newImagesFound = false;
          
          // 1. วนลูปรอรูปใหม่
          for(let wait = 0; wait < 60; wait++) {
              if (bananaShouldStopAutomation) throw new Error('STOPPED'); 

              const checkResult = await chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  func: (oldUrlsArray) => {
                      const oldSet = new Set(oldUrlsArray);
                      const currentImgs = Array.from(document.querySelectorAll('img'))
                          .filter(img => img.width > 200 && img.height > 200);
                      const hasNew = currentImgs.some(img => !oldSet.has(img.src));
                      return { total: currentImgs.length, hasNew: hasNew };
                  },
                  args: [Array.from(oldImageUrls)]
              });

              const status = checkResult[0]?.result;
              if (status && (status.hasNew || (wait > 20 && status.total > 0))) {
                  newImagesFound = true;
                  bananaAddLog(`✨ พบรูปใหม่แล้ว!`, 'success');
                  break; 
              }
              bananaUpdateStatus(`⏳ รอรูปใหม่... (${wait*2}s)`);
              await bananaSleep(2000); 
          }

          if (!newImagesFound) bananaAddLog(`⚠️ หมดเวลา (ลองโหลดดู)`, 'warning');
          else await bananaSleep(3000); // รอภาพ Render

          // 2. เริ่มดาวน์โหลด (Logic ใหม่ตาม Click Spy)
          bananaUpdateStatus(`🤖 ${roundLabel} [5/5] กำลังดาวน์โหลด (1K)...`);
          
          const dlResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (count) => {
              function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
              
              function heavyClick(element) {
                  if(!element) return;
                  const opts = { bubbles: true, cancelable: true, view: window };
                  element.dispatchEvent(new PointerEvent('pointerdown', opts));
                  element.dispatchEvent(new PointerEvent('mousedown', opts));
                  element.dispatchEvent(new PointerEvent('pointerup', opts));
                  element.dispatchEvent(new PointerEvent('mouseup', opts));
                  element.click();
              }

              return new Promise(async (resolve) => {
                let allImgs = Array.from(document.querySelectorAll('img'))
                    .filter(img => img.width > 200 && img.height > 200);
                
                // เรียงลำดับ Grid
                allImgs.sort((a, b) => {
                    const rA = a.getBoundingClientRect();
                    const rB = b.getBoundingClientRect();
                    if (Math.abs(rA.top - rB.top) < 80) return rA.left - rB.left;
                    return rA.top - rB.top;
                });

                const targets = allImgs.slice(0, count);
                let downloadedCount = 0;

                for (let i = 0; i < targets.length; i++) {
                    const targetImg = targets[i];
                    
                    targetImg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await sleep(500);
                    
                    const mouseEvent = { bubbles: true, cancelable: true, view: window };
                    targetImg.dispatchEvent(new MouseEvent('mouseover', mouseEvent));
                    targetImg.dispatchEvent(new MouseEvent('mouseenter', mouseEvent));
                    
                    // หา Card
                    let card = targetImg.parentElement;
                    let foundCard = false;
                    for(let k=0; k<6; k++) {
                        if(card) {
                            card.dispatchEvent(new MouseEvent('mouseover', mouseEvent));
                            if(card.querySelectorAll('button').length > 1) {
                                foundCard = true;
                                break;
                            }
                            card = card.parentElement;
                        }
                    }
                    
                    await sleep(800); 

                    if(foundCard) {
                        // 2.1 หาปุ่ม Download (ปุ่มเล็ก)
                        const btns = card.querySelectorAll('button');
                        let dlBtn = null;

                        for(const btn of btns) {
                            const r = btn.getBoundingClientRect();
                            if (r.width > 60 || r.width === 0) continue; // กรองปุ่มใหญ่ทิ้ง
                            if (btn.contains(targetImg)) continue; // กรองปุ่มทับรูปทิ้ง

                            const iconText = btn.querySelector('i')?.textContent || '';
                            const txt = (btn.textContent || '').toLowerCase();
                            
                            // เช็ค Icon "download" (แม่นยำที่สุด)
                            if (iconText === 'download' || iconText === 'get_app') {
                                dlBtn = btn;
                                break;
                            }
                            // สำรอง: เช็ค Text
                            if (txt.includes('download')) {
                                dlBtn = btn;
                                break;
                            }
                        }

                        if(dlBtn) {
                            console.log("1. กดปุ่ม Download...");
                            heavyClick(dlBtn);
                            
                            // 2.2 วนลูปรอเมนู (Retry Loop 20 ครั้ง = 4 วินาที)
                            let targetMenu = null;
                            for(let attempt=0; attempt<20; attempt++) {
                                await sleep(200); // รอเมนูเด้ง
                                
                                // 🎯 ค้นหาด้วย role="menuitem" ตามที่ Spy บอก
                                const menuItems = document.querySelectorAll('[role="menuitem"]');
                                
                                for(const item of menuItems) {
                                    // อ่านข้อความในเมนู (เช่น "download Download 1K")
                                    const t = (item.textContent || '').toLowerCase().trim();
                                    
                                    // เช็คว่ามองเห็นไหม
                                    if(item.offsetParent === null) continue;

                                    // ✅ เงื่อนไขใหม่: ขอแค่มีคำว่า "1k" อยู่ข้างใน (ไม่ต้องเป๊ะ)
                                    if(t.includes('1k') || t.includes('original')) {
                                        targetMenu = item;
                                        break; 
                                    }
                                }
                                
                                if(targetMenu) break; // เจอแล้วหยุดหา
                            }
                            
                            if(targetMenu) {
                                console.log("✅ เจอเมนูแล้ว! กด:", targetMenu.textContent);
                                heavyClick(targetMenu);
                                downloadedCount++;
                            } else {
                                console.log("⚠️ หาเมนู 1K ไม่เจอ (อาจจะโหลดไปแล้ว)");
                                // ลองกด Download ธรรมดา (สำรอง)
                                const allMenus = document.querySelectorAll('[role="menuitem"]');
                                for(const m of allMenus) {
                                    if(m.textContent.toLowerCase().includes('download')) {
                                        heavyClick(m);
                                        break;
                                    }
                                }
                            }
                            
                            await sleep(500);
                            document.body.click(); // ปิดเมนู
                            card.dispatchEvent(new MouseEvent('mouseleave', mouseEvent));
                            await sleep(1000);

                        } else {
                            console.log("❌ ไม่เจอปุ่ม Download เล็ก");
                        }
                    }
                }
                resolve({ success: true, count: downloadedCount });
              });
            },
            args: [parseInt(bananaDownloadCount.value) || 4]
          });

          if (dlResult[0]?.result?.count) {
              totalDownloaded += dlResult[0].result.count;
          }

          completedRounds++;
		  
         // ========================================================
          // 🟢🟢🟢 จุดพักระหว่างรอบ (แก้ให้ใช้ Banana Sleep) 🟢🟢🟢
          // ========================================================
          if (completedRounds < totalRounds) {
              bananaUpdateStatus(`${roundLabel} เสร็จสิ้นรอบ! พัก 10 วินาทีก่อนเริ่มรอบถัดไป...`);
              await bananaSleep(10000); // พัก 10 วินาที (แก้เป็น 10 ตามข้อความ)
          }

        } catch (roundError) {
            if (roundError.message === 'STOPPED') throw roundError;
            // 🔴 แก้: ใช้ bananaUpdateStatus
            bananaUpdateStatus(`❌ Error รอบ ${currentRound}: ${roundError.message}`);
            await bananaSleep(2000);
        }
      } // จบ Loop รอบ
    } // จบ Loop รูป

    // 🔴 แก้: ใช้ bananaUpdateStatus และตัวแปร Image
    bananaUpdateStatus(`🎉 เสร็จสิ้น! โหลดได้ ${totalDownloaded} ภาพ`);
    showToast('เสร็จสิ้นภารกิจ!', 'success');

  } catch (error) {
    if (error.message === 'STOPPED') {
      bananaUpdateStatus('หยุดการทำงานแล้ว');
      bananaAddLog('🛑 หยุดโดยผู้ใช้', 'warning');
      showToast('หยุดการทำงานแล้ว', 'warning');
    } else {
      bananaUpdateStatus(`Error: ${error.message}`);
      bananaAddLog(`❌ Error: ${error.message}`, 'error');
    }
  } finally {
    // ========================================================
    // 🟢 คืนค่าปุ่ม (แก้เป็น Banana Button)
    // ========================================================
    
    // เช็คก่อนว่าเป็นการรันแบบ "ต่อเนื่องไป Video" หรือไม่?
    const isChained = bananaToVideoCheckbox && bananaToVideoCheckbox.checked;

    // ถ้าไม่ใช่แบบต่อเนื่อง (หรือ Error) ให้คืนค่าปุ่มทันที
    // แต่ถ้าเป็นแบบต่อเนื่อง ฟังก์ชันแม่ (bananaToVideoAutomation) จะจัดการต่อเอง
    if (!isChained || bananaShouldStopAutomation) {
        bananaIsAutomationRunning = false;
        bananaShouldStopAutomation = false;
        
        if (bananaBtnAutomation) {
            bananaBtnAutomation.disabled = false;
            bananaBtnAutomation.innerHTML = '<span>START GENERATE</span>'; 
        }
        if (bananaBtnStop) bananaBtnStop.style.display = 'none';
        try { await toggleWebPageLock(false); } catch (e) {}
    } else {
        // กรณีไปต่อ Video: ปิดแค่ Flag แต่อย่าเพิ่งปลดปุ่ม (เดี๋ยวไปต่อหน้า Video)
        bananaIsAutomationRunning = false; 
    }
  }
}

// ============================================
// 🔒 SYSTEM LOCKER (ระบบล็อคหน้าจอเว็บ)
// ============================================
async function toggleWebPageLock(shouldLock) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (locked) => {
                const lockId = 'promptplay-lock-overlay';
                const existingLock = document.getElementById(lockId);

                if (locked) {
                    if (!existingLock) {
                        const overlay = document.createElement('div');
                        overlay.id = lockId;
                        // CSS สำหรับม่านบังจอ (Glassmorphism)
                        overlay.style.cssText = `
                            position: fixed;
                            top: 0; left: 0; width: 100vw; height: 100vh;
                            background: rgba(0, 0, 0, 0.5); /* สีดำจางๆ */
                            backdrop-filter: blur(2px);      /* เบลอฉากหลังนิดๆ */
                            z-index: 2147483647;             /* อยู่บนสุดของทุกสิ่ง */
                            cursor: not-allowed;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fff;
                            font-family: sans-serif;
                            opacity: 0;
                            transition: opacity 0.3s ease;
                        `;
                        
                        // กล่องข้อความตรงกลาง
                        overlay.innerHTML = `
                            <div style="background: #18181b; padding: 30px 50px; border-radius: 16px; border: 1px solid #6366f1; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                                <div style="font-size: 40px; margin-bottom: 15px;">🔒</div>
                                <h2 style="margin: 0 0 10px 0; color: #fff; font-size: 20px;">SYSTEM WORKING</h2>
                                <p style="margin: 0; color: #aaa; font-size: 14px;">กรุณาอย่าคลิกใดๆ บนหน้าจอขณะนี้</p>
                            </div>
                        `;

                        // ดักจับการคลิกทุกอย่างไม่ให้ทะลุไปโดนเว็บ
                        const blockEvent = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        };
                        ['click', 'mousedown', 'mouseup', 'keydown', 'wheel'].forEach(evt => {
                            overlay.addEventListener(evt, blockEvent, true);
                        });

                        document.body.appendChild(overlay);
                        
                        // Effect ค่อยๆ ปรากฏ
                        setTimeout(() => overlay.style.opacity = '1', 10);
                    }
                } else {
                    // สั่งปลดล็อค
                    if (existingLock) {
                        existingLock.style.opacity = '0';
                        setTimeout(() => existingLock.remove(), 300);
                    }
                }
            },
            args: [shouldLock]
        });
    } catch (e) {
        console.error("Lock error:", e);
    }
}

// ============================================
// 🔍 URL CHECKER (ระบบเช็คเว็บที่ถูกต้อง)
// ============================================
async function checkCorrectWebsite() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentUrl = tab.url || "";

    // 👇 เช็ค 3 คำ: labs.google + flow + project
    // แปลว่า: ต้องเป็นเว็บ Google Labs Flow และต้อง "กดเข้าโปรเจกต์แล้ว" เท่านั้น
    if (currentUrl.includes("labs.google") && currentUrl.includes("flow") && currentUrl.includes("project")) {
        return true; // ✅ ถูกต้อง! อยู่ในหน้าทำงานแล้ว
    }

    // ❌ ถ้าไม่ผ่านเงื่อนไข (เช่น อยู่หน้า Dashboard รวม หรือเปิดผิดเว็บ)
    showToast('⚠️ ผิดหน้า! กรุณากดเลือกโปรเจกต์ก่อนเริ่มทำงาน', 'error');
    
    // สั่นปุ่มแจ้งเตือน
    const btn = document.querySelector('.btn-primary');
    if(btn) {
        btn.classList.add('shake');
        setTimeout(()=>btn.classList.remove('shake'), 500);
    }
    
    return false; // ⛔ ห้ามรัน
}

// -------------------------------------------------------
// 🟢 [เพิ่มใหม่] ดักจับค่าเมื่อพิมพ์ตัวเลขในช่อง Custom (+)
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. จัดการช่อง Custom ของ Video (Video Custom Input)
    const videoCustomInput = document.getElementById('video-custom-round-input');
    if (videoCustomInput) {
        videoCustomInput.addEventListener('input', function() {
            // เมื่อพิมพ์เลข -> ไม่ต้องเปลี่ยนค่า Dropdown หลัก (ให้มันค้างคำว่า 'custom' ไว้)
            // แต่ให้สั่งคำนวณรอบใหม่ทันที
            if (typeof videoUpdateRoundInfo === 'function') videoUpdateRoundInfo();
        });
    }

    // 2. จัดการช่อง Custom ของ Banana (Banana Custom Input)
    const bananaCustomInput = document.getElementById('banana-custom-round-input');
    if (bananaCustomInput) {
        bananaCustomInput.addEventListener('input', function() {
            // ทำเหมือนกันกับ Video: สั่งคำนวณรอบใหม่ทันทีที่พิมพ์
            if (typeof bananaUpdateRoundInfo === 'function') bananaUpdateRoundInfo();
        });
    }
});

// ============================================
// 🟢 AUTO DEFAULT SETTINGS (ตั้งค่าเริ่มต้น: สุ่มทุกอย่างอัตโนมัติ)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // เพิ่มเวลาหน่วงเป็น 500ms เพื่อให้แน่ใจว่า HTML วาดเสร็จแล้ว
    setTimeout(() => {
        console.log("🔄 Setting Default to AUTO/RANDOM...");

        // 1. สั่งติ๊กถูก Checkbox ที่จำเป็น (รวม Smart Auto)
        const checkboxes = [
            'video-random-style-checkbox',   // Video: Random Style
            'video-random-voice-checkbox',   // Video: Random Voice
            'banana-random-bg-checkbox',     // Banana: Random BG
            'banana-random-style-checkbox'  // Banana: Random Style
           
        ];

        checkboxes.forEach(id => {
            const box = document.getElementById(id);
            if (box) {
                box.checked = true;
                // ⚡ สำคัญ: กระตุ้น Event เพื่อให้ UI รับรู้ว่ามีการกดจริง
                box.dispatchEvent(new Event('change', { bubbles: true }));
                box.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });

        // 2. สั่งกดปุ่ม "Auto/Random" ใน UI
        function forceClick(selector) {
            const el = document.querySelector(selector);
            if(el) {
                el.click(); 
            }
        }

        // กดปุ่ม Auto ให้ครบทุกหมวด
        // Character
        forceClick('.char-tab-btn[data-target="auto"]');
        forceClick('.char-card[data-value="auto"]');
        
        // Style
        forceClick('.config-tab-btn[data-type="style"][data-group="auto"]');
        forceClick('.config-option[data-type="style"][data-value="auto"]');

        // Background
        forceClick('.config-tab-btn[data-type="bg"][data-group="auto"]');
        forceClick('.config-option[data-type="bg"][data-value="auto"]');

        // Outfit
        forceClick('.config-tab-btn[data-type="outfit"][data-group="auto"]');
        forceClick('.config-option[data-type="outfit"][data-value="auto"]');
        
        // Video Style
        forceClick('.config-tab-btn[data-type="vstyle"][data-group="auto"]');
        forceClick('.config-option[data-type="vstyle"][data-value="auto"]');

    }, 500); // รอ 0.5 วินาที
});

// ============================================
// NEW: Sai Moo AI Analysis Logic
// ============================================
async function analyzeSaiMooImage(file) {
  const resultArea = document.getElementById('sacred-analysis-result');
  const contentArea = document.getElementById('sacred-analysis-content');
  const promptInput = document.getElementById('sacred-analysis-prompt');

  // Show loading state
  resultArea.style.display = 'block';
  contentArea.innerHTML = '<span class="loading-pulse">🔮 กำลังเพ่งจิตวิเคราะห์...</span>';
  
  // Simulate AI Analysis (In reality, this would call Gemini Vision API)
  // For now, we simulate detection based on filename or just generic 'Holy Object'
  setTimeout(() => {
    // Mock Result
    const mockResult = `
      <b>Detected:</b> Sacred Object / Deity Figure<br>
      <b>Atmosphere:</b> Mystical, Golden Light, Ancient<br>
      <b>Suggestion:</b> Use 'Ancient Stone' or 'Gold Emboss' text effect.
    `;
    const mockPrompt = "A highly detailed sacred image of a Thai deity, emitting golden aura, ancient temple background, mystical atmosphere, 8k resolution, photorealistic.";
    
    contentArea.innerHTML = mockResult;
    promptInput.value = mockPrompt;
    
    // Auto-select effect if smart mode is on (Logic for future)
    
  }, 2000);
}

// Event Listener for Sai Moo Image Upload
const sacredImageInput = document.getElementById('sacred-image-upload'); // Assuming this ID exists or needs to be added to HTML
if (sacredImageInput) {
    sacredImageInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            analyzeSaiMooImage(e.target.files[0]);
        }
    });
}


// ============================================
// 🕉️ SACRED IMAGE MODULE (ภาพสายมู)
// ============================================

// Helper function - delay (ใช้ได้ทั้ง Sacred Image และ Sacred Video)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// DOM Elements (Sacred Image)
const sacredImgUploadZone = document.getElementById('sacred-img-upload-zone');
const sacredImgFileInput = document.getElementById('sacred-img-file-input');
const sacredImgCount = document.getElementById('sacred-img-count');
const sacredImgClearBtn = document.getElementById('sacred-img-clear');
const sacredImgPreviewContainer = document.getElementById('sacred-img-preview-container');
const sacredImgDetectResult = document.getElementById('sacred-img-detect-result');
const sacredImgDeityName = document.getElementById('sacred-img-deity-name');
const sacredBlessingConfig = document.getElementById('sacred-blessing-config');
const sacredCommercialConfig = document.getElementById('sacred-commercial-config');
const sacredImgBtnAutomation = document.getElementById('sacred-img-btn-automation');
const sacredImgBtnStop = document.getElementById('sacred-img-btn-stop');
const sacredImgStatusText = document.getElementById('sacred-img-status-text');
const sacredImgLogContainer = document.getElementById('sacred-img-log-container');
const sacredImgLogClear = document.getElementById('sacred-img-log-clear');

// State (Sacred Image)
let sacredImgUploadedImages = [];
let sacredImgIsRunning = false;
let sacredImgShouldStop = false;
let sacredImgLogs = [];
let sacredImgCurrentMode = 'blessing'; // 'blessing' or 'commercial'
let sacredImgDetectedDeity = null;

// Setup Upload Zone (Sacred Image)
function sacredImgSetupUploadZone() {
    if (!sacredImgUploadZone) return;
    
    sacredImgUploadZone.addEventListener('click', () => {
        sacredImgFileInput.click();
    });
    
    sacredImgFileInput.addEventListener('change', (e) => {
        sacredImgHandleFiles(e.target.files);
    });
    
    sacredImgUploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        sacredImgUploadZone.classList.add('dragover');
    });
    
    sacredImgUploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        sacredImgUploadZone.classList.remove('dragover');
    });
    
    sacredImgUploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        sacredImgUploadZone.classList.remove('dragover');
        sacredImgHandleFiles(e.dataTransfer.files);
    });
}

// Handle Files (Sacred Image)
async function sacredImgHandleFiles(files) {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.heic'));
    
    for (let file of imageFiles) {
        // HEIC Support
        if (file.name.toLowerCase().endsWith('.heic')) {
            try {
                showToast('กำลังแปลงไฟล์ HEIC...', 'info');
                if (typeof heic2any !== 'undefined') {
                    const blob = await heic2any({ 
                        blob: file, 
                        toType: "image/jpeg", 
                        quality: 0.8 
                    });
                     file = new File([blob], file.name.toLowerCase().replace('.heic', '.jpg'), { type: "image/jpeg" });
                } else {
                    console.error('heic2any library not loaded');
                    showToast('ไม่พบ Library แปลง HEIC', 'error');
                }
            } catch (e) {
                console.error("HEIC conversion failed", e);
                showToast("แปลงไฟล์ HEIC ไม่สำเร็จ กรุณาใช้ JPG/PNG", "error");
                continue; 
            }
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageData = {
                id: Date.now() + Math.random(),
                name: file.name,
                size: file.size,
                type: file.type,
                dataUrl: e.target.result
            };
            sacredImgUploadedImages.push(imageData);
            sacredImgUpdateUI();
            
            // AI Detect Deity
            if (sacredImgUploadedImages.length === 1) {
                await sacredImgDetectDeity(imageData.dataUrl);
            }
        };
        reader.readAsDataURL(file);
    }
    
    sacredImgFileInput.value = '';
}

// Update UI (Sacred Image)
function sacredImgUpdateUI() {
    if (sacredImgCount) sacredImgCount.textContent = sacredImgUploadedImages.length;
    
    if (sacredImgClearBtn) {
        sacredImgClearBtn.style.display = sacredImgUploadedImages.length > 0 ? 'flex' : 'none';
    }
    
    if (sacredImgPreviewContainer) {
        sacredImgPreviewContainer.innerHTML = '';
        sacredImgUploadedImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'preview-item';
            
            const imgEl = document.createElement('img');
            imgEl.src = img.dataUrl;
            imgEl.title = img.name;
            
            const delBtn = document.createElement('button');
            delBtn.className = 'preview-remove-btn';
            delBtn.innerHTML = '✕';
            delBtn.onclick = () => sacredImgRemoveOne(index);
            
            item.appendChild(imgEl);
            item.appendChild(delBtn);
            sacredImgPreviewContainer.appendChild(item);
        });
    }
}

// Remove One Image (Sacred Image)
function sacredImgRemoveOne(index) {
    sacredImgUploadedImages.splice(index, 1);
    sacredImgUpdateUI();
    if (sacredImgUploadedImages.length === 0) {
        sacredImgDetectResult.style.display = 'none';
        sacredImgDetectedDeity = null;
    }
}

// Clear All Images (Sacred Image)
function sacredImgClearAll() {
    sacredImgUploadedImages = [];
    sacredImgUpdateUI();
    sacredImgDetectResult.style.display = 'none';
    sacredImgDetectedDeity = null;
}

// AI Detect Deity (Sacred Image)
async function sacredImgDetectDeity(imageDataUrl) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
        sacredImgAddLog('กรุณาตั้งค่า Gemini API Key ก่อน', 'warning');
        return;
    }
    
    sacredImgAddLog('🔍 กำลังวิเคราะห์ภาพ...', 'info');
    
    try {
        const base64Data = imageDataUrl.split(',')[1];
        const mimeType = imageDataUrl.split(';')[0].split(':')[1];
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: window.DEITY_DETECTION_PROMPT || 'วิเคราะห์ภาพนี้ว่าเป็นองค์เทพหรือวัตถุมงคลใด' },
                        { inline_data: { mime_type: mimeType, data: base64Data } }
                    ]
                }]
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            let resultText = data.candidates[0].content.parts[0].text;
            
            // Try to parse JSON
            try {
                const jsonMatch = resultText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    sacredImgDetectedDeity = JSON.parse(jsonMatch[0]);
                    sacredImgDeityName.textContent = `${sacredImgDetectedDeity.deity_thai || 'ไม่ทราบ'} (${sacredImgDetectedDeity.deity_id || 'unknown'})`;
                    sacredImgDetectResult.style.display = 'block';
                    sacredImgAddLog(`✅ ตรวจพบ: ${sacredImgDetectedDeity.deity_thai}`, 'success');
                }
            } catch (e) {
                sacredImgDeityName.textContent = 'องค์เทพ/วัตถุมงคล';
                sacredImgDetectResult.style.display = 'block';
                sacredImgAddLog('⚠️ ไม่สามารถระบุองค์เทพได้ชัดเจน', 'warning');
            }
        }
    } catch (error) {
        sacredImgAddLog(`❌ Error: ${error.message}`, 'error');
    }
}

// Toggle Mode (Sacred Image)
function sacredImgToggleMode(mode) {
    sacredImgCurrentMode = mode;
    
    // Update buttons
    document.querySelectorAll('.sacred-mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) btn.classList.add('active');
    });
    
    // Toggle configs
    if (sacredBlessingConfig) sacredBlessingConfig.style.display = mode === 'blessing' ? 'block' : 'none';
    if (sacredCommercialConfig) sacredCommercialConfig.style.display = mode === 'commercial' ? 'block' : 'none';
}

// ============================================
// Sacred Image: Generate Prompt Only (ไม่รัน Automation)
// ============================================
async function sacredImgGeneratePromptOnly() {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
        showToast('กรุณาตั้งค่า Gemini API Key ก่อน', 'error');
        return;
    }
    
    if (sacredImgUploadedImages.length === 0) {
        showToast('กรุณาอัพโหลดภาพก่อน', 'error');
        return;
    }
    
    showToast('กำลังสร้าง Prompt...', 'info');
    
    try {
        const imageData = sacredImgUploadedImages[0];
        const isSmartAuto = document.getElementById('sacred-img-smart-auto')?.checked || false;
        const currentMode = sacredImgCurrentMode || 'blessing';
        
        let userMessage = '';
        let systemPrompt = '';
        
        if (currentMode === 'blessing') {
            systemPrompt = window.SACRED_BLESSING_SYSTEM_PROMPT || '';
            const selectedEffect = document.getElementById('sacred-effect-select')?.value || 'divine_power';
            const effectData = window.getSacredEffect ? window.getSacredEffect(selectedEffect) : {};
            
            if (isSmartAuto) {
                userMessage = `สร้าง prompt ภาพองค์เทพจากภาพนี้ ให้ AI คิดเอฟเฟกต์ที่เหมาะกับองค์เทพโดยอัตโนมัติ`;
            } else {
                userMessage = `สร้าง prompt ภาพองค์เทพจากภาพนี้
เอฟเฟกต์: ${effectData.name || selectedEffect} - ${effectData.prompt || ''}`;
            }
        } else {
            systemPrompt = window.SACRED_COMMERCIAL_SYSTEM_PROMPT || '';
            const productName = document.getElementById('sacred-product-name')?.value || '';
            const caption = document.getElementById('sacred-commercial-caption')?.value || '';
            const priceFull = document.getElementById('sacred-price-full')?.value || '';
            const pricePromo = document.getElementById('sacred-price-promo')?.value || '';
            const styleValue = document.getElementById('sacred-price-tag-style')?.value || 'circle_gold';
            const colorValue = document.getElementById('sacred-price-tag-color')?.value || 'gold_classic';
            
            if (isSmartAuto) {
                userMessage = `สร้าง prompt ภาพโฆษณาวัตถุมงคลจากภาพนี้ ให้ AI คิดป้ายราคาและเอฟเฟกต์ที่เหมาะสมโดยอัตโนมัติ`;
            } else {
                const priceText = pricePromo ? `บูชา ${pricePromo} บาท จาก ${priceFull} บาท` : `บูชา ${priceFull || '999'} บาท`;
                userMessage = `สร้าง prompt ภาพโฆษณาวัตถุมงคลจากภาพนี้
ชื่อสินค้า: ${productName || 'วัตถุมงคล'}
ข้อความโฆษณา: ${caption}
ป้ายราคา: ${priceText}
สไตล์ป้าย: ${styleValue}
โทนสี: ${colorValue}`;
            }
        }
        
        const base64Data = imageData.dataUrl.split(',')[1];
        const mimeType = imageData.dataUrl.split(';')[0].split(':')[1];
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: [{
                    parts: [
                        { text: userMessage },
                        { inline_data: { mime_type: mimeType, data: base64Data } }
                    ]
                }]
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            const generatedPrompt = data.candidates[0].content.parts[0].text.trim();
            
            const container = document.getElementById('sacred-img-prompt-result-container');
            const result = document.getElementById('sacred-img-prompt-result');
            if (container) container.style.display = 'block';
            if (result) result.textContent = generatedPrompt;
            
            showToast('สร้าง Prompt สำเร็จ!', 'success');
            sacredImgAddLog('✅ สร้าง Prompt สำเร็จ', 'success');
        } else {
            throw new Error('ไม่สามารถสร้าง Prompt ได้');
        }
    } catch (error) {
        console.error('Generate Prompt Error:', error);
        showToast('เกิดข้อผิดพลาด: ' + error.message, 'error');
        sacredImgAddLog(`❌ Error: ${error.message}`, 'error');
    }
}

// Add Log (Sacred Image)
function sacredImgAddLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('th-TH');
    sacredImgLogs.push({ time: timestamp, message, type });
    if (sacredImgLogs.length > 200) sacredImgLogs = sacredImgLogs.slice(-200);
    sacredImgUpdateLogDisplay();
}

// Update Log Display (Sacred Image)
function sacredImgUpdateLogDisplay() {
    if (!sacredImgLogContainer) return;
    
    if (sacredImgLogs.length === 0) {
        sacredImgLogContainer.innerHTML = '<div class="log-empty">ยังไม่มี log</div>';
        return;
    }
    
    const logHTML = sacredImgLogs.map(log => {
        let typeClass = 'log-entry-info';
        if (log.type === 'error') typeClass = 'log-entry-error';
        else if (log.type === 'success') typeClass = 'log-entry-success';
        else if (log.type === 'warning') typeClass = 'log-entry-warning';
        else if (log.type === 'step') typeClass = 'log-entry-step';
        
        return `<div class="log-entry ${typeClass}">
            <span class="log-entry-time">[${log.time}]</span>
            <span class="log-entry-message">${log.message}</span>
        </div>`;
    }).join('');
    
    sacredImgLogContainer.innerHTML = logHTML;
    sacredImgLogContainer.scrollTop = sacredImgLogContainer.scrollHeight;
}

// Clear Logs (Sacred Image)
function sacredImgClearLogs() {
    sacredImgLogs = [];
    sacredImgUpdateLogDisplay();
}

// Generate Prompt (Sacred Image)
async function sacredImgGeneratePrompt(imageDataUrl) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) return null;
    
    const isSmartAuto = document.getElementById('sacred-img-smart-auto')?.checked;
    
    let systemPrompt, userMessage;
    
    if (sacredImgCurrentMode === 'blessing') {
        systemPrompt = window.SACRED_BLESSING_SYSTEM_PROMPT || '';
        
        const blessingText = document.getElementById('sacred-blessing-text')?.value || '';
        const textPosition = document.getElementById('sacred-text-position')?.value || 'bottom';
        const selectedEffect = document.getElementById('sacred-effect-select')?.value || 'divine_power';
        const effectData = window.getSacredEffect ? window.getSacredEffect(selectedEffect) : {};
        
        if (isSmartAuto) {
            userMessage = `สร้าง prompt ภาพอวยพรจากภาพองค์เทพนี้ ให้ AI คิดข้อความอวยพรและเอฟเฟกต์ให้เหมาะกับองค์เทพโดยอัตโนมัติ`;
        } else {
            userMessage = `สร้าง prompt ภาพอวยพรจากภาพองค์เทพนี้
ข้อความอวยพร: ${blessingText || 'ใครเห็นขอให้โชคดี'}
ตำแหน่งข้อความ: ${textPosition === 'top' ? 'บนสุดของภาพ' : 'ล่างสุดของภาพ'}
แสง/ฉาก: ${effectData.prompt || 'divine glow, golden aura'}`;
        }
    } else {
        // Commercial mode
        systemPrompt = window.SACRED_COMMERCIAL_SYSTEM_PROMPT || '';
        
        const productName = document.getElementById('sacred-product-name')?.value || '';
        const caption = document.getElementById('sacred-commercial-caption')?.value || '';
        const priceFull = document.getElementById('sacred-price-full')?.value || '';
        const pricePromo = document.getElementById('sacred-price-promo')?.value || '';
        const commercialEffect = document.getElementById('sacred-commercial-effect')?.value || 'divine_glow';
        const frameOnly = document.getElementById('sacred-frame-only')?.checked || false;
        
        const priceTagStyle = document.getElementById('sacred-price-tag-style')?.value || 'circle_gold';
        const priceTagColor = document.getElementById('sacred-price-tag-color')?.value || 'gold_shine';
        const captionPosition = document.getElementById('sacred-caption-position')?.value || 'under_price';
        
        const styleData = window.getPriceTagStyle ? window.getPriceTagStyle(priceTagStyle) : {};
        const colorData = window.getPriceTagColor ? window.getPriceTagColor(priceTagColor) : {};
        // Use global CAPTION_POSITIONS if available, else fallback
        const posData = (window.CAPTION_POSITIONS && window.CAPTION_POSITIONS[captionPosition]) 
                        ? window.CAPTION_POSITIONS[captionPosition] 
                        : { name: captionPosition, prompt: 'placed below price tag' };
        
        if (frameOnly) {
             userMessage = `สร้าง prompt ภาพโฆษณาวัตถุมงคลจากภาพนี้
สินค้า: "${productName || 'วัตถุมงคล'}"
คำสั่งสำคัญ: สร้างเฉพาะกรอบป้ายราคาที่สวยงามและว่างเปล่า (Empty Price Tag Frame) ตามสไตล์ที่เลือก
รูปแบบป้าย: ${styleData.prompt || 'circular golden price tag'}
โทนสีป้าย: ${colorData.prompt || 'shiny gold color'}
เอฟเฟกต์: ${commercialEffect}
ตำแหน่งป้าย: จัดวางอย่างสวยงาม
⚠️ ข้อความ: ห้ามใส่ข้อความใดๆ ลงในป้าย (Empty Frame)`;
        } else if (isSmartAuto) {
             userMessage = `สร้าง prompt ภาพโฆษณาวัตถุมงคลจากภาพนี้ 
สินค้า: "${productName || 'AI คิดให้'}"
ให้ AI คิดแคปชั่นและรูปแบบป้ายราคาให้เหมาะสม
คำสั่งสำคัญ: 
1. ถ้ามีชื่อสินค้า ให้ใส่ชื่อสินค้าในป้ายราคา
2. ใส่ราคา "บูชา XXX บาท" ในป้ายราคา
3. ข้อความโฆษณา (Caption) ต้องอยู่นอกป้ายราคา และมีพื้นหลังไล่สี (Gradient)
4. ภาษาไทยต้องถูกต้อง 100%`;
        } else {
             const priceText = pricePromo 
                 ? `บูชา ${pricePromo} บาท จาก ${priceFull} บาท` 
                 : `บูชา ${priceFull || '999'} บาท`;
                 
             userMessage = `สร้าง prompt ภาพโฆษณาวัตถุมงคลจากภาพนี้
สินค้า: "${productName || 'วัตถุมงคล'}"
ข้อความในป้ายราคา: "${productName} ${priceText}"
ข้อความโฆษณา (Caption): "${caption}" (ตำแหน่ง: ${posData.name} - ${posData.prompt})
รูปแบบป้ายราคา: ${styleData.prompt || 'circular golden price tag'}
โทนสีป้าย: ${colorData.prompt || 'shiny gold color'}
เอฟเฟกต์: ${commercialEffect}
⚠️ กฎเหล็ก:
1. ข้อความในป้ายราคาต้องมีแค่ "${productName}" และ "${priceText}"
2. ข้อความโฆษณา "${caption}" ต้องอยู่นอกป้ายราคา (${posData.name})
3. พื้นหลังข้อความโฆษณาต้องเป็น Gradient สวยงาม`;
        }
    }
    
    try {
        const base64Data = imageDataUrl.split(',')[1];
        const mimeType = imageDataUrl.split(';')[0].split(':')[1];
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: [{
                    parts: [
                        { text: userMessage },
                        { inline_data: { mime_type: mimeType, data: base64Data } }
                    ]
                }]
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text.trim();
        }
    } catch (error) {
        sacredImgAddLog(`❌ Error generating prompt: ${error.message}`, 'error');
    }
    
    return null;
}

// Main Automation (Sacred Image) - Copy Logic จาก Banana 100%
async function sacredImgRunAutomation() {
    // Safety check
    const isCorrect = await checkCorrectWebsite();
    if (!isCorrect) return;
    
    if (sacredImgUploadedImages.length === 0) {
        showToast('กรุณาอัพโหลดรูปองค์เทพก่อน', 'error');
        return;
    }
    
    const roundsPerImage = parseInt(document.getElementById('sacred-img-round-count')?.value) || 1;
    const maxDownloads = parseInt(document.getElementById('sacred-img-download-count')?.value) || 4;
    const totalImages = sacredImgUploadedImages.length;
    const totalRounds = totalImages * roundsPerImage;
    
    // Start automation
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    sacredImgIsRunning = true;
    sacredImgShouldStop = false;
    sacredImgBtnAutomation.disabled = true;
    sacredImgBtnAutomation.innerHTML = '<span class="loading"></span> กำลังทำงาน...';
    if (sacredImgBtnStop) sacredImgBtnStop.style.display = 'flex';
    await toggleWebPageLock(true);
    
    sacredImgClearLogs();
    sacredImgAddLog('🕉️ เริ่มสร้างภาพสายมู', 'step');
    
    let completedRounds = 0;
    let totalDownloaded = 0;
    
    try {
        for (let imgIndex = 0; imgIndex < totalImages; imgIndex++) {
            const currentImage = sacredImgUploadedImages[imgIndex];
            
            for (let round = 0; round < roundsPerImage; round++) {
                if (sacredImgShouldStop) throw new Error('STOPPED');
                
                completedRounds++;
                const roundLabel = `[รอบ ${completedRounds}/${totalRounds}]`;
                sacredImgAddLog(`📸 ${roundLabel}`, 'step');
                sacredImgStatusText.textContent = `รอบที่ ${completedRounds}/${totalRounds}`;
                
                // STEP 1: Generate prompt
                sacredImgAddLog(`${roundLabel} กำลังสร้าง Prompt...`, 'info');
                const prompt = await sacredImgGeneratePrompt(currentImage.dataUrl);
                if (!prompt) {
                    sacredImgAddLog('❌ ไม่สามารถสร้าง prompt ได้', 'error');
                    continue;
                }
                sacredImgAddLog(`✨ Prompt: ${prompt.substring(0, 60)}...`, 'info');
                
                // STEP 2: Upload image to page
                sacredImgAddLog(`${roundLabel} กำลังอัพโหลดรูป...`, 'info');
                const uploadSuccess = await sacredImgUploadToPage(currentImage);
                if (!uploadSuccess) {
                    sacredImgAddLog('❌ อัพโหลดล้มเหลว', 'error');
                    continue;
                }
                await delay(2000);
                
                // STEP 3: Fill prompt
                sacredImgAddLog(`${roundLabel} กรอก Prompt...`, 'info');
                await sacredImgFillPrompt(prompt);
                await delay(1500);
                
                // STEP 4: จำรูปเดิมไว้ (เหมือน Banana)
                const oldImagesResult = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => {
                        const imgs = Array.from(document.querySelectorAll('img'))
                            .filter(img => img.width > 200 && img.height > 200);
                        return imgs.map(img => img.src);
                    }
                });
                const oldImageUrls = new Set(oldImagesResult[0]?.result || []);
                sacredImgAddLog(`📸 จำรูปเดิมไว้ ${oldImageUrls.size} รูป`, 'info');
                
                // STEP 5: กดปุ่มสร้าง (Create) - ใช้ Selector เหมือน Banana
                sacredImgAddLog(`${roundLabel} กดปุ่มสร้าง...`, 'info');
                const createResult = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (maxRetries, retryDelay) => {
                        return new Promise((resolve) => {
                            const createBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div.sc-408537d4-1.eiHkev > button';
                            let attempts = 0;
                            function tryClick() {
                                attempts++;
                                const btn = document.querySelector(createBtnSelector);
                                if (btn && !btn.disabled) {
                                    btn.click();
                                    resolve({ success: true });
                                } else if (attempts < maxRetries) {
                                    setTimeout(tryClick, retryDelay);
                                } else {
                                    resolve({ success: false });
                                }
                            }
                            tryClick();
                        });
                    },
                    args: [20, 2000]
                });
                
                if (!createResult[0]?.result?.success) {
                    sacredImgAddLog(`⚠️ กดปุ่มสร้างไม่สำเร็จ`, 'warning');
                } else {
                    sacredImgAddLog(`🖱️ กดปุ่มสร้างสำเร็จ!`, 'success');
                }
                
                await delay(3000);
                
                // STEP 6: รอรูปใหม่ (เหมือน Banana)
                sacredImgAddLog(`${roundLabel} รอรูปใหม่...`, 'info');
                let newImagesFound = false;
                
                for (let wait = 0; wait < 60; wait++) {
                    if (sacredImgShouldStop) throw new Error('STOPPED');
                    
                    const checkResult = await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: (oldUrlsArray) => {
                            const oldSet = new Set(oldUrlsArray);
                            const currentImgs = Array.from(document.querySelectorAll('img'))
                                .filter(img => img.width > 200 && img.height > 200);
                            const hasNew = currentImgs.some(img => !oldSet.has(img.src));
                            return { total: currentImgs.length, hasNew: hasNew };
                        },
                        args: [Array.from(oldImageUrls)]
                    });
                    
                    const status = checkResult[0]?.result;
                    if (status && (status.hasNew || (wait > 20 && status.total > 0))) {
                        newImagesFound = true;
                        sacredImgAddLog(`✨ พบรูปใหม่แล้ว!`, 'success');
                        break;
                    }
                    sacredImgAddLog(`⏳ รอรูปใหม่... (${wait*2}s)`, 'info');
                    await delay(2000);
                }
                
                if (!newImagesFound) sacredImgAddLog(`⚠️ หมดเวลา (ลองโหลดดู)`, 'warning');
                else await delay(3000);
                
                // STEP 7: ดาวน์โหลด (Logic เหมือน Banana - กด 1K)
                sacredImgAddLog(`${roundLabel} กำลังดาวน์โหลด...`, 'info');
                
                const dlResult = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (count) => {
                        function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
                        function heavyClick(element) {
                            if (!element) return;
                            const opts = { bubbles: true, cancelable: true, view: window };
                            element.dispatchEvent(new PointerEvent('pointerdown', opts));
                            element.dispatchEvent(new MouseEvent('mousedown', opts));
                            element.dispatchEvent(new PointerEvent('pointerup', opts));
                            element.dispatchEvent(new MouseEvent('mouseup', opts));
                            element.click();
                        }
                        
                        return new Promise(async (resolve) => {
                            let allImgs = Array.from(document.querySelectorAll('img'))
                                .filter(img => img.width > 200 && img.height > 200);
                            
                            allImgs.sort((a, b) => {
                                const rA = a.getBoundingClientRect();
                                const rB = b.getBoundingClientRect();
                                if (Math.abs(rA.top - rB.top) < 50) return rA.left - rB.left;
                                return rA.top - rB.top;
                            });
                            
                            let downloadedCount = 0;
                            
                            for (let i = 0; i < Math.min(count, allImgs.length); i++) {
                                const img = allImgs[i];
                                const card = img.closest('div[draggable="true"]') || img.parentElement?.parentElement;
                                if (!card) continue;
                                
                                const mouseEvent = { bubbles: true, cancelable: true, view: window };
                                card.dispatchEvent(new MouseEvent('mouseenter', mouseEvent));
                                await sleep(600);
                                
                                // หาปุ่มดาวน์โหลดเล็ก
                                let downloadTrigger = null;
                                const allBtns = card.querySelectorAll('button, [role="button"]');
                                for (const b of allBtns) {
                                    const icon = b.querySelector('svg, i');
                                    const txt = (b.textContent || '').toLowerCase();
                                    if (icon || txt.includes('download')) {
                                        const rect = b.getBoundingClientRect();
                                        if (rect.width > 0 && rect.width < 60) {
                                            downloadTrigger = b;
                                            break;
                                        }
                                    }
                                }
                                
                                if (downloadTrigger) {
                                    heavyClick(downloadTrigger);
                                    await sleep(800);
                                    
                                    // หาเมนู 1K
                                    let targetMenu = null;
                                    for (let w = 0; w < 10; w++) {
                                        const menuItems = document.querySelectorAll('[role="menuitem"], [role="option"]');
                                        for (const item of menuItems) {
                                            const t = (item.textContent || '').toLowerCase().trim();
                                            if (item.offsetParent === null) continue;
                                            if (t.includes('1k') || t.includes('original')) {
                                                targetMenu = item;
                                                break;
                                            }
                                        }
                                        if (targetMenu) break;
                                        await sleep(200);
                                    }
                                    
                                    if (targetMenu) {
                                        heavyClick(targetMenu);
                                        downloadedCount++;
                                    } else {
                                        const allMenus = document.querySelectorAll('[role="menuitem"]');
                                        for (const m of allMenus) {
                                            if (m.textContent.toLowerCase().includes('download')) {
                                                heavyClick(m);
                                                downloadedCount++;
                                                break;
                                            }
                                        }
                                    }
                                    
                                    await sleep(500);
                                    document.body.click();
                                    card.dispatchEvent(new MouseEvent('mouseleave', mouseEvent));
                                    await sleep(1000);
                                }
                            }
                            resolve({ success: true, count: downloadedCount });
                        });
                    },
                    args: [maxDownloads]
                });
                
                if (dlResult[0]?.result?.count) {
                    totalDownloaded += dlResult[0].result.count;
                    sacredImgAddLog(`📥 ดาวน์โหลดได้ ${dlResult[0].result.count} ภาพ`, 'success');
                }
                
                // พักระหว่างรอบ
                if (completedRounds < totalRounds) {
                    sacredImgAddLog(`${roundLabel} เสร็จสิ้น! พัก 10 วินาที...`, 'info');
                    await delay(10000);
                }
            }
        }
        
        sacredImgAddLog(`🎉 เสร็จสิ้น! โหลดได้ ${totalDownloaded} ภาพ`, 'success');
        showToast('สร้างภาพสายมูเสร็จสิ้น!', 'success');
        
    } catch (error) {
        if (error.message === 'STOPPED') {
            sacredImgAddLog('🛑 หยุดโดยผู้ใช้', 'warning');
            showToast('หยุดการทำงานแล้ว', 'warning');
        } else {
            sacredImgAddLog(`❌ Error: ${error.message}`, 'error');
        }
    } finally {
        await toggleWebPageLock(false);
        sacredImgIsRunning = false;
        sacredImgBtnAutomation.disabled = false;
        sacredImgBtnAutomation.innerHTML = '🕉️ START GENERATE';
        if (sacredImgBtnStop) sacredImgBtnStop.style.display = 'none';
        sacredImgStatusText.textContent = 'Ready';
    }
}

// Stop Automation (Sacred Image)
function sacredImgStopAutomation() {
    sacredImgShouldStop = true;
    sacredImgAddLog('⛔ กำลังหยุด...', 'warning');
}

// Page Interaction Functions (Sacred Image) - Copy Logic จาก Banana Module 100%
async function sacredImgUploadToPage(imageData) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Get aspect ratio from settings
    const aspectRatio = localStorage.getItem('veo3_aspect_ratio') || '9:16';
    
    // STEP 1: เลือกโหมด Create Image ก่อน (เหมือน Banana)
    sacredImgAddLog('🔄 เลือกโหมด Create Image...', 'info');
    
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async () => {
            function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
            function heavyClick(element) {
                if (!element) return;
                const pOpts = { bubbles: true, cancelable: true, view: window, pointerId: 1, width: 1, height: 1, pressure: 0.5 };
                element.dispatchEvent(new PointerEvent('pointerdown', pOpts));
                element.dispatchEvent(new PointerEvent('pointerup', pOpts));
                element.click();
            }
            
            const keywords = {
                menuTrigger: ['image', 'video', 'สร้าง', 'เปลี่ยน', 'switch', 'create', 'frames'],
                targetMode: ['image generation', 'สร้างรูป', 'generate image', 'รูปภาพ', 'create image'],
                excludeMode: ['scene', 'ฉาก', 'background', 'video', 'frames', 'ingredients']
            };
            
            let dropdownBtn = document.querySelector('button[role="combobox"]');
            if (!dropdownBtn) {
                const allButtons = document.querySelectorAll('button');
                for (const btn of allButtons) {
                    const txt = (btn.textContent||'').trim().toLowerCase();
                    if (keywords.menuTrigger.some(k => txt.includes(k))) {
                        dropdownBtn = btn;
                        break;
                    }
                }
            }
            
            if (dropdownBtn) {
                const currentText = (dropdownBtn.textContent || "").trim().toLowerCase();
                if (keywords.targetMode.some(k => currentText.includes(k)) && 
                    !keywords.excludeMode.some(ex => currentText.includes(ex))) {
                    return { success: true, message: 'อยู่ในโหมด Create Image แล้ว' };
                }
                
                heavyClick(dropdownBtn);
                await sleep(1500);
                
                const allOptions = document.querySelectorAll('[role="menuitem"], [role="option"], li, button');
                for (const opt of allOptions) {
                    const optTxt = (opt.textContent || '').trim().toLowerCase();
                    if (keywords.targetMode.some(k => optTxt.includes(k)) && 
                        !keywords.excludeMode.some(ex => optTxt.includes(ex))) {
                        heavyClick(opt);
                        break;
                    }
                }
                await sleep(1000);
                document.body.click();
            }
        }
    });
    
    await delay(2000);
    
    // STEP 2: Upload รูป (Copy Logic จาก Banana 100%)
    sacredImgAddLog('📤 กำลังอัพโหลดรูป...', 'info');
    
    const uploadResult = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (imgData, aspectRatio) => {
            function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
            function heavyClick(element) {
                if (!element) return;
                const opts = { bubbles: true, cancelable: true, view: window };
                element.dispatchEvent(new PointerEvent('pointerdown', opts));
                element.dispatchEvent(new MouseEvent('mousedown', opts));
                element.dispatchEvent(new PointerEvent('pointerup', opts));
                element.dispatchEvent(new MouseEvent('mouseup', opts));
                element.click();
            }

            return new Promise(async (resolve) => {
                // 1. กดปุ่ม Upload (ใช้ selector เดียวกับ Banana)
                const uploadBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div:nth-child(1) > div > div:nth-child(1) > button';
                let uploadBtn = document.querySelector(uploadBtnSelector);

                if (!uploadBtn) { 
                    resolve({ success: false, message: '❌ หาปุ่ม Upload ไม่เจอ' }); 
                    return; 
                }

                uploadBtn.click();
                
                // 2. รอและใส่ไฟล์ (ใช้ logic เดียวกับ Banana - หา input ตัวสุดท้าย)
                await sleep(2000);
                
                const fileInputs = document.querySelectorAll('input[type="file"]');
                let targetInput = null;
                if (fileInputs.length > 0) targetInput = fileInputs[fileInputs.length - 1];

                if (targetInput) {
                    // แปลง base64 เป็น File (เหมือน Banana)
                    const dataTransfer = new DataTransfer();
                    const byteString = atob(imgData.dataUrl.split(',')[1]);
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                    const blob = new Blob([ab], { type: imgData.type });
                    const file = new File([blob], imgData.name, { type: imgData.type });
                    dataTransfer.items.add(file);
                    
                    targetInput.files = dataTransfer.files;
                    targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                    
                    // 3. รอและจัดการ Popup Aspect Ratio (Copy จาก Banana 100%)
                    await sleep(3500);
                    
                    const isPortrait = aspectRatio === '9:16';
                    const targetText = isPortrait ? ['Portrait', 'แนวตั้ง'] : ['Landscape', 'แนวนอน'];
                    const allRatioKeywords = ['Portrait', 'Landscape', 'แนวตั้ง', 'แนวนอน', 'Ratio', 'Crop'];
                    
                    // หาปุ่มเมนู Orientation
                    let orientationBtn = null;
                    const allButtons = document.querySelectorAll('button');
                    for (const btn of allButtons) {
                        const text = (btn.textContent || '').trim();
                        const icon = btn.querySelector('i');
                        const iconText = icon ? (icon.textContent || icon.className || '') : '';
                        const hasKeyword = allRatioKeywords.some(kw => text.includes(kw));
                        const hasCropIcon = iconText.includes('crop') || text.includes('crop');
                        if ((hasKeyword || hasCropIcon) && btn.getAttribute('role') !== 'menuitem') {
                            orientationBtn = btn; 
                            break;
                        }
                    }
                    
                    if (orientationBtn) {
                        heavyClick(orientationBtn);
                        await sleep(1000);
                        
                        // หาตัวเลือก
                        let targetOption = null;
                        for (let attempt = 0; attempt < 15; attempt++) {
                            const candidates = document.querySelectorAll('div, span, p, li, button');
                            for (const el of candidates) {
                                const t = (el.textContent || '').trim();
                                if (!targetText.some(kw => t === kw || (t.includes(kw) && t.length < 20))) continue;
                                if (el === orientationBtn || orientationBtn.contains(el)) continue;
                                if (el.offsetParent === null) continue;
                                targetOption = el;
                                break;
                            }
                            if (targetOption) break;
                            await sleep(200);
                        }
                        
                        if (targetOption) {
                            heavyClick(targetOption);
                            if (targetOption.parentElement) heavyClick(targetOption.parentElement);
                        }
                        await sleep(1500);
                    }
                    
                    // 4. กดปุ่ม Confirm/Save
                    let confirmBtn = null;
                    const confirmSelectors = ['button.sc-19de2353-7.jcyPCc', 'button.sc-5983bb27-7.csgOts'];
                    for (const sel of confirmSelectors) {
                        const btn = document.querySelector(sel);
                        if (btn) { confirmBtn = btn; break; }
                    }
                    if (!confirmBtn) {
                        const allBtns = document.querySelectorAll('button');
                        for (const btn of allBtns) {
                            const t = (btn.textContent || '').trim();
                            if (t.includes('Save') || t.includes('Crop') || t.includes('บันทึก') || t.includes('ยืนยัน') || t.includes('เสร็จ') || t.includes('ต่อไป')) {
                                confirmBtn = btn; 
                                break;
                            }
                        }
                    }
                    
                    if (confirmBtn) {
                        heavyClick(confirmBtn);
                        
                        // รอให้รูปโหลดเสร็จ
                        for (let w = 0; w < 60; w++) {
                            await sleep(500);
                            const textArea = document.querySelector('textarea') || document.querySelector('#PINHOLE_TEXT_AREA_ELEMENT_ID');
                            if (textArea) {
                                let p = textArea.parentElement;
                                for (let level = 0; level < 4; level++) {
                                    if (!p) break;
                                    const thumbs = p.querySelectorAll('img');
                                    const loaded = Array.from(thumbs).some(i => i.width > 20 && i.width < 150);
                                    if (loaded) {
                                        resolve({ success: true, message: '✅ อัพโหลดเสร็จสิ้น' });
                                        return;
                                    }
                                    p = p.parentElement;
                                }
                            }
                        }
                        resolve({ success: true, message: '✅ (Timeout) อัพโหลดเสร็จ' });
                    } else {
                        resolve({ success: false, message: '⚠️ หาปุ่ม Save ไม่เจอ' });
                    }
                } else {
                    resolve({ success: false, message: '❌ หา input file ไม่เจอ' });
                }
            });
        },
        args: [imageData, aspectRatio]
    });

    if (uploadResult[0]?.result?.message) {
        sacredImgAddLog(uploadResult[0].result.message, uploadResult[0].result.success ? 'success' : 'error');
    }
    
    return uploadResult[0]?.result?.success;
}

async function sacredImgFillPrompt(prompt) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text) => {
            // ใช้ ID ของ Flow
            const el = document.getElementById('PINHOLE_TEXT_AREA_ELEMENT_ID');
            if (el) {
                el.value = '';
                el.focus();
                
                // ใส่ทีละตัวอักษร (เหมือน Banana)
                for (let i = 0; i < text.length; i++) {
                    el.value += text[i];
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                }
                el.dispatchEvent(new Event('change', { bubbles: true }));
                return { success: true };
            }
            
            // Fallback: หา textarea อื่นๆ
            const textarea = document.querySelector('textarea');
            if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                return { success: true };
            }
            
            return { success: false };
        },
        args: [prompt]
    });
}

async function sacredImgClickGenerate() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            function heavyClick(element) {
                if (!element) return;
                const pOpts = { bubbles: true, cancelable: true, view: window, pointerId: 1, width: 1, height: 1, pressure: 0.5 };
                element.dispatchEvent(new PointerEvent('pointerdown', pOpts));
                element.dispatchEvent(new PointerEvent('pointerup', pOpts));
                element.click();
            }
            
            // หาปุ่ม Generate ของ Flow
            const generateKeywords = ['generate', 'create', 'สร้าง', 'submit'];
            const allButtons = document.querySelectorAll('button');
            
            for (const btn of allButtons) {
                const txt = (btn.textContent || '').toLowerCase().trim();
                if (generateKeywords.some(k => txt.includes(k))) {
                    // ต้องไม่ใช่ปุ่ม disabled
                    if (!btn.disabled) {
                        heavyClick(btn);
                        return { success: true };
                    }
                }
            }
            
            // Fallback: กดปุ่ม submit
            const submitBtn = document.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                heavyClick(submitBtn);
                return { success: true };
            }
            
            return { success: false };
        }
    });
}

async function sacredImgWaitForGeneration() {
    sacredImgAddLog('⏳ รอสร้างภาพ...', 'info');
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // รอจนกว่าจะมีภาพใหม่
    for (let i = 0; i < 120; i++) { // รอสูงสุด 2 นาที
        await delay(1000);
        
        if (sacredImgShouldStop) break;
        
        const checkResult = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                // เช็คว่ามีรูปผลลัพธ์หรือยัง
                const images = document.querySelectorAll('img[src*="generated"], img[src*="output"], img[data-generated="true"]');
                const downloadBtns = document.querySelectorAll('button[aria-label*="download"], button[aria-label*="Download"]');
                return images.length > 0 || downloadBtns.length > 0;
            }
        });
        
        if (checkResult[0]?.result) {
            sacredImgAddLog('✅ สร้างภาพเสร็จแล้ว', 'success');
            await delay(2000); // รอให้โหลดเสร็จ
            return;
        }
    }
    
    sacredImgAddLog('⚠️ หมดเวลารอ', 'warning');
}

async function sacredImgDownloadImage(index) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (idx) => {
            function heavyClick(element) {
                if (!element) return;
                const pOpts = { bubbles: true, cancelable: true, view: window };
                element.dispatchEvent(new PointerEvent('pointerdown', pOpts));
                element.dispatchEvent(new PointerEvent('pointerup', pOpts));
                element.click();
            }
            
            // หาปุ่ม Download
            const downloadBtns = document.querySelectorAll('button[aria-label*="download"], button[aria-label*="Download"], a[download]');
            if (downloadBtns[idx]) {
                heavyClick(downloadBtns[idx]);
                return { success: true };
            }
            
            // Fallback: หาปุ่มที่มีไอคอน download
            const allBtns = document.querySelectorAll('button');
            let foundIdx = 0;
            for (const btn of allBtns) {
                const svg = btn.querySelector('svg');
                const txt = (btn.textContent || '').toLowerCase();
                if (txt.includes('download') || txt.includes('ดาวน์โหลด') || (svg && svg.innerHTML.includes('download'))) {
                    if (foundIdx === idx) {
                        heavyClick(btn);
                        return { success: true };
                    }
                    foundIdx++;
                }
            }
            
            return { success: false };
        },
        args: [index]
    });
}

// Setup Event Listeners (Sacred Image)
function sacredImgSetupEventListeners() {
    // Mode Toggle
    document.querySelectorAll('.sacred-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sacredImgToggleMode(btn.dataset.mode);
        });
    });
    
    // Effect Cards
    document.querySelectorAll('.sacred-effect-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.sacred-effect-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const effectInput = document.getElementById('sacred-effect-select');
            if (effectInput) effectInput.value = card.dataset.effect;
        });
    });

    // Text Effect Dropdown Listener
    const sacredTextEffectSelect = document.getElementById('sacred-text-effect');
    if (sacredTextEffectSelect) {
        sacredTextEffectSelect.addEventListener('change', () => {
            // Optional: Trigger preview/analysis or just update local state if needed
            // For now, just logging or doing nothing is fine, as sacredGeneratePromptOnly pulls the value directly.
            console.log('Text effect changed to:', sacredTextEffectSelect.value);
        });
    }
    
    // Clear button
    if (sacredImgClearBtn) sacredImgClearBtn.addEventListener('click', sacredImgClearAll);
    
    // Automation buttons
    if (sacredImgBtnAutomation) sacredImgBtnAutomation.addEventListener('click', sacredImgRunAutomation);
    if (sacredImgBtnStop) sacredImgBtnStop.addEventListener('click', sacredImgStopAutomation);
    
    // Log clear
    if (sacredImgLogClear) sacredImgLogClear.addEventListener('click', sacredImgClearLogs);
    
    // Generate Prompt Only button
    const sacredImgBtnGeneratePrompt = document.getElementById('sacred-img-btn-generate-prompt');
    if (sacredImgBtnGeneratePrompt) {
        sacredImgBtnGeneratePrompt.addEventListener('click', sacredImgGeneratePromptOnly);
    }
    
    // Copy Prompt button
    const sacredImgBtnCopyPrompt = document.getElementById('sacred-img-btn-copy-prompt');
    if (sacredImgBtnCopyPrompt) {
        sacredImgBtnCopyPrompt.addEventListener('click', () => {
            const result = document.getElementById('sacred-img-prompt-result');
            if (result && result.textContent) {
                navigator.clipboard.writeText(result.textContent);
                showToast('คัดลอก Prompt เรียบร้อย!', 'success');
            }
        });
    }
}

// ============================================
// 📿 SACRED VIDEO MODULE (วิดีโอสายมู)
// ============================================

// DOM Elements (Sacred Video)
const sacredVideoUploadZone = document.getElementById('sacred-video-upload-zone');
const sacredVideoFileInput = document.getElementById('sacred-video-file-input');
const sacredVideoCount = document.getElementById('sacred-video-count');
const sacredVideoClearBtn = document.getElementById('sacred-video-clear');
const sacredVideoPreviewContainer = document.getElementById('sacred-video-preview-container');
const sacredVideoDetectResult = document.getElementById('sacred-video-detect-result');
const sacredVideoDeityName = document.getElementById('sacred-video-deity-name');
const sacredVideoDeityDesc = document.getElementById('sacred-video-deity-desc');
const sacredVideoBtnAutomation = document.getElementById('sacred-video-btn-automation');
const sacredVideoBtnStop = document.getElementById('sacred-video-btn-stop');
const sacredVideoStatusText = document.getElementById('sacred-video-status-text');
const sacredVideoLogContainer = document.getElementById('sacred-video-log-container');
const sacredVideoLogClear = document.getElementById('sacred-video-log-clear');

// State (Sacred Video)
let sacredVideoUploadedImages = [];
let sacredVideoIsRunning = false;
let sacredVideoShouldStop = false;
let sacredVideoLogs = [];
let sacredVideoDetectedDeity = null;

// Setup Upload Zone (Sacred Video)
function sacredVideoSetupUploadZone() {
    if (!sacredVideoUploadZone) return;
    
    sacredVideoUploadZone.addEventListener('click', () => {
        sacredVideoFileInput.click();
    });
    
    sacredVideoFileInput.addEventListener('change', (e) => {
        sacredVideoHandleFiles(e.target.files);
    });
    
    sacredVideoUploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        sacredVideoUploadZone.classList.add('dragover');
    });
    
    sacredVideoUploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        sacredVideoUploadZone.classList.remove('dragover');
    });
    
    sacredVideoUploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        sacredVideoUploadZone.classList.remove('dragover');
        sacredVideoHandleFiles(e.dataTransfer.files);
    });
}

// Handle Files (Sacred Video)
async function sacredVideoHandleFiles(files) {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.heic'));
    
    for (let file of imageFiles) {
        // HEIC Support
        if (file.name.toLowerCase().endsWith('.heic')) {
            try {
                showToast('กำลังแปลงไฟล์ HEIC...', 'info');
                if (typeof heic2any !== 'undefined') {
                    const blob = await heic2any({ 
                        blob: file, 
                        toType: "image/jpeg", 
                        quality: 0.8 
                    });
                     file = new File([blob], file.name.toLowerCase().replace('.heic', '.jpg'), { type: "image/jpeg" });
                } else {
                    console.error('heic2any library not loaded');
                    showToast('ไม่พบ Library แปลง HEIC', 'error');
                }
            } catch (e) {
                console.error("HEIC conversion failed", e);
                showToast("แปลงไฟล์ HEIC ไม่สำเร็จ กรุณาใช้ JPG/PNG", "error");
                continue; 
            }
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageData = {
                id: Date.now() + Math.random(),
                name: file.name,
                size: file.size,
                type: file.type,
                dataUrl: e.target.result
            };
            sacredVideoUploadedImages.push(imageData);
            sacredVideoUpdateUI();
            
            // AI Detect Deity
            if (sacredVideoUploadedImages.length === 1) {
                await sacredVideoDetectDeity(imageData.dataUrl);
            }
        };
        reader.readAsDataURL(file);
    }
    
    sacredVideoFileInput.value = '';
}

// Update UI (Sacred Video)
function sacredVideoUpdateUI() {
    if (sacredVideoCount) sacredVideoCount.textContent = sacredVideoUploadedImages.length;
    
    if (sacredVideoClearBtn) {
        sacredVideoClearBtn.style.display = sacredVideoUploadedImages.length > 0 ? 'flex' : 'none';
    }
    
    if (sacredVideoPreviewContainer) {
        sacredVideoPreviewContainer.innerHTML = '';
        sacredVideoUploadedImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'preview-item';
            
            const imgEl = document.createElement('img');
            imgEl.src = img.dataUrl;
            imgEl.title = img.name;
            
            const delBtn = document.createElement('button');
            delBtn.className = 'preview-remove-btn';
            delBtn.innerHTML = '✕';
            delBtn.onclick = () => sacredVideoRemoveOne(index);
            
            item.appendChild(imgEl);
            item.appendChild(delBtn);
            sacredVideoPreviewContainer.appendChild(item);
        });
    }
}

// Remove One Image (Sacred Video)
function sacredVideoRemoveOne(index) {
    sacredVideoUploadedImages.splice(index, 1);
    sacredVideoUpdateUI();
    if (sacredVideoUploadedImages.length === 0) {
        sacredVideoDetectResult.style.display = 'none';
        sacredVideoDetectedDeity = null;
    }
}

// Clear All Images (Sacred Video)
function sacredVideoClearAll() {
    sacredVideoUploadedImages = [];
    sacredVideoUpdateUI();
    sacredVideoDetectResult.style.display = 'none';
    sacredVideoDetectedDeity = null;
}

// AI Detect Deity (Sacred Video)
async function sacredVideoDetectDeity(imageDataUrl) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
        sacredVideoAddLog('กรุณาตั้งค่า Gemini API Key ก่อน', 'warning');
        return;
    }
    
    sacredVideoAddLog('🔍 กำลังวิเคราะห์ภาพองค์เทพ...', 'info');
    
    try {
        const base64Data = imageDataUrl.split(',')[1];
        const mimeType = imageDataUrl.split(';')[0].split(':')[1];
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: window.DEITY_DETECTION_PROMPT || 'วิเคราะห์ภาพนี้ว่าเป็นองค์เทพใด' },
                        { inline_data: { mime_type: mimeType, data: base64Data } }
                    ]
                }]
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            let resultText = data.candidates[0].content.parts[0].text;
            
            try {
                const jsonMatch = resultText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    sacredVideoDetectedDeity = JSON.parse(jsonMatch[0]);
                    sacredVideoDeityName.textContent = sacredVideoDetectedDeity.deity_thai || 'องค์เทพ';
                    sacredVideoDeityDesc.textContent = sacredVideoDetectedDeity.description || '';
                    sacredVideoDetectResult.style.display = 'block';
                    sacredVideoAddLog(`✅ ตรวจพบ: ${sacredVideoDetectedDeity.deity_thai}`, 'success');
                }
            } catch (e) {
                sacredVideoDeityName.textContent = 'องค์เทพ';
                sacredVideoDetectResult.style.display = 'block';
            }
        }
    } catch (error) {
        sacredVideoAddLog(`❌ Error: ${error.message}`, 'error');
    }
}

// Add Log (Sacred Video)
function sacredVideoAddLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('th-TH');
    sacredVideoLogs.push({ time: timestamp, message, type });
    if (sacredVideoLogs.length > 200) sacredVideoLogs = sacredVideoLogs.slice(-200);
    sacredVideoUpdateLogDisplay();
}

// Update Log Display (Sacred Video)
function sacredVideoUpdateLogDisplay() {
    if (!sacredVideoLogContainer) return;
    
    if (sacredVideoLogs.length === 0) {
        sacredVideoLogContainer.innerHTML = '<div class="log-empty">ยังไม่มี log</div>';
        return;
    }
    
    const logHTML = sacredVideoLogs.map(log => {
        let typeClass = 'log-entry-info';
        if (log.type === 'error') typeClass = 'log-entry-error';
        else if (log.type === 'success') typeClass = 'log-entry-success';
        else if (log.type === 'warning') typeClass = 'log-entry-warning';
        else if (log.type === 'step') typeClass = 'log-entry-step';
        
        return `<div class="log-entry ${typeClass}">
            <span class="log-entry-time">[${log.time}]</span>
            <span class="log-entry-message">${log.message}</span>
        </div>`;
    }).join('');
    
    sacredVideoLogContainer.innerHTML = logHTML;
    sacredVideoLogContainer.scrollTop = sacredVideoLogContainer.scrollHeight;
}

// Clear Logs (Sacred Video)
function sacredVideoClearLogs() {
    sacredVideoLogs = [];
    sacredVideoUpdateLogDisplay();
}

// Generate Video Prompt (Sacred Video)
async function sacredVideoGeneratePrompt(imageDataUrl) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) return null;
    
    const isSmartAuto = document.getElementById('sacred-video-smart-auto')?.checked;
    const speech = document.getElementById('sacred-video-speech')?.value || '';
    const extraInstructions = document.getElementById('sacred-video-extra')?.value || '';
    const selectedMood = document.getElementById('sacred-video-mood')?.value || 'compassion';
    const moodData = window.getDeityMood ? window.getDeityMood(selectedMood) : {};
    
    const systemPrompt = window.SACRED_VIDEO_SYSTEM_PROMPT || '';
    
    const voiceTone = document.getElementById('sacred-voice-tone')?.value || 'gentle_soft';
    const speechMode = document.getElementById('sacred-speech-mode')?.value || 'speaking';
    const characterPose = document.getElementById('sacred-character-pose')?.value || 'still_peace';
    const toneData = window.getVoiceTone ? window.getVoiceTone(voiceTone) : {};
    const modeData = window.getSpeechMode ? window.getSpeechMode(speechMode) : {};
    const poseData = window.CHARACTER_POSES && window.CHARACTER_POSES[characterPose] 
                     ? window.CHARACTER_POSES[characterPose] 
                     : { name: 'นิ่งสงบ', prompt: 'standing still peacefully' };
    
    let userMessage;
    if (isSmartAuto) {
        userMessage = `สร้าง prompt วิดีโอองค์เทพพูดจากภาพนี้ ให้ AI คิดบทพูด โทนเสียง อารมณ์ และท่าทางการเคลื่อนไหวให้เหมาะกับองค์เทพโดยอัตโนมัติ`;
    } else {
        userMessage = `สร้าง prompt วิดีโอองค์เทพพูดจากภาพนี้
บทพูดองค์เทพ: "${speech || 'ลูก ๆ จงเชื่อมั่นในตัวเอง'}"
โทนเสียง: ${toneData.prompt || 'gentle soft voice'}
โหมดการพูด: ${modeData.prompt || 'spoken dialogue'}
อริยาบถ/ท่าทาง: ${poseData.name} - ${poseData.prompt}
อารมณ์/พลัง: ${moodData.name || 'เมตตา'} - ${moodData.prompt || ''}
คำสั่งเพิ่มเติม: ${extraInstructions}`;
    }
    
    try {
        const base64Data = imageDataUrl.split(',')[1];
        const mimeType = imageDataUrl.split(';')[0].split(':')[1];
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: [{
                    parts: [
                        { text: userMessage },
                        { inline_data: { mime_type: mimeType, data: base64Data } }
                    ]
                }]
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text.trim();
        }
    } catch (error) {
        sacredVideoAddLog(`❌ Error generating prompt: ${error.message}`, 'error');
    }
    
    return null;
}

// ============================================
// Sacred Video: Generate Prompt Only (ไม่รัน Automation)
// ============================================
async function sacredVideoGeneratePromptOnly() {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
        showToast('กรุณาตั้งค่า Gemini API Key ก่อน', 'error');
        return;
    }
    
    if (sacredVideoUploadedImages.length === 0) {
        showToast('กรุณาอัพโหลดภาพก่อน', 'error');
        return;
    }
    
    showToast('กำลังสร้าง Prompt...', 'info');
    
    try {
        const imageData = sacredVideoUploadedImages[0];
        const prompt = await sacredVideoGeneratePrompt(imageData.dataUrl);
        
        if (prompt) {
            const container = document.getElementById('sacred-video-prompt-result-container');
            const result = document.getElementById('sacred-video-prompt-result');
            if (container) container.style.display = 'block';
            if (result) result.textContent = prompt;
            
            showToast('สร้าง Prompt สำเร็จ!', 'success');
            sacredVideoAddLog('✅ สร้าง Prompt สำเร็จ', 'success');
        } else {
            throw new Error('ไม่สามารถสร้าง Prompt ได้');
        }
    } catch (error) {
        console.error('Generate Prompt Error:', error);
        showToast('เกิดข้อผิดพลาด: ' + error.message, 'error');
        sacredVideoAddLog(`❌ Error: ${error.message}`, 'error');
    }
}

// Main Automation (Sacred Video) - Copy Logic จาก Video Module 100%
async function sacredVideoRunAutomation() {
    // Helper function
    const sacredSleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const isCorrect = await checkCorrectWebsite();
    if (!isCorrect) return;
    
    if (sacredVideoUploadedImages.length === 0) {
        showToast('กรุณาอัพโหลดรูปองค์เทพก่อน', 'error');
        return;
    }
    
    const roundsPerImage = parseInt(document.getElementById('sacred-video-round-count')?.value) || 1;
    const clipsPerRound = parseInt(document.getElementById('sacred-video-clip-count')?.value) || 1;
    const totalImages = sacredVideoUploadedImages.length;
    const totalRounds = totalImages * roundsPerImage;
    
    // Start automation
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    sacredVideoIsRunning = true;
    sacredVideoShouldStop = false;
    sacredVideoBtnAutomation.disabled = true;
    sacredVideoBtnAutomation.innerHTML = '<span class="loading"></span> กำลังทำงาน...';
    if (sacredVideoBtnStop) sacredVideoBtnStop.style.display = 'flex';
    await toggleWebPageLock(true);
    
    sacredVideoClearLogs();
    sacredVideoAddLog('📿 เริ่มสร้างวิดีโอสายมู', 'step');
    
    let completedRounds = 0;
    let totalDownloaded = 0;
    
    try {
        for (let imgIndex = 0; imgIndex < totalImages; imgIndex++) {
            const currentImage = sacredVideoUploadedImages[imgIndex];
            
            for (let round = 0; round < roundsPerImage; round++) {
                if (sacredVideoShouldStop) throw new Error('STOPPED');
                
                completedRounds++;
                const roundLabel = `[รอบ ${completedRounds}/${totalRounds}]`;
                sacredVideoAddLog(`🎬 ${roundLabel} เริ่มดำเนินการ...`, 'step');
                sacredVideoStatusText.textContent = `รอบที่ ${completedRounds}/${totalRounds}`;
                
                // STEP 1: เลือกโหมด Frames to Video (Copy จาก Video module 100%)
                sacredVideoAddLog(`${roundLabel} เลือกโหมด Frames to Video...`, 'info');
                
                // พยายามเลือกโหมด Frames to Video สูงสุด 3 ครั้ง
                let modeSelected = false;
                for (let modeAttempt = 0; modeAttempt < 3 && !modeSelected; modeAttempt++) {
                    const selectMenuResult = await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: () => {
                            return new Promise((resolve) => {
                                function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
                                
                                // หา dropdown button (ลำดับความสำคัญ)
                                let dropdownBtn = document.querySelector('button[role="combobox"]');
                                if (!dropdownBtn) dropdownBtn = document.querySelector("div[class*='bHqejI']");
                                
                                if (!dropdownBtn) {
                                    const allButtons = document.querySelectorAll('button');
                                    for (const btn of allButtons) {
                                        const txt = (btn.textContent||'').trim().toLowerCase();
                                        if (txt.includes('สร้าง') || txt.includes('เปลี่ยน') || txt.includes('video') || txt.includes('image') || txt.includes('frames')) {
                                            dropdownBtn = btn;
                                            break;
                                        }
                                    }
                                }
                                
                                if (!dropdownBtn) {
                                    resolve({ success: false, message: 'หาปุ่มเมนูไม่เจอ' });
                                    return;
                                }
                                
                                const currentText = (dropdownBtn.textContent || "").trim();
                                // เช็คว่าอยู่โหมด Video แล้วหรือยัง
                                const isVideoMode = currentText.includes('เปลี่ยนเฟรม') || currentText.includes('Frames to Video') || currentText.includes('เปลี่ยนภาพ');
                                
                                if (isVideoMode) {
                                    resolve({ success: true, message: 'อยู่ในโหมด Frames to Video แล้ว' });
                                    return;
                                }
                                
                                // บังคับกดเปิด dropdown
                                console.log("🔘 กดเปิดเมนู...");
                                const pOpts = { bubbles: true, cancelable: true, view: window, pointerId: 1, width: 1, height: 1, pressure: 0.5 };
                                dropdownBtn.dispatchEvent(new PointerEvent('pointerdown', pOpts));
                                dropdownBtn.dispatchEvent(new PointerEvent('pointerup', pOpts));
                                dropdownBtn.click();
                                
                                setTimeout(() => {
                                    // ใช้ XPath หา "เปลี่ยนเฟรม" หรือ "Frames to Video"
                                    let targetOption = null;
                                    const xpath = "//*[contains(text(), 'เปลี่ยนเฟรม') or contains(text(), 'Frames to Video') or contains(text(), 'เปลี่ยนภาพ') or contains(text(), 'Frames to')]";
                                    const result = document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                    
                                    console.log(`🔍 พบ ${result.snapshotLength} ตัวเลือก`);
                                    
                                    for (let i = 0; i < result.snapshotLength; i++) {
                                        const node = result.snapshotItem(i);
                                        if (!dropdownBtn.contains(node) && node.offsetParent !== null) {
                                            // หา parent ที่เป็น menuitem
                                            let p = node;
                                            while(p && p !== document.body) {
                                                if(p.getAttribute('role') === 'menuitem' || p.getAttribute('role') === 'option') {
                                                    targetOption = p;
                                                    break;
                                                }
                                                p = p.parentElement;
                                            }
                                            if (!targetOption) targetOption = node.parentElement;
                                            break;
                                        }
                                    }
                                    
                                    if (targetOption) {
                                        console.log("✅ เจอตัวเลือก กด...");
                                        const pOpts2 = { bubbles: true, cancelable: true, view: window, pointerId: 1, width: 1, height: 1, pressure: 0.5 };
                                        targetOption.dispatchEvent(new PointerEvent('pointerdown', pOpts2));
                                        targetOption.dispatchEvent(new PointerEvent('pointerup', pOpts2));
                                        targetOption.click();
                                        
                                        setTimeout(() => {
                                            document.body.click();
                                            resolve({ success: true, message: '🎬 เปลี่ยนเป็นโหมด Frames to Video สำเร็จ' });
                                        }, 2000);
                                    } else {
                                        // ปิดเมนู
                                        document.body.click();
                                        resolve({ success: false, message: '❌ หาตัวเลือก Frames to Video ไม่เจอ' });
                                    }
                                }, 1500);
                            });
                        }
                    });
                    
                    const result = selectMenuResult[0]?.result;
                    if (result?.message) {
                        sacredVideoAddLog(result.message, result.success ? 'success' : 'warning');
                    }
                    
                    if (result?.success) {
                        modeSelected = true;
                    } else {
                        sacredVideoAddLog(`⏳ ลองใหม่ครั้งที่ ${modeAttempt + 2}...`, 'info');
                        await sacredSleep(2000);
                    }
                }
                
                if (!modeSelected) {
                    sacredVideoAddLog('⚠️ ไม่สามารถเลือกโหมด Frames to Video ได้ ข้ามรอบนี้...', 'warning');
                    continue;
                }
                
                await sacredSleep(2000);
                
                // STEP 2: Generate Prompt
                sacredVideoAddLog(`${roundLabel} กำลังสร้าง Prompt...`, 'info');
                const prompt = await sacredVideoGeneratePrompt(currentImage.dataUrl);
                if (!prompt) {
                    sacredVideoAddLog('❌ ไม่สามารถสร้าง prompt ได้', 'error');
                    continue;
                }
                sacredVideoAddLog(`✨ Prompt: ${prompt.substring(0, 60)}...`, 'info');
                
                // STEP 3: Upload รูป (ใช้ Logic เหมือน Video module ต้นฉบับ)
                sacredVideoAddLog(`${roundLabel} กำลังอัปโหลดรูป...`, 'info');
                const aspectRatio = localStorage.getItem('veo3_aspect_ratio') || '9:16';
                const singleImageData = [{
                    name: currentImage.name, type: currentImage.type, dataUrl: currentImage.dataUrl
                }];
                
                const uploadResult = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (images, aspectRatio) => {
                        function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
                        function heavyClick(element) {
                            if (!element) return;
                            const opts = { bubbles: true, cancelable: true, view: window };
                            element.dispatchEvent(new PointerEvent('pointerdown', opts));
                            element.dispatchEvent(new MouseEvent('mousedown', opts));
                            element.dispatchEvent(new PointerEvent('pointerup', opts));
                            element.dispatchEvent(new MouseEvent('mouseup', opts));
                            element.click();
                        }
                        
                        return new Promise((resolve) => {
                            // 1. กดปุ่ม Upload
                            const uploadBtnSelector = '#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div:nth-child(1) > div > div:nth-child(1) > button';
                            let uploadBtn = document.querySelector(uploadBtnSelector);
                            if (!uploadBtn) {
                                const allBtns = document.querySelectorAll('button');
                                for(const b of allBtns) {
                                    if(b.querySelector('input[type="file"]')) continue;
                                    const icon = b.querySelector('i');
                                    if(icon && (icon.textContent.includes('image') || icon.textContent.includes('add'))) {
                                        uploadBtn = b; break;
                                    }
                                }
                            }
                            if (!uploadBtn) { 
                                resolve({ success: false, message: '❌ หาปุ่ม Upload ไม่เจอ' }); 
                                return; 
                            }
                            
                            uploadBtn.click();
                            
                            // 2. ใส่ไฟล์ (ใช้ setTimeout เหมือน Video module)
                            setTimeout(() => {
                                const fileInputs = document.querySelectorAll('input[type="file"]');
                                let targetInput = null;
                                if (fileInputs.length > 0) targetInput = fileInputs[fileInputs.length - 1];
                                
                                if (targetInput) {
                                    const dataTransfer = new DataTransfer();
                                    images.forEach((img) => {
                                        const byteString = atob(img.dataUrl.split(',')[1]);
                                        const ab = new ArrayBuffer(byteString.length);
                                        const ia = new Uint8Array(ab);
                                        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                                        const blob = new Blob([ab], { type: img.type });
                                        const file = new File([blob], img.name, { type: img.type });
                                        dataTransfer.items.add(file);
                                    });
                                    targetInput.files = dataTransfer.files;
                                    targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                                    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                                    
                                    // 3. รอและจัดการ Popup
                                    setTimeout(async () => {
                                        const isPortrait = aspectRatio === '9:16';
                                        const targetText = isPortrait ? ['Portrait', 'แนวตั้ง'] : ['Landscape', 'แนวนอน'];
                                        const allRatioKeywords = ['Portrait', 'Landscape', 'แนวตั้ง', 'แนวนอน', 'Ratio', 'Crop'];
                                        
                                        // หาปุ่มเมนู
                                        let orientationBtn = null;
                                        const allButtons = document.querySelectorAll('button');
                                        for (const btn of allButtons) {
                                            const text = (btn.textContent || '').trim();
                                            const hasKeyword = allRatioKeywords.some(kw => text.includes(kw));
                                            if (hasKeyword && btn.getAttribute('role') !== 'menuitem') {
                                                orientationBtn = btn; break;
                                            }
                                        }
                                        
                                        if (orientationBtn) {
                                            heavyClick(orientationBtn);
                                            await sleep(1000);
                                            
                                            let targetOption = null;
                                            for(let attempt=0; attempt<15; attempt++) {
                                                const candidates = document.querySelectorAll('div, span, p, li, button');
                                                for(const el of candidates) {
                                                    const t = (el.textContent || '').trim();
                                                    if(!targetText.some(kw => t === kw || (t.includes(kw) && t.length < 20))) continue;
                                                    if (el === orientationBtn || orientationBtn.contains(el)) continue;
                                                    if (el.offsetParent === null) continue;
                                                    targetOption = el;
                                                    break;
                                                }
                                                if(targetOption) break;
                                                await sleep(200);
                                            }
                                            
                                            if (targetOption) {
                                                heavyClick(targetOption);
                                                if(targetOption.parentElement) heavyClick(targetOption.parentElement);
                                            }
                                            await sleep(1500);
                                        }
                                        
                                        // กดปุ่ม Save
                                        let confirmBtn = null;
                                        const confirmSelectors = ['button.sc-19de2353-7.jcyPCc', 'button.sc-5983bb27-7.csgOts'];
                                        for(const sel of confirmSelectors) {
                                            const btn = document.querySelector(sel);
                                            if(btn) { confirmBtn = btn; break; }
                                        }
                                        if(!confirmBtn) {
                                            const allBtns = document.querySelectorAll('button');
                                            for(const btn of allBtns) {
                                                const t = (btn.textContent || '').trim();
                                                if(t.includes('Save') || t.includes('Crop') || t.includes('บันทึก') || t.includes('ยืนยัน')) {
                                                    confirmBtn = btn; break;
                                                }
                                            }
                                        }
                                        
                                        if (confirmBtn) {
                                            heavyClick(confirmBtn);
                                            for(let w=0; w < 60; w++) {
                                                await sleep(500);
                                                const textArea = document.querySelector('textarea') || document.querySelector('#PINHOLE_TEXT_AREA_ELEMENT_ID');
                                                if (textArea) {
                                                    let p = textArea.parentElement;
                                                    for(let level=0; level<4; level++) {
                                                        if(!p) break;
                                                        const thumbs = p.querySelectorAll('img');
                                                        const loaded = Array.from(thumbs).some(i => i.width > 20 && i.width < 150);
                                                        if(loaded) return resolve({ success: true, message: '✅ อัพโหลดเสร็จสิ้น' });
                                                        p = p.parentElement;
                                                    }
                                                }
                                            }
                                            resolve({ success: true, message: '✅ (Timeout) อัพโหลดเสร็จ' });
                                        } else {
                                            resolve({ success: false, message: '⚠️ หาปุ่ม Save ไม่เจอ' });
                                        }
                                    }, 3500);
                                } else {
                                    resolve({ success: false, message: '❌ หา input file ไม่เจอ' });
                                }
                            }, 2000);
                        });
                    },
                    args: [singleImageData, aspectRatio]
                });
                
                if (uploadResult[0]?.result?.message) {
                    sacredVideoAddLog(uploadResult[0].result.message, uploadResult[0].result.success ? 'success' : 'error');
                }
                
                if (!uploadResult[0]?.result?.success) {
                    sacredVideoAddLog('❌ อัพโหลดล้มเหลว', 'error');
                    continue;
                }
                
                await sacredSleep(2000);
                
                // STEP 4: จำทุกอย่างที่มีอยู่เดิม (Snapshot)
                const preCreateResult = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => {
                        const vids = Array.from(document.querySelectorAll('video')).map(v => v.src || v.currentSrc);
                        const imgs = Array.from(document.querySelectorAll('img')).filter(img => img.width > 200).map(i => i.src);
                        return [...vids, ...imgs];
                    }
                });
                const oldUrls = new Set(preCreateResult[0]?.result || []);
                sacredVideoAddLog(`📸 จำไฟล์เดิมไว้ ${oldUrls.size} ไฟล์`, 'info');
                
                // STEP 5: ใส่ Prompt
                sacredVideoAddLog(`${roundLabel} กรอก Prompt...`, 'info');
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (txt) => {
                        const el = document.getElementById('PINHOLE_TEXT_AREA_ELEMENT_ID');
                        if(el) { 
                            el.value = txt; 
                            el.dispatchEvent(new Event('input', {bubbles:true})); 
                        } else {
                            const ta = document.querySelector('textarea');
                            if(ta) { ta.value = txt; ta.dispatchEvent(new Event('input', {bubbles:true})); }
                        }
                    },
                    args: [prompt]
                });
                await sacredSleep(1500);
                
                // STEP 6: กด Create
                sacredVideoAddLog(`${roundLabel} กดปุ่มสร้าง...`, 'info');
                const createResult = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => {
                        return new Promise((resolve) => {
                            const btn = document.querySelector('#__next > div.sc-c7ee1759-1.crzReP > div > div > div.sc-b0c0bd7-1.kvzLFA > div > div.sc-897c0dbb-0.eHacXb > div.sc-77366d4e-0.eaiEre > div > div > div.sc-408537d4-0.eBSqXt > div.sc-408537d4-1.eiHkev > button');
                            if (btn && !btn.disabled) {
                                btn.click();
                                resolve({ success: true });
                            } else {
                                resolve({ success: false, message: 'ปุ่มยังเทาอยู่' });
                            }
                        });
                    }
                });
                
                if (!createResult[0]?.result?.success) {
                    sacredVideoAddLog('⚠️ กดปุ่มสร้างไม่ได้ (ปุ่มเทา)', 'warning');
                    continue;
                }
                sacredVideoAddLog('🖱️ กดปุ่มสร้างสำเร็จ!', 'success');
                
                // STEP 7: รอวิดีโอใหม่ (รอสูงสุด 4 นาที)
                sacredVideoAddLog(`${roundLabel} รอสร้างวิดีโอ...`, 'info');
                let foundVideo = false;
                let detectedCount = 0;
                
                for(let w=0; w<120; w++) {
                    if (sacredVideoShouldStop) throw new Error('STOPPED');
                    
                    const check = await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: (old) => {
                            const oldSet = new Set(old);
                            const elements = Array.from(document.querySelectorAll('video, img'));
                            const newItems = elements.filter(el => {
                                const rect = el.getBoundingClientRect();
                                if(rect.width < 200) return false;
                                const src = el.src || el.currentSrc;
                                return src && !oldSet.has(src);
                            });
                            return { hasNew: newItems.length > 0, count: newItems.length };
                        },
                        args: [Array.from(oldUrls)]
                    });
                    
                    if(check[0]?.result?.hasNew) {
                        foundVideo = true;
                        detectedCount = check[0]?.result?.count || 0;
                        
                        if (detectedCount >= clipsPerRound) {
                            sacredVideoAddLog(`✅ เจอครบ ${detectedCount}/${clipsPerRound} คลิปแล้ว!`, 'success');
                            break;
                        } else {
                            sacredVideoAddLog(`⏳ เจอแล้ว ${detectedCount}/${clipsPerRound} คลิป... (${w*2}s)`, 'info');
                        }
                    } else if (w % 10 === 0) {
                        sacredVideoAddLog(`⏳ รอ... (${w*2}s)`, 'info');
                    }
                    
                    await sacredSleep(2000);
                }
                
                if (foundVideo) {
                    const finalCount = detectedCount > 0 ? detectedCount : clipsPerRound;
                    sacredVideoAddLog(`⏳ รอ 15 วินาทีให้โหลดสมบูรณ์...`, 'info');
                    await sacredSleep(15000);
                    
                    // STEP 8: ดาวน์โหลดวิดีโอ
                    sacredVideoAddLog(`${roundLabel} เริ่มดาวน์โหลด ${finalCount} คลิป...`, 'info');
                    
                    for (let i = 0; i < finalCount; i++) {
                        if (sacredVideoShouldStop) throw new Error('STOPPED');
                        
                        sacredVideoAddLog(`กำลังโหลดคลิปที่ ${i + 1}/${finalCount}...`, 'info');
                        
                        const dl = await chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: (targetIndex) => {
                                function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
                                function heavyClick(element) {
                                    if(!element) return;
                                    const opts = { bubbles: true, cancelable: true, view: window };
                                    element.dispatchEvent(new PointerEvent('pointerdown', opts));
                                    element.dispatchEvent(new PointerEvent('mousedown', opts));
                                    element.dispatchEvent(new PointerEvent('pointerup', opts));
                                    element.dispatchEvent(new PointerEvent('mouseup', opts));
                                    element.click();
                                }
                                
                                return new Promise(async (resolve) => {
                                    const allCards = [];
                                    document.querySelectorAll('img, video').forEach(el => {
                                        if(el.getBoundingClientRect().width > 200) allCards.push(el);
                                    });
                                    
                                    if (targetIndex >= allCards.length) return resolve({ success: false, message: 'ไม่เจอคลิปลำดับนี้' });
                                    
                                    const target = allCards[targetIndex];
                                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    await sleep(500);
                                    
                                    let card = target.parentElement;
                                    let foundBtn = false;
                                    
                                    for(let k=0; k<6; k++) {
                                        if(!card) break;
                                        
                                        card.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                                        card.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                                        
                                        const btns = card.querySelectorAll('button');
                                        let dlBtn = null;
                                        for(const b of btns) {
                                            const txt = (b.textContent || '').toLowerCase();
                                            const icon = b.querySelector('i');
                                            const iconTxt = icon ? (icon.textContent || icon.className) : '';
                                            if(txt.includes('download') || txt.includes('ดาวน์โหลด') || 
                                               iconTxt.includes('download') || iconTxt.includes('get_app')) {
                                                dlBtn = b; break;
                                            }
                                        }
                                        
                                        if(dlBtn) {
                                            heavyClick(dlBtn);
                                            foundBtn = true;
                                            break;
                                        }
                                        card = card.parentElement;
                                    }
                                    
                                    if(foundBtn) {
                                        await sleep(1500);
                                        const menus = document.querySelectorAll('[role="menuitem"], li');
                                        for(const m of menus) {
                                            if(m.offsetParent === null) continue;
                                            const t = (m.textContent || '').toLowerCase();
                                            if(t.includes('original') || t.includes('ขนาดเดิม') || t.includes('720p') || t.includes('download')) {
                                                heavyClick(m);
                                                break;
                                            }
                                        }
                                        await sleep(1000);
                                        document.body.click();
                                        resolve({ success: true });
                                    } else {
                                        resolve({ success: false, message: 'ไม่เจอปุ่มโหลด' });
                                    }
                                });
                            },
                            args: [i]
                        });
                        
                        if(dl[0]?.result?.success) {
                            sacredVideoAddLog(`⬇️ โหลดคลิปที่ ${i+1} สำเร็จ`, 'success');
                            totalDownloaded++;
                        } else {
                            sacredVideoAddLog(`⚠️ โหลดคลิปที่ ${i+1} ไม่สำเร็จ`, 'warning');
                        }
                        
                        await sacredSleep(3000);
                    }
                } else {
                    sacredVideoAddLog('⚠️ สร้างไม่สำเร็จ (หมดเวลา)', 'warning');
                }
                
                await sacredSleep(5000);
                sacredVideoAddLog(`${roundLabel} เสร็จสิ้น!`, 'success');
            }
        }
        
        sacredVideoAddLog(`🎉 เสร็จสิ้น! โหลดได้ ${totalDownloaded} คลิป`, 'success');
        showToast('สร้างวิดีโอสายมูเสร็จสิ้น!', 'success');
        
    } catch (error) {
        if (error.message === 'STOPPED') {
            sacredVideoAddLog('🛑 หยุดโดยผู้ใช้', 'warning');
            showToast('หยุดการทำงานแล้ว', 'warning');
        } else {
            sacredVideoAddLog(`❌ Error: ${error.message}`, 'error');
        }
    } finally {
        await toggleWebPageLock(false);
        sacredVideoIsRunning = false;
        sacredVideoBtnAutomation.disabled = false;
        sacredVideoBtnAutomation.innerHTML = '📿 START VIDEO';
        if (sacredVideoBtnStop) sacredVideoBtnStop.style.display = 'none';
        sacredVideoStatusText.textContent = 'Ready';
    }
}

// Stop Automation (Sacred Video)
function sacredVideoStopAutomation() {
    sacredVideoShouldStop = true;
    sacredVideoAddLog('⛔ กำลังหยุด...', 'warning');
}

// Setup Event Listeners (Sacred Video)
function sacredVideoSetupEventListeners() {
    // Mood Cards
    document.querySelectorAll('.sacred-mood-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.sacred-mood-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const moodInput = document.getElementById('sacred-video-mood');
            if (moodInput) moodInput.value = card.dataset.mood;
        });
    });
    
    // Clear button
    if (sacredVideoClearBtn) sacredVideoClearBtn.addEventListener('click', sacredVideoClearAll);
    
    // Automation buttons
    if (sacredVideoBtnAutomation) sacredVideoBtnAutomation.addEventListener('click', sacredVideoRunAutomation);
    if (sacredVideoBtnStop) sacredVideoBtnStop.addEventListener('click', sacredVideoStopAutomation);
    
    // Log clear
    if (sacredVideoLogClear) sacredVideoLogClear.addEventListener('click', sacredVideoClearLogs);
    
    // Generate Prompt Only button
    const sacredVideoBtnGeneratePrompt = document.getElementById('sacred-video-btn-generate-prompt');
    if (sacredVideoBtnGeneratePrompt) {
        sacredVideoBtnGeneratePrompt.addEventListener('click', sacredVideoGeneratePromptOnly);
    }
    
    // Copy Prompt button
    const sacredVideoBtnCopyPrompt = document.getElementById('sacred-video-btn-copy-prompt');
    if (sacredVideoBtnCopyPrompt) {
        sacredVideoBtnCopyPrompt.addEventListener('click', () => {
            const result = document.getElementById('sacred-video-prompt-result');
            if (result && result.textContent) {
                navigator.clipboard.writeText(result.textContent);
                showToast('คัดลอก Prompt เรียบร้อย!', 'success');
            }
        });
    }
}

// ============================================
// 🕉️ SACRED MODULES INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Setup Sacred Image Module
    if (document.getElementById('sacred-img-upload-zone')) {
        sacredImgSetupUploadZone();
        sacredImgSetupEventListeners();
        // Initialize Mode
        sacredImgToggleMode('blessing');
    }
    
    // Setup Sacred Video Module
    if (document.getElementById('sacred-video-upload-zone')) {
        sacredVideoSetupUploadZone();
        sacredVideoSetupEventListeners();
    }
    
    console.log('🕉️ Sacred Modules Loaded');
});