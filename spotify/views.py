from django.shortcuts import render
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status, Reponse

# Create your views here.

class AuthURL(APIView):
    def get(self, request, format=None)
        # scopes needed for spotify connect
        scope = "user-read-playback-state user-modify-playback-state user-read-currently-playing"

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scope,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI
            'client_id': CLIENT_ID
        }).prepare().url
        # return a url to go to to authenticate spotify application

        return Response({'url': url}, status=status.HTTP_200_OK)