
# CV Job Matcher

## Overview
CV Job Matcher is an AI-powered web application that analyzes a candidate's CV against a job description to determine the match suitability. It provides a match score, summary, strengths, weaknesses, and recommendations for improvement.

## Functionalities
- Upload CV in PDF format
- Input job posting URL
- Analyze CV against job description using AI
- Provide match score and detailed analysis
- Display strengths, weaknesses, and recommendations

## Technical Prerequisites
- Docker and Docker Compose
- Python 3.9+
- Ollama (for running the LLM locally)

## Steps to Reproduce
1. Clone the repository:
   ```
   git clone https://github.com/maciejjedrzejczyk/cvjobmatcher.git
   cd cvjobmatcher
   ```

2. Ensure Ollama is running on your local machine.

3. Build and run the Docker container:
   ```
   docker-compose up --build
   ```

4. Access the application at `http://localhost:17451`

## Environment Variables
- `OLLAMA_API_URL`: URL for the Ollama API (default: `http://host.docker.internal:11434/api/generate`)
- `OLLAMA_MODEL`: Name of the Ollama model to use (default: `llama3.2`)

## Development Process
This project was developed collaboratively with the assistance of Claude, an AI language model. The development process involved:

- 25+ conversation turns
- 100+ code snippets exchanged
- 5+ major iterations of the application
- Addressing various challenges including Docker networking, API integration, and error handling

Claude played a crucial role in providing code suggestions, troubleshooting issues, and offering explanations throughout the development process.

## Contributing
Contributions to improve CV Job Matcher are welcome. Please feel free to submit a Pull Request.

## License
[MIT License](LICENSE)
