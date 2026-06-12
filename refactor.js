const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Basic refactoring from require to import
      // const x = require('y') -> import x from 'y'
      content = content.replace(/const\s+(\{?[a-zA-Z0-9_,\s]+\}?)\s*=\s*require\(['"]([^'"]+)['"]\);?/g, 'import $1 from \'$2\';');
      
      // module.exports = x -> export default x
      content = content.replace(/module\.exports\s*=\s*(.+);?/g, 'export default $1;');
      
      // exports.x = y -> export const x = y
      content = content.replace(/exports\.([a-zA-Z0-9_]+)\s*=\s*/g, 'export const $1 = ');
      
      const newPath = fullPath.replace(/\.js$/, '.ts');
      fs.writeFileSync(newPath, content, 'utf8');
      fs.unlinkSync(fullPath);
      console.log(`Renamed and refactored ${file} to ${path.basename(newPath)}`);
    }
  }
}

processDirectory(path.join(__dirname, 'src'));

// Handle server.js specially
const serverPath = path.join(__dirname, 'server.js');
if (fs.existsSync(serverPath)) {
  let content = fs.readFileSync(serverPath, 'utf8');
  content = content.replace(/const\s+(\{?[a-zA-Z0-9_,\s]+\}?)\s*=\s*require\(['"]([^'"]+)['"]\);?/g, 'import $1 from \'$2\';');
  
  // Update path to app since server is moving to src/
  content = content.replace(/import app from '\.\/src\/app';/g, 'import app from \'./app\';');
  content = content.replace(/import env from '\.\/src\/config\/env';/g, 'import env from \'./config/env\';');
  content = content.replace(/import \{ sequelize \} from '\.\/src\/config\/database';/g, 'import { sequelize } from \'./config/database\';');
  content = content.replace(/import logger from '\.\/src\/utils\/logger';/g, 'import logger from \'./utils/logger\';');
  
  const newServerPath = path.join(__dirname, 'src', 'server.ts');
  fs.writeFileSync(newServerPath, content, 'utf8');
  fs.unlinkSync(serverPath);
  console.log('Moved server.js to src/server.ts');
}
