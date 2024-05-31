# Learn.md ✍
# PrithWe 🌍
PrithWe is a full-stack web application built on the PERN stack (PostgreSQL, Express, React, Node.js) designed to help households and businesses calculate their carbon footprints. This project was developed as a college project to promote environmental awareness and action.

# Table of Contents 
1. [Introduction](#introduction-)
2. [Tech Stack](#tech-stack-)
3. [Contributing](#contributing-)
   - [Development Workflow](#development-workflow)
   - [Issue Report Process](#issue-report-process)
   - [Pull Request Process](#pull-request-process-)
4. [Setting Up on your machine](#setting-up-on-your-machine-)
5. [Usage](#usage)
6. [Resources for Beginners](#resources-for-beginners-)
   - [Basics of Git and GitHub](#basics-of-git-and-github-)
7. [Documentation](#documentation-)
8. [Code Reviews](#code-reviews-)
9. [Feature Requests](#feature-requests-)
10. [Spreading the Word](#spreading-the-word-)
11. [Motivation](#motivation-)

## Introduction 🖥️
PrithWe allows users to calculate their carbon footprint based on various parameters. It provides detailed insights and suggestions on how to reduce their carbon emissions. The name "PrithWe" is derived from "Prithvi" (Earth) and "We," emphasizing collective action and collaboration. 
Visit the live application [here](https://prithwe.onrender.com).

## Tech Stack 🗃️

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Hosting**: Render
- **Version Control**: Git, GitHub

## Contributing 📝
Raise and issue; Get assigned and then work on fixing the issue.
We welcome contributions to PrithWe! Follow these steps to contribute:

1. **Fork the Repository**: Create your own copy of the repository on your GitHub account.
![image](https://github.com/debangi29/PrithWe/assets/117537653/90772c71-9062-4941-972b-2f3c5cc49cd6)


2. **Clone the Repository** : Clone the repository for making commits.
   ```bash
   git clone https://github.com/adarsh-singh01/PrithWe.git
   ```
      <br>
   
![image](https://github.com/debangi29/PrithWe/assets/117537653/5662eef3-c77b-4c77-b6b6-962d2678d7c4)


3. **Create a New Branch** for your feature or bug fix: Make a separate branch to work on specific features or fixes and switch to the correct branch.
```bash
git checkout -b <new-branch-name>
```
4. **Make Changes** and commit them: Implement your changes and save them with a descriptive commit message.
```bash
git add .
git commit -m "Describe your changes"
```
5. **Push Your Changes** to your fork: Upload your committed changes to your GitHub fork.
   ```bash
   git push origin <branch_name>
   ```
6. **Create a Pull Request ✅**: Propose your changes to be merged into the original repository.
   <br>
   
![image](https://github.com/debangi29/PrithWe/assets/117537653/da3e10a9-7738-43ee-9171-a45a9d0e50dc)

### Development Workflow
- Always work on a new branch for each issue or feature.
- Keep your branch up to date with the main repository's master branch.
- Write clear and descriptive commit messages.
- Test your changes thoroughly before submitting a pull request.

### Issue Report Process
1. Go to the project's issues section.
2. Select the appropriate template for your issue.
3. Provide a detailed description of the issue.
4. Wait for the issue to be assigned before starting to work on it.

### **Pull Request Process 🚀**

1. Ensure that you have self reviewed your code.
2. Make sure you have added the proper description for the functionality of the code.
3. I have commented my code, particularly in hard-to-understand areas.
4. Add screenshot it help in review.
5. Submit your PR by giving the necesarry information in PR template and hang tight we will review it really soon.

# Setting Up on your machine ⚙️

Follow these steps to set up the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/prithwe.git
    ```

2. Navigate to the project directory:

    ```bash
    cd prithwe
    ```

3. Install backend dependencies:

    ```bash
    npm install
    ```

4. Install frontend dependencies:

    ```bash
    cd ./client
    npm install
    ```

5. Set up environment variables:

    Create a `.env` file in the `server` directory and add your database details:

    ```env
   PG_USER=your_user_name 
   PG_HOST=your_host_name 
   PG_DATABASE=your_database_name 
   PG_PASSWORD=your_password
   PG_PORT=5432
   SESSION_SECRET=your_secret
    ```

6. Start the backend server:

    ```bash
    cd ./server
    node index.js
    ```

7. Start the frontend development server:

    ```bash
    cd ./client
    npm run dev
    ```

8. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. Register a new account or log in with an existing account.
2. Choose whether you want to calculate the carbon footprint for a household or a business.
3. Fill in the required information in the form.
4. View the calculated carbon footprint and suggestions for reducing emissions.

## Resources for Beginners 📚
### Basics of Git and GitHub 📂
- [Forking a Repo](https://help.github.com/en/articles/fork-a-repo)
- [Cloning a Repo](https://help.github.com/en/articles/cloning-a-repository)
- [Creating a Pull Request](https://help.github.com/en/articles/creating-a-pull-request)
- [Getting Started with Git and GitHub](https://guides.github.com/introduction/git-handbook/)
- [Learn GitHub from Scratch](https://www.youtube.com/watch?v=w3jLJU7DT5E)


## 📍Documentation
- Document any significant changes or additions to the codebase.
- Provide clear explanations of the functionality, usage, and any relevant considerations.

## Code Reviews 🔎
- Be open to feedback and constructive criticism from other contributors.
- Participate in code reviews by reviewing and providing feedback.

## Feature Requests 🔥
- Suggest new features or improvements that would enhance the project.

## Spreading the Word 👐
- Share your experience and the project with others.
- Spread the word about the project on social media, developer forums, or any relevant community platforms.
## Motivation 🏆
It was a college project and the motivation behind PrithWe is to provide a tool that helps individuals and businesses become more aware of their environmental impact. By understanding their carbon footprint, users can take actionable steps towards reducing their emissions and contributing to a healthier planet.

Thank you for contributing to PrithWe! Together, we can make a significant impact. Happy coding! 🚀
## Don't forget to ⭐ the repository!
