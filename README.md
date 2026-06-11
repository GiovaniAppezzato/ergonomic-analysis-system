[![Expo](https://img.shields.io/badge/Expo-56-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.85-61DAFB?logo=react&logoColor=000000)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38)](https://zustand-demo.pmnd.rs/)

# Introdução

Este repositório contém o aplicativo mobile do sistema de **Análises Ergonômicas**, desenvolvido para o gerenciamento de Análises Ergonômicas Preliminares (AEP).

A aplicação permite autenticar o usuário, listar, visualizar, criar, editar e excluir análises.

Contato: <a href="https://www.linkedin.com/in/giovani-appezzato" target="_blank">LinkedIn</a> - giovani.appezzato@gmail.com

## Tecnologias

- Expo SDK 56
- React Native
- React
- TypeScript
- NativeWind
- React Navigation
- Zustand
- Axios
- React Hook Form
- Yup
- AsyncStorage

## Principais decisões técnicas

- A aplicação foi desenvolvida com Expo para simplificar o desenvolvimento das funcionalidades. Como, de forma geral, não existem funcionalidades que utilizam módulos nativos, optei por não utilizar o React Native CLI.
- A navegação foi separada entre os fluxos público e privado. O fluxo é definido pelo estado do usuário dentro do aplicativo.
- As requisições HTTP foram centralizadas em uma camada de services. Os hooks customizados são utilizados nas consultas de listagem e detalhes para controlar dados, loading e tratamento de erros.
- O estado global de autenticação foi centralizado no Zustand. Como a autenticação é mockada, o token é gerado localmente e persistido com AsyncStorage quando a opção "lembrar de mim" está selecionada.
- A Splash Screen tenta restaurar a sessão persistida antes de decidir entre o fluxo autenticado e a tela de login.
- Os formulários de criação e edição compartilham o mesmo componente, evitando duplicação. React Hook Form gerencia o estado dos campos e Yup concentra as validações.
- Componentes reutilizáveis foram criados para botões, campos, cabeçalho, cards, skeletons e modal de confirmação.
- As operações irreversíveis de exclusão e logout utilizam um modal personalizado compartilhado, sem depender dos alertas nativos do sistema operacional.
- Durante as consultas, skeletons preservam a estrutura aproximada do conteúdo final para reduzir mudanças bruscas no layout.

## Premissas adotadas nas telas sem Figma

As telas sem layout específico no Figma foram construídas a partir da identidade visual presente nas telas fornecidas, reutilizando cores, tipografia, espaçamentos, bordas, cards, cabeçalho e comportamento dos botões.

- **Criação de análise:** foi adotado um formulário em card, dividido entre dados gerais e resultado da análise. Todos os campos documentados pela API são obrigatórios e os percentuais devem totalizar 100%.
- **Edição de análise:** reutiliza integralmente o formulário de criação. Antes da exibição, os detalhes são consultados na API e apresentados em um skeleton durante o carregamento.
- **Perfil:** foi mantida uma composição simples, com avatar e um card para nome e e-mail, pois a autenticação mockada não fornece outros dados pessoais.
- **Confirmações:** exclusão e logout utilizam um modal de confirmação centralizado, com ícone, descrição clara e destaque visual para a ação destrutiva.

## Antes de instalar

Certifique-se de que o Node.js `22.13` ou superior esteja instalado em sua máquina.

Para executar a aplicação em um dispositivo físico, instale o Expo Go. Também é possível utilizar um emulador Android ou simulador iOS devidamente configurado.

## Guia de instalação

### Clone o repositório

```bash
git clone https://github.com/GiovaniAppezzato/ergonomic-analysis-system.git
cd ergonomic-analysis-system
```

### Instale as dependências

```bash
npm install
```

### Copie o arquivo de ambiente

```bash
cp .env.example .env
```

### Configure a URL da API

```env
EXPO_PUBLIC_API_BASE_URL=https://technical-test-api-zo3r.onrender.com/api/giovani-appezzato
```

### Execute a aplicação

```bash
npm start
```

Após iniciar o Expo, utilize o QR Code para abrir a aplicação no Expo Go ou selecione uma das opções disponíveis no terminal.

Para iniciar diretamente em uma plataforma:

OBS: O desenvolvimento foi realizado em um dispositivo Windows, por isso não foi possível testar a aplicação em um simulador da Apple. Recomendo que ela seja testada em um dispositivo Android, pois pode haver particularidades no sistema da Apple que não tenham sido tratadas, visto que não consigo simulá-lo neste ambiente.

```bash
npm run android
npm run ios
```

### Credenciais de acesso

```txt
E-mail: teste@kinebot.com.br
Senha: 123456
```

<div align="center">
  Feito com ♡ por <a href="https://www.linkedin.com/in/giovani-appezzato">Giovani Appezzato</a><br>
  <b>Por favor, mantenha o código limpo e organizado. Obrigado!</b>
</div>
