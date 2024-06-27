import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt

# Load the dataset
df = pd.read_csv('../Expanded_data_with_more_features.csv')

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
    ('onehot', OneHotEncoder(handle_unknown='ignore', dtype=float))
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

# Plot feature importances
plt.figure(figsize=(12, 8))
plt.barh(importance_df['Feature'], importance_df['Importance'])
plt.xlabel('Importance')
plt.ylabel('Feature')
plt.title('Feature Importances')
plt.gca().invert_yaxis()
plt.show()

# Display the sorted feature importances
print(importance_df)
