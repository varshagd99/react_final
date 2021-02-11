
from flask import Flask, render_template, request, redirect, url_for, session ,Response,json,jsonify
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
    data_row=[]
    for i in row:
        for j in i:
            data_row.append(j)
    print(data_row)
    # for r in row:
    #   print (f" name {r[1]} email {r[2]}")
    cur.close()
    con.close()
    return {'name':data_row}

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
    # data_1=check_header(request)
    # print(data_1)
    user_id = data['id']
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

@app.route('/name',methods=['GET', 'POST'])
def name():
    data = json.loads(request.data)
    user_name = data['user_name']
    print(data)
    # data_1=check_header(request)
    # print(data_1)
    # user_id = data_1[0]
    # print(user_id)
    con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
    cur = con.cursor()
    cur.execute("select user_id from users where user_name=%s",(user_name,))
    name =[]
    names = cur.fetchone()
    for i in names:
        name.append(i)
    print(name[0])
    cur.close()
    con.close()
    return {'name':name[0]}

coun=0
if coun == 0:
    @app.route('/feed')
    # def index1():
    #     """Video streaming home page."""
    #     return render_template('C:\\Users\\HP\\Desktop\\final_year_project\\react_final\\public\\index.html')
    def gen():
        model = Sequential()

        model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(48,48,1)))
        model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Dropout(0.25))

        model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Dropout(0.25))
        model.add(Flatten())
        model.add(Dense(1024, activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(7, activation='softmax'))
        model.load_weights('model.h5')

        # prevents openCL usage and unnecessary logging messages
        cv2.ocl.setUseOpenCL(False)

        # dictionary which assigns each label an emotion (alphabetical order)
        emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
        counta=0
        countd=0
        countf=0
        counth=0
        countn=0
        counts=0
        countss=0
        # start the webcam feed
        cap = cv2.VideoCapture(0)
        while True:
            start = time.time()
            # Find haar cascade to draw bounding box around face
            ret, frame = cap.read()
            if not ret:
                break
            facecasc = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = facecasc.detectMultiScale(gray,scaleFactor=1.3, minNeighbors=5)

            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y-50), (x+w, y+h+10), (255, 0, 0), 2)
                roi_gray = gray[y:y + h, x:x + w]
                cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray, (48, 48)), -1), 0)
                prediction = model.predict(cropped_img)
                maxindex = int(np.argmax(prediction))
                if(maxindex==0):
                    print("Angry")
                    counta+=1
                elif(maxindex==1):
                    countd+=1  
                    print("disgusted")
                elif(maxindex==2):
                    countf+=1
                    print("Fearful")  
                elif(maxindex==3):
                    counth+=1 
                    print("Happy") 
                elif(maxindex==4):
                    countn+=1  
                    print("Neutral")
                elif(maxindex==5):
                    counts+=1
                    print("Sad")  
                elif(maxindex==6):
                    countss+=1 
                    print("Surprised")                       
                cv2.putText(frame, emotion_dict[maxindex], (x+20, y-60), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            print(counta)
            print(countd)
            print(countf)
            print(counth)
            print(countn)
            print(counts)
            print(countss)
            cv2.imshow('Video', cv2.resize(frame,(1600,960),interpolation = cv2.INTER_CUBIC))
       
            if cv2.waitKey(100) & 0xFF == ord('q'):
                break
            imgencode = cv2.imencode('.jpg',frame)[1]
            strinData = imgencode.tostring()
            yield (b'--frame\r\n'b'Content-Type: text/plain\r\n\r\n'+strinData+b'\r\n')

        cap.release()
        cv2.destroyAllWindows()
    @app.route('/video_feed')
    def video_feed():
        """Video streaming route. Put this in the src attribute of an img tag."""
        return Response(gen(),
                        mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__=="__main__":
    app.run(debug=True)