const form = document.getElementById('prediction-form');
const modal = document.getElementById('pred-modal');
const modalResult = document.getElementById('modal-result');

if (!form || !modal || !modalResult) {
  console.error('Some elements are missing from the DOM.');
}

const numericalFields = {
  signals: 'Signals',
  yield: 'Yield',
  speed: 'Speed Control',
  night: 'Night Drive',
  signs: 'Road Signs',
  steer: 'Steer Control',
  mirror: 'Mirror Usage',
  confidence: 'Confidence',
  parking: 'Parking',
  theory: 'Theory Test'
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  await processForm();
});

window.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

async function processForm() {
  const formData = new FormData(form);

  // POST request, show modal or display error
  await fetch('/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transformData(formData))
  })
    .then((res) => res.json())
    .then((data) => {
      showModal(data.prediction);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}

function transformData(formData) {
  const data = {};

  // Gender: Male -> 1, Female -> 0
  const gender = formData.get('gender');
  data['Gender'] = gender === 'Male' ? 1 : 0;

  // Age Group: Teenager -> 0, Young Adult -> 1, Middle Age -> 2
  const age = formData.get('age');
  if (16 <= age && age <= 19) {
    data['Age Group'] = 0;
  } else if (20 <= age && age <= 39) {
    data['Age Group'] = 1;
  } else {
    data['Age Group'] = 2;
  }

  // Race: White -> 0, Black -> 1, Other -> 2
  const race = formData.get('race');
  if (race === 'White') {
    data['Race'] = 0;
  } else if (race === 'Black') {
    data['Race'] = 1;
  } else {
    data['Race'] = 2;
  }

  // Training: None -> 0, Basic -> 1, Advanced -> 2
  const training = formData.get('training');
  if (training === 'None') {
    data['Training'] = 0;
  } else if (training === 'Basic') {
    data['Training'] = 1;
  } else {
    data['Training'] = 2;
  }

  // Reactions: Slow -> 0, Average -> 1, Fast -> 2
  const reactions = formData.get('reactions');
  if (reactions === 'Slow') {
    data['Reactions'] = 0;
  } else if (reactions === 'Average') {
    data['Reactions'] = 1;
  } else {
    data['Reactions'] = 2;
  }

  // Rest are numerical from 0-100
  for (const [key, value] of Object.entries(numericalFields)) {
    data[value] = parseInt(formData.get(key), 10);
  }

  return data;
}

function showModal(qualified) {
  // Add text
  modalResult.textContent = qualified ? 'Qualified' : 'Not Qualified';

  // Add classes for styling
  modalResult.className = 'modal-result';
  modalResult.classList.add(
    qualified ? 'result-qualified' : 'result-not-qualified'
  );

  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}
