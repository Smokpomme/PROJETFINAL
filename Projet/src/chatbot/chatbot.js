let crafts = {}; // Variable globale pour stocker les données JSON
const sanitizeHtml = require('sanitize-html');

// Charger le fichier JSON
function loadCraftsData() {
  fetch('/Projet/src/chatbot/crafts.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des données JSON");
      }
      return response.json();
    })
    .then(data => {
      crafts = data; 
      console.log("Données JSON chargées :", crafts);
    })
    .catch(error => console.error("Erreur :", error));
}

// Charger les données au démarrage
document.addEventListener('DOMContentLoaded', loadCraftsData);
  
  function toggleChatbot() {
    const chatbotIcon = document.getElementById('chatbotIcon');
    const chatbotWindow = document.getElementById('chatbotWindow');
  
    if (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') {
      chatbotIcon.style.display = 'none';
      chatbotWindow.style.display = 'flex'; 
    } else {
      chatbotIcon.style.display = 'flex'; 
      chatbotWindow.style.display = 'none'; 
    }
  }
  
  // Fonction pour envoyer un message
  function handleUserInput() {
    const inputField = document.getElementById('chatbot-input');
    let userMessage = inputField.value.trim();
  
    if (userMessage) {
      // Nettoyer l'entrée utilisateur avec sanitize-html
      userMessage = sanitizeHtml(userMessage, {
        allowedTags: [], // Aucune balise HTML autorisée
        allowedAttributes: {} // Pas d'attribut autorisé
      });
  
      // Afficher le message de l'utilisateur
      appendMessage('user', userMessage);
  
      let craftFound = false;
  
      // Parcourir toutes les catégories pour trouver le craft
      for (let category in crafts) {
        if (crafts[category][userMessage]) {
          // Si le craft est trouvé dans la catégorie, afficher les détails
          showCraftDetails(category, userMessage);
          craftFound = true;
          break;
        }
      }
  
      // Si le craft n'est pas trouvé, afficher une réponse générique
      if (!craftFound) {
        const response = "Désolé, je ne connais pas ce craft. Pouvez-vous essayer autre chose ?";
        appendMessage('bot', response);
      }
  
      inputField.value = ''; // Réinitialiser le champ de saisie
    }
  }

// Ajout du gestionnaire d'événement pour la touche Entrée
document.getElementById('chatbot-input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handleUserInput();
  }
});

// Fonction pour afficher les détails d'un craft spécifique
function showCraftDetails(craftKey) {
  if (crafts[craftKey]) {
    const craft = crafts[craftKey];
    const craftDetails = `
      <p><strong>${craftKey}</strong></p>
      <p>${craft.description}</p>
      <img src="${craft.image}" alt="${craftKey}" style="width: 100px; height: 100px; margin-top: 10px;" />
    `;
    appendMessage('bot', craftDetails);
  } else {
    appendMessage('bot', "Désolé, ce craft est introuvable.");
  }
  
}

// Fonction pour ajouter un message dans le chatbot
function appendMessage(sender, message) {
  const chatbotBody = document.getElementById('chatbotBody');
  const messageElement = document.createElement('div');
  messageElement.className = sender === 'user' ? 'chatbot-message sent' : 'chatbot-message received';

  // Permet d'ajouter du HTML dans les messages du bot pour inclure une image
  if (sender === 'bot') {
    messageElement.innerHTML = message;
  } else {
    messageElement.textContent = message;
  }

  chatbotBody.appendChild(messageElement);
  chatbotBody.scrollTop = chatbotBody.scrollHeight; 
}
  
 // CHOIX MULTIPLES

// Initialisation des choix principaux
let isFirstVisit = true; // Variable pour suivre si c'est la première visite

function initializeChatbot() {
  if (isFirstVisit) {
    appendMessage('bot', "<p>Voici quelques thèmes spécifiques à Minecraft. Ces sujets pourront t'aider, alors clique sur ce qui t'intéresse pour en savoir plus !</p>");
    isFirstVisit = false; // Assurez-vous que le message ne s'affiche qu'une seule fois
  }
  showChoices([
    { text: "Crafts", onclick: "handleChoice('crafts')" },
    { text: "Avez-vous des questions concernant le jeu ?", onclick: "handleChoice('questions')" },
  ]);
}
  // Affiche ou masque le menu rétractable
  function toggleChoicesMenu() {
    const chatbotChoices = document.getElementById('chatbotChoices');
    const toggleSpan = document.getElementById('toggleChoices');
    if (chatbotChoices.style.display === 'none' || chatbotChoices.style.display === '') {
      chatbotChoices.style.display = 'block';
      toggleSpan.textContent = "▲";
    } else {
      chatbotChoices.style.display = 'none';
      toggleSpan.textContent = "▼";
    }
  }
  
  // Affiche les choix dans le menu rétractable
  function showChoices(choices) {
    const chatbotChoices = document.getElementById('chatbotChoices');
    chatbotChoices.innerHTML = ''; // Réinitialise le contenu du menu
  
    choices.forEach(choice => {
      const button = document.createElement('button');
      button.textContent = choice.text;
      button.setAttribute('onclick', choice.onclick);
      chatbotChoices.appendChild(button);
    });
  
    const toggleSpan = document.getElementById('toggleChoices');
    chatbotChoices.style.display = 'block'; // Affiche le menu
    toggleSpan.textContent = "▲"; // Ajuste le texte du bouton
  }
  
  // Masque le menu rétractable
  function hideChoices() {
    const chatbotChoices = document.getElementById('chatbotChoices');
    chatbotChoices.style.display = 'none';
    document.getElementById('toggleChoices').textContent = "▼";
  }
  
  // Gestion des choix principaux
  function handleChoice(choice) {
    if (choice === 'crafts') {
      appendMessage('user', "Crafts");
      appendMessage('bot', "<p>Choisissez une catégorie :</p>");
  
      showChoices([
        { text: "Blocs", onclick: "showCategoryDetails('blocs')" },
        { text: "Armures et Armes", onclick: "showCategoryDetails('utilitaires')" },
        { text: "Nourriture", onclick: "showCategoryDetails('nourriture')" },
      ]);
    } else if (choice === 'questions') {
      appendMessage('user', "Avez-vous des questions concernant le jeu ?");
      appendMessage('bot', "<p>Veuillez choisir une catégorie de questions :</p>");
      showChoices([
        { text: "Le Nether", onclick: "handleSubChoice('nether')" },
        { text: "L'End", onclick: "handleSubChoice('end')" },
        { text: "L'Overworld", onclick: "handleSubChoice('overworld')" },
      ]);
    }
  }
  
  // Affiche les détails d'une catégorie
function showCategoryDetails(category) {
  if (crafts[category]) {
    const items = Object.keys(crafts[category]).map(craftKey => {
      const craft = crafts[category][craftKey];
      return `
        <div class="craft-item">
          <button onclick="showCraftDetails('${category}', '${craftKey}')">
            <div class="image-column">
              <img src="${craft.image}" alt="${craftKey}" />
            </div>
            <div class="text-column">
              <span>${craftKey}</span>
            </div>
          </button>
        </div>`;
    }).join('');

    appendMessage('bot', `<p>Voici tous les éléments de la catégorie <strong>${category}</strong> :</p><div>${items}</div>`);
  } else {
    appendMessage('bot', `<p>Désolé, cette catégorie est introuvable.</p>`);
  }
  initializeChatbot();
}

// Fonction pour afficher les détails d'un craft spécifique dans une catégorie
function showCraftDetails(category, craftKey) {
  if (crafts[category] && crafts[category][craftKey]) {
    const craft = crafts[category][craftKey];
    appendMessage('bot', `
      <div class="craft-details">
        <p><strong>${craftKey}</strong></p>
        <p>${craft.description}</p>
        <img src="${craft.image}" alt="${craftKey}" />
      </div>
    `);
  } else {
    appendMessage('bot', `<p>Désolé, ce craft est introuvable.</p>`);
  }
}

// Fonction pour afficher les détails d'un craft spécifique sans catégorie
function showCraftDetailsByKey(craftKey) {
  if (crafts[craftKey]) {
    const craft = crafts[craftKey];
    appendMessage('bot', `
      <div class="craft-details">
        <p><strong>${craftKey}</strong></p>
        <p>${craft.description}</p>
        <img src="${craft.image}" alt="${craftKey}" />
      </div>
    `);
  } else {
    appendMessage('bot', `
      <div class="craft-details">
        <p>Désolé, ce craft est introuvable.</p>
      </div>
    `);
  }
}
  
  // Gestion des sous-choix
  function handleSubChoice(subChoice) {
    const userChoices = {
      nether: "Le Nether",
      end: "L'End",
      overworld: "L'Overworld",
    };
  
    appendMessage('user', userChoices[subChoice] || "Choix inconnu");
  
    if (subChoice === 'nether') {
      appendMessage('bot', "<p>Le Nether est l'enfer de Minecraft, un endroit hostile et rempli de dangers ! Posez une question sur le Nether :</p>");
      showChoices([
        { text: "Comment aller dans le Nether ?", onclick: "handleNetherQuestion('howToEnter')" },
        { text: "Quels bâtiments y a-t-il ?", onclick: "handleNetherQuestion('buildings')" },
        { text: "Quels mobs y a-t-il ?", onclick: "handleNetherQuestion('mobs')" },
        { text: "Conseils pour survivre", onclick: "handleNetherQuestion('survivalTips')" },
      ]);
    } else if (subChoice === 'end') {
      appendMessage('bot', "<p>L'End est une dimension parallèle mystérieuse, abritant un grand danger ! Posez une question sur l'End :</p>");
      showChoices([
        { text: "Comment aller dans l'End ?", onclick: "handleEndQuestion('howToEnter')" },
        { text: "Quels bâtiments y a-t-il ?", onclick: "handleEndQuestion('buildings')" },
        { text: "Quels mobs y a-t-il ?", onclick: "handleEndQuestion('mobs')" },
        { text: "Conseils pour survivre", onclick: "handleEndQuestion('survivalTips')" },
      ]);
    } else if (subChoice === 'overworld') {
      appendMessage('bot', "<p>L'Overworld est le monde tel que nous le connaissons, avec ses plaines et ses montagnes ! Posez une question sur l'Overworld :</p>");
      showChoices([
        { text: "Y a-t-il des limites à l'Overworld ?", onclick: "handleOverworldQuestion('limits')" },
        { text: "Quels bâtiments y a-t-il ?", onclick: "handleOverworldQuestion('buildings')" },
        { text: "Quels mobs y a-t-il ?", onclick: "handleOverworldQuestion('mobs')" },
        { text: "Conseils pour une bonne survie", onclick: "handleOverworldQuestion('survivalTips')" },
      ]);
    } else {
      appendMessage('bot', "Choix inconnu. Retour aux choix principaux.");
      initializeChatbot();
    }
  }

  function handleNetherQuestion(question) {
    const userQuestions = {
      howToEnter: "Comment aller dans le Nether ?",
      buildings: "Quels bâtiments y a-t-il dans le Nether ?",
      mobs: "Quels mobs y a-t-il dans le Nether ?",
      survivalTips: "Conseils pour survivre dans le Nether",
    };
  
    appendMessage('user', userQuestions[question] || "Question inconnue");
  
    const responses = {
      howToEnter: "Pour entrer dans le Nether, vous devez construire un portail en obsidienne et l'activer avec un briquet.",
      buildings: "Dans le Nether, vous trouverez des forteresses du Nether et des bastions, mais attention ils sont bien gardés...",
      mobs: "Les mobs du Nether incluent les Ghasts, Piglins, Wither Skeletons, mais je dois vous avertir de vous méfier des Blazes, ces créatures de feu maléfiques !",
      survivalTips: "Pour survivre dans le Nether, emportez des potions de résistance au feu, une armure solide et une épée bien aiguisée !",
    };
  
    const response = responses[question];
    if (response) {
      appendMessage('bot', response);
      initializeChatbot(); // Réinitialise les choix principaux après une réponse
    } else {
      appendMessage('bot', "Question inconnue. Retour aux choix principaux.");
      initializeChatbot(); // Réinitialise les choix principaux en cas d'erreur
    }
  }

  function handleEndQuestion(question) {
    const userQuestions = {
      howToEnter: "Comment aller dans l'End ?",
      buildings: "Quels bâtiments y a-t-il dans l'End ?",
      mobs: "Quels mobs y a-t-il dans l'End ?",
      survivalTips: "Conseils pour survivre dans l'End",
    };
  
    appendMessage('user', userQuestions[question] || "Question inconnue");
  
    const responses = {
      howToEnter: "Pour aller dans l'End, vous devez trouver une forteresse et activer un portail de l'End avec des yeux de l'Ender. Le craft des yeux de l'Ender est expliqué dans la rubrique crafts.",
      buildings: "Dans l'End, vous trouverez des villes de l'End et des navires de l'End contenant de nombreux trésors, plus rares les uns que les autres !",
      mobs: "Les mobs de l'End incluent l'Ender Dragon, les Endermen, et les Shulkers.",
      survivalTips: "Pour survivre dans l'End, préparez-vous avec des potions, une armure complète, des blocs pour construire et un seau d'eau. Croyez-moi, c'est important...",
    };
  
    const response = responses[question];
    if (response) {
      appendMessage('bot', response);
      initializeChatbot();
    } else {
      appendMessage('bot', "Question inconnue. Retour aux choix principaux.");
      initializeChatbot();
    }
  }

  function handleOverworldQuestion(question) {
    const userQuestions = {
      limits: "Y a-t-il des limites à l'Overworld ?",
      buildings: "Quels bâtiments y a-t-il dans l'Overworld ?",
      mobs: "Quels mobs y a-t-il dans l'Overworld ?",
      survivalTips: "Conseils pour une bonne survie dans Minecraft",
    };
  
    appendMessage('user', userQuestions[question] || "Question inconnue");
  
    const responses = {
      limits: "L'Overworld est théoriquement infini en mode survie, mais des limites existent techniquement à des millions de blocs.",
      buildings: "Dans l'Overworld, vous trouverez des villages, des temples, des manoirs, et plus encore !",
      mobs: "Les mobs de l'Overworld incluent les zombies, les squelettes, les creepers, ainsi que des animaux comme les vaches et les cochons. Mais de nombreux mystérieux monstres peuplent l'Overworld, comme le Warden...",
      survivalTips: "Pour une bonne survie, concentrez-vous sur la collecte de ressources, construisez un abri sûr, et explorez prudemment les grottes et les donjons.",
    };
  
    const response = responses[question];
    if (response) {
      appendMessage('bot', response);
      initializeChatbot();
    } else {
      appendMessage('bot', "Question inconnue. Retour aux choix principaux.");
      initializeChatbot();
    }
  }
  
  // Fonction pour ajouter un message dans le chatbot
  function appendMessage(sender, message) {
    const chatbotBody = document.getElementById('chatbotBody');
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'chatbot-message sent' : 'chatbot-message received';
  
    messageElement.innerHTML = message;
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight; 
  }
  
  // Initialisation du chatbot lors du chargement de la page
  document.addEventListener('DOMContentLoaded', initializeChatbot);
  