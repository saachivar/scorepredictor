# Score Predictor

This is the SAT Score Predictor! Using a survey of 10 questions, it gives an estimate of what your supposed SAT score would be. 
All data used in this project to train the model is from https://www.kaggle.com/datasets/desalegngeb/students-exam-scores/,
a database with fictional data purely meant for education. This project does not claim to accurately predict scores in the real world,
and is instead to be used to demonstrate how data can use trends to make predictions. 

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
    git clone https://github.com/saachivar/scorepredictor.git
    cd scorepredictor/score-predictor-frontend
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
    cd ../score-predictor-backend
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
    python3 score-predictor4.py
    ```

### Usage

1. Start the frontend and backend servers as described above.
2. Open your web browser and go to the URL of the frontend (usually `http://localhost:3000`).
3. Interact with the application by doing the survey and seeing your results!

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

My interest in machine learning and statistics inspired me to create this webpage that uses those features.


