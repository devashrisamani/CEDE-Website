import pandas as pd

# Load the Excel file
file_path = 'FlowTable_FINAL.xlsx'
xls = pd.ExcelFile(file_path)

# Load the relevant sheet into a DataFrame
df_amplitude_features = pd.read_excel(xls, sheet_name='Amplitude features')

# Clean up the dataframe by renaming columns
df_amplitude_features = df_amplitude_features.rename(columns={
    'Does your experiment involve comparisons between muscles or within muscles?': 'muscle_comparison',
    'Does your experiment involve comparisons between sessions or within a session?': 'session_comparison',
    'Does your experiment involve within-group comparisons or between-groups comparisons?': 'group_comparison',
    'Can you participants perfom MVC?': 'perform_mvc',
    'Experimental context (group of recommendations - refer to the word document)': 'recommendation'
})

# Drop rows with NaN values in critical columns
df_amplitude_features = df_amplitude_features.dropna(subset=['muscle_comparison'])

# Select only relevant columns
df_amplitude_features = df_amplitude_features[['muscle_comparison', 'session_comparison', 'group_comparison', 'perform_mvc', 'recommendation']]

# Convert the cleaned dataframe to JSON
rules_json = df_amplitude_features.to_json(orient='records')

# Write the JSON to a file
with open('rules.json', 'w') as file:
    file.write(rules_json)

print("Conversion complete. JSON data saved to rules.json")
