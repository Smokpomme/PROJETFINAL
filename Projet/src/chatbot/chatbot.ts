// chatbot.ts
import { Donnees, Element, Categories } from './crafts';

let crafts: Donnees = {}; // Variable globale pour stocker les données JSON

// Charger le fichier JSON
function loadCraftsData(): void {
  fetch('/Projet/src/chatbot/crafts.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des données JSON");
      }
      return response.json();
    })
    .then((data: Donnees) => {
      crafts = data; 
      console.log("Données JSON chargées :", crafts);
    })
    .catch(error => console.error("Erreur :", error));
}

// Charger les données au démarrage
document.addEventListener('DOMContentLoaded', loadCraftsData);
  
function toggleChatbot(): void {
  const chatbotIcon = document.getElementById('chatbotIcon') as HTMLElement;
  const chatbotWindow = document.getElementById('chatbotWindow') as HTMLElement;
  
  if (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') {
    chatbotIcon.style.display = 'none';
    chatbotWindow.style.display = 'flex'; 
  } else {
    chatbotIcon.style.display = 'flex'; 
    chatbotWindow.style.display = 'none'; 
  }
}
  
// Fonction pour envoyer un message
function handleUserInput(): void {
    const inputField = document.getElementById('chatbot-input') as HTMLInputElement;
    const userMessage = inputField.value.trim().toLowerCase(); 
    
    if (userMessage) {
      appendMessage('user', userMessage);
    
      let craftFound = false;
    
      // Check if crafts is not empty
      if (Object.keys(crafts).length > 0) {
        for (let category in crafts) {
          const categoryData = crafts[category as keyof Donnees];
          if (categoryData && 
              categoryData[userMessage] !== undefined) {
            showCraftDetails(category, userMessage);
            craftFound = true;
            break;
          }
        }
      }
    
      if (!craftFound) {
        appendMessage('bot', "Désolé, je n'ai pas trouvé de craft correspondant à votre recherche.");
      }
    
      inputField.value = ''; // Réinitialiser le champ de saisie
    }
  }

// Ajout du gestionnaire d'événement pour la touche Entrée
(document.getElementById('chatbot-input') as HTMLInputElement)
  .addEventListener('keydown', function (event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleUserInput();
    }
  });

// Fonction pour afficher les détails d'un craft spécifique
function showCraftDetails(categoryOrCraftKey: string, craftKey?: string): void {
  let foundCraft: Element | undefined;

  // If two parameters are provided, search in the specific category
  if (craftKey) {
    // Validate that the category exists and is not undefined
    const category = (Object.keys(crafts) as Array<keyof Donnees>)
      .find(key => key === categoryOrCraftKey);
    
    if (category) {
      const categoryData = crafts[category];
      
      // Additional null check
      if (categoryData && categoryData[craftKey]) {
        foundCraft = categoryData[craftKey];
      } else {
        appendMessage('bot', `Désolé, je n'ai pas trouvé de craft "${craftKey}" dans la catégorie "${categoryOrCraftKey}".`);
        return;
      }
    } else {
      appendMessage('bot', `Désolé, la catégorie "${categoryOrCraftKey}" n'existe pas.`);
      return;
    }
  } 
  // If only one parameter is provided, search across all categories
  else {
    const craftKeyToFind = categoryOrCraftKey;
    
    // Use type-safe method to find category
    const foundCategory = (Object.values(crafts) as Categories[])
      .find(category => category && category[craftKeyToFind] !== undefined);

    if (foundCategory) {
      foundCraft = foundCategory[craftKeyToFind];
    } else {
      appendMessage('bot', `Désolé, je n'ai pas trouvé de craft correspondant à "${craftKeyToFind}".`);
      return;
    }
  }

  // Display craft details if found
  if (foundCraft) {
    const craftName = craftKey || categoryOrCraftKey;
    const craftDetails = `
      <p><strong>${craftName}</strong></p>
      <p>${foundCraft.description}</p>
      <img src="${foundCraft.image}" alt="${craftName}" style="width: 100px; height: 100px; margin-top: 10px;" />
    `;
    appendMessage('bot', craftDetails);
  } else {
    appendMessage('bot', 'Craft not found.');
  }
}

// Affiche les détails d'une catégorie
function showCategoryDetails(category: string): void {
  const categoryData = crafts[category as keyof Donnees];
  if (categoryData) {
    const items = Object.keys(categoryData).map(craftKey => {
      const craft = categoryData[craftKey] as Element;
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
}

// Fonction pour ajouter un message dans le chatbot
function appendMessage(sender: 'user' | 'bot', message: string): void {
  const chatbotBody = document.getElementById('chatbotBody') as HTMLElement;
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

function initializeChatbot(): void {
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
function toggleChoicesMenu(): void {
  const chatbotChoices = document.getElementById('chatbotChoices') as HTMLElement;
  const toggleSpan = document.getElementById('toggleChoices') as HTMLElement;
  if (chatbotChoices.style.display === 'none' || chatbotChoices.style.display === '') {
    chatbotChoices.style.display = 'block';
    toggleSpan.textContent = "▲";
  } else {
    chatbotChoices.style.display = 'none';
    toggleSpan.textContent = "▼";
  }
}
  
// Affiche les choix dans le menu rétractable
function showChoices(choices: { text: string, onclick: string }[]): void {
  const chatbotChoices = document.getElementById('chatbotChoices') as HTMLElement;
  chatbotChoices.innerHTML = ''; // Réinitialise le contenu du menu
  
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice.text;
    button.setAttribute('onclick', choice.onclick);
    chatbotChoices.appendChild(button);
  });
  
  const toggleSpan = document.getElementById('toggleChoices') as HTMLElement;
  chatbotChoices.style.display = 'block'; // Affiche le menu
  toggleSpan.textContent = "▲"; // Ajuste le texte du bouton
}
  
// Masque le menu rétractable
function hideChoices(): void {
  const chatbotChoices = document.getElementById('chatbotChoices') as HTMLElement;
  chatbotChoices.style.display = 'none';
  (document.getElementById('toggleChoices') as HTMLElement).textContent = "▼";
}
  
// Gestion des choix principaux
function handleChoice(choice: string): void {
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
  
// Fonctions pour les sous-choix et questions spécifiques
function handleSubChoice(subChoice: string): void {
  switch(subChoice) {
    case 'nether':
      appendMessage('bot', "<p>Choisissez une question sur le Nether :</p>");
      showChoices([
        { text: "Qu'est-ce que le Nether ?", onclick: "handleNetherQuestion('definition')" },
        { text: "Comment accéder au Nether ?", onclick: "handleNetherQuestion('acces')" },
        { text: "Quels monstres vivent dans le Nether ?", onclick: "handleNetherQuestion('monstres')" }
      ]);
      break;
    case 'end':
      appendMessage('bot', "<p>Choisissez une question sur l'End :</p>");
      showChoices([
        { text: "Qu'est-ce que l'End ?", onclick: "handleEndQuestion('definition')" },
        { text: "Comment accéder à l'End ?", onclick: "handleEndQuestion('acces')" },
        { text: "Qui est l'Ender Dragon ?", onclick: "handleEndQuestion('dragon')" }
      ]);
      break;
    case 'overworld':
      appendMessage('bot', "<p>Choisissez une question sur l'Overworld :</p>");
      showChoices([
        { text: "Qu'est-ce que l'Overworld ?", onclick: "handleOverworldQuestion('definition')" },
        { text: "Quels biomes existe-t-il ?", onclick: "handleOverworldQuestion('biomes')" },
        { text: "Comment survivre dans l'Overworld ?", onclick: "handleOverworldQuestion('survie')" }
      ]);
      break;
  }
}

function handleNetherQuestion(question: string): void {
  switch(question) {
    case 'definition':
      appendMessage('bot', "Le Nether est une dimension infernale et dangereuse de Minecraft, remplie de blocs de lave, de roches de néthère et de créatures hostiles.");
      break;
    case 'acces':
      appendMessage('bot', "Pour accéder au Nether, vous devez construire un portail en obsidienne et l'allumer avec un briquet.");
      break;
    case 'monstres':
      appendMessage('bot', "Les principaux monstres du Nether sont les Blazes, les Ghasts, les Piglins, les Zombified Piglins et les Withers.");
      break;
  }
}

function handleEndQuestion(question: string): void {
  switch(question) {
    case 'definition':
      appendMessage('bot', "L'End est une dimension mystérieuse composée d'îles de pierre de l'end, peuplée par des Endermen et dominée par l'Ender Dragon.");
      break;
    case 'acces':
      appendMessage('bot', "Pour accéder à l'End, vous devez trouver une forteresse de fin et activer le portail avec des yeux de l'end.");
      break;
    case 'dragon':
      appendMessage('bot', "L'Ender Dragon est le boss final de Minecraft. Vaincre ce dragon marque la fin du jeu et débloque de nouveaux éléments de gameplay.");
      break;
  }
}

function handleOverworldQuestion(question: string): void {
  switch(question) {
    case 'definition':
      appendMessage('bot', "L'Overworld est le monde principal de Minecraft, avec des forêts, des montagnes, des plaines et des océans.");
      break;
    case 'biomes':
      appendMessage('bot', "Il existe de nombreux biomes : forêt, jungle, désert, toundra, océan, montagnes, marais, et bien d'autres !");
      break;
    case 'survie':
      appendMessage('bot', "Pour survivre dans l'Overworld : collectez des ressources, construisez un abri, fabriquez des outils, gérez votre faim et évitez les monstres la nuit.");
      break;
  }
}

// Initialisation du chatbot lors du chargement de la page
document.addEventListener('DOMContentLoaded', initializeChatbot);