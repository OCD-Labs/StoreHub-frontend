## AI-Generated Store Image Feature

As a store owner, I want to generate a unique store image based on keywords or a brief description I provide,
so that I can easily create visually appealing and personalized images for my store without needing design skills or external tools.

## Acceptance Criteria

- AI Image Generation:
  - After clicking a "Generate Image" button, the system should send the input to an AI model capable of generating images (e.g., via Hugging Face or DALL-E).
  - The system should use the API to generate a store image based on the provided input.
- Loading Indicator:
  - While the AI is generating the image, a loading indicator should be visible (e.g., a spinner or "Generating image..." text).
  - If the image generation process takes more than a few seconds, there should be a progress indicator or a message indicating that the process is ongoing.
- Error Handling:
  - If there’s an issue with generating the image (e.g., an invalid API response or an error in processing the request), the user should see a clear error message like "Unable to generate image. Please try again."
