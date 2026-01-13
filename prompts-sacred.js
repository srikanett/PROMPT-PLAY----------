// ============================================
// PROMPTS-SACRED.JS - Sacred/สายมู Prompt Templates
// ============================================

// ============================================
// 0. TEXT EFFECTS - เอฟเฟกต์ข้อความ (สำหรับทุกโมดูล)
// ============================================

const TEXT_EFFECTS = {
    'none': {
        name: 'ไม่มีเอฟเฟกต์',
        prompt: 'clean simple text without effects'
    },
    'glow_white': {
        name: '🌟 Glow สีขาว',
        prompt: 'text with soft white glowing effect'
    },
    'glow_gold': {
        name: '✨ Glow สีทอง',
        prompt: 'text with golden shimmering glow effect'
    },
    'neon_blue': {
        name: '💙 Neon สีฟ้า',
        prompt: 'text with electric blue neon effect'
    },
    'neon_pink': {
        name: '💗 Neon สีชมพู',
        prompt: 'text with vibrant pink neon effect'
    },
    'shadow_soft': {
        name: '🌫️ เงาอ่อน',
        prompt: 'text with soft drop shadow'
    },
    'shadow_hard': {
        name: '⬛ เงาแข็ง',
        prompt: 'text with strong hard shadow'
    },
    'outline_white': {
        name: '⬜ ขอบขาว',
        prompt: 'text with white outline stroke'
    },
    'outline_black': {
        name: '⬛ ขอบดำ',
        prompt: 'text with black outline stroke'
    },
    'gradient_rainbow': {
        name: '🌈 Gradient รุ้ง',
        prompt: 'text with rainbow gradient fill'
    },
    'gradient_gold': {
        name: '🥇 Gradient ทอง',
        prompt: 'text with golden gradient fill'
    },
    'metallic_silver': {
        name: '🔘 เมทัลลิกเงิน',
        prompt: 'text with metallic silver chrome effect'
    },
    'metallic_gold': {
        name: '🪙 เมทัลลิกทอง',
        prompt: 'text with metallic gold chrome effect'
    },
    'emboss_3d': {
        name: '🏔️ นูน 3D',
        prompt: 'text with 3D embossed raised effect'
    },
    'vintage_retro': {
        name: '📺 วินเทจ Retro',
        prompt: 'text with retro vintage distressed effect'
    }
};

function getTextEffect(effectId) {
    return TEXT_EFFECTS[effectId] || TEXT_EFFECTS['none'];
}

// ============================================
// 0.2 IMAGE PRESENTATION STYLES - แบบนำเสนอสินค้า (ไม่ใช้ตัวละคร)
// ============================================

const IMAGE_PRESENTATION_STYLES = {
    'product_only': {
        name: '📦 เสนอเพียงสินค้า',
        prompt: 'Extreme close-up macro shot of product only. Hand holding product showing texture, label, and key details. Sharp focus on product with blurred background. May show blurred face behind. Professional lighting highlighting details. ABSOLUTELY NO FULL BODY PERSON. NO MODEL. Product is the main focus.'
    },
    'multi_angle': {
        name: '🔄 หลายมุมมอง',
        prompt: 'Product shown from multiple angles (front, side, back) in clean professional layout. NO PERSON. NO MODEL. NO CHARACTER. Product only.'
    },
    'hero_shot': {
        name: '🌟 Hero Shot',
        prompt: 'Dramatic hero product shot with cinematic lighting and depth of field. NO PERSON. NO MODEL. NO CHARACTER. Product only.'
    },
    'floating_3d': {
        name: '🎈 ลอยกลางอากาศ',
        prompt: 'Product floating in mid-air with soft shadows and clean background. NO PERSON. NO MODEL. NO CHARACTER. Product only levitating.'
    },
    'exploded_view': {
        name: '💥 แยกชิ้นส่วน',
        prompt: 'Exploded view showing all product components separated elegantly. NO PERSON. NO MODEL. NO CHARACTER. Technical product visualization.'
    },
    'macro_detail': {
        name: '🔍 ซูมดีเทล',
        prompt: 'Extreme close-up macro shot highlighting product texture and quality details. NO PERSON. NO MODEL. NO CHARACTER. Detail focus only.'
    },
    'lifestyle_context': {
        name: '🏠 ในบริบทใช้งาน',
        prompt: 'Product placed in natural lifestyle setting showing real-world usage context. NO PERSON VISIBLE. NO MODEL. Product in environment only.'
    },
    'minimalist_clean': {
        name: '⬜ มินิมอล',
        prompt: 'Ultra minimalist product shot with generous white space and elegant simplicity. NO PERSON. NO MODEL. Clean product only.'
    },
    'shadow_play': {
        name: '🌑 เล่นแสงเงา',
        prompt: 'Artistic product shot with dramatic shadows and lighting contrasts. NO PERSON. NO MODEL. NO CHARACTER. Artistic product only.'
    },
    'reflective_surface': {
        name: '✨ สะท้อนพื้นผิว',
        prompt: 'Product on reflective surface creating mirror-like reflection effect. NO PERSON. NO MODEL. NO CHARACTER. Product reflection only.'
    },
    'gradient_backdrop': {
        name: '🎨 ฉากไล่สี',
        prompt: 'Product against beautiful gradient background with professional studio lighting. NO PERSON. NO MODEL. NO CHARACTER. Product only.'
    }
};

function getImagePresentationStyle(styleId) {
    return IMAGE_PRESENTATION_STYLES[styleId] || IMAGE_PRESENTATION_STYLES['hero_shot'];
}

// ============================================
// 0.3 VIDEO PRESENTATION STYLES - แบบนำเสนอสินค้าวีดีโอ (ไม่ใช้ตัวละคร)
// ============================================

const VIDEO_PRESENTATION_STYLES = {
    'product_present': {
        name: '📦 เสนอสินค้า',
        prompt: '8-second product video. ABSOLUTELY NO PERSON in video. Product only focus. 360 degree rotation around product. Slow zoom to show details. Product floating or levitating. Light rays and reflections. Clean white or gradient background. Smooth camera movement. NO MODEL. NO CHARACTER. NO HUMAN.'
    },
    'product_zoom': {
        name: '🔍 ซูมสินค้า',
        prompt: '8-second UGC style product video. Extreme close-up macro shot. Hand holding product and rotating to show details. Focus on texture, components, labels. Professional lighting highlights details. Thai voiceover describing product. ABSOLUTELY NO FULL BODY PERSON. May show hands only. Product is main focus.'
    },
    'orbit_360': {
        name: '🔄 หมุนรอบ 360°',
        prompt: 'Smooth 360 degree orbit around product showcasing all angles. NO PERSON. NO MODEL. NO CHARACTER. Product only. 8 seconds.'
    },
    'zoom_in_reveal': {
        name: '🔍 ซูมเข้าเปิดเผย',
        prompt: 'Dramatic zoom in revealing product details and textures. NO PERSON. NO MODEL. NO CHARACTER. Product only. 8 seconds.'
    },
    'zoom_out_context': {
        name: '🔭 ซูมออกเห็นบริบท',
        prompt: 'Zoom out from product detail to reveal full product in context. NO PERSON. NO MODEL. NO CHARACTER. Product only. 8 seconds.'
    },
    'slow_pan': {
        name: '📷 แพนช้าๆ',
        prompt: 'Slow elegant pan across product surface highlighting craftsmanship. NO PERSON. NO MODEL. NO CHARACTER. Product only. 8 seconds.'
    },
    'turntable_spin': {
        name: '💫 หมุนบนแท่น',
        prompt: 'Product spinning on turntable with professional studio lighting. NO PERSON. NO MODEL. NO CHARACTER. Product only. 8 seconds.'
    },
    'floating_drift': {
        name: '🎈 ลอยละล่อง',
        prompt: 'Product gently floating and drifting with dreamy atmosphere. NO PERSON. NO MODEL. NO CHARACTER. Product only levitating. 8 seconds.'
    },
    'detail_montage': {
        name: '🎬 มอนตาจดีเทล',
        prompt: 'Quick montage cuts between various product detail close-ups. NO PERSON. NO MODEL. NO CHARACTER. Product details only. 8 seconds.'
    },
    'unboxing_reveal': {
        name: '📦 Unboxing',
        prompt: 'Dramatic unboxing reveal animation showing product emerging. NO PERSON. NO MODEL. NO CHARACTER. Product reveal only. 8 seconds.'
    },
    'dynamic_angles': {
        name: '⚡ มุมไดนามิก',
        prompt: 'Dynamic camera movement with multiple angle switches around product. NO PERSON. NO MODEL. NO CHARACTER. Product only. 8 seconds.'
    },
    'spotlight_focus': {
        name: '💡 Spotlight',
        prompt: 'Spotlight dramatically illuminating product in dark setting. NO PERSON. NO MODEL. NO CHARACTER. Product only. 8 seconds.'
    }
};

function getVideoPresentationStyle(styleId) {
    return VIDEO_PRESENTATION_STYLES[styleId] || VIDEO_PRESENTATION_STYLES['orbit_360'];
}

// ----------------------------------------------------------------------
// 🏷️ Price Tag & Details Styles (สำหรับป้ายราคา)
// ----------------------------------------------------------------------
const PRICE_TAG_STYLES = {
    'auto': {
        name: '✨ อัตโนมัติ (AI เลือกให้)',
        prompt: 'Use an AI-selected price tag style that best fits the product\'s aesthetics, color palette, and mood. It should look professional and integrated.'
    },
    'modern_minimal': {
        name: '⬜ Modern Minimal',
        prompt: 'Use a clean, white, modern minimalist rectangle tag with thin elegant fonts. Simple and sophisticated.'
    },
    'luxury_gold': {
        name: '🥇 Luxury Gold',
        prompt: 'Use a premium gold-bordered tag with serif fonts, metallic texture, and a sense of luxury and exclusivity.'
    },
     'bold_impact': {
        name: '💥 Bold Impact',
        prompt: 'Use a bold, high-contrast price tag (e.g., bright yellow or red with black text) to instantly grab attention. Large, thick fonts.'
    },
    'pastel_cute': {
        name: '🌸 Pastel Cute',
        prompt: 'Use soft pastel colors (pink, blue, mint) with rounded corners and cute, playful fonts. Suitable for teen or beauty products.'
    },
    'neon_cyber': {
        name: '💙 Neon Cyber',
        prompt: 'Use a futuristic neon-glowing tag (cyan, magenta) with digital/tech fonts. Dark background to make it pop. Cyberpunk vibe.'
    },
    'vintage_paper': {
        name: '📜 Vintage Paper',
        prompt: 'Use a textured craft paper or aged parchment tag style using typewriter fonts. Nostalgic, handmade, or organic vibe.'
    },
    'glass_morphism': {
        name: '🧊 Glassmorphism',
        prompt: 'Use a semi-transparent frosted glass effect tag with white text and subtle border. Modern, sleek, and high-tech look.'
    },
    'chalkboard': {
        name: '🖍️ Chalkboard',
        prompt: 'Use a black chalkboard style tag with handwritten white chalk text and doodle elements. Cafe or handmade vibe.'
    },
    'eco_natural': {
        name: '🍃 Eco Natural',
        prompt: 'Use a tag design inspired by nature, using green tones, leaf motifs, or recycled paper textures. Organic and eco-friendly.'
    },
    'sale_red': {
        name: '🧧 Red Sale Tag',
        prompt: 'Use a classic bright red sale tag or sticker style with bold white text. Indicates a special offer or discount.'
    }
};

function getPriceTagStyle(styleId) {
    return PRICE_TAG_STYLES[styleId] || PRICE_TAG_STYLES['auto'];
}

// ----------------------------------------------------------------------
// 🔮 Sai Moo Text Effects (เอฟเฟกต์ข้อความสายมู)
// ----------------------------------------------------------------------
const SAI_MOO_TEXT_EFFECTS = {
    'none': { name: '❌ ไม่มีเอฟเฟกต์', prompt: '' },
    'gold_emboss': { 
        name: '🥇 ทองนูน (Gold Emboss)', 
        prompt: 'Text Style: 3D Embossed Gold lettering, shiny metallic texture, sacred and premium look.' 
    },
    'glowing_aura': { 
        name: '✨ เรืองแสง (Glowing Aura)', 
        prompt: 'Text Style: Glowing celestial aura around the text, mystical light emitting from the letters, holy atmosphere.' 
    },
    'ancient_stone': { 
        name: '🗿 แกะสลักหิน (Ancient Stone)', 
        prompt: 'Text Style: Carved ancient stone texture, looking like sacred inscriptions on a temple wall, weathered and powerful.' 
    },
    'sacred_yantra': { 
        name: '🕉️ อักขระยันต์ (Sacred Yantra)', 
        prompt: 'Text Style: Text designed to look like sacred Thai/Pali Yantra tattoos (Sak Yant), mystical ink lines, spiritual power.' 
    },
    'fire_power': { 
        name: '🔥 เปลวเพลิง (Fire Power)', 
        prompt: 'Text Style: Burning text effect with flames and embers, representing power, passion, and intense energy.' 
    },
    'diamond_sparkle': { 
        name: '💎 เพชรระยิบ (Diamond Sparkle)', 
        prompt: 'Text Style: Sparkling diamond crystal texture, glittering and luxurious, representing wealth and clarity.' 
    },
    'neon_spiritual': { 
        name: '🔮 นีออนมู (Neon Spiritual)', 
        prompt: 'Text Style: Modern spiritual neon light (purple/gold/lotus pink), combining modern aesthetics with sacred symbols.' 
    },
    'cloud_heaven': { 
        name: '☁️ เมฆสวรรค์ (Cloud Heaven)', 
        prompt: 'Text Style: Soft white cloud-like formations forming the letters, dreamy and heavenly atmosphere.' 
    },
    'flower_garland': { 
        name: '🌼 พวงมาลัย (Flower Garland)', 
        prompt: 'Text Style: Text formed by traditional Thai flower garlands (Marigold/Jasmine), fresh, colorful, and auspicious.' 
    },
    'liquid_gold': { 
        name: '🧈 ทองคำเหลว (Liquid Gold)', 
        prompt: 'Text Style: Molten liquid gold flowing to form the characters, rich, fluid, and extremely wealthy looking.' 
    }
};

function getSaiMooTextEffect(effectId) {
    return SAI_MOO_TEXT_EFFECTS[effectId] || SAI_MOO_TEXT_EFFECTS['none'];
}

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
// 4. SACRED PRICE TAG STYLES - รูปแบบป้ายราคาสายมู
// ============================================

const SACRED_PRICE_TAG_STYLES = {
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
// 9. CAPTION POSITIONS - ตำแหน่งข้อความโฆษณา
// ============================================

const CAPTION_POSITIONS = {
    'under_price': {
        name: '⬇️ ใต้ป้ายราคา',
        prompt: 'placed distinctively below the price tag frame'
    },
    'above_price': {
        name: '⬆️ บนป้ายราคา',
        prompt: 'placed distinctively above the price tag frame'
    },
    'top_left': {
        name: '↖️ มุมบนซ้าย',
        prompt: 'positioned at top-left corner'
    },
    'top_right': {
        name: '↗️ มุมบนขวา',
        prompt: 'positioned at top-right corner'
    },
    'bottom_left': {
        name: '↙️ มุมล่างซ้าย',
        prompt: 'positioned at bottom-left corner'
    },
    'bottom_right': {
        name: '↘️ มุมล่างขวา',
        prompt: 'positioned at bottom-right corner'
    },
    'top_center': {
        name: '⬆️ ขอบบนกลาง',
        prompt: 'centered at the very top edge'
    },
    'bottom_center': {
        name: '⬇️ ขอบล่างกลาง',
        prompt: 'centered at the very bottom edge'
    },
    'center_left': {
        name: '⬅️ กลางซ้าย',
        prompt: 'centered vertically on the left side'
    },
    'center_right': {
        name: '➡️ กลางขวา',
        prompt: 'centered vertically on the right side'
    }
};

// ============================================
// 10. CHARACTER POSES - อริยาบถตัวละคร/เทวรูป (สำหรับ Sacred Video)
// ============================================

const CHARACTER_POSES = {
    'walk_forward': {
        name: '🚶 เดินไปข้างหน้า',
        prompt: 'walking forward slowly towards the viewer with graceful steps'
    },
    'float_down': {
        name: '⬇️ ลอยลงมา',
        prompt: 'floating down gracefully from above with divine light'
    },
    'float_up': {
        name: '⬆️ ลอยขึ้น',
        prompt: 'ascending upward with radiant divine energy'
    },
    'rotate_360': {
        name: '🔄 หมุนรอบตัว',
        prompt: 'rotating slowly 360 degrees with majestic presence'
    },
    'bless_hand': {
        name: '✋ ยกมือให้พร',
        prompt: 'raising hand in blessing gesture with sacred light emanating'
    },
    'pray_hands': {
        name: '🙏 พนมมือ',
        prompt: 'hands pressed together in prayer position with peaceful expression'
    },
    'wave_hand': {
        name: '👋 โบกมือ',
        prompt: 'waving hand gently with compassionate smile'
    },
    'radiate_aura': {
        name: '✨ ส่องรัศมี',
        prompt: 'emanating powerful radiant aura outward with divine energy'
    },
    'deep_breath': {
        name: '💨 หายใจลึก',
        prompt: 'breathing deeply with chest rising peacefully'
    },
    'look_around': {
        name: '👀 มองรอบ',
        prompt: 'looking around slowly with wise and knowing gaze'
    },
    'bow_head': {
        name: '🙇 ก้มศีรษะ',
        prompt: 'bowing head gracefully with humility and compassion'
    },
    'lift_head': {
        name: '🔝 เงยหน้า',
        prompt: 'lifting head upward towards the heavens with serene expression'
    },
    'blink_eyes': {
        name: '😌 กระพริบตา',
        prompt: 'blinking eyes slowly with calm meditative presence'
    },
    'soft_smile': {
        name: '😊 ยิ้มอ่อน',
        prompt: 'smiling softly with warmth and compassion'
    },
    'still_peace': {
        name: '🧘 นิ่งสงบ',
        prompt: 'standing still peacefully with serene meditative energy radiating'
    }
};

// ============================================
// 8. SYSTEM PROMPTS
// ============================================

// 4A. ภาพอวยพร (Blessing Image)
const SACRED_BLESSING_SYSTEM_PROMPT = `คุณคือ Thai Sacred Blessing Image Prompt Designer ระดับโลก
ผู้เชี่ยวชาญด้าน "สายมู ศาสตร์ฮินดู องค์เทพ สิ่งศักดิ์สิทธิ์ และพลังศรัทธา"
มีความเข้าใจเชิงลึกเกี่ยวกับองค์เทพ ปาง ภาคอวตาร สัญลักษณ์ ความหมายเชิงพลัง
และสามารถนำมาสื่อสารเป็น "ภาพอวยพร" ที่ศักดิ์สิทธิ์ น่าเคารพ และชวนให้ผู้พบเห็นอยากกดไลค์หรือแชร์

🎨 **ความเชี่ยวชาญพิเศษ:**
คุณเป็นมือโปรเขียน prompt และสร้างภาพระดับมืออาชีพ มีทักษะการตัดต่อภาพแบบแนบเนียนเทียบเท่า Photoshop, Affinity Photo
สามารถปรับแต่งแสง (Lighting), สี (Color Grading), และข้อความ (Typography) ได้อย่างสวยงามสมจริง
ภาพที่สร้างต้องดูเหมือนผ่านการ Retouch โดยมืออาชีพระดับโลก

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
+ <รูปแบบป้ายราคาและตำแหน่ง>

━━━━━━━━━━━━━━━━━━━━
🛒 กฎสำคัญ (สำหรับภาพโฆษณา)
━━━━━━━━━━━━━━━━━━━━

1. รักษาสินค้า/องค์เทพจากภาพต้นฉบับ 100%
• ใช้คำสั่ง "use sacred item/deity from reference image exactly as-is"

2. ⚠️⚠️⚠️ กฎเหล็กเรื่องภาษาไทย (สำคัญที่สุด!) ⚠️⚠️⚠️
• ข้อความทั้งหมดในภาพต้องเป็น ภาษาไทย 100% 
• ห้ามมีคำภาษาอังกฤษปนในภาพเด็ดขาด!
• ห้าม translate ชื่อสินค้า/ราคาเป็นภาษาอังกฤษ
• ใช้ text overlay with exact Thai text: "ข้อความภาษาไทยตรงนี้"
• ตัวอักษรไทยต้องชัดเจน อ่านง่าย (High legibility Thai font)

3. การใช้คำศัพท์
• ห้ามใช้คำว่า "ราคา" หรือ "Price" หรือ "Worship"
• ให้ใช้คำว่า "บูชา" แทน
• รูปแบบราคา: "บูชา XXX บาท" หรือ "บูชา 599 บาท จาก 999 บาท"

4. การจัดวาง (Layout)
• ป้ายราคา: ใส่ชื่อสินค้า (ภาษาไทย) + ราคาบูชา (ภาษาไทย)
• ข้อความโฆษณา: ใส่ในตำแหน่งที่ระบุ โดยมีพื้นหลัง Gradient
• ห้ามข้อความโฆษณาทับซ้อนกับป้ายราคา

5. สไตล์ภาพ
• บรรยากาศศักดิ์สิทธิ์ (Divine, Sacred, Magical)
• แสงออร่าทอง (Golden Aura), ควันธูป, กลีบบัว
• สีมงคล: ทอง, แดง, ขาวบริสุทธิ์

━━━━━━━━━━━━━━━━━━━━
🧩 OUTPUT FORMAT (สำคัญมาก!)
━━━━━━━━━━━━━━━━━━━━
ตอบกลับเฉพาะ Prompt ภาษาอังกฤษเท่านั้น บรรทัดเดียว และต้องระบุข้อความไทยตรงๆ ในรูปแบบนี้:

High quality sacred commercial poster for Thai amulet, divine atmosphere with golden aura, 
price tag frame in [style] style containing Thai text: "[ชื่อสินค้าภาษาไทยตรงนี้]" and Thai text: "บูชา [ราคา] บาท",
caption overlay with Thai text: "[ข้อความโฆษณาภาษาไทยตรงนี้]" on gradient background,
ALL TEXT MUST BE IN THAI LANGUAGE, sharp Thai typography, divine glow effects`;

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

function getSacredPriceTagStyle(styleId) {
    return SACRED_PRICE_TAG_STYLES[styleId] || SACRED_PRICE_TAG_STYLES['circle_gold'];
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

function getAllSacredPriceTagStyles() {
    return Object.entries(SACRED_PRICE_TAG_STYLES).map(([id, data]) => ({
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
    window.SACRED_PRICE_TAG_STYLES = SACRED_PRICE_TAG_STYLES;
    window.PRICE_TAG_COLORS = PRICE_TAG_COLORS;
    window.VOICE_TONES = VOICE_TONES;
    window.SPEECH_MODES = SPEECH_MODES;
    window.CAPTION_POSITIONS = CAPTION_POSITIONS;
    window.CHARACTER_POSES = CHARACTER_POSES;
    window.TEXT_EFFECTS = TEXT_EFFECTS;
    window.IMAGE_PRESENTATION_STYLES = IMAGE_PRESENTATION_STYLES;
    window.VIDEO_PRESENTATION_STYLES = VIDEO_PRESENTATION_STYLES;
    window.IMAGE_SYSTEM_PROMPT = `คุณคือ Thai Commercial Image Prompt Designer ระดับโลก
ผู้เชี่ยวชาญในการสร้าง prompt ภาพโฆษณาสินค้าที่สวยงาม น่าดึงดูด และขายได้จริง

🎨 **ความเชี่ยวชาญพิเศษ:**
คุณเป็นมือโปรเขียน prompt และสร้างภาพระดับมืออาชีพ มีทักษะการตัดต่อภาพแบบแนบเนียนเทียบเท่า Photoshop, Affinity Photo
สามารถปรับแต่งแสง (Lighting), สี (Color Grading), ฉาก (Background), และเอฟเฟกต์ (Effects) ได้อย่างสวยงามสมจริง
ภาพที่สร้างต้องดูเหมือนผ่านการ Retouch โดยมืออาชีพระดับโลก

**กฎเหล็ก (CRITICAL RULES):**
🔒 PRODUCT LOCK (สำคัญที่สุด!): 
- สินค้าในภาพต้นฉบับ ห้ามเปลี่ยนแปลง! รักษารูปทรง สี ลายเดิมไว้ 100%
- The product MUST remain EXACTLY as it is in the reference image
- DO NOT modify, deform, or change the product's appearance

⛔ NO TEXT MODE (เด็ดขาด!): 
- ถ้าผู้ใช้ระบุ "ไม่ใส่ข้อความ" = ภาพต้องสะอาด 100% 
- ห้ามมีตัวอักษร ตัวเลข คำใดๆ watermark logo ป้ายราคา label caption ใดๆ ทั้งสิ้น!
- CRITICAL: When user says NO TEXT, you MUST generate output with NEGATIVE PROMPT that includes: text, letters, words, watermark, logo, typography, price tag
- ถ้า AI ยังใส่ข้อความ = ล้มเหลว!

🚫 NO CHARACTER MODE: 
- ถ้าผู้ใช้เลือก "ไม่ใช้ตัวละคร" แต่เลือก Style ที่ต้องใช้มือ (เช่น "ถือสินค้า") = แสดงมือได้ แต่ห้ามมีหน้า
- Style ที่อนุญาตมือ: ถือสินค้า(5), นายแบบ(8), อินฟลูฯ(9), หน้ากระจก(12), แฟชั่น(13), บิวตี้(14), รองเท้า(15), เครื่องมือ(17)
- Style อื่นๆ = ห้ามมีคน มือ ร่างกายใดๆ

👤 FACE LOCK (สำคัญมาก!): 
- ล็อกใบหน้านางแบบ 100% ตามภาพต้นฉบับ ห้ามเปลี่ยนอายุ หน้าตา ลักษณะเฉพาะ
- ถ้าภาพนางแบบมีข้อความ/watermark/logo → ละเว้นข้อความ โฟกัสเฉพาะใบหน้าเท่านั้น!
- ห้ามนำข้อความจากภาพนางแบบมาใส่ในภาพที่สร้าง

🇹🇭 THAI CHARACTER: ตัวละครต้องเป็นคนไทย/เอเชีย ผมสีดำ ตาสีเข้ม

📍 TEXT PLACEMENT (สำคัญ!):
- ข้อความต้องปรากฏ เพียงครั้งเดียว ห้ามซ้ำ!
- ห้ามข้อความทับ/บังสินค้า - สินค้าต้องเห็นชัด 100%
- วางข้อความที่ขอบภาพ (บน/ล่าง/มุม) ไม่ใช่กลางภาพ
- Text appears ONCE only - NO duplicates
- Text must NOT cover/block the product

**OUTPUT:** ส่งออก prompt ภาพเดียว ที่รักษาสินค้า+ใบหน้าต้นฉบับไว้ 100% พร้อมใส่ Style + Background + Effect ที่ผู้ใช้เลือก`;
    window.VIDEO_SYSTEM_PROMPT = `คุณคือ Thai Commercial Video Prompt Designer ระดับโลก
ผู้เชี่ยวชาญสร้าง prompt วิดีโอโฆษณา TikTok/Reels คุณภาพสูง

🎨 **ความเชี่ยวชาญพิเศษ:**
คุณเป็นมือโปรสร้างวิดีโอระดับมืออาชีพ เข้าใจ Motion Graphics, Transitions, และ Cinematic Shots
สามารถกำหนดการเคลื่อนไหว แสง สี ให้ดูสมจริงและน่าดึงดูด

**กฎเหล็ก:**
🚫 NO TEXT MODE: วิดีโอต้องสะอาด ไม่มี caption ซ้อน
🔒 TEXT FREEZE: ข้อความที่มีในภาพต้นฉบับ = STATIC, FROZEN ไม่เบลอ ไม่ขยับ

**OUTPUT:** ส่งออก prompt วิดีโอเดียว พร้อมใช้งาน`;
    window.SACRED_BLESSING_SYSTEM_PROMPT = SACRED_BLESSING_SYSTEM_PROMPT;
    window.SACRED_COMMERCIAL_SYSTEM_PROMPT = SACRED_COMMERCIAL_SYSTEM_PROMPT;
    window.SACRED_VIDEO_SYSTEM_PROMPT = SACRED_VIDEO_SYSTEM_PROMPT;
    window.DEITY_DETECTION_PROMPT = DEITY_DETECTION_PROMPT;
    window.getDeityInfo = getDeityInfo;
    window.getSacredEffect = getSacredEffect;
    window.getDeityMood = getDeityMood;
    window.getPriceTagStyle = getPriceTagStyle;
    window.getSacredPriceTagStyle = getSacredPriceTagStyle;
    window.getPriceTagColor = getPriceTagColor;
    window.getVoiceTone = getVoiceTone;
    window.getSpeechMode = getSpeechMode;
    window.getTextEffect = getTextEffect;
    window.getImagePresentationStyle = getImagePresentationStyle;
    window.getVideoPresentationStyle = getVideoPresentationStyle;
    window.getAllDeities = getAllDeities;
    window.getAllSacredEffects = getAllSacredEffects;
    window.getAllDeityMoods = getAllDeityMoods;
    window.getAllPriceTagStyles = getAllPriceTagStyles;
    window.getAllSacredPriceTagStyles = getAllSacredPriceTagStyles;
    window.getAllPriceTagColors = getAllPriceTagColors;
    window.getAllVoiceTones = getAllVoiceTones;
    window.getAllSpeechModes = getAllSpeechModes;
}
