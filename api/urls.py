from django.urls import path
from .import views

urlpatterns = [
    path('get-blog-post/', views.get_blog_post),
]