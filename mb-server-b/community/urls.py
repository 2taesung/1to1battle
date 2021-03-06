from django.urls import path
from . import views

urlpatterns = [
    # todo list
    path('profile/<int:user_pk>/', views.profile),
    # GET http://localhost:8000/api/v1/community/
    path('movie_list/', views.movie_list),
    path('post_list/', views.post_list),

    # GET, POST, PUT, DELETE http://localhost:8000/api/v1/community/:id/
    path('post_detail/<int:post_id>/', views.post_detail),
    # test
    # path('json-1/', views.community_json_1),
    path('post_create/', views.post_create),
    path('my_post/', views.my_post, name='my_post'),
    path('my_vote/<int:movie_pk>/', views.my_vote, name='my_vote'),
    #comment
    path('commentcreate/<int:post_id>/', views.commentcreate),
    path('comment_update_and_delete/<int:comment_pk>/', views.comment_update_and_delete),

    # 최대 투표 포스트 찾기
    path('recommand/', views.recommand),
]
