const fs = require('fs');
const path = require('path');

// Create public/modules directory if it doesn't exist
const publicModulesDir = path.join(process.cwd(), 'public', 'modules');
if (!fs.existsSync(publicModulesDir)) {
  fs.mkdirSync(publicModulesDir, { recursive: true });
}

// Copy placement-readiness dist
const placementSrc = path.join(process.cwd(), 'modules', 'placement-readiness', 'dist');
const placementDest = path.join(publicModulesDir, 'placement-readiness', 'dist');
if (fs.existsSync(placementSrc)) {
  fs.cpSync(placementSrc, placementDest, { recursive: true });
  console.log('✓ Copied placement-readiness module');
}

// Copy ai-resume-builder dist
const resumeSrc = path.join(process.cwd(), 'modules', 'ai-resume-builder', 'dist');
const resumeDest = path.join(publicModulesDir, 'ai-resume-builder', 'dist');
if (fs.existsSync(resumeSrc)) {
  fs.cpSync(resumeSrc, resumeDest, { recursive: true });
  console.log('✓ Copied ai-resume-builder module');
}

console.log('\n✅ All modules copied to public directory');
