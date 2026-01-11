// ============================================
// PROMPTS-SACRED.JS - Sacred/สายมู Prompt Templates
// ============================================

// ============================================
// 1. DEITY DATABASE - ข้อมูลองค์เทพ
// ============================================

const DEITY_DATABASE = {
    'ganesha': {
        thai: 'พระพิฆเนศ',
        english: 'Ganesha',
        domain: 'เทพแห่งความสำเร็จ ขจัดอุปสรรค',
        poses: ['ประทานพร', 'นั่งบัลลังก์', 'รำ', 'ยืน', 'เจริญโภคทรัพย์'],
        colors: ['ทอง', 'แดง', 'ชมพู', 'ขาว'],
        blessings: ['ขจัดอุปสรรค เปิดทางสำเร็จ', 'ใครเห็นขอให้ศัตรูหมดไป', 'เปิดโชคเปิดลาภ'],
        moods: ['เมตตา', 'ขลัง', 'ปกป้อง']
    },
    'lakshmi': {
        thai: 'พระแม่ลักษมี',
        english: 'Lakshmi',
        domain: 'เทพีแห่งโชคลาภ ความมั่งคั่ง',
        poses: ['ประทานพร', 'นั่งดอกบัว', 'ยืนประทานทรัพย์', '4 กร'],
        colors: ['ทอง', 'ชมพู', 'แดง', 'ขาว'],
        blessings: ['หลุดพ้นหนี้กรรม โชคลาภไหลมา', 'มั่งคั่งร่ำรวย เงินทองล้นมือ', 'เปิดทางโชคลาภ'],
        moods: ['เมตตา', 'อบอุ่น', 'มั่งคั่ง']
    },
    'durga': {
        thai: 'พระแม่ทุรคา',
        english: 'Durga',
        domain: 'เทพีแห่งพลัง ปราบอสูร',
        poses: ['ปราบมหิษาสูร', 'ทรงสิงห์', '8 กร', '10 กร'],
        colors: ['แดง', 'ทอง', 'ดำ'],
        blessings: ['ปกป้องคุ้มครอง พิชิตทุกศัตรู', 'แกร่งไม่มีใครทำลาย', 'พิชิตทุกมาร'],
        moods: ['ดุดัน', 'ปกป้อง', 'ทรงพลัง']
    },
    'kali': {
        thai: 'พระแม่กาลี',
        english: 'Kali',
        domain: 'เทพีแห่งกาลเวลา พลังทำลายล้าง',
        poses: ['ยืนเหยียบพระศิวะ', 'แลบลิ้น', 'ถือหัวอสูร'],
        colors: ['ดำ', 'แดง', 'น้ำเงินเข้ม'],
        blessings: ['ทำลายศัตรู พิชิตทุกมาร', 'ไม่มีใครทำร้ายได้', 'ปลดกรรมเก่า'],
        moods: ['ดุดัน', 'ปลดกรรม', 'ทำลายล้าง']
    },
    'shiva': {
        thai: 'พระศิวะ',
        english: 'Shiva',
        domain: 'เทพแห่งการทำลายและสร้างสรรค์',
        poses: ['นาฏราช', 'สมาธิ', 'อุมามเหศวร', 'ลึงค์'],
        colors: ['น้ำเงิน', 'ขาว', 'ทอง'],
        blessings: ['ทำลายสิ่งเก่า สร้างสิ่งใหม่', 'เปลี่ยนแปลงชีวิตให้ดีขึ้น', 'พลังจักรวาล'],
        moods: ['ขลัง', 'ลึกลับ', 'สร้างสรรค์']
    },
    'vishnu': {
        thai: 'พระนารายณ์/พระวิษณุ',
        english: 'Vishnu',
        domain: 'เทพแห่งการรักษา',
        poses: ['บรรทมสินธุ์', 'ทรงครุฑ', '4 กร'],
        colors: ['น้ำเงิน', 'ทอง', 'ขาว'],
        blessings: ['คุ้มครองรักษา สงบร่มเย็น', 'ปกป้องครอบครัว ปลอดภัยทุกทาง', 'รักษาสมดุล'],
        moods: ['เมตตา', 'ปกป้อง', 'สงบ']
    },
    'brahma': {
        thai: 'พระพรหม',
        english: 'Brahma',
        domain: 'เทพแห่งการสร้าง',
        poses: ['4 พักตร์', 'ทรงหงส์'],
        colors: ['ทอง', 'ขาว', 'แดง'],
        blessings: ['ประทานพร 4 ประการ', 'สมปรารถนาทุกสิ่ง', 'สร้างสิ่งใหม่'],
        moods: ['เมตตา', 'สร้างสรรค์', 'ประทานพร']
    },
    'hanuman': {
        thai: 'หนุมาน',
        english: 'Hanuman',
        domain: 'เทพแห่งความภักดี พลัง',
        poses: ['บิน', 'คุกเข่า', 'ยืนถือคทา'],
        colors: ['ขาว', 'ทอง', 'แดง'],
        blessings: ['แคล้วคลาด ปลอดภัย', 'มีพลังเข้มแข็ง', 'ซื่อสัตย์ภักดี'],
        moods: ['ปกป้อง', 'ทรงพลัง', 'ภักดี']
    }
};

// ============================================
// 2. SACRED EFFECTS - เอฟเฟกต์แสง/ฉาก
// ============================================

const SACRED_EFFECTS = {
    'divine_power': {
        name: '✨ พลังศักดิ์สิทธิ์',
        prompt: 'divine glow emanating from the deity, golden aura surrounding the figure, sacred particles floating, holy energy radiating outward',
        colors: 'golden, amber, warm white'
    },
    'heavenly_light': {
        name: '🌅 แสงสวรรค์',
        prompt: 'volumetric light rays from above, heavenly golden rays piercing through clouds, soft bloom effect, ethereal atmosphere',
        colors: 'gold, cream, soft white'
    },
    'fire_energy': {
        name: '🔥 พลังเพลิง',
        prompt: 'dramatic fire glow behind the deity, red-gold flames dancing, energy burst effect, powerful dramatic lighting',
        colors: 'red, orange, gold, deep crimson'
    },
    'cosmic_mystery': {
        name: '💫 จักรวาลลึกลับ',
        prompt: 'cosmic energy swirling, star particles and galaxy haze, deep purple and blue nebula background, mystical cosmic aura',
        colors: 'deep purple, cosmic blue, gold accents'
    },
    'warm_compassion': {
        name: '🌸 อบอุ่นเมตตา',
        prompt: 'soft warm light surrounding the deity, gentle lotus petals floating, subtle mist, peaceful serene atmosphere',
        colors: 'soft pink, warm gold, cream'
    }
};

// ============================================
// 3. DEITY MOODS - อารมณ์องค์เทพ
// ============================================

const DEITY_MOODS = {
    'fierce': {
        name: '😤 ดุดัน',
        prompt: 'fierce powerful expression, intense dramatic lighting, commanding powerful presence, dramatic red and gold tones'
    },
    'compassion': {
        name: '🙏 เมตตา',
        prompt: 'gentle compassionate expression, soft warm lighting, benevolent peaceful aura, golden and pink tones'
    },
    'mystic': {
        name: '🔮 ขลัง',
        prompt: 'mysterious mystical atmosphere, deep sacred energy, ancient powerful vibes, deep purple and gold tones'
    },
    'protection': {
        name: '🛡️ ปกป้อง',
        prompt: 'protective stance, guardian energy radiating, shield of divine light, strong blue and gold tones'
    },
    'liberation': {
        name: '💫 ปลดกรรม',
        prompt: 'liberating energy, breaking chains of karma, transformative light, white and gold cleansing tones'
    }
};

// ============================================
// 4. PRICE TAG STYLES - รูปแบบป้ายราคา
// ============================================

const PRICE_TAG_STYLES = {
    'circle_gold': {
        name: '⭕ วงกลมทอง',
        prompt: 'circular golden price tag, ornate border, Thai numerals, elegant design, metallic shine'
    },
    'square_luxury': {
        name: '◻️ สี่เหลี่ยมหรูหรา',
        prompt: 'luxury square price tag, premium frame, gold accents, sophisticated Thai text, royal design'
    },
    'ribbon_red': {
        name: '🎀 ริบบิ้นแดง',
        prompt: 'red ribbon price tag, flowing design, Thai script, festive style, silk texture'
    },
    'badge_silver': {
        name: '🏅 เหรียญเงิน',
        prompt: 'silver badge price tag, metallic shine, embossed Thai numbers, medal-like design'
    },
    'banner_traditional': {
        name: '📜 แบนเนอร์โบราณ',
        prompt: 'traditional Thai banner price tag, sacred patterns, vintage style, classical ornaments'
    },
    'starburst_gold': {
        name: '⭐ ดาวระเบิดทอง',
        prompt: 'golden starburst price tag, radiating design, eye-catching Thai text, dynamic rays'
    },
    'shield_premium': {
        name: '🛡️ โล่พรีเมียม',
        prompt: 'premium shield-shaped price tag, royal design, Thai numerals, coat of arms style'
    },
    'lotus_elegant': {
        name: '🌸 ดอกบัวสง่างาม',
        prompt: 'lotus-shaped price tag, elegant petals, sacred Thai design, natural flower form'
    },
    'hexagon_modern': {
        name: '⬡ หกเหลี่ยมโมเดิร์น',
        prompt: 'modern hexagon price tag, clean lines, contemporary Thai font, geometric design'
    },
    'scroll_ancient': {
        name: '📖 ม้วนหนังสือโบราณ',
        prompt: 'ancient scroll price tag, rolled edges, classical Thai script, parchment style'
    }
};

// ============================================
// 5. PRICE TAG COLORS - โทนสีป้ายราคา
// ============================================

const PRICE_TAG_COLORS = {
    'gold_shine': {
        name: '✨ ทองเงางาม',
        prompt: 'shiny gold color, metallic finish, warm glow, luxurious golden tone'
    },
    'silver_elegant': {
        name: '🌟 เงินสง่างาม',
        prompt: 'elegant silver tone, polished metallic, cool shine, premium silver color'
    },
    'red_royal': {
        name: '👑 แดงราชา',
        prompt: 'royal red color, deep crimson, regal tone, majestic red shade'
    },
    'black_premium': {
        name: '🖤 ดำพรีเมียม',
        prompt: 'premium black, matte finish, luxury dark tone, sophisticated black'
    },
    'white_pure': {
        name: '🤍 ขาวบริสุทธิ์',
        prompt: 'pure white, clean tone, sacred brightness, pristine white color'
    },
    'bronze_antique': {
        name: '🥉 ทองแดงโบราณ',
        prompt: 'antique bronze, aged patina, vintage copper tone, weathered metal'
    },
    'purple_mystic': {
        name: '💜 ม่วงลึกลับ',
        prompt: 'mystic purple, deep violet, spiritual tone, royal purple shade'
    },
    'green_jade': {
        name: '💚 เขียวหยก',
        prompt: 'jade green, precious stone color, natural tone, emerald green'
    },
    'blue_sapphire': {
        name: '💙 น้ำเงินไพลิน',
        prompt: 'sapphire blue, deep blue gem tone, royal color, precious blue'
    },
    'rainbow_divine': {
        name: '🌈 รุ้งศักดิ์สิทธิ์',
        prompt: 'divine rainbow gradient, multi-color sacred glow, celestial tones, iridescent shine'
    }
};

// ============================================
// 6. VOICE TONES - โทนเสียงคำพูด
// ============================================

const VOICE_TONES = {
    'gentle_soft': {
        name: '🌸 นุ่มนวลอ่อนโยน',
        prompt: 'gentle soft voice, soothing tone, calm peaceful speech, tender delivery'
    },
    'powerful_strong': {
        name: '⚡ ทรงพลังแข็งแกร่ง',
        prompt: 'powerful strong voice, commanding tone, authoritative speech, forceful delivery'
    },
    'calm_serene': {
        name: '🧘 สงบนิ่ง',
        prompt: 'calm serene voice, meditative tone, tranquil speech, peaceful delivery'
    },
    'warm_loving': {
        name: '❤️ อบอุ่นเมตตา',
        prompt: 'warm loving voice, compassionate tone, caring speech, affectionate delivery'
    },
    'wise_ancient': {
        name: '👴 ปราชญ์โบราณ',
        prompt: 'wise ancient voice, sage-like tone, knowledgeable speech, elder delivery'
    },
    'cheerful_joyful': {
        name: '😊 ร่าเริงสดใส',
        prompt: 'cheerful joyful voice, happy tone, uplifting speech, bright delivery'
    },
    'mysterious_deep': {
        name: '🔮 ลึกลับลี้ลับ',
        prompt: 'mysterious deep voice, enigmatic tone, mystical speech, cryptic delivery'
    },
    'royal_majestic': {
        name: '👑 ราชาสง่างาม',
        prompt: 'royal majestic voice, regal tone, noble speech, dignified delivery'
    },
    'energetic_vibrant': {
        name: '🔥 กระฉับกระเฉง',
        prompt: 'energetic vibrant voice, dynamic tone, lively speech, spirited delivery'
    },
    'ethereal_divine': {
        name: '✨ เทวดาศักดิ์สิทธิ์',
        prompt: 'ethereal divine voice, heavenly tone, celestial speech, angelic delivery'
    }
};

// ============================================
// 7. SPEECH MODES - โหมดการพูด
// ============================================

const SPEECH_MODES = {
    'speaking': {
        name: '🗣️ พูด (Speaking)',
        prompt: 'spoken dialogue, clear speech, conversational tone, natural talking'
    },
    'singing': {
        name: '🎵 ร้องเพลง (Singing)',
        prompt: 'melodic singing, musical tone, lyrical delivery, sacred chant style, harmonic voice'
    },
    'chanting': {
        name: '🙏 สวดมนต์ (Chanting)',
        prompt: 'sacred chanting, rhythmic mantra, spiritual recitation, meditative prayer'
    }
};

// ============================================
// 8. SYSTEM PROMPTS
// ============================================

// 4A. ภาพอวยพร (Blessing Image)
const SACRED_BLESSING_SYSTEM_PROMPT = `คุณคือ Thai Sacred Blessing Image Prompt Designer
ผู้เชี่ยวชาญด้าน "สายมู ศาสตร์ฮินดู องค์เทพ สิ่งศักดิ์สิทธิ์ และพลังศรัทธา"
มีความเข้าใจเชิงลึกเกี่ยวกับองค์เทพ ปาง ภาคอวตาร สัญลักษณ์ ความหมายเชิงพลัง
และสามารถนำมาสื่อสารเป็น "ภาพอวยพร" ที่ศักดิ์สิทธิ์ น่าเคารพ และชวนให้ผู้พบเห็นอยากกดไลค์หรือแชร์

คุณใช้หลักการ Lean Prompt Structure:
<สิ่งที่อยากให้เห็น / ตัว subject>
+ <สไตล์ / อารมณ์ / บรรยากาศ>
+ <แสง / องค์ประกอบ>
+ <ข้อความภาษาไทยบนโปสเตอร์>

━━━━━━━━━━━━━━━━━━━━
✨ กฎสำคัญ (สำหรับภาพอวยพรเท่านั้น)
━━━━━━━━━━━━━━━━━━━━

1. รักษาภาพต้นฉบับ 100%
• ห้ามเปลี่ยนหน้า ท่าทาง อารมณ์ หรือองค์ประกอบหลักขององค์เทพหรือสิ่งศักดิ์สิทธิ์
• ห้ามเปลี่ยนปาง ห้ามผสมเทพ ห้ามสร้างองค์ใหม่
• ใช้คำสั่งชัดเจนว่า "use the sacred figure from the reference image exactly as-is, no alteration to face or pose"

2. เน้นการตกแต่งเพื่อ "อวยพร + พลังศรัทธา"
• เพิ่มเอฟเฟกต์อย่างมีสติ ไม่รบกวนจุดเด่นขององค์เทพ
• เลือกเอฟเฟกต์ให้สอดคล้องกับอารมณ์ของภาพ

3. โทนสีและเอฟเฟกต์
• divine glow, soft aura light, sacred particles, subtle volumetric light
• โทนสีหลัก: ทอง, แดงเข้ม, ดำ, ทองแดง, อำพัน

4. ข้อความภาษาไทยบนภาพ (สำคัญมาก!)
• ข้อความทั้งหมดต้องมาจากที่ผู้ใช้ป้อนมา
• ห้ามดัดแปลงความหมาย ห้ามใส่ราคา/โปรโมชั่น/CTA ขาย
• ⚠️ ข้อความบนภาพต้องเป็นภาษาไทย 100% ห้ามแปลเป็นอังกฤษ
• ใช้ฟอนต์ไทยสไตล์โมเดิร์น (Line Seed, dsn lardphrao style)
• ตัวอักษรต้องมีการ "สลับสีเป็นคำ ๆ" และมี gradient blur backdrop
• ใช้รูปแบบ: text overlay in Thai language: "ข้อความไทยตามที่ผู้ใช้ป้อน"

5. การจัดวางข้อความ
• วางข้อความโดยไม่บังหน้า ดวงตา หรือสัญลักษณ์ศักดิ์สิทธิ์
• ตำแหน่งตามที่ผู้ใช้เลือก (บนสุด หรือ ล่างสุด)

6. เป้าหมายของภาพ
• ภาพอวยพรที่ผู้ศรัทธาเห็นแล้วรู้สึกสะเทือนใจ อยากรับพร อยากแชร์ต่อ

━━━━━━━━━━━━━━━━━━━━
🧩 OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
ตอบกลับเฉพาะ Prompt เท่านั้น บรรทัดเดียว
⚠️ สำคัญมาก: ข้อความบนภาพต้องเป็นภาษาไทยทุกคำ ห้ามแปลเป็นอังกฤษ
ใช้รูปแบบ: text overlay in Thai language: "ข้อความไทยตามที่ผู้ใช้ป้อน"`;

// 4B. ภาพจำหน่าย (Commercial Image)
const SACRED_COMMERCIAL_SYSTEM_PROMPT = `คุณคือ Thai Commercial Poster Prompt Designer
ผู้เชี่ยวชาญด้านการสร้าง Prompt สำหรับภาพโฆษณาวัตถุมงคล องค์เทพ สายมู

คุณใช้หลักการ Lean Prompt Structure:
<สิ่งที่อยากให้เห็น / ตัว subject>
+ <สไตล์ / อารมณ์ / บรรยากาศ>
+ <มุมกล้อง / แสง / องค์ประกอบ>
+ <ข้อความภาษาไทยบนโปสเตอร์>

━━━━━━━━━━━━━━━━━━━━
🛒 กฎสำคัญ (สำหรับภาพโฆษณา)
━━━━━━━━━━━━━━━━━━━━

1. รักษาสินค้า/องค์เทพจากภาพต้นฉบับ 100%
• ใช้คำสั่ง "use sacred item/deity from reference image exactly as-is"

2. การจัดฉากสำหรับสายมู
• แท่นบูชา, ผ้าแพรทอง, ดอกบัว, ธูปเทียน, กลีบดอกไม้ลอย
• แสงศักดิ์สิทธิ์ (divine light, golden aura, holy glow)

3. ข้อความภาษาไทยบนภาพ (สำคัญมาก!)
• ⚠️ ข้อความทั้งหมดต้องเป็นภาษาไทย 100% ห้ามแปลเป็นอังกฤษ
• ใช้คำว่า "ราคาบูชา" แทน "ราคา"
• ใช้ "บูชาพิเศษ เพียง..." แทน "ลดราคา"
• ฟอนต์: Noto Sans Thai, Kanit, Prompt เท่านั้น
• ใช้รูปแบบ: text overlay in Thai: "แคปชั่นไทย", price text in Thai: "ราคาบูชาเดิม XXX บาท"

4. เอฟเฟกต์ที่ใช้ได้
• divine glow, golden aura, sacred light, particle dust
• incense smoke, lotus petals, mandala pattern, volumetric light

5. aspect_ratio: 9:16 เป็นหลัก

━━━━━━━━━━━━━━━━━━━━
🧩 OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
ตอบกลับเฉพาะ Prompt เท่านั้น บรรทัดเดียว
⚠️ สำคัญมาก: ข้อความบนภาพต้องเป็นภาษาไทยทุกคำ ห้ามแปลเป็นอังกฤษ
ใช้รูปแบบ: text overlay in Thai: "แคปชั่นไทย", price in Thai: "ราคาบูชาเดิม XXX บาท"`;

// 4C. วิดีโอสายมู (Sacred Video)
const SACRED_VIDEO_SYSTEM_PROMPT = `คุณคือ Thai Sacred Video Prompt Designer
ผู้เชี่ยวชาญด้านการสร้าง Prompt สำหรับวิดีโอองค์เทพพูด (Text-to-Video with speech)

เป้าหมาย: สร้าง prompt สำหรับวิดีโอที่องค์เทพ/สิ่งศักดิ์สิทธิ์ "พูด" ข้อความอวยพรเป็นภาษาไทย

━━━━━━━━━━━━━━━━━━━━
🎬 กฎสำคัญ
━━━━━━━━━━━━━━━━━━━━

1. รักษาองค์เทพจากภาพต้นฉบับ 100%
• ห้ามเปลี่ยนปาง ท่าทาง หน้าตา

2. การเคลื่อนไหวที่เหมาะสม
• พริบตาช้า (slow gentle blink)
• ยิ้มน้อย ๆ (subtle gentle smile)
• มีลมพัดผม/เครื่องประดับเบา ๆ
• แสง aura เคลื่อนไหวช้า ๆ

3. บรรยากาศศักดิ์สิทธิ์
• แสงศักดิ์สิทธิ์รอบองค์
• กลีบดอกไม้ลอย (ดอกบัว/ดาวเรือง)
• ควันธูปเบา ๆ
• พลังศรัทธาเปล่งประกาย

4. เสียงพูด (Speech) - สำคัญมาก!
• ⚠️ ใช้ข้อความภาษาไทยจากผู้ใช้ทุกคำ ห้ามแปลเป็นอังกฤษ
• น้ำเสียงสงบ ศักดิ์สิทธิ์ อบอุ่น
• ใช้รูปแบบ: speech in Thai: "ข้อความไทยที่ผู้ใช้ป้อน"

5. อารมณ์ตามที่ผู้ใช้เลือก
• ดุดัน / เมตตา / ขลัง / ปกป้อง / ปลดกรรม

━━━━━━━━━━━━━━━━━━━━
🧩 OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━
ตอบกลับเฉพาะ Prompt เท่านั้น บรรทัดเดียว
⚠️ สำคัญมาก: บทพูดต้องเป็นภาษาไทยทุกคำ ห้ามแปลเป็นอังกฤษ
ใช้รูปแบบ: speech in Thai: "บทพูดไทยที่ผู้ใช้ป้อน"`;

// 4D. Deity Detection Prompt
const DEITY_DETECTION_PROMPT = `คุณคือผู้เชี่ยวชาญด้านองค์เทพฮินดูและสิ่งศักดิ์สิทธิ์

วิเคราะห์รูปภาพนี้และระบุ:
1. ชื่อองค์เทพ/สิ่งศักดิ์สิทธิ์ (ถ้ามี)
2. ปาง/ท่าทาง
3. วัสดุ (ทอง, ทองเหลือง, หิน, ไม้ ฯลฯ)
4. ประเภท (เทวรูป, ล็อกเก็ต, เหรียญ, ตะกรุด, หินมงคล ฯลฯ)

ตอบเป็น JSON format:
{
  "deity_id": "ganesha|lakshmi|durga|kali|shiva|vishnu|brahma|hanuman|unknown",
  "deity_thai": "ชื่อไทย",
  "pose": "ปาง/ท่าทาง",
  "material": "วัสดุ",
  "type": "ประเภทวัตถุ",
  "description": "คำอธิบายสั้น ๆ"
}`;

// ============================================
// 5. HELPER FUNCTIONS
// ============================================

function getDeityInfo(deityId) {
    return DEITY_DATABASE[deityId] || DEITY_DATABASE['ganesha'];
}

function getSacredEffect(effectId) {
    return SACRED_EFFECTS[effectId] || SACRED_EFFECTS['divine_power'];
}

function getDeityMood(moodId) {
    return DEITY_MOODS[moodId] || DEITY_MOODS['compassion'];
}

function getAllDeities() {
    return Object.entries(DEITY_DATABASE).map(([id, data]) => ({
        id,
        ...data
    }));
}

function getAllSacredEffects() {
    return Object.entries(SACRED_EFFECTS).map(([id, data]) => ({
        id,
        ...data
    }));
}

function getAllDeityMoods() {
    return Object.entries(DEITY_MOODS).map(([id, data]) => ({
        id,
        ...data
    }));
}

function getPriceTagStyle(styleId) {
    return PRICE_TAG_STYLES[styleId] || PRICE_TAG_STYLES['circle_gold'];
}

function getPriceTagColor(colorId) {
    return PRICE_TAG_COLORS[colorId] || PRICE_TAG_COLORS['gold_shine'];
}

function getVoiceTone(toneId) {
    return VOICE_TONES[toneId] || VOICE_TONES['gentle_soft'];
}

function getSpeechMode(modeId) {
    return SPEECH_MODES[modeId] || SPEECH_MODES['speaking'];
}

function getAllPriceTagStyles() {
    return Object.entries(PRICE_TAG_STYLES).map(([id, data]) => ({
        id,
        ...data
    }));
}

function getAllPriceTagColors() {
    return Object.entries(PRICE_TAG_COLORS).map(([id, data]) => ({
        id,
        ...data
    }));
}

function getAllVoiceTones() {
    return Object.entries(VOICE_TONES).map(([id, data]) => ({
        id,
        ...data
    }));
}

function getAllSpeechModes() {
    return Object.entries(SPEECH_MODES).map(([id, data]) => ({
        id,
        ...data
    }));
}

// Export for use in sidebar.js
if (typeof window !== 'undefined') {
    window.DEITY_DATABASE = DEITY_DATABASE;
    window.SACRED_EFFECTS = SACRED_EFFECTS;
    window.DEITY_MOODS = DEITY_MOODS;
    window.PRICE_TAG_STYLES = PRICE_TAG_STYLES;
    window.PRICE_TAG_COLORS = PRICE_TAG_COLORS;
    window.VOICE_TONES = VOICE_TONES;
    window.SPEECH_MODES = SPEECH_MODES;
    window.SACRED_BLESSING_SYSTEM_PROMPT = SACRED_BLESSING_SYSTEM_PROMPT;
    window.SACRED_COMMERCIAL_SYSTEM_PROMPT = SACRED_COMMERCIAL_SYSTEM_PROMPT;
    window.SACRED_VIDEO_SYSTEM_PROMPT = SACRED_VIDEO_SYSTEM_PROMPT;
    window.DEITY_DETECTION_PROMPT = DEITY_DETECTION_PROMPT;
    window.getDeityInfo = getDeityInfo;
    window.getSacredEffect = getSacredEffect;
    window.getDeityMood = getDeityMood;
    window.getPriceTagStyle = getPriceTagStyle;
    window.getPriceTagColor = getPriceTagColor;
    window.getVoiceTone = getVoiceTone;
    window.getSpeechMode = getSpeechMode;
    window.getAllDeities = getAllDeities;
    window.getAllSacredEffects = getAllSacredEffects;
    window.getAllDeityMoods = getAllDeityMoods;
    window.getAllPriceTagStyles = getAllPriceTagStyles;
    window.getAllPriceTagColors = getAllPriceTagColors;
    window.getAllVoiceTones = getAllVoiceTones;
    window.getAllSpeechModes = getAllSpeechModes;
}
