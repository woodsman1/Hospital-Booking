import secrets
import string
from .models import RefreshToken
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender = User)
def create_Token(sender, instance=None, created=False, **kwarg):
    if created:
        Token.objects.create(user=instance)


def generate_random_token(length=20):
    res = ''.join(secrets.choice(string.ascii_letters + string.digits) for x in range(length))
    return res

def get_refresh_token(user):
    user_object = RefreshToken.objects.filter(user=user)
    i=0
    while i<10:
        token = generate_random_token(length=20)
        obj = RefreshToken.objects.filter(token=token)
        if obj.count() == 0:      # error here obj.count  is always zero (solve later)
            for x in user_object:
                x.user = user
                x.token = token
                x.save()
                return token
            temp=RefreshToken(user=user, token=token)
            temp.save()
            return token
        i+=1
    return None