# Prompt Injection into PDF Files

This document describes the process of injecting a prompt into a PDF file in a way that is invisible to human readers but detectable by machines. This technique is used in the CV Job Matcher application to enhance CVs with AI-generated content.

## Nature of the Prompt Injection

The prompt injection technique used in this application involves adding custom metadata to the PDF file. This metadata is not visible when viewing the PDF normally but can be accessed by software designed to read PDF metadata.

The injected prompt is stored in a custom metadata field named "HRJediPrompt". This field contains the AI-generated content that aims to present the candidate in the best possible light to automated HR systems.

## Steps to Generate the Modified PDF

1. **Upload CV**: The user uploads their original CV in PDF format.

2. **Provide Job URL**: The user enters the URL of the job posting they're interested in.

3. **Process CV**: The application analyzes the CV against the job description.

4. **Generate HR Jedi Prompt**: Based on the analysis, an AI generates a prompt that highlights the candidate's strengths and addresses potential weaknesses.

5. **Inject Prompt**: The application injects this prompt into the PDF as metadata.

6. **Download Enhanced CV**: The user can then download the modified PDF with the injected prompt.

## Verifying the Injected Prompt

To verify that the prompt has been successfully injected into the PDF, you can follow these steps:

### Using Adobe Acrobat Reader:

1. Open the modified PDF in Adobe Acrobat Reader.
2. Go to File > Properties.
3. In the "Description" tab, look for a custom property named "HRJediPrompt".
4. The value of this property should contain the injected prompt.

### Using ExifTool (Command Line):

1. Install ExifTool if you haven't already.
2. Open a terminal or command prompt.
3. Navigate to the directory containing the modified PDF.
4. Run the following command:
   ```
   exiftool your_modified_cv.pdf | grep HRJediPrompt
   ```
5. This should display the injected prompt.

### Using Python:

You can use a Python script with the PyPDF2 library to read the metadata:

```python
from PyPDF2 import PdfReader

reader = PdfReader("your_modified_cv.pdf")
metadata = reader.metadata
hr_jedi_prompt = metadata.get('/HRJediPrompt', 'Not found')
print(f"Injected Prompt: {hr_jedi_prompt}")
```

## Important Notes

- The injected prompt is not visible in the PDF content itself. It's stored in the file's metadata.
- This technique is designed to be invisible to human readers but detectable by machines or software specifically looking for this metadata.
- While this method can potentially improve a candidate's chances with automated screening systems, it's important to use this feature ethically and ensure that all information provided is truthful and accurate.
