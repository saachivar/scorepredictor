# Step 1: Import Libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Step 2: Load the Dataset
data = pd.read_csv('../Expanded_data_with_more_features.csv')

# Step 3: Preprocess the Data
# Define features and target
data = data.drop(columns=['EthnicGroup'])
X = data.drop(columns=['MathScore', 'ReadingScore', 'WritingScore'])
y = data['MathScore']

# Define numerical and categorical columns
numerical_cols = ['NrSiblings']
categorical_cols = ['WklyStudyHours','Gender', 'ParentEduc', 'LunchType', 'TestPrep', 'ParentMaritalStatus', 'PracticeSport', 'IsFirstChild', 'TransportMeans']

# Preprocessing for numerical data
numerical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Preprocessing for categorical data
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Bundle preprocessing for numerical and categorical data
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])

# Step 4: Create a preprocessing and modeling pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression())
])

# Step 5: Split the Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 6: Train the Model
model.fit(X_train, y_train)

# Step 7: Evaluate the Model
y_pred = model.predict(X_test)
print("Mean Squared Error:", mean_squared_error(y_test, y_pred))
print("R2 Score:", r2_score(y_test, y_pred))

# Step 8: Make Predictions on New Data
# Example new data point (make sure to preprocess it similarly to the training data)
new_data = pd.DataFrame({
    'Gender': ['male'],
    'ParentEduc': ["bachelor's degree"],
    'LunchType': ['standard'],
    'TestPrep': ['none'],
    'ParentMaritalStatus': ['married'],
    'PracticeSport': ['regularly'],
    'IsFirstChild': ['yes'],
    'NrSiblings': [3],
    'TransportMeans': ['school_bus'],
    'WklyStudyHours': ['< 5']
})

new_pred = model.predict(new_data)
print("Prediction for new data:", (new_pred*16))
