#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import ignore from 'ignore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(__dirname, 'template');

// Load and parse .templateignore
const templateIgnorePath = path.join(templatePath, '.templateignore');
let ig = ignore();

if (fs.existsSync(templateIgnorePath)) {
  const templateIgnoreContent = fs.readFileSync(templateIgnorePath, 'utf8');
  ig = ig.add(templateIgnoreContent);
}

function replaceVariablesInFiles(dir, variables) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      replaceVariablesInFiles(fullPath, variables); // recurse
    } else {
      let content = fs.readFileSync(fullPath, 'utf8');

      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        content = content.replace(regex, value);
      });

      fs.writeFileSync(fullPath, content);
    }
  });
}

console.log(chalk.cyanBright('\n🚀 Welcome to mz-create-frontend-template!\n'));

const questions = [
  {
    type: 'input',
    name: 'project_name',
    message: 'What should we name your project?',
    default: 'my-app',
  },
  {
    type: 'input',
    name: 'organization_name',
    message: 'Enter your organization name:',
    default: 'MyOrg',
  },
];

inquirer.prompt(questions).then((answers) => {
  const targetDir = path.resolve(process.cwd(), answers.project_name);

  try {
    fs.copySync(templatePath, targetDir, {
      filter: (src) => {
        const relative = path.relative(templatePath, src);

        // Always skip node_modules and its contents
        if (relative.startsWith('node_modules')) return false;

        // Apply .templateignore rules
        return relative === '' || !ig.ignores(relative);
      }

    });

    replaceVariablesInFiles(targetDir, answers);

    console.log(chalk.green(`\n✅ Project created at ./${answers.project_name}\n`));
    console.log(chalk.yellow('\n💡 To start developing with Dev Containers in Visual Studio Code:'));
    console.log(chalk.magenta('   1. Open the project folder in VS Code.'));
    console.log(chalk.magenta('   2. Click "Reopen in Container" when prompted, or use the Command Palette (Ctrl+Shift+P) and select "Dev Containers: Reopen in Container".\n'));
    console.log(chalk.cyan('ℹ️  For more information, please read the README.md file in your project folder.\n'));
  } catch (err) {
    console.error(chalk.red('❌ Error copying template:', err));
  }
});
