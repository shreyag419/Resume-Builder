// References
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const linkedinInput = document.getElementById('linkedin');

const previewName = document.getElementById('previewName');
const previewContact = document.getElementById('previewContact');

const educationContainer = document.getElementById('education-container');
const workContainer = document.getElementById('work-container');
const skillsContainer = document.getElementById('skills-container');

const previewEducation = document.getElementById('previewEducation');
const previewWork = document.getElementById('previewWork');
const previewSkills = document.getElementById('previewSkills');

const templateSelect = document.getElementById('templateSelect');
const resumePreview = document.getElementById('resumePreview');
const exportBtn = document.getElementById('exportBtn');

const themeToggle = document.getElementById('themeToggle');

// --- Theme Toggle ---
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.textContent = "🌙 Dark";
} else {
  themeToggle.textContent = "🌞 Day";
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = "🌙 Dark";
  } else {
    localStorage.setItem('theme', 'day');
    themeToggle.textContent = "🌞 Day";
  }
});

// --- Contact Live Preview ---
function updateContact() {
  previewContact.textContent = `${emailInput.value || ''} | ${phoneInput.value || ''} | ${linkedinInput.value || ''}`;
}

nameInput.addEventListener('input', () => previewName.textContent = nameInput.value || 'Your Name');
emailInput.addEventListener('input', updateContact);
phoneInput.addEventListener('input', updateContact);
linkedinInput.addEventListener('input', updateContact);

// --- Template Switcher ---
resumePreview.className = localStorage.getItem('resumeTemplate') || 'modern';
templateSelect.value = localStorage.getItem('resumeTemplate') || 'modern';

templateSelect.addEventListener('change', () => {
  resumePreview.className = templateSelect.value;
  localStorage.setItem('resumeTemplate', templateSelect.value);
});

// --- Fade-in helper ---
function fadeIn(element) {
  element.classList.add('fade-in');
  setTimeout(() => element.classList.remove('fade-in'), 500);
}

// --- Add Education ---
document.getElementById('add-education').addEventListener('click', () => {
  const eduDiv = document.createElement('div');
  eduDiv.classList.add('edu-entry');
  eduDiv.innerHTML = `
    <input type="text" placeholder="School/College">
    <input type="text" placeholder="Duration">
    <textarea placeholder="Description"></textarea>
    <button type="button">Remove</button>
  `;
  educationContainer.appendChild(eduDiv);
  fadeIn(eduDiv);

  eduDiv.querySelectorAll('input, textarea').forEach(inp => inp.addEventListener('input', updateEducationPreview));
  eduDiv.querySelector('button').addEventListener('click', () => {
    eduDiv.remove();
    updateEducationPreview();
  });
});

function updateEducationPreview() {
  previewEducation.innerHTML = '<h3>Education</h3>';
  document.querySelectorAll('.edu-entry').forEach(entry => {
    const school = entry.children[0].value;
    const duration = entry.children[1].value;
    const desc = entry.children[2].value;
    if(school || duration || desc) {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${school}</strong> (${duration})<p>${desc}</p>`;
      fadeIn(div);
      previewEducation.appendChild(div);
    }
  });
}

// --- Add Work ---
document.getElementById('add-work').addEventListener('click', () => {
  const workDiv = document.createElement('div');
  workDiv.classList.add('work-entry');
  workDiv.innerHTML = `
    <input type="text" placeholder="Project/Work Title">
    <input type="text" placeholder="Duration">
    <textarea placeholder="Description"></textarea>
    <button type="button">Remove</button>
  `;
  workContainer.appendChild(workDiv);
  fadeIn(workDiv);

  workDiv.querySelectorAll('input, textarea').forEach(inp => inp.addEventListener('input', updateWorkPreview));
  workDiv.querySelector('button').addEventListener('click', () => {
    workDiv.remove();
    updateWorkPreview();
  });
});

function updateWorkPreview() {
  previewWork.innerHTML = '<h3>Experience / Projects</h3>';
  document.querySelectorAll('.work-entry').forEach(entry => {
    const title = entry.children[0].value;
    const duration = entry.children[1].value;
    const desc = entry.children[2].value;
    if(title || duration || desc) {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${title}</strong> (${duration})<p>${desc}</p>`;
      fadeIn(div);
      previewWork.appendChild(div);
    }
  });
}

// --- Add Skills ---
document.getElementById('add-skill').addEventListener('click', () => {
  const skillDiv = document.createElement('div');
  skillDiv.classList.add('skill-entry');
  skillDiv.innerHTML = `
    <input type="text" placeholder="Skill Name" required>
    <input type="range" min="0" max="100" value="50">
    <button type="button">Remove</button>
  `;
  skillsContainer.appendChild(skillDiv);
  fadeIn(skillDiv);

  const skillNameInput = skillDiv.children[0];
  const skillSlider = skillDiv.children[1];

  skillNameInput.addEventListener('input', updateSkillsPreview);
  skillSlider.addEventListener('input', updateSkillsPreview);

  skillDiv.querySelector('button').addEventListener('click', () => {
    skillDiv.remove();
    updateSkillsPreview();
  });
});


function updateSkillsPreview() {
  previewSkills.innerHTML = '<h3>Skills</h3>';

  document.querySelectorAll('.skill-entry').forEach(entry => {
    const skill = entry.children[0].value;
    const level = entry.children[1].value; // 0–100 slider

    if(skill) {
      const div = document.createElement('div');
      div.innerHTML = `
        <span>${skill}</span>
        <div class="skill-bar"><div class="skill-fill" style="width:0%"></div></div>
      `;
      previewSkills.appendChild(div);

      // Animate the fill based on slider
      setTimeout(() => {
        div.querySelector('.skill-fill').style.width = `${level}%`;
      }, 50);
    }
  });
}


// --- LocalStorage Save & Load ---
function saveData() {
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    linkedin: linkedinInput.value,
    template: templateSelect.value,
    education: [],
    work: [],
    skills: []
  };
  document.querySelectorAll('.edu-entry').forEach(e => data.education.push({
    school:e.children[0].value,duration:e.children[1].value,desc:e.children[2].value
  }));
  document.querySelectorAll('.work-entry').forEach(w => data.work.push({
    title:w.children[0].value,duration:w.children[1].value,desc:w.children[2].value
  }));
  document.querySelectorAll('.skill-entry').forEach(s => data.skills.push({
    skill:s.children[0].value,level:s.children[1].value
  }));
  localStorage.setItem('resumeData', JSON.stringify(data));
}
setInterval(saveData,3000);

window.addEventListener('load', () => {
  const data = JSON.parse(localStorage.getItem('resumeData'));
  if(!data) return;
  nameInput.value=data.name;
  emailInput.value=data.email;
  phoneInput.value=data.phone;
  linkedinInput.value=data.linkedin;
  templateSelect.value=data.template;
  resumePreview.className=data.template;
  updateContact();

  data.education.forEach(e=>{
    document.getElementById('add-education').click();
    const last=educationContainer.lastChild;
    last.children[0].value=e.school;
    last.children[1].value=e.duration;
    last.children[2].value=e.desc;
  });
  updateEducationPreview();

  data.work.forEach(w=>{
    document.getElementById('add-work').click();
    const last=workContainer.lastChild;
    last.children[0].value=w.title;
    last.children[1].value=w.duration;
    last.children[2].value=w.desc;
  });
  updateWorkPreview();

  data.skills.forEach(s=>{
    document.getElementById('add-skill').click();
    const last=skillsContainer.lastChild;
    last.children[0].value=s.skill;
    last.children[1].value=s.level;
  });
  updateSkillsPreview();
});

// --- Export PDF ---
exportBtn.addEventListener('click',()=>window.print());
