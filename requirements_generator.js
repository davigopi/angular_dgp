
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');

// 1. Escaneia recursivamente a pasta src/ buscando imports e requisições
function getImportedPackages(dir, packages = new Set()) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      getImportedPackages(fullPath, packages);
    } else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Regex para capturar imports em TS/JS: import ... from 'pacote' ou require('pacote')
      const importRegex = /(?:import\s+.*?from\s+['"]|require\(['"])(@?[a-zA-Z0-9_/-]+)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        let pkg = match[1];
        // Trata scoped packages (ex: @angular/core) vs pacotes normais (ex: rxjs/operators)
        if (pkg.startsWith('@')) {
          pkg = pkg.split('/').slice(0, 2).join('/');
        } else {
          pkg = pkg.split('/')[0];
        }

        // Ignora caminhos relativos (ex: ./app, ../models/tarefa)
        if (!pkg.startsWith('.')) {
          packages.add(pkg);
        }
      }
    }
  }
  return packages;
}

// 2. Obtém as versões instaladas no node_modules
function getInstalledVersion(packageName) {
  try {
    const pkgJsonPath = path.join(ROOT, 'node_modules', packageName, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
      const pkgData = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      return `^${pkgData.version}`;
    }
  } catch (e) {
    // Caso não encontre no node_modules
  }
  return '*';
}

function updatePackageJson() {
  if (!fs.existsSync(PACKAGE_JSON_PATH)) {
    console.error('❌ package.json não encontrado na raiz!');
    return;
  }

  const srcDir = path.join(ROOT, 'src');
  if (!fs.existsSync(srcDir)) {
    console.error('❌ Pasta src/ não encontrada!');
    return;
  }

  console.log('🔍 Escaneando arquivos TypeScript e buscando dependências...');
  const usedPackages = getImportedPackages(srcDir);

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  const currentDeps = packageJson.dependencies || {};
  const currentDevDeps = packageJson.devDependencies || {};

  const updatedDeps = {};

  // Atualiza/Adiciona apenas o que é realmente importado no código
  for (const pkg of Array.from(usedPackages).sort()) {
    // Mantém a versão do package.json original se existir, ou pega do node_modules
    if (currentDeps[pkg]) {
      updatedDeps[pkg] = currentDeps[pkg];
    } else if (currentDevDeps[pkg]) {
      // Se estava em devDependencies, move/mantém
      updatedDeps[pkg] = currentDevDeps[pkg];
    } else {
      updatedDeps[pkg] = getInstalledVersion(pkg);
    }
  }

  packageJson.dependencies = updatedDeps;

  // Salva o package.json atualizado e formatado
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
  console.log('✅ package.json atualizado com sucesso com os pacotes utilizados:');
  console.log(Object.keys(updatedDeps));
}

updatePackageJson();
