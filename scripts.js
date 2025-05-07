/* ----------  MOBILE NAV TOGGLE  ---------- */
const navToggle = document.getElementById("nav-toggle");
const navMenu   = document.getElementById("nav-menu");
navToggle?.addEventListener("click", () => navMenu.classList.toggle("open"));

/* ----------  PROFILE DROPDOWN  ---------- */
const profileBtn  = document.getElementById("profile-btn");
const profileBox  = document.getElementById("profile-container");
profileBtn?.addEventListener("click", e => {
  e.stopPropagation();
  profileBox.classList.toggle("open");
});
document.addEventListener("click", e => {
  if (!profileBox.contains(e.target)) profileBox.classList.remove("open");
});
/* ----------  Reveal feature cards on scroll  ---------- */
const cards = document.querySelectorAll('.feature-card');

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);     // animate only once
    }
  });
}, { threshold: 0.25 });

cards.forEach(card => io.observe(card));
/* ----------  Pricing – billing toggle  ---------- */
const bills = document.querySelectorAll('[name="billing"]');
const prices = document.querySelectorAll('.price');

bills.forEach(radio => radio.addEventListener('change', () => {
  const mode = document.getElementById('bill-yearly').checked ? 'yearly' : 'monthly';
  prices.forEach(p => {
    const value = p.dataset[mode];
    p.textContent = (value === '—') ? 'Contact' : `R${value}`;
  });
}));

/* ----------  Reveal pricing cards on scroll  ---------- */
const pricing = document.getElementById('pricing');
new IntersectionObserver(([e]) => {
  if(e.isIntersecting) document.body.classList.add('pricing-visible');
},{threshold:0.15}).observe(pricing);


/* ----------  SHOW COMPACT BAR WHEN SCROLLING UP  ---------- */
let lastY = window.pageYOffset;
const header = document.getElementById("site-header");

window.addEventListener("scroll", () => {
  const y = window.pageYOffset;
  if (y < lastY) {             // scrolling UP  →  compact
    header.classList.add("compact");
  } else {                     // scrolling DOWN →  full size
    header.classList.remove("compact");
  }
  lastY = y;
});
/* ----------  SIMPLE CHATBOT  ---------- */
const chatBox   = document.getElementById("chatbot");
const chatForm  = document.getElementById("chat-input-form");
const chatInput = document.getElementById("chat-message");

/** Append a bubble to the chatbox */
function appendMessage(text, sender = "bot"){
  const row    = document.createElement("div");
  row.className = `msg ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  row.appendChild(bubble);
  chatBox.appendChild(row);
  chatBox.scrollTop = chatBox.scrollHeight;      // keep view pinned to bottom
}

/** Very light demo “brain” – swap out with real API later */
function generateReply(userText){
  const t = userText.toLowerCase();
  if(t.includes("hello") || t.includes("hi"))   return "Hello there! Ready to plan your next adventure?";
  if(t.includes("hotel"))                       return "Great! Which city and what dates are you considering for hotels?";
  if(t.includes("flight") || t.includes("flights"))
                                                return "Sure – where will you be flying from and to, and roughly when?";
  if(t.includes("thanks") || t.includes("thank")) 
                                                return "Anytime! Let me know if there’s anything else.";
  return "Got it! Give me a moment to gather the best options for you.";
}

chatForm?.addEventListener("submit", e => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if(!text) return;

  // show user bubble
  appendMessage(text, "user");
  chatInput.value = "";

  // mimic thinking delay
  const reply = generateReply(text);
  setTimeout(() => appendMessage(reply, "bot"), 800);
});
