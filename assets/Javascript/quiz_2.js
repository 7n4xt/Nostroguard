const questions = [
    {
        question: "Situation : Une personne vous appelle en se présentant comme le 'Support Informatique'. Elle affirme que votre poste a un virus et demande votre mot de passe pour intervenir.",
        options: [
            "Je donne le mot de passe, c'est urgent.",
            "Je refuse et je raccroche.",
            "Je donne la moitié du mot de passe pour prouver ma bonne foi."
        ],
        correctAnswer: 1,
        explanation: "Aucun support informatique légitime ne vous demandera jamais votre mot de passe. C'est la règle d'or.",
        image: "./assets/Images/SupportInfo.jpg"
    },
    {
        question: "Qu'est-ce que le 'Shadow IT' ?",
        options: [
            "Le département informatique qui travaille de nuit.",
            "L'utilisation d'outils (logiciels, sites web) non approuvés par l'entreprise.",
            "Un virus qui assombrit l'écran."
        ],
        correctAnswer: 1,
        explanation: "C'est 'l'informatique de l'ombre'. Utiliser vos outils personnels pour le travail fait perdre le contrôle de la sécurité des données à l'entreprise.",
        image: "./assets/Images/what-is-shadow-it.png"
    },
    {
        question: "Vous devez traduire un contrat confidentiel contenant des secrets commerciaux. Que faites-vous ?",
        options: [
            "Je copie-colle le texte dans un traducteur en ligne gratuit public.",
            "J'envoie le texte à un ami bilingue.",
            "J'utilise uniquement l'outil de traduction validé par l'entreprise."
        ],
        correctAnswer: 2,
        explanation: "Les outils gratuits en ligne stockent souvent ce que vous tapez. Vos secrets commerciaux deviendraient publics.",
        image: "./assets/Images/proteger-les-secrets-commerciaux.jpg"
    },
    {
        question: "Pourquoi les mises à jour sont-elles critiques ?",
        options: [
            "Pour changer les couleurs des icônes.",
            "Pour surveiller les employés.",
            "Pour corriger les failles de sécurité (boucher les trous)."
        ],
        correctAnswer: 2,
        explanation: "Une mise à jour non faite est une porte ouverte pour les Ransomwares.",
        image: "./assets/Images/mise-a-jour.png"
    },
    {
        question: "Un fournisseur habituel vous envoie un email urgent : 'Nous avons changé de banque, faites le virement sur ce nouveau RIB immédiatement'.",
        options: [
            "Je fais le virement pour ne pas retarder la commande.",
            "Je réponds à l'email pour demander confirmation.",
            "Je fais un 'contre-appel' sur son numéro habituel pour vérifier."
        ],
        correctAnswer: 2,
        explanation: "Si sa boîte mail est piratée, répondre par mail ne sert à rien. Il faut changer de canal de communication (téléphone).",
        image: "./assets/Images/bank-phishing.png"
    },
    {
        question: "Comment appelle-t-on une tentative de Phishing par SMS ?",
        options: [
            "Le Vishing",
            "Le Smishing",
            "Le Spamming"
        ],
        correctAnswer: 1,
        explanation: "C'est la contraction de SMS et Phishing. Le Vishing, c'est par la voix (Voice).",
        image: "./assets/Images/smishing.jpg"
    },
    {
        question: "Un fichier client est trop lourd pour l'email. Quelle solution est à éviter absolument ?",
        options: [
            "Utiliser un outil de transfert public gratuit (type WeTransfer perso).",
            "Demander un outil sécurisé à la DSI.",
            "Déposer le fichier sur le serveur sécurisé de l'entreprise."
        ],
        correctAnswer: 0,
        explanation: "C'est du Shadow IT. Vous ne savez pas où sont stockées les données ni qui peut y accéder.",
        image: "./assets/Images/file-sending.png"
    },
    {
        question: "Quelle est la caractéristique d'un document 'Confidentiel' ?",
        options: [
            "Il peut être mis sur le site web public.",
            "Sa divulgation peut nuire gravement à l'entreprise (ex: stratégie, RH).",
            "Il ne contient que des images."
        ],
        correctAnswer: 1,
        explanation: "La fuite d'un document confidentiel peut entraîner des pertes financières ou d'image majeures.",
        image: "./assets/Images/document-confidentiel.jpg"
    },
    {
        question: "Qu'est-ce que le 'mouvement latéral' d'un virus ?",
        options: [
            "Le virus déplace la souris.",
            "Le virus cherche à se propager de votre PC vers les serveurs du réseau.",
            "L'écran pivote de 90 degrés."
        ],
        correctAnswer: 1,
        explanation: "Le but de l'attaquant est d'atteindre le cœur du réseau (les serveurs) en passant par votre ordinateur.",
        image: "./assets/Images/virus-movement.jpeg"
    },
    {
        question: "Quelle est la seule protection qui garantit de récupérer ses données après un Ransomware ?",
        options: [
            "Payer la rançon.",
            "Avoir des sauvegardes saines et déconnectées.",
            "Éteindre l'écran la nuit."
        ],
        correctAnswer: 1,
        explanation: "Payer ne garantit rien. Seule une sauvegarde qui n'était pas branchée au moment de l'attaque permet de tout restaurer.",
        image: "./assets/Images/ransomware.png"
    }
];

let currentQuestion = 0;
let score = 0;
let questionAnswered = false;
let userAnswers = new Array(questions.length).fill(null);

function displayQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('question-content');
    const imageElement = document.getElementById('question-image');

    // Update progress bar
    const progress = ((index) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    // Update image (if present)
    if (imageElement) {
        if (question.image) {
            imageElement.src = question.image;
            imageElement.parentElement.classList.remove('hidden');
        } else {
            imageElement.src = '';
            imageElement.parentElement.classList.add('hidden');
        }
    }

    container.innerHTML = `
      <p class="text-xl font-semibold mb-6">${question.question}</p>
      <div class="space-y-4">
          ${question.options.map((option, optIndex) => `
              <label class="block p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${userAnswers[index] === optIndex ? 'selected-answer' : ''}">
                  <input type="radio" name="answer" value="${optIndex}" ${userAnswers[index] === optIndex ? 'checked' : ''} ${userAnswers[index] !== null ? 'disabled' : ''}>
                  ${option}
              </label>
          `).join('')}
      </div>
  `;

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.addEventListener('change', checkAnswer);
    });

    // Show/hide feedback if question was already answered
    const feedbackContainer = document.getElementById('feedback-container');
    if (userAnswers[index] !== null) {
        const isCorrect = userAnswers[index] === question.correctAnswer;
        feedbackContainer.className = `mt-6 p-4 rounded-lg ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedbackContainer.innerHTML = `<p class="font-bold">${isCorrect ? 'Correct!' : 'Incorrect.'}</p><p>${question.explanation}</p>`;
        feedbackContainer.classList.remove('hidden');
        document.getElementById('continue-btn').classList.remove('hidden');
    } else {
        feedbackContainer.classList.add('hidden');
        document.getElementById('continue-btn').classList.add('hidden');
    }

    // Update navigation buttons
    const backBtn = document.getElementById('back-btn');
    backBtn.disabled = index === 0;
}

function checkAnswer(event) {
    if (userAnswers[currentQuestion] !== null) return;

    const selectedAnswer = parseInt(event.target.value);
    const question = questions[currentQuestion];
    const feedbackContainer = document.getElementById('feedback-container');

    userAnswers[currentQuestion] = selectedAnswer;

    if (selectedAnswer === question.correctAnswer) {
        score++;
        feedbackContainer.className = 'mt-6 p-4 rounded-lg feedback-correct';
        feedbackContainer.innerHTML = `<p class="font-bold">Correct!</p><p>${question.explanation}</p>`;
    } else {
        feedbackContainer.className = 'mt-6 p-4 rounded-lg feedback-incorrect';
        feedbackContainer.innerHTML = `<p class="font-bold">Incorrect.</p><p>${question.explanation}</p>`;
    }

    feedbackContainer.classList.remove('hidden');
    document.getElementById('continue-btn').classList.remove('hidden');

    // Mark selected answer
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.disabled = true;
        if (input.checked) {
            input.closest('label').classList.add('selected-answer');
        }
    });
}

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.remove('hidden');

    const finalScore = document.getElementById('final-score');
    const finalFeedback = document.getElementById('final-feedback');
    finalScore.textContent = score;

    if (score === questions.length) {
        finalFeedback.textContent = '🎉 Parfait! Vous maîtrisez complètement le sujet!';
    } else if (score >= questions.length * 0.8) {
        finalFeedback.textContent = '✅ Très bien! Vous avez une bonne compréhension.';
    } else if (score >= questions.length * 0.6) {
        finalFeedback.textContent = '👍 Bien! Continuez vos efforts pour progresser.';
    } else {
        finalFeedback.textContent = '💪 Vous progressez! Révisez les concepts pour améliorer votre score.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayQuestion(0);

    document.getElementById('back-btn').addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion(currentQuestion);
        }
    });

    document.getElementById('continue-btn').addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            displayQuestion(currentQuestion);
        } else {
            showResults();
        }
    });

    // PDF download
    document.getElementById('download-pdf')?.addEventListener('click', () => {
        // Create a simple PDF download
        const element = document.createElement('a');
        element.setAttribute('href', '#');
        element.setAttribute('download', 'guide-cybersecurite.pdf');
        element.style.display = 'none';
        document.body.appendChild(element);
        alert('Le guide PDF sera bientôt disponible au téléchargement!');
    });
});
