# from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *


User = get_user_model()

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = (
            'user', 'title', 'movie_title_1', 'movie_title_2',
        )
        # read_only_fields = [
        #     'user', 
        # ]


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields ='__all__'
            # 'title', 'overview', 'poster_path',
            # 'created_at', 'updated_at',
        