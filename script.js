
const products = {
  grounding: {
    archetype: "The Rooted One",
    name: "Enthroce Robyard",
    description: "A foundation of comfort that keeps you connected to the earth.",
    fabrics: ["Cooling Mein", "TENCL Soft", "Organic Cotton"],
    imageUrl: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&h=400&fit=crop&auto=format",
    color: "#b8a89e"
  },
  softness: {
    archetype: "The Gentle One",
    name: "Mist Veil",
    description: "Feather-light layers that embrace you like a cloud.",
    fabrics: ["Cashmere Blend", "Silk Chiffon", "Bamboo Jersey"],
    imageUrl: "https://images.unsplash.com/photo-1597404294360-feeeda04612e?w=400&h=400&fit=crop&auto=format",
    color: "#d4c8d0"
  },
  energy: {
    archetype: "The Radiant One",
    name: "Aether Glow",
    description: "Luminous fabrics that reflect your inner vitality.",
    fabrics: ["Stretch Silk", "Metallic Thread", "Lightweight Modal"],
    imageUrl: "https://images.unsplash.com/photo-1518623573725-178e4da6be62?w=400&h=400&fit=crop&auto=format",
    color: "#e8d8c0"
  },
  freedom: {
    archetype: "The Unbound",
    name: "Zephyr Flow",
    description: "Unrestricted movement for when your spirit needs to soar.",
    fabrics: ["Airy Linen", "Stretch Tencel", "Organic Gauze"],
    imageUrl: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=400&fit=crop&auto=format",
    color: "#a8c8b8"
  }
};

const app = document.getElementById("app");

function getSavedChoice() {
  return localStorage.getItem("bodyProfileChoice");
}

function saveChoice(choice) {
  localStorage.setItem("bodyProfileChoice", choice);
}

function clearChoice() {
  localStorage.removeItem("bodyProfileChoice");
}

function renderQuestion() {
  const savedChoice = getSavedChoice();
  
  app.innerHTML = `
    <div class="question-container">
      ${savedChoice ? '<p class="welcome-back">Welcome back! Choose again or continue.</p>' : ''}
      <h2>What does your body crave today?</h2>
      <div class="options">
        ${Object.entries(products).map(([key, product]) => `
          <button 
            class="option-btn" 
            data-choice="${key}"
            style="background-color: ${product.color}"
          >
            ${key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.choice;
      saveChoice(choice);
      renderResult(choice);
    });
  });
}

function renderResult(choice, isReturningUser = false) {
  const product = products[choice];
  
  app.innerHTML = `
    <div class="result-container">
      ${isReturningUser ? '<p class="welcome-back">Welcome back!</p>' : ''}
      <h2>${product.archetype}</h2>
      <div class="product-image">
        <img 
          src="${product.imageUrl}" 
          alt="${product.name}"
          onerror="this.onerror=null; this.src='https://placehold.co/400x400/8a7f8d/white?text=Image+Loading'"
          style="background-color: ${product.color}"
        >
      </div>
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <ul class="fabric-list">
          ${product.fabrics.map(fabric => `<li>${fabric}</li>`).join('')}
        </ul>
      </div>
      <button id="reset-btn">Start Over</button>
    </div>
  `;

  document.getElementById('reset-btn').addEventListener('click', () => {
    clearChoice();
    renderQuestion();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedChoice = getSavedChoice();
  savedChoice ? renderResult(savedChoice, true) : renderQuestion();
});