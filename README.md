# SecureBlink Assessment

Welcome to the `secureBlink_Assess` project! This documentation will guide you through the steps needed to set up and run the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)


## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Python 3.9 or higher](https://www.python.org/downloads/)
- [Node 18 or higher](https://nodejs.org/en/download/package-manager)
- Anaconda navigator (for jupyter notebook)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/AryanTele/secureBlink_Assess.git
   cd secureBlink_Assess
   ```


3. **Install the dependencies**

   ```bash
   pip install -r requirements.txt
   ```

## Running the Project

Here’s a section describing the flow of the project:

To successfully run the `secureBlink_Assess` project, follow these steps in order:

### 1. Start the Server

First, you'll need to start the server:

1. **Install Node Modules**

   Navigate to the project directory and initialize Node.js:

   ```bash
   npm init
   ```

   Then, install the required dependencies, particularly Express:

   ```bash
   npm install express
   ```

2. **Run the Server**

   Once the dependencies are installed, start the server by running `server.js`:

   ```bash
   node server.js
   ```

   This will start your backend server, which will be responsible for handling API requests.

### 2. Execute the Jupyter Notebook

After your server is running, you need to execute the program present in the `.ipynb` file:

1. Open the Jupyter Notebook containing the `.ipynb` file.
2. Execute the cells in the notebook in order, making sure all necessary code blocks are run successfully.

### 3. Test the API

With both the server running and the notebook executed, you can now test the API endpoints.

1. Open Postman or any API testing tool of your choice.
2. Use the following Postman documentation to guide you through the available API endpoints: [Postman Documentation](https://documenter.getpostman.com/view/37752379/2sA3s9D8ab).
