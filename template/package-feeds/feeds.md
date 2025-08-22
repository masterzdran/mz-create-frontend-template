# Configuração por Tecnologia
## NuGet (.NET)
package-feeds/nuget.config

**Autenticação**
- Azure Artifacts: dotnet nuget add source com --username e --password (PAT)
- GitHub: usa GITHUB_TOKEN ou PAT
- Scripts em auth/nuget-auth.sh

## npm (JS/TS)
package-feeds/.npmrc

**Autenticação**
- GitHub Packages: NPM_TOKEN como secret
- Azure Artifacts: npm login com PAT
- Scripts em auth/npm-auth.sh

## PyPI (Python)
package-feeds/pip.conf

**Alternativas:**
- Test PyPI: https://test.pypi.org/simple
- GitHub Packages: https://pip.pkg.github.com/ORG/
- Azure Artifacts: https://pkgs.dev.azure.com/ORG/_packaging/FEED/pypi/simple/

**Autenticação**
- .pypirc para publicação
- Scripts em auth/pypi-auth.sh

# Servidores de Pacotes

## NuGet
- NuGet.org (público)
- Azure Artifacts (privado)
- GitHub Packages (privado)

## npm
- npmjs.com (público)
- GitHub Packages (privado)

## PyPI
- PyPI (público)
- Test PyPI (staging)
- GitHub Packages (privado)

## Autenticação
Ver scripts em `package-feeds/auth/`