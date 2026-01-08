const questions = [
    {
        question: "Vous envoyez un fichier ZIP protégé par mot de passe contenant des données sensibles. Comment envoyez-vous le mot de passe ?",
        options: [
            "J'écris le mot de passe dans l'objet du mail pour m'en souvenir.",
            "J'écris le mot de passe dans le corps du mail.",
            "J'envoie le mot de passe par SMS ou via une messagerie sécurisée (Signal/Teams)."
        ],
        correctAnswer: 2,
        explanation: "Si le pirate intercepte l'email, il aura le coffre-fort ET la clé. Il faut séparer les canaux."
        ,
        image: "./assets/Images/secure-zip.png"
    },
    {
        question: "Un client exerce son 'Droit à l'oubli'. Vous supprimez sa fiche dans le logiciel CRM (Salesforce/Hubspot). Est-ce suffisant ?",
        options: [
            "Oui, c'est la base officielle.",
            "Non, je dois aussi vérifier mes fichiers Excel locaux et mes emails archivés.",
            "Oui, car les sauvegardes s'effacent toutes seules."
        ],
        correctAnswer: 1,
        explanation: "Le RGPD concerne TOUTES les occurrences de la donnée, y compris vos copies de travail personnelles ('Shadow Data')."
        ,
        image: "./assets/Images/logiciel-CRM-Hubspot.webp"
    },
    {
        question: "Qu'est-ce que le principe de 'Moindre Privilège' ?",
        options: [
            "Les nouveaux employés n'ont pas Internet.",
            "Limiter les droits d'accès d'un utilisateur au strict minimum nécessaire pour son travail.",
            "Ne pas donner de mot de passe aux stagiaires."
        ],
        correctAnswer: 1,
        explanation: "Cela réduit la 'surface d'attaque'. Si un compte est compromis, le pirate est bloqué dans un périmètre restreint.",
        image: "./assets/Images/moindre-privilège.jpg",
    },
    {
        question: "À la maison, où devez-vous connecter vos objets connectés (Enceintes, Caméras...) ?",
        options: [
            "Sur le même Wi-Fi que mon PC Pro pour qu'ils communiquent.",
            "Sur un réseau 'Invité' ou un réseau séparé de ma box.",
            "Sur le partage de connexion de mon téléphone pro."
        ],
    correctAnswer: 1,
    explanation: "Les objets connectés sont faciles à pirater. S'ils sont isolés sur un réseau invité, le pirate ne peut pas rebondir vers votre PC Pro.",
    image: "./assets/Images/illustration-smart--connected-devices.jpg"

    },
    {
        question: "Une cyberattaque paralyse l'entreprise. Un journaliste vous contacte sur LinkedIn pour avoir des infos. Comment réagissez-vous ?",
        options: [
            "Je lui explique la situation pour rassurer le public.",
            "Je démens tout en bloc.",
            "Je ne réponds pas et je le renvoie vers le service Communication/Direction."
        ],
        correctAnswer: 2,
        explanation: "Une mauvaise communication peut aggraver la crise et les conséquences juridiques. Seule la cellule de crise est habilitée à parler.",
        image: "./assets/Images/journaliste-prend-des-notes.jpg"
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

    // Update image if exists
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
        finalFeedback.textContent = '🎉 Excellent! Vous êtes un expert en cybersécurité!';
    } else if (score >= questions.length * 0.8) {
        finalFeedback.textContent = '✅ Très bien! Vous maîtrisez les concepts avancés.';
    } else if (score >= questions.length * 0.6) {
        finalFeedback.textContent = '👍 Bon score! Approfondissez vos connaissances pour devenir expert.';
    } else {
        finalFeedback.textContent = '💪 Continuez vos efforts! La cybersécurité avancée demande de la pratique.';
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
        element.setAttribute('download', 'guide-cybersecurite-expert.pdf');
        element.style.display = 'none';
        document.body.appendChild(element);
        alert('Le guide PDF sera bientôt disponible au téléchargement!');
    });
});
