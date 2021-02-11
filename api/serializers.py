# File that takes python-related code and translate Model into json response

from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')


# Valid data to correspond with fields
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        # which data do we serialize
        fields = ('guest_can_pause', 'votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    # nto referencing code field from model, redefine
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        # how to send code if it has to be unique?
        fields = ('code', 'guest_can_pause', 'votes_to_skip')

