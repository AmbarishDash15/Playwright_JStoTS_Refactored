# 🏗️ Playwright JS to TS: Refactored Framework

<p align="left">
  <img src="https://img.shields.io/badge/Migration-JS%20%E2%96%B6%20TS-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=Playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Code_Quality-Refactored-brightgreen?style=for-the-badge" />
</p>

### 📖 Project Overview
This repository showcases the successful migration of a legacy **JavaScript** automation suite into a modern, high-performance **TypeScript** framework. By refactoring the core architecture, this project achieves superior code maintainability, reduced technical debt, and 100% type-safety for end-to-end testing on **HerokuApp**.

---

## 🛠️ Refactoring Architecture: JS ➔ TS
The migration followed a structured pipeline to ensure no loss of test coverage while upgrading the developer experience.



### Major Improvements:
* **Strict Interfaces:** Replaced dynamic JS objects with defined interfaces for test data and page elements.
* **Encapsulation:** Utilized TS access modifiers (`private`, `readonly`) within Page Objects to protect internal locators.
* **Compile-time Safety:** Errors in selectors or logic are now caught during the build phase rather than at runtime.
* **Intellisense:** Full autocompletion for custom helper methods and Playwright fixtures.

---

## 📑 Test Coverage: HerokuApp Scenarios
Despite the structural changes, 100% functional parity was maintained for the following scenarios:
* **Auth:** Secure Login/Logout flows with flash message validation.
* **Elements:** Checkboxes, Radio Buttons, and Searchable Dropdowns.
* **Complex UI:** Handling iFrames, nested Windows, and JS Alerts.
* **Network:** Managing AJAX-loaded content and dynamic visibility states.

---

## 🚀 Installation & Setup

### 1. Prerequisites
* **Node.js** (v18 or higher)
* **npm** (comes with Node)

### 2. Setup
```bash
# Clone the repository
git clone [https://github.com/AmbarishDash15/Playwright_JStoTS_Refactored.git](https://github.com/AmbarishDash15/Playwright_JStoTS_Refactored.git)

# Install dependencies & types
npm install

# Install browser engines
npx playwright install
```
---

## *🏃 Execution Commands*
This project utilizes custom scripts defined in package.json to streamline the testing workflow.

* **Scenario** | **Command**
* All Tests (Headless) | ```npx playwright test```
* Open UI Mode | ```npx playwright test --ui```
* Run in Headed Mode | ```npx playwright test --headed```
* Specific Project (e.g. Chrome) | ```npx playwright test --project=chromium```
* Debug Specific Test | ```npx playwright test <file-path> --debug```
* View HTML Report | ```npx playwright show-report ``` 

---
## *📊 Summary of Technical Upgrades*
* **Feature** | **JavaScript (Before)** | **TypeScript (After)**
* Locators | Untyped strings | private readonly typed properties
* Parameters | "(user, pass)" | "(user: string, pass: string)"
* Reliability | Prone to undefined errors | Built-in null/undefined checks
* Maintenance | Manual verification | Automated type-checking
## *🛡️ Conclusion*
The Playwright_JStoTS_Refactored framework is a testament to sustainable automation. By moving to TypeScript, the framework is now more resilient, easier to scale, and aligns with modern software engineering best practices.
