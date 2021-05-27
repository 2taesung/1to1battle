#PEP8 이라는 파이썬 암묵적 준수하는 스타일 가이드가 있다.
#내장 모듈

#외부 라이브러리
from django.shortcuts import get_object_or_404
# import community
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

#장고
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model


#커스텀 파일 or 로컬 파일
from .serializers import *
from .models import *
from accounts.serializers import *
from accounts.models import *
# from community import serializers
User = get_user_model()


# Create your views here.
@api_view(['POST'])
def post_create(request):
    movie1_title = request.data.get('movie_title_1')
    movie2_title = request.data.get('movie_title_2')
    movie1 = Movie.objects.get(title=movie1_title)
    movie2 = Movie.objects.get(title=movie2_title)
    print(request.data)
    if request.user.is_authenticated:
        # print()
        if request.method == 'POST':
            serializer = CommunitySerializer(data = request.data)
            # print(serializer)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user, movie_title_1=movie1, movie_title_2=movie2)
                return Response(serializer.data)
        return Response(status=400)
    return Response(status=400)


#무비 리스트 불러오기
@api_view(['GET', 'POST'])
def movie_list(request):
    if request.method == 'GET':
        movies= Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    # elif request.method == 'POST':
    #     serializer = CommunitySerializer(data=request.data) # 바인딩
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save(author=request.user)
    #         return Response(data=serializer.data, status=status.HTTP_201_CREATED)


#게시글 리스트 불러오기
@api_view(['GET', 'POST'])
def post_list(request):
    if request.method == 'GET':
        posts= Community.objects.all()
        serializer = CommunitySerializer(posts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommunitySerializer(data=request.data) # 바인딩
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, post_id):
    post = get_object_or_404(Community, pk=post_id)
    if request.method == 'GET':
        serializer = CommunitySerializer(post)
        return Response(data=serializer.data)

    elif request.method == 'PUT':
        # 바인딩
        serializer = CommunitySerializer(
                data=request.data, instance=post
                )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'POST', 'DELETE'])
def my_vote(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = VoteSerializer(data=request.data, instance=movie)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'POST':
        print(request.user)
        print(request.user.id)
        print('여기')
        movie.vote_users.add(request.user.id)
        serializer = MovieSerializer(data=request.data)
        # print(serializer.data) 
        # console.log(serializer)
        if serializer.is_valid(raise_exception=True):
            print('제발')
            serializer.save(vote_users=request.user.id)
        return Response(data=serializer.data)
    else:
        movie.vote_users.remove(request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)


#내가 적은 글(?), 투표한 글
@api_view(['GET'])
def my_post(request):
    print(request.data)
    user = request.user
    user_serializer = UserSerializer(user)
    return Response(user_serializer.data)


#프로필
@api_view(['GET'])
def profile(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    user_serializer = UserSerializer(user)
    return Response(user_serializer.data)


@api_view(['POST'])
def commentcreate(request, post_id):
    serializer = CommentSerializer(data=request.data)
    user_id = request.data.get('user_id')
    if serializer.is_valid(raise_exception=True):
        serializer.save(post_id=post_id, user_id=user_id)
    return Response(serializer.data)


@api_view(['PUT', 'DELETE'])
def comment_update_and_delete(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'PUT':
        serializer = CommentSerializer(data=request.data, instance=comment)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': '댓글 수정 완료'})
    else:
        comment.delete()
        return Response({'message': '댓글 삭제 완료'})


@api_view(['GET'])
def recommand(request):
    vote_max = 0
    post_info = {}
    # 하나의 게시글에 두개의 영화 ,
    for post in Community.objects.all():
        print(post)
        # rank_post = Community.objects.get(pk=posts)
        
        movie1 = post.movie_title_1.vote_users.count()
        movie2 = post.movie_title_2.vote_users.count()
        result = movie1+movie2

        if result > vote_max:
            vote_max = result
            post_info = post
    print(vote_max)
    serializer = CommunitySerializer(post_info)
    return Response(data = serializer.data)

        # return print(result)
    
        #저 vote_max를 나오게한 영화를 역으로 추적하는 방법은?
        # 커뮤니티에 sumvote model을 만들어줘야하나?
