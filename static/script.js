$(document).ready(function() {
    const defaultPrompts = {
        en: `Given the following CV and job description, determine if the candidate is a good match for the job.
Provide recommendations for improvement if necessary.
CV:
{cv_text}
Job Description:
{job_description}
Is the candidate a good match? Why or why not? What recommendations would you give?
Provide your response in the following JSON format:
{
    "match_score": <score between 0 and 100>,
    "summary": "<brief summary of the match>",
    "strengths": ["<strength1>", "<strength2>", ...],
    "weaknesses": ["<weakness1>", "<weakness2>", ...],
    "recommendations": ["<recommendation1>", "<recommendation2>", ...]
}`,
        pl: `Na podstawie poniższego CV i opisu stanowiska, określ, czy kandydat jest dobrym dopasowaniem do pracy.
W razie potrzeby podaj zalecenia dotyczące poprawy.
CV:
{cv_text}
Opis stanowiska:
{job_description}
Czy kandydat jest dobrym dopasowaniem? Dlaczego tak lub nie? Jakie zalecenia byś dał?
Podaj swoją odpowiedź w następującym formacie JSON:
{
    "match_score": <wynik między 0 a 100>,
    "summary": "<krótkie podsumowanie dopasowania>",
    "strengths": ["<mocna strona1>", "<mocna strona2>", ...],
    "weaknesses": ["<słaba strona1>", "<słaba strona2>", ...],
    "recommendations": ["<zalecenie1>", "<zalecenie2>", ...]
}`
    };

    function updatePrompt() {
        const lang = $('#language').val();
        $('#customPrompt').val(defaultPrompts[lang]);
    }

    $('#language').on('change', updatePrompt);

    $('#useCustomPrompt').on('change', function() {
        if (this.checked) {
            $('#promptArea').show();
        } else {
            $('#promptArea').hide();
        }
    });

    updatePrompt();

    $('#matchForm').on('submit', function(e) {
        e.preventDefault();
        console.log("Form submitted");
        
        var formData = new FormData(this);
        
        console.log("Form data:", formData); // Log form data for debugging
        
        $('#processingMessage').show();
        $('#result').html('');
        $('#downloadContainer').empty();
        
        $.ajax({
            url: '/process',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log("AJAX request successful", response);
                $('#processingMessage').hide();
                displayResult(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("AJAX error: " + textStatus + ' : ' + errorThrown);
                $('#processingMessage').hide();
                $('#result').html('<div class="alert alert-danger">An error occurred while processing your request. Please try again.</div>');
            }
        });
    });
    
    function displayResult(data) {
        if (data.error) {
            $('#result').html('<div class="alert alert-danger">' + data.error + '</div>');
            return;
        }
        
        var resultHtml = '<div class="card">' +
            '<div class="card-body">' +
            '<h2 class="card-title">Match Results</h2>' +
            '<p class="card-text"><strong>Match Score:</strong> ' + data.match_score + '%</p>' +
            '<p class="card-text"><strong>Summary:</strong> ' + data.summary + '</p>' +
            '<h3>Strengths</h3>' +
            '<ul>' + data.strengths.map(s => '<li>' + s + '</li>').join('') + '</ul>' +
            '<h3>Weaknesses</h3>' +
            '<ul>' + data.weaknesses.map(w => '<li>' + w + '</li>').join('') + '</ul>' +
            '<h3>Recommendations</h3>' +
            '<ul>' + data.recommendations.map(r => '<li>' + r + '</li>').join('') + '</ul>' +
            '</div></div>';
        
        $('#result').html(resultHtml);
    }

    $('#hrJediButton').on('click', function() {
        console.log("HR Jedi button clicked");
        var formData = new FormData($('#matchForm')[0]);
        $('#processingMessage').show();
        $('#result').html('');
        $('#downloadContainer').empty();
        processHRJedi(formData);
    });

    function processHRJedi(formData) {
        console.log("Processing HR Jedi request");
        $.ajax({
            url: '/process_hr_jedi',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log("HR Jedi request successful", response);
                $('#processingMessage').hide();
                displayHRJediResult(response);
                if (response.modified_pdf) {
                    provideModifiedPDF(response.modified_pdf);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("AJAX error: " + textStatus + ' : ' + errorThrown);
                $('#processingMessage').hide();
                $('#result').html('<div class="alert alert-danger">An error occurred while processing your HR Jedi request. Please try again.</div>');
                $('#downloadContainer').empty();
            }
        });
    }

    function displayHRJediResult(data) {
        if (data.error) {
            $('#result').html('<div class="alert alert-danger">' + data.error + '</div>');
            return;
        }
        
        var resultHtml = '<div class="card">' +
            '<div class="card-body">' +
            '<h2 class="card-title">HR Jedi Prompt</h2>' +
            '<pre>' + data.hr_jedi_prompt + '</pre>' +
            '</div></div>';
        
        $('#result').html(resultHtml);
    }

    function provideModifiedPDF(encodedPdf) {
        console.log("provideModifiedPDF function called");
        var pdfBlob = base64toBlob(encodedPdf, 'application/pdf');
        var pdfUrl = URL.createObjectURL(pdfBlob);
        
        var downloadLink = '<a href="' + pdfUrl + '" download="enhanced_cv.pdf" class="btn btn-success me-2">Download Enhanced CV</a>';
        var learnMoreLink = '<a href="https://github.com/maciejjedrzejczyk/cvjobmatcher/blob/main/promptinjectiontopdf.md" target="_blank" class="btn btn-link">wanna learn more?</a>';
        
        $('#downloadContainer').html(downloadLink + learnMoreLink);
        console.log("Download link and 'wanna learn more?' link added to downloadContainer");
    }

    function base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);
            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }
});
