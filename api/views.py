from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
from django.conf import settings
import os
import re
# Create your views here.
api_key = os.getenv('API_KEY')
gemini = genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-pro')

def format_html(content):
    html_text = re.sub('```html', '<html>', content)
    html_text = re.sub('```', '', html_text)
    return html_text

defaultHistory =  [
     {
        'parts':{
            """
                Hey, We are a small saas company. We help people by writing blog posts for them.
                    And we have decided to hire you as our content writer because of your deep knowledge about different fields.
                    Here are some the guideline for this job.
                    => You will receive messages of this format: 
                        "Title: Blog Post Title"
                        headings (1-3):  (heading type, h1,h2)
                            sub headings (0-3) per heading (heading type, h3, h4, h5, h6)
                            infor: (optional) If the user wants to add some info about the topic
                        
                        "info": "Some info about topic".
                    => Your job is to write a blog post. And the blog post must include all the headings.
                    => You are allowed to change the numbering of headings. And make sure that the generated blog post follows this structure
                    Title:
                     ==  Introduction ==
                        Heading 1:
                         Info about heading
                         Subheading 1: (1 by 1)
                            Intro (1-2 lines usually but feel free to add as many as u need)
                            Lists, Keypoints , quotes, references, etc. Anything that you find fit in the topic.
                         Subheading 2:
                            Intro: ....
                            .........
                            Continue as above for all the subheadings
                        Heading 2:
                         ..............................
                         .....................
                         Same as above   
            """
        },
        'role':'user'
    },
    {
        'parts':{
           """Also note that the blog post must be provided in HTML format only!!!!!. No markdown or simple text format is accept.
              The blog post must not be greater than 1500 words and must not be less than 800 words in any circumstances even if the user asks you in future.
              Write the blog post in a professional way and always complete the post. Never ever should you leave place holders in your post.
              Also never leave your post uncompleted!
           """,
        },
        'role':'user'
    },
]

# for now I just want this app to be a demo app. So we will be creating a new chat for each user.
# But as I will move on with this I am thinking of adding an authentication system. Where the bot
# keeps a history of chat with each user to give him her personalized experience. (Like we can take the feedback of the user
# after each blogpost generation)

@api_view(['POST'])
def get_blog_post(request):
    if request.method == 'POST':
        blogpost_title = request.data['title']
        sections = request.data['sections'] 
        # Currently I am thinking of it as a list of dics 
        # example
        #  [
        #     {
        #         'heading': ['heading 1', 'h1'],
        #         'subheadings':[
        #             ['subheading 1.1', 'h3'],
        #             ['subheading 1.2', 'h4'],
        #             ['subheading 1.3', 'h5']
        #         ],
        #         'info': 'some info about the section'
        #     },
        #     {
        #         'heading': ['heading 2', 'h2'],
        #         'subheadings':[
        #             ['subheading 2.1', 'h3'],
        #             ['subheading 2.2', 'h4'],
        #             ['subheading 2.3', 'h5']
        #         ]
        #         'info': 'some info about the section'
        #     }
        # ]
        blogpost_info = request.data['info']
        
        prompt = f"""
            Title: {blogpost_title}\n
        """

        for section in sections:

            heading = section['heading']
            subheadings = section['subheadings']
            info = section['info']
            prompt += f"Heading: {heading[0]} ({heading[1]})\n\t"

            for subheading in subheadings:
                prompt += f"Subheading: {subheading} ({subheading[1]})\n\t"
            
            prompt += "\n"
            
            if info.strip() != "":
                prompt += f"Info About Section: {info}\n"

        prompt += "\n"
        prompt += "Info About Blog Post: " + blogpost_info
        prompt += "\n"        
        chat = model.start_chat(history=defaultHistory)
        
        response = chat.send_message(prompt)
        print(response)
        print(chat.history)

        data = {}
        data['blog_post'] = format_html(response.text)
        data['blog_title'] = blogpost_title
        
        return Response(data, status=status.HTTP_200_OK)

        
