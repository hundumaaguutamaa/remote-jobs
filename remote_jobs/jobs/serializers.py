from .models import Job
from rest_framework import serializers
from django.contrib.auth.models import User 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class JobSerializer(serializers.ModelSerializer):
    posted_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Job
        fields = ['title', 'company', 'description', 'location', 'url', 'source', 'posted_at']
