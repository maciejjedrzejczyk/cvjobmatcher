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

## How is my data being processed by this application?

You're asking an important question about the architecture and data flow of the application. Let me clarify the process:

The PDF document processing is happening on the server side, not in the browser. Here's the flow:

1. Client Side (Browser):
   - The user selects a PDF file using the file input in the HTML form.
   - When the form is submitted (either with the "Process" button or the "HR Jedi Skill" button), the PDF file is sent to the server as part of the form data.

2. Server Side (Flask Application):
   - The server receives the uploaded PDF file.
   - The PDF processing, including text extraction and modification, happens on the server using Python libraries like PyPDF2 and ReportLab.
   - For the HR Jedi Skill, the server injects the metadata and hidden text into the PDF.

3. Back to Client Side:
   - The server sends the processed results back to the client.
   - For the HR Jedi Skill, the modified PDF is sent back to the browser as a base64-encoded string.
   - The browser then creates a download link for the modified PDF.

Here are the relevant parts of the code that confirm this:

In `app.py`:

```python
@app.route('/process_hr_jedi', methods=['POST'])
def process_hr_jedi():
    # ...
    cv_file = request.files['cv']
    # ...
    modified_pdf = inject_prompt_into_pdf(cv_file, hr_jedi_prompt)
    # Encode the modified PDF as base64
    encoded_pdf = base64.b64encode(modified_pdf.getvalue()).decode('utf-8')
    # ...
```

This code shows that the CV file is received by the server (`request.files['cv']`), processed (`inject_prompt_into_pdf`), and then sent back as a base64-encoded string.

In `script.js`:

```javascript
function provideModifiedPDF(encodedPdf) {
    var pdfBlob = base64toBlob(encodedPdf, 'application/pdf');
    var pdfUrl = URL.createObjectURL(pdfBlob);
    
    var downloadLink = '<a href="' + pdfUrl + '" download="enhanced_cv.pdf" class="btn btn-success me-2">Download Enhanced CV</a>';
    // ...
}
```

This JavaScript function receives the base64-encoded PDF from the server, converts it to a Blob, and creates a download link for the user.

So, to directly answer your question: The document is indeed uploaded to the server side, where all the PDF processing occurs. The browser only handles the initial file selection and the final presentation of the download link for the modified PDF.

This server-side processing approach allows for more complex operations on the PDF and keeps the sensitive logic (like the prompt injection) on the server, which is generally more secure than processing it in the browser.

## How did you develop this application?

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

## Where can I learn more about PDF Prompt Injection technique used in this application?

For detailed information about the PDF prompt injection technique used in this application, please refer to the [promptinjectiontopdf.md](https://github.com/maciejjedrzejczyk/cvjobmatcher/blob/main/promptinjectiontopdf.md) file in this repository.

## How can I contribute?
Contributions to improve CV Job Matcher are welcome. Please feel free to submit a Pull Request.

## License
[MIT License](LICENSE)
