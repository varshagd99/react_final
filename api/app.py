
from flask import Flask, render_template, request, redirect, url_for, session ,json,jsonify
import re
import psycopg2
from  werkzeug.security import generate_password_hash, check_password_hash 
from flask_cors import CORS
import jwt
import datetime
from jwt_token import encodeAuthToken,decodeAuthToken
import numpy as np
import argparse
import cv2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
import time
app=Flask(__name__)
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
CORS(app)



def check_header(request):

    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1] 
    else:
        token = ''

    if token:
        decoded = decodeAuthToken(token)
        print(decoded)
        if not isinstance(decoded, str):
            if decoded['admin']:
                return[decoded['sub'],'A']
            else:
                return [decoded['sub'],'U']

@app.route('/api',methods=['GET'])
def index():
    con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
    cur = con.cursor()
    cur.execute("select user_name from users")
    row = cur.fetchall()
    names =[]
    for r in row:
        names.append(list(r))
    print (names)
    cur.close()
    con.close()
    return {'name':names}

@app.route('/register', methods =['POST'])
def register(): 
    msg = '' 
    data = json.loads(request.data)
    print(data)
    if request.method == 'POST' and 'username' in data and 'password' in data and 'email' in data : 
        username = data['username']
        password = generate_password_hash(data['password'])
        email = data['email']
        con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
        cur = con.cursor()
        cur.execute('SELECT * FROM users WHERE email_id = %s', (email,)) 
        account = cur.fetchone() 
        if account: 
            msg = 'Account already exists !'
        
        else: 
            cur.execute('INSERT INTO users (user_name,email_id,password) VALUES (%s, %s, %s)', (username, email, password, )) 
            
            
            con.commit() 
            cur.close()
            con.close()
            msg = 'You have successfully registered !'
        
        print(msg)
    
    return {'msg':msg}


@app.route('/login',methods = ['POST'])

def login():
    try:
        msg = '' 
        data = json.loads(request.data)
        if request.method == 'POST' and 'password' in data and 'email' in data : 
            password = data['password']
            email = data['email']
            con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
            cur = con.cursor()
            cur.execute('SELECT * FROM users WHERE email_id = %s', (email,)) 

            usertable = cur.fetchone()
            print(usertable)


            if not usertable:
                return jsonify({'status':False,
               'msg':'Email doesnot exist'})


            elif usertable:
                x=check_password_hash(usertable[3],password)
                print(x)
                if x :
                    user_id=usertable[0]
                    user_type=usertable[4]
                    byte_token=encodeAuthToken(user_id,user_type)
                    auth_token=byte_token.decode('UTF_8')
                    #auth_token=encodeAuthToken(user_id,user_type)
                    print(auth_token)

                    msg = 'Login Successful'
                
                else :
                    return jsonify(
                    {'status':False,
                    'msg':'Wrong Password'})


            con.commit()
            cur.close()
            con.close()
            print(msg)
        

        return jsonify({

            'status':True,
            'auth_token':str(auth_token),
            'user_type':user_type})
    
    except Exception as e:
        return jsonify({
            'status': False,
            'error': e
        })



@app.route("/emotionGraph",methods=['GET', 'POST'])
def emotionGraph():
    data = json.loads(request.data)
    data_1=check_header(request)
    print(data_1)
    user_id = data_1[0]
    start_date = data['start_date']
    end_date = data['end_date']


    
    print(user_id)


    con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
    cur = con.cursor()
    cur.execute('select sum(angry), sum(disgusted), sum(fearful), sum(happy), sum(neutral), sum(sad), sum(surprise) from user_emotion where user_id=%s and date >= %s and date <= %s',(user_id,start_date,end_date,))
    x=cur.fetchone()
    print(x)

    response = {'angry':x[0],'disgusted':x[1],'fearful':x[2],'happy':x[3],'neutral':x[4],'sad':x[5],'surprise':x[6]}

    return jsonify({'data':list(x)})

@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')



if __name__=="__main__":
    app.run(debug=True)