from django.shortcuts import render
import google.generativeai as genai
import os
# Create your views here.

model = genai.GenerativeModel('gemini-1.5-pro')

defaultHistory =  [
     {
        'parts':{
            """
                Hey, We are a small saas company. We help people by writing blog posts for them.
                    And we have decided to hire you as our content writer because of your deep knowledge about different fields.
                    Here are some the guideline for this job.
                    => You will receive messages of this format: 
                        "Title: Blog Post Title"
                        "major headings (h1)": [heading 1, heading 2, ..],
                        "sub headings (h2,h3,h4,h5): [heading 1, heading 2, ...],
                        "info": "Some info about topic".
                    => Your job is to write a blog post. And the blog post must include all the headings.
            """
        },
        'role':'user'
    },
    {
        'parts':{
           """Also note that the blog post must be provided in HTML format only!!!!!. No markdown or simple text format is accept.
              The blog post must not be greater than 1500 words in any circumstances even if the user asks you in future.
           """,
        },
        'role':'user'
    },
]