import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score


# Change pandas display settings to show all columns
pd.set_option('display.max_columns', None)

df = pd.read_csv('../Expanded_data_with_more_features.csv')

# Identify numeric and categorical columns
numeric_columns = df.select_dtypes(include=[np.number]).columns
categorical_columns = df.select_dtypes(exclude=[np.number]).columns

# Impute missing values in numeric columns with the median
for col in numeric_columns:
    median_value = df[col].median()
    df.fillna({col: median_value}, inplace=True)

# Impute missing values in categorical columns with a random value from the column
for col in categorical_columns:
    non_missing_values = df[col].dropna().unique()
    df[col] = df[col].apply(lambda x: np.random.choice(non_missing_values) if pd.isnull(x) else x)


categorical_columns = df.select_dtypes(exclude=[np.number]).columns
df_encoded = pd.get_dummies(df, columns=categorical_columns, dtype=float)


# Initialize the scaler
scaler = StandardScaler()

# Fit the scaler to the numeric columns and transform the data
df_encoded[numeric_columns] = scaler.fit_transform(df_encoded[numeric_columns])

# Now to divide the training and testing sets
# Define features (X) and target (y)
X = df_encoded.drop(columns=['ReadingScore', 'MathScore', 'WritingScore'])
y = df_encoded[['ReadingScore', 'MathScore', 'WritingScore']]  # Multiple target columns

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the model
model = LinearRegression()

# Train the model on the training data
model.fit(X_train, y_train)

# Display the model's coefficients
print(model.coef_)

# Predict on the test data
y_pred = model.predict(X_test)

# Calculate evaluation metrics
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Display the evaluation metrics
print(f'Mean Absolute Error: {mae}')
print(f'Mean Squared Error: {mse}')
print(f'R-squared: {r2}')

