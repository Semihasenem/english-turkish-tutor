import { DailySessionPlan } from '../types';

export const GRAMMAR_LESSONS: DailySessionPlan[] = [
  {
    grammarTopic: "Present Simple Tense",
    explanation: "Aye, the Present Simple be like the steady trade winds - always reliable! Use it for habits, facts, and regular business activities, savvy?",
    detailedExplanation: [
      {
        type: "text",
        content: "Present Simple describes regular actions, facts, and habits. In business, we use it for schedules, prices, and company information."
      },
      {
        type: "example",
        english: "We import frames from Italy every month.",
        turkish: "Her ay İtalya'dan çerçeve ithal ediyoruz."
      },
      {
        type: "example",
        english: "This collection costs $50 per frame.",
        turkish: "Bu koleksiyon çerçeve başına 50 dolar."
      },
      {
        type: "quiz",
        question: "Which sentence uses Present Simple correctly?",
        options: ["We are importing frames yesterday", "We import frames every week", "We imported frames tomorrow"],
        answer: "We import frames every week"
      },
      {
        type: "text",
        content: "Remember: Add 's' or 'es' for he/she/it. 'The company sells quality eyewear.'"
      },
      {
        type: "quiz",
        question: "Complete: 'Cengo _____ with suppliers every Tuesday.'",
        options: ["meet", "meets", "meeting"],
        answer: "meets"
      }
    ],
    vocabulary: [
      { english: "Import", turkish: "İthal etmek", category: "Business" },
      { english: "Schedule", turkish: "Program", category: "Business" },
      { english: "Quality", turkish: "Kalite", category: "Eyewear" },
      { english: "Supplier", turkish: "Tedarikçi", category: "Business" },
      { english: "Regular", turkish: "Düzenli", category: "Business" },
      { english: "Price list", turkish: "Fiyat listesi", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "We ___ business with many countries.",
        turkish: "Birçok ülkeyle ___ yapıyoruz.",
        blank: "do",
        options: ["do", "does", "doing", "did"]
      },
      {
        sentence: "The trade fair ___ place in March every year.",
        turkish: "Ticaret fuarı her yıl Mart'ta ___.",
        blank: "takes",
        options: ["take", "takes", "taking", "took"]
      },
      {
        sentence: "Our frames ___ from premium materials.",
        turkish: "Çerçevelerimiz premium malzemelerden ___.",
        blank: "come",
        options: ["comes", "come", "coming", "came"]
      }
    ],
    conversationPrompt: "You're at a trade fair introducing your eyewear business. Practice using Present Simple to describe what your company does, your regular activities, and your product features.",
    summary: "Well done, matey! Now ye know how to describe yer business activities and regular habits like a true merchant captain!"
  },
  {
    grammarTopic: "Past Simple Tense",
    explanation: "The Past Simple be like tales from yer previous voyages - finished adventures that made ye the successful trader ye are today!",
    detailedExplanation: [
      {
        type: "text",
        content: "Past Simple describes completed actions in the past. Perfect for sharing business experiences and achievements with potential partners."
      },
      {
        type: "example",
        english: "Last year, we sold 10,000 frames to European markets.",
        turkish: "Geçen yıl Avrupa pazarlarına 10.000 çerçeve sattık."
      },
      {
        type: "example",
        english: "We started our business in Istanbul five years ago.",
        turkish: "İşimizi beş yıl önce İstanbul'da başlattık."
      },
      {
        type: "quiz",
        question: "Which sentence is in Past Simple?",
        options: ["We sell frames yesterday", "We sold frames yesterday", "We are selling frames yesterday"],
        answer: "We sold frames yesterday"
      },
      {
        type: "text",
        content: "Regular verbs add '-ed': worked, started, launched. Irregular verbs change completely: go→went, buy→bought, make→made."
      },
      {
        type: "quiz",
        question: "What's the past form of 'meet'?",
        options: ["meeted", "met", "meet"],
        answer: "met"
      }
    ],
    vocabulary: [
      { english: "Launched", turkish: "Başlattı", category: "Business" },
      { english: "Achievement", turkish: "Başarı", category: "Business" },
      { english: "Established", turkish: "Kurdu", category: "Business" },
      { english: "Expanded", turkish: "Genişletti", category: "Business" },
      { english: "Partnership", turkish: "Ortaklık", category: "Business" },
      { english: "Experience", turkish: "Deneyim", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "We ___ our first international client in 2020.",
        turkish: "İlk uluslararası müşterimizi 2020'de ___.",
        blank: "met",
        options: ["meet", "met", "meeting", "meets"]
      },
      {
        sentence: "The company ___ from a small workshop.",
        turkish: "Şirket küçük bir atölyeden ___.",
        blank: "grew",
        options: ["grow", "grew", "growing", "grows"]
      },
      {
        sentence: "Last month, we ___ a new collection.",
        turkish: "Geçen ay yeni bir koleksiyon ___.",
        blank: "launched",
        options: ["launch", "launched", "launching", "launches"]
      }
    ],
    conversationPrompt: "Share your business journey! Tell potential partners about how you started, what you achieved, and the milestones you reached using Past Simple.",
    summary: "Excellent work, first mate! Ye can now share yer business adventures and build trust with tales of past successes!"
  },
  {
    grammarTopic: "Present Continuous Tense",
    explanation: "Present Continuous be like the wind in yer sails right now - actions happening at this very moment or temporary situations, mate!",
    detailedExplanation: [
      {
        type: "text",
        content: "Present Continuous (am/is/are + -ing) shows actions happening now or temporary situations. Very useful for current business projects!"
      },
      {
        type: "example",
        english: "We are expanding into new markets this year.",
        turkish: "Bu yıl yeni pazarlara genişliyoruz."
      },
      {
        type: "example",
        english: "I am currently negotiating with Italian suppliers.",
        turkish: "Şu anda İtalyan tedarikçilerle müzakere ediyorum."
      },
      {
        type: "quiz",
        question: "Which shows Present Continuous?",
        options: ["We develop new products", "We are developing new products", "We developed new products"],
        answer: "We are developing new products"
      },
      {
        type: "text",
        content: "Use for: 1) Actions happening now 2) Temporary situations 3) Future plans already arranged"
      },
      {
        type: "quiz",
        question: "Complete: 'The designer _____ on new frame styles.'",
        options: ["work", "is working", "worked"],
        answer: "is working"
      }
    ],
    vocabulary: [
      { english: "Currently", turkish: "Şu anda", category: "Business" },
      { english: "Expanding", turkish: "Genişliyor", category: "Business" },
      { english: "Developing", turkish: "Geliştiriyor", category: "Business" },
      { english: "Negotiating", turkish: "Müzakere ediyor", category: "Business" },
      { english: "Planning", turkish: "Planlıyor", category: "Business" },
      { english: "Preparing", turkish: "Hazırlıyor", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "We ___ preparing for the trade fair next month.",
        turkish: "Gelecek ay ticaret fuarına ___.",
        blank: "are",
        options: ["is", "are", "am", "be"]
      },
      {
        sentence: "The team ___ working on a new catalog design.",
        turkish: "Ekip yeni katalog tasarımı üzerinde ___.",
        blank: "is",
        options: ["are", "is", "am", "be"]
      },
      {
        sentence: "I ___ meeting with potential buyers this week.",
        turkish: "Bu hafta potansiyel alıcılarla ___.",
        blank: "am",
        options: ["is", "are", "am", "be"]
      }
    ],
    conversationPrompt: "Discuss your current projects and what's happening in your business right now. Use Present Continuous to show you're active and growing!",
    summary: "Brilliant, matey! Now ye can talk about yer current adventures and show partners that yer business is sailing forward!"
  },
  {
    grammarTopic: "Future Tense (will & going to)",
    explanation: "Future tenses be like charting yer course ahead - use 'will' for promises and decisions, 'going to' for plans already brewing, savvy?",
    detailedExplanation: [
      {
        type: "text",
        content: "Two main ways to express future: 'will' for spontaneous decisions and promises, 'going to' for planned actions and predictions."
      },
      {
        type: "example",
        english: "We will deliver your order by Friday. (Promise)",
        turkish: "Siparişinizi Cuma'ya kadar teslim edeceğiz. (Söz)"
      },
      {
        type: "example",
        english: "We are going to launch new models next season. (Plan)",
        turkish: "Gelecek sezon yeni modeller çıkaracağız. (Plan)"
      },
      {
        type: "quiz",
        question: "Which expresses a planned future action?",
        options: ["I will call you", "I am going to call you tomorrow", "I call you"],
        answer: "I am going to call you tomorrow"
      },
      {
        type: "text",
        content: "Use 'will' for: promises, offers, instant decisions. Use 'going to' for: plans, predictions with evidence."
      },
      {
        type: "quiz",
        question: "'We ___ give you a special discount.' (Making an offer)",
        options: ["are going to", "will", "going to"],
        answer: "will"
      }
    ],
    vocabulary: [
      { english: "Forecast", turkish: "Öngörü", category: "Business" },
      { english: "Intention", turkish: "Niyet", category: "Business" },
      { english: "Prediction", turkish: "Tahmin", category: "Business" },
      { english: "Promise", turkish: "Söz", category: "Business" },
      { english: "Deadline", turkish: "Son tarih", category: "Business" },
      { english: "Future plans", turkish: "Gelecek planları", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "We ___ open a new showroom next year.",
        turkish: "Gelecek yıl yeni bir showroom ___.",
        blank: "are going to",
        options: ["will", "are going to", "going to", "will be"]
      },
      {
        sentence: "Don't worry, I ___ handle the shipping personally.",
        turkish: "Merak etme, sevkiyatı kişisel olarak ___ halledeceğim.",
        blank: "will",
        options: ["will", "am going to", "going to", "shall"]
      },
      {
        sentence: "The market ___ grow significantly this decade.",
        turkish: "Pazar bu on yılda önemli ölçüde ___.",
        blank: "is going to",
        options: ["will", "is going to", "going to", "shall"]
      }
    ],
    conversationPrompt: "Share your business vision and future plans. Use 'will' for promises to clients and 'going to' for your strategic plans!",
    summary: "Outstanding, first mate! Now ye can navigate future conversations and make yer business intentions crystal clear!"
  },
  {
    grammarTopic: "Modal Verbs (can, should, must)",
    explanation: "Modal verbs be like the different flags on yer ship - each one sends a different message about ability, advice, or necessity, matey!",
    detailedExplanation: [
      {
        type: "text",
        content: "Modal verbs express ability (can), advice (should), and necessity (must). Essential for professional communication!"
      },
      {
        type: "example",
        english: "We can provide custom designs for your brand.",
        turkish: "Markanız için özel tasarımlar sağlayabiliriz."
      },
      {
        type: "example",
        english: "You should consider our premium collection.",
        turkish: "Premium koleksiyonumuzu değerlendirmelisiniz."
      },
      {
        type: "quiz",
        question: "Which modal shows ability?",
        options: ["You must pay now", "You should pay now", "You can pay now"],
        answer: "You can pay now"
      },
      {
        type: "text",
        content: "Can = ability/permission, Should = advice/recommendation, Must = necessity/obligation"
      },
      {
        type: "quiz",
        question: "'All orders ___ be confirmed within 24 hours.' (Company policy)",
        options: ["can", "should", "must"],
        answer: "must"
      }
    ],
    vocabulary: [
      { english: "Ability", turkish: "Yetenek", category: "Business" },
      { english: "Recommendation", turkish: "Tavsiye", category: "Business" },
      { english: "Policy", turkish: "Politika", category: "Business" },
      { english: "Requirement", turkish: "Gereklilik", category: "Business" },
      { english: "Flexibility", turkish: "Esneklik", category: "Business" },
      { english: "Obligation", turkish: "Yükümlülük", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "We ___ offer you various payment options.",
        turkish: "Size çeşitli ödeme seçenekleri ___.",
        blank: "can",
        options: ["can", "should", "must", "will"]
      },
      {
        sentence: "You ___ check our quality certificates before ordering.",
        turkish: "Sipariş vermeden önce kalite sertifikalarımızı ___.",
        blank: "should",
        options: ["can", "should", "must", "may"]
      },
      {
        sentence: "All international shipments ___ include proper documentation.",
        turkish: "Tüm uluslararası sevkiyatlar uygun belgeleri ___.",
        blank: "must",
        options: ["can", "should", "must", "may"]
      }
    ],
    conversationPrompt: "Discuss your business capabilities, give professional advice to clients, and explain company policies using modal verbs appropriately.",
    summary: "Exceptional work, matey! Now ye can communicate like a true professional captain - with the right tone for every business situation!"
  },
  {
    grammarTopic: "Comparative and Superlative Adjectives",
    explanation: "Comparing things be like choosing the finest treasures - sometimes good, sometimes better, sometimes the absolute best in all the seven seas!",
    detailedExplanation: [
      {
        type: "text",
        content: "Use comparative (-er, more) to compare two things, superlative (-est, most) for the best/worst among three or more."
      },
      {
        type: "example",
        english: "Our frames are lighter than traditional acetate frames.",
        turkish: "Çerçevelerimiz geleneksel asetat çerçevelerden daha hafif."
      },
      {
        type: "example",
        english: "This is the most popular model in our collection.",
        turkish: "Bu, koleksiyonumuzdaki en popüler model."
      },
      {
        type: "quiz",
        question: "Which is correct?",
        options: ["more cheap than", "cheaper than", "cheapest than"],
        answer: "cheaper than"
      },
      {
        type: "text",
        content: "Short adjectives: add -er/-est (cheap→cheaper→cheapest). Long adjectives: use more/most (expensive→more expensive→most expensive)"
      },
      {
        type: "quiz",
        question: "'This design is ___ than the previous version.'",
        options: ["more modern", "moderner", "most modern"],
        answer: "more modern"
      }
    ],
    vocabulary: [
      { english: "Superior", turkish: "Üstün", category: "Business" },
      { english: "Competitive", turkish: "Rekabetçi", category: "Business" },
      { english: "Premium", turkish: "Premium", category: "Eyewear" },
      { english: "Durable", turkish: "Dayanıklı", category: "Eyewear" },
      { english: "Lightweight", turkish: "Hafif", category: "Eyewear" },
      { english: "Affordable", turkish: "Uygun fiyatlı", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "Titanium frames are ___ than plastic ones.",
        turkish: "Titanyum çerçeveler plastik olanlardan daha ___.",
        blank: "stronger",
        options: ["strong", "stronger", "strongest", "more strong"]
      },
      {
        sentence: "This is the ___ collection we've ever produced.",
        turkish: "Bu şimdiye kadar ürettiğimiz ___ koleksiyon.",
        blank: "best",
        options: ["good", "better", "best", "most good"]
      },
      {
        sentence: "Our prices are ___ competitive than our competitors'.",
        turkish: "Fiyatlarımız rakiplerimizinkinden ___.",
        blank: "more",
        options: ["most", "more", "much", "many"]
      }
    ],
    conversationPrompt: "Compare your products with competitors, highlight your advantages, and discuss what makes your eyewear collection special in the market.",
    summary: "Magnificent, first mate! Now ye can showcase yer treasures as the finest in any port and convince any merchant of their superior value!"
  },
  {
    grammarTopic: "Prepositions of Time (in, on, at)",
    explanation: "Time prepositions be like navigation markers - they tell ye exactly when things happen in the business world, savvy?",
    detailedExplanation: [
      {
        type: "text",
        content: "Use 'in' for months/years/long periods, 'on' for specific days/dates, 'at' for exact times. Essential for scheduling meetings!"
      },
      {
        type: "example",
        english: "The trade fair is in March, on the 15th, at 9 AM.",
        turkish: "Ticaret fuarı Mart'ta, 15'inde, sabah 9'da."
      },
      {
        type: "example",
        english: "We work on weekdays, but not at night.",
        turkish: "Hafta içi çalışıyoruz ama gece değil."
      },
      {
        type: "quiz",
        question: "'The meeting is ___ Tuesday.' Which preposition?",
        options: ["in", "on", "at"],
        answer: "on"
      },
      {
        type: "text",
        content: "IN: months, years, seasons, morning/afternoon/evening. ON: days, dates. AT: exact times, night, weekend."
      },
      {
        type: "quiz",
        question: "'We close ___ 6 PM every day.'",
        options: ["in", "on", "at"],
        answer: "at"
      }
    ],
    vocabulary: [
      { english: "Schedule", turkish: "Program", category: "Business" },
      { english: "Appointment", turkish: "Randevu", category: "Business" },
      { english: "Deadline", turkish: "Son tarih", category: "Business" },
      { english: "Timeline", turkish: "Zaman çizelgesi", category: "Business" },
      { english: "Business hours", turkish: "Çalışma saatleri", category: "Business" },
      { english: "Availability", turkish: "Uygunluk", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "We launch new collections ___ spring every year.",
        turkish: "Her yıl ___ ilkbaharda yeni koleksiyonlar çıkarıyoruz.",
        blank: "in",
        options: ["in", "on", "at", "by"]
      },
      {
        sentence: "The presentation is scheduled ___ Monday morning.",
        turkish: "Sunum Pazartesi sabahına ___ planlandı.",
        blank: "on",
        options: ["in", "on", "at", "by"]
      },
      {
        sentence: "Our office opens ___ 8:30 AM sharp.",
        turkish: "Ofisimiz tam ___ 8:30'da açılır.",
        blank: "at",
        options: ["in", "on", "at", "by"]
      }
    ],
    conversationPrompt: "Practice scheduling meetings, discussing delivery times, and coordinating business activities using the correct time prepositions.",
    summary: "Perfect timing, matey! Now ye can navigate any schedule and coordinate yer business adventures with precision worthy of a master navigator!"
  },
  {
    grammarTopic: "Question Formation (Wh-questions)",
    explanation: "Asking the right questions be like having a compass in negotiations - they guide ye to the treasure of information ye need, mate!",
    detailedExplanation: [
      {
        type: "text",
        content: "Wh-questions (What, When, Where, Why, How, Who) help you gather important business information. Structure: Wh-word + auxiliary + subject + main verb."
      },
      {
        type: "example",
        english: "What is your minimum order quantity?",
        turkish: "Minimum sipariş miktarınız nedir?"
      },
      {
        type: "example",
        english: "When can you deliver the frames?",
        turkish: "Çerçeveleri ne zaman teslim edebilirsiniz?"
      },
      {
        type: "quiz",
        question: "Which question asks about location?",
        options: ["When do you ship?", "Where is your factory?", "Why choose us?"],
        answer: "Where is your factory?"
      },
      {
        type: "text",
        content: "What=ne/nedir, When=ne zaman, Where=nerede, Why=neden, How=nasıl, Who=kim, Which=hangi"
      },
      {
        type: "quiz",
        question: "'___ much does shipping cost?'",
        options: ["What", "How", "Where"],
        answer: "How"
      }
    ],
    vocabulary: [
      { english: "Inquiry", turkish: "Sorgulama", category: "Business" },
      { english: "Information", turkish: "Bilgi", category: "Business" },
      { english: "Details", turkish: "Detaylar", category: "Business" },
      { english: "Specifications", turkish: "Özellikler", category: "Eyewear" },
      { english: "Requirements", turkish: "Gereksinimler", category: "Business" },
      { english: "Conditions", turkish: "Koşullar", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "___ is your payment policy?",
        turkish: "Ödeme politikanız ___?",
        blank: "What",
        options: ["What", "When", "Where", "Why"]
      },
      {
        sentence: "___ long does production take?",
        turkish: "Üretim ___ sürüyor?",
        blank: "How",
        options: ["What", "When", "How", "Why"]
      },
      {
        sentence: "___ do you choose our competitors?",
        turkish: "Rakiplerimizi ___ tercih ediyorsunuz?",
        blank: "Why",
        options: ["What", "When", "Where", "Why"]
      }
    ],
    conversationPrompt: "Practice asking important business questions to gather information about suppliers, understand client needs, and clarify terms and conditions.",
    summary: "Excellent questioning, first mate! Now ye can navigate any business conversation and uncover all the information ye need like a true merchant detective!"
  },
  {
    grammarTopic: "Basic Sentence Structure (Subject + Verb + Object)",
    explanation: "Every good ship needs a sturdy frame, matey! English sentences follow a simple pattern: who does what to what. Master this and ye'll speak like a true captain!",
    detailedExplanation: [
      {
        type: "text",
        content: "Basic English sentences follow Subject + Verb + Object (SVO). Subject = who/what, Verb = action, Object = what receives the action."
      },
      {
        type: "example",
        english: "Cengo sells eyewear.",
        turkish: "Cengo gözlük satıyor. (Cengo = özne, sells = fiil, eyewear = nesne)"
      },
      {
        type: "example",
        english: "We import frames from Italy.",
        turkish: "İtalya'dan çerçeve ithal ediyoruz."
      },
      {
        type: "quiz",
        question: "In 'The customer bought sunglasses', what is the object?",
        options: ["customer", "bought", "sunglasses"],
        answer: "sunglasses"
      },
      {
        type: "text",
        content: "Not all sentences need objects. 'The ship sails.' (Subject + Verb). But SVO is the most common pattern in business English."
      },
      {
        type: "quiz",
        question: "Complete the pattern: 'I ___ business cards.' (give to clients)",
        options: ["give", "giving", "gave"],
        answer: "give"
      }
    ],
    vocabulary: [
      { english: "Subject", turkish: "Özne", category: "Business" },
      { english: "Object", turkish: "Nesne", category: "Business" },
      { english: "Action", turkish: "Eylem", category: "Business" },
      { english: "Pattern", turkish: "Kalıp", category: "Business" },
      { english: "Structure", turkish: "Yapı", category: "Business" },
      { english: "Basic", turkish: "Temel", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "The company ___ quality products.",
        turkish: "Şirket kaliteli ürünler ___.",
        blank: "makes",
        options: ["make", "makes", "making", "made"]
      },
      {
        sentence: "Our customers ___ our service.",
        turkish: "Müşterilerimiz hizmetimizi ___.",
        blank: "appreciate",
        options: ["appreciates", "appreciate", "appreciating", "appreciated"]
      },
      {
        sentence: "I ___ trade fairs every year.",
        turkish: "Her yıl ticaret fuarlarını ___.",
        blank: "attend",
        options: ["attends", "attend", "attending", "attended"]
      }
    ],
    conversationPrompt: "Practice building simple, clear sentences about your business using Subject + Verb + Object pattern. Start with basic statements about what you do.",
    summary: "Brilliant work, first mate! Now ye have the foundation to build any sentence like constructing a solid ship!"
  },
  {
    grammarTopic: "Articles (a, an, the)",
    explanation: "Articles be like the flags on yer mast - small but mighty important! They tell others exactly what treasure ye're talking about, savvy?",
    detailedExplanation: [
      {
        type: "text",
        content: "Articles are small words before nouns. 'A/An' = any one thing (indefinite), 'The' = specific thing (definite). Essential for clear business communication!"
      },
      {
        type: "example",
        english: "I need a supplier. (any supplier)",
        turkish: "Bir tedarikçiye ihtiyacım var. (herhangi bir tedarikçi)"
      },
      {
        type: "example",
        english: "I need the supplier we met yesterday. (specific one)",
        turkish: "Dün tanıştığımız tedarikçiye ihtiyacım var. (belirli biri)"
      },
      {
        type: "quiz",
        question: "When do we use 'an' instead of 'a'?",
        options: ["before plural nouns", "before vowel sounds", "before 'the'"],
        answer: "before vowel sounds"
      },
      {
        type: "text",
        content: "Use 'a' before consonant sounds (a business), 'an' before vowel sounds (an order, an hour). Use 'the' for specific things both speakers know about."
      },
      {
        type: "quiz",
        question: "'Can you show me ___ new collection?' (specific one you mentioned)",
        options: ["a", "an", "the"],
        answer: "the"
      }
    ],
    vocabulary: [
      { english: "Definite", turkish: "Belirli", category: "Business" },
      { english: "Indefinite", turkish: "Belirsiz", category: "Business" },
      { english: "Specific", turkish: "Özel", category: "Business" },
      { english: "General", turkish: "Genel", category: "Business" },
      { english: "Article", turkish: "Artikel", category: "Business" },
      { english: "Vowel", turkish: "Sesli harf", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "We need ___ experienced optician for our team.",
        turkish: "Ekibimiz için ___ deneyimli gözlükçüye ihtiyacımız var.",
        blank: "an",
        options: ["a", "an", "the", "---"]
      },
      {
        sentence: "Can you send me ___ catalog we discussed?",
        turkish: "Tartıştığımız ___ katalogu bana gönderebilir misiniz?",
        blank: "the",
        options: ["a", "an", "the", "---"]
      },
      {
        sentence: "This is ___ best frame in our collection.",
        turkish: "Bu koleksiyonumuzdaki ___ en iyi çerçeve.",
        blank: "the",
        options: ["a", "an", "the", "---"]
      }
    ],
    conversationPrompt: "Practice using articles correctly when discussing your products, services, and business needs. Pay attention to whether you're talking about something general or specific.",
    summary: "Perfect navigation, matey! Now ye can point to exactly the right treasure with the right words - no more confusion about which ship we're talking about!"
  },
  {
    grammarTopic: "Plural Nouns and There is/There are",
    explanation: "Counting yer treasures properly be essential, mate! One frame or many frames, one lens or several lenses - get the count right and use the right words!",
    detailedExplanation: [
      {
        type: "text",
        content: "Plural nouns show more than one thing. Most add 's', some change completely. Use 'There is' with singular, 'There are' with plural."
      },
      {
        type: "example",
        english: "There is one frame on the table.",
        turkish: "Masada bir çerçeve var."
      },
      {
        type: "example",
        english: "There are many frames in our showroom.",
        turkish: "Showroomumuzda birçok çerçeve var."
      },
      {
        type: "quiz",
        question: "Which is correct?",
        options: ["There is two problems", "There are two problems", "There be two problems"],
        answer: "There are two problems"
      },
      {
        type: "text",
        content: "Common plurals: frame→frames, lens→lenses, business→businesses, child→children, person→people"
      },
      {
        type: "quiz",
        question: "What's the plural of 'company'?",
        options: ["companys", "companies", "companyes"],
        answer: "companies"
      }
    ],
    vocabulary: [
      { english: "Singular", turkish: "Tekil", category: "Business" },
      { english: "Plural", turkish: "Çoğul", category: "Business" },
      { english: "Quantity", turkish: "Miktar", category: "Business" },
      { english: "Several", turkish: "Birkaç", category: "Business" },
      { english: "Multiple", turkish: "Birden çok", category: "Business" },
      { english: "Various", turkish: "Çeşitli", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "There ___ five different styles in this collection.",
        turkish: "Bu koleksiyonda beş farklı stil ___.",
        blank: "are",
        options: ["is", "are", "be", "was"]
      },
      {
        sentence: "We have many ___ from different countries.",
        turkish: "Farklı ülkelerden birçok ___ var.",
        blank: "suppliers",
        options: ["supplier", "suppliers", "supplyer", "supplyies"]
      },
      {
        sentence: "There ___ a new catalog on your desk.",
        turkish: "Masanızda yeni bir katalog ___.",
        blank: "is",
        options: ["is", "are", "be", "were"]
      }
    ],
    conversationPrompt: "Practice talking about quantities in your business - how many products you have, how many clients you serve, inventory numbers, etc.",
    summary: "Outstanding counting, first mate! Now ye can properly describe all yer treasures, whether ye have one piece or a whole chest full!"
  },
  {
    grammarTopic: "Simple Conjunctions (and, but, or, so)",
    explanation: "Conjunctions be like the ropes that tie yer sentences together, matey! They connect yer ideas and make yer speech flow like the wind in yer sails!",
    detailedExplanation: [
      {
        type: "text",
        content: "Conjunctions connect words, phrases, or sentences. AND = addition, BUT = contrast, OR = choice, SO = result/reason."
      },
      {
        type: "example",
        english: "We sell frames and lenses.",
        turkish: "Çerçeve ve lens satıyoruz. (addition - ekleme)"
      },
      {
        type: "example",
        english: "The frames are expensive, but they are high quality.",
        turkish: "Çerçeveler pahalı ama yüksek kaliteli. (contrast - karşıtlık)"
      },
      {
        type: "quiz",
        question: "Which conjunction shows a result?",
        options: ["and", "but", "so"],
        answer: "so"
      },
      {
        type: "text",
        content: "Examples: We were late, SO we missed the meeting. Do you want frames OR sunglasses? It's cheap BUT good quality."
      },
      {
        type: "quiz",
        question: "'The product is good ___ expensive.' (showing contrast)",
        options: ["and", "but", "or"],
        answer: "but"
      }
    ],
    vocabulary: [
      { english: "Connection", turkish: "Bağlantı", category: "Business" },
      { english: "Addition", turkish: "Ekleme", category: "Business" },
      { english: "Contrast", turkish: "Karşıtlık", category: "Business" },
      { english: "Choice", turkish: "Seçim", category: "Business" },
      { english: "Result", turkish: "Sonuç", category: "Business" },
      { english: "Reason", turkish: "Sebep", category: "Business" }
    ],
    fillInBlanks: [
      {
        sentence: "We can meet today ___ tomorrow, your choice.",
        turkish: "Bugün ___ yarın buluşabiliriz, tercih sizin.",
        blank: "or",
        options: ["and", "but", "or", "so"]
      },
      {
        sentence: "The frames are beautiful ___ very expensive.",
        turkish: "Çerçeveler güzel ___ çok pahalı.",
        blank: "but",
        options: ["and", "but", "or", "so"]
      },
      {
        sentence: "We were satisfied with the quality, ___ we ordered more.",
        turkish: "Kaliteden memnun kaldık, ___ daha fazla sipariş verdik.",
        blank: "so",
        options: ["and", "but", "or", "so"]
      }
    ],
    conversationPrompt: "Practice connecting your business ideas using conjunctions. Explain your services, compare options, and show relationships between different aspects of your work.",
    summary: "Excellent seamanship, matey! Now ye can weave yer words together like a master rope-maker, creating strong and clear business messages!"
  },
  {
    grammarTopic: "Basic Adjective Order",
    explanation: "When ye describe yer treasures, the order matters, savvy! Just like loading a ship properly, adjectives have their rightful place in the sentence!",
    detailedExplanation: [
      {
        type: "text",
        content: "When using multiple adjectives, follow this order: Opinion → Size → Age → Shape → Color → Origin → Material → Purpose. Don't use too many!"
      },
      {
        type: "example",
        english: "Beautiful small Italian titanium frames",
        turkish: "Güzel küçük İtalyan titanyum çerçeveler (opinion→size→origin→material)"
      },
      {
        type: "example",
        english: "High-quality new rectangular black frames",
        turkish: "Yüksek kaliteli yeni dikdörtgen siyah çerçeveler"
      },
      {
        type: "quiz",
        question: "Which sounds natural?",
        options: ["Italian small beautiful frames", "Beautiful small Italian frames", "Small Italian beautiful frames"],
        answer: "Beautiful small Italian frames"
      },
      {
        type: "text",
        content: "Keep it simple! Usually 2-3 adjectives maximum. Most common in business: quality + material (premium titanium frames) or size + color (large black sunglasses)."
      },
      {
        type: "quiz",
        question: "Put in correct order: 'frames / plastic / new / stylish'",
        options: ["plastic new stylish frames", "stylish new plastic frames", "new stylish plastic frames"],
        answer: "stylish new plastic frames"
      }
    ],
    vocabulary: [
      { english: "Opinion", turkish: "Görüş", category: "Business" },
      { english: "Quality", turkish: "Kalite", category: "Eyewear" },
      { english: "Material", turkish: "Malzeme", category: "Eyewear" },
      { english: "Stylish", turkish: "Şık", category: "Eyewear" },
      { english: "Durable", turkish: "Dayanıklı", category: "Eyewear" },
      { english: "Elegant", turkish: "Zarif", category: "Eyewear" }
    ],
    fillInBlanks: [
      {
        sentence: "We offer ___ ___ ___ frames for business clients.",
        turkish: "İş müşterileri için ___ ___ ___ çerçeveler sunuyoruz.",
        blank: "premium Italian titanium",
        options: ["titanium premium Italian", "Italian titanium premium", "premium Italian titanium", "titanium Italian premium"]
      },
      {
        sentence: "These are ___ ___ sunglasses from our collection.",
        turkish: "Bunlar koleksiyonumuzdan ___ ___ güneş gözlükleri.",
        blank: "stylish black",
        options: ["black stylish", "stylish black", "black new stylish", "stylish new black"]
      },
      {
        sentence: "Do you prefer ___ ___ ___ lenses?",
        turkish: "___ ___ ___ lensleri tercih ediyor musunuz?",
        blank: "lightweight modern plastic",
        options: ["plastic modern lightweight", "modern lightweight plastic", "lightweight modern plastic", "plastic lightweight modern"]
      }
    ],
    conversationPrompt: "Practice describing your eyewear products using 2-3 adjectives in the correct order. Focus on quality, materials, and style that appeal to business customers.",
    summary: "Magnificent description skills, first mate! Now ye can describe yer finest treasures in ways that sound natural and professional to any merchant!"
  }
];