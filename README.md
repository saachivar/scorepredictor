# Score Predictor



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/en/)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)

### Installing

A step by step series of examples that tell you how to get a development environment running:

#### Frontend

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject/frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm start
    ```

#### Backend

1. Navigate to the backend directory:

    ```bash
    cd ../backend
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows use `venv\Scripts\activate`
    ```

3. Install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask app:

    ```bash
    flask run
    ```

### Usage

1. Start the frontend and backend servers as described above.
2. Open your web browser and go to the URL of your frontend (usually `http://localhost:3000`).
3. Interact with the application as intended.

### Deployment

The frontend is hosted on Vercel. Follow these steps to deploy the backend locally:

1. Ensure your backend server is running locally as described in the "Backend" section.
2. Open the frontend URL (e.g., `https://yourproject.vercel.app`) and interact with the application.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc


