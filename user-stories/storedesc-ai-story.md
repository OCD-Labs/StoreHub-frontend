## Feature description

As a store owner, I want to have an AI-generated store description based on keywords or a brief description I provide,
so that I can create engaging and personalized store descriptions without spending too much time writing them manually

## Acceptance Criteria

- AI Description Generation:

  - Upon clicking a "Generate Description" button, the system should send the input to the AI model.
  - The system should use the Hugging Face API to generate a store description based on the provided input. Streaming Response:

- Loading Indicator:

  - While the AI is generating the description, a loading indicator (e.g., a spinner or "Generating..." text) should be visible to the user.

- Generated Description Output:

  - The AI-generated description should be shown below the input field.
  - The user should have the ability to copy, edit, or clear the description before finalizing it.

- Error Handling:
  - If there’s any error in generating the description (e.g., API failure), the user should see an appropriate error message, such as "Error generating description. Please try again."
