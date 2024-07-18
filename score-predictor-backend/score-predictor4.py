import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
import joblib

app = Flask(__name__)

# Load the dataset
df = pd.read_csv('Expanded_data_with_more_features.csv')

# Identify numeric and categorical columns
numerical_cols = ['NrSiblings']
categorical_cols = ['WklyStudyHours','Gender', 'ParentEduc', 'LunchType', 'TestPrep', 'ParentMaritalStatus', 'PracticeSport', 'IsFirstChild', 'TransportMeans']

# Define preprocessing steps for numerical columns
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Define preprocessing steps for categorical columns
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Bundle preprocessing steps using ColumnTransformer
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])

# Define the model pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Define features (X) and target (y)
X = df.drop(columns=['ReadingScore', 'MathScore', 'WritingScore'])
y = df[['ReadingScore', 'MathScore', 'WritingScore']]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model on the training data
model.fit(X_train, y_train)

# Get feature importances from the random forest model
regressor = model.named_steps['regressor']
feature_importances = regressor.feature_importances_

# Get the feature names after preprocessing
preprocessor.fit(X_train)
encoded_columns = (preprocessor.named_transformers_['cat']
                   .named_steps['onehot'].get_feature_names_out(categorical_cols))
all_columns = np.concatenate([numerical_cols, encoded_columns])

# Create a DataFrame for feature importances
importance_df = pd.DataFrame({'Feature': all_columns, 'Importance': feature_importances})

# Sort the DataFrame by importance
importance_df = importance_df.sort_values(by='Importance', ascending=False)

# Save the trained model and feature importances
joblib.dump(model, 'model.pkl')
importance_df.to_csv('feature_importances.csv', index=False)

# Reload the trained model and feature importances
model = joblib.load('model.pkl')
importance_df = pd.read_csv('feature_importances.csv')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    new_test_case_df = pd.DataFrame([data])
    new_test_case_preprocessed = model.named_steps['preprocessor'].transform(new_test_case_df)
    predicted_scores = model.named_steps['regressor'].predict(new_test_case_preprocessed)
    predicted_scores *= 8  # Assuming you want to scale the predictions
    return jsonify({
        'predicted_scores': predicted_scores.tolist(),
        'feature_importances': importance_df.to_dict(orient='records')
    })

if __name__ == '__main__':
    app.run(debug=True)
