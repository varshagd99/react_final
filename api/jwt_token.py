import jwt
import datetime

def encodeAuthToken(user_id, user_type):
    try:
        admin = True if user_type=='A' else False

        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=60),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id,
            'admin': admin
        }
        token = jwt.encode(payload, 'super-secret-key', algorithm='HS256')
        return token
    except Exception as e:
        print(e)
        return e

def decodeAuthToken(token):
    try:
        payload = jwt.decode(token, 'super-secret-key', algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Login please'
    except jwt.InvalidTokenError:
        return 'Nice try, invalid token. Login please'