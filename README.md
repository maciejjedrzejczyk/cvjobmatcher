# CV Job Matcher

## Overview
CV Job Matcher is an AI-powered web application that analyzes a candidate's CV against a job description to determine match suitability. It provides a match score, summary, strengths, weaknesses, and recommendations for improvement. Additionally, it features an innovative "HR Jedi skill" that enhances the CV with AI-generated content invisible to human readers but detectable by machines.

## Functionalities
1. **CV Analysis**:
   - Upload CV in PDF format
   - Input job posting URL
   - Analyze CV against job description using AI
   - Provide match score and detailed analysis
   - Display strengths, weaknesses, and recommendations

2. **Language Support**:
   - English and Polish language options
   - Language-specific AI models and prompts

3. **Custom Prompts**:
   - Option to use custom prompts for analysis
   - Default prompts provided for each supported language

4. **HR Jedi Skill**:
   - Generate an enhanced version of the CV
   - Inject AI-generated content into the PDF metadata
   - Provide downloadable enhanced CV
   - Include a "wanna learn more?" link for additional information

5. **PDF Metadata Injection**:
   - Inject AI-generated prompts into PDF metadata
   - Invisible to human readers but detectable by machines

## Technical Prerequisites
- Docker and Docker Compose
- Python 3.9+
- Ollama (for running the LLM locally)
- Web browser with JavaScript enabled

## Steps to Reproduce
1. Clone the repository:
   ```
   git clone https://github.com/maciejjedrzejczyk/cvjobmatcher.git
   cd cvjobmatcher
   ```

2. Ensure Ollama is installed and running on your local machine.

3. Build and run the Docker container:
   ```
   docker-compose up --build
   ```

4. Access the application at `http://localhost:17451`

5. Use the interface to upload a CV, enter a job URL, and analyze the match.

6. Optionally, use the "HR Jedi skill" to generate an enhanced CV.

## Environment Variables
- `OLLAMA_API_URL`: URL for the Ollama API (default: `http://host.docker.internal:11434/api/generate`)
- `OLLAMA_MODEL`: Name of the Ollama model to use (default: `llama3.2`)

## Language Models
- English: `llama3.2:3b-instruct-q8_0`
- Polish: `SpeakLeash/bielik-11b-v2.3-instruct:Q4_K_M`

## Development Process
This project was developed collaboratively with the assistance of Claude, an AI language model. The development process involved:

- 30+ conversation turns
- 150+ code snippets exchanged
- 7+ major iterations of the application
- Addressing various challenges including:
  - Docker networking
  - API integration
  - Error handling
  - Multilingual support
  - PDF metadata manipulation
  - Frontend-backend communication

Claude played a crucial role in providing code suggestions, troubleshooting issues, and offering explanations throughout the development process.

## PDF Prompt Injection
For detailed information about the PDF prompt injection technique used in this application, please refer to the [promptinjectiontopdf.md](https://github.com/maciejjedrzejczyk/cvjobmatcher/blob/main/promptinjectiontopdf.md) file in this repository.

## Contributing
Contributions to improve CV Job Matcher are welcome. Please feel free to submit a Pull Request.

## License
[MIT License](LICENSE)
