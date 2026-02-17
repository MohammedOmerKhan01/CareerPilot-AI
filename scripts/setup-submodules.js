const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up submodules...');

const modulesDir = path.join(__dirname, '..', 'modules');

// Create modules directory if it doesn't exist
if (!fs.existsSync(modulesDir)) {
  fs.mkdirSync(modulesDir, { recursive: true });
  console.log('Created modules directory');
}

// Check if submodules are initialized
const submodules = [
  'kodnest-careers',
  'placement-readiness',
  'ai-resume-builder'
];

submodules.forEach(module => {
  const modulePath = path.join(modulesDir, module);
  if (!fs.existsSync(modulePath) || fs.readdirSync(modulePath).length === 0) {
    console.log(`Submodule ${module} not found or empty`);
    console.log('Please run: git submodule update --init --recursive');
  } else {
    console.log(`✓ Submodule ${module} is ready`);
  }
});

console.log('\nSubmodule setup complete!');
console.log('\nTo add submodules, run:');
console.log('git submodule add https://github.com/MohammedOmerKhan01/kodnest-careers modules/kodnest-careers');
console.log('git submodule add https://github.com/MohammedOmerKhan01/Placement-Readiness-Platform modules/placement-readiness');
console.log('git submodule add https://github.com/MohammedOmerKhan01/AI-Resume-Builder modules/ai-resume-builder');
