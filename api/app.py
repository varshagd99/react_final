
from flask import Flask, render_template, request, redirect, url_for, session ,json,jsonify
import re
import psycopg2
from  werkzeug.security import generate_password_hash, check_password_hash 
from flask_cors import CORS
import jwt
import datetime
from jwt_token import encodeAuthToken,decodeAuthToken

app=Flask(__name__)
CORS(app)

def check_header(request):

    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1] 
    else:
        token = ''

    if token:
        decoded = decodeAuthToken(token)
        if not isinstance(decoded, str):
            if decoded['admin']:
                return 'A'
            else:
                return 'U'

@app.route('/api')
def index():
    con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
    cur = con.cursor()
    cur.execute("select * from users")
    row = cur.fetchall()
    for r in row:
      print (f"{r[0]} name {r[1]} email {r[2]}")
    cur.close()
    con.close()
    return "<h2>hello</h2>"

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
                    auth_token=encodeAuthToken(user_id,user_type)

                    msg = 'Login Successful'
                
                else :
                    return jsonify({'status':False,
                    'msg':'Wrong Password'})


            con.commit()
            cur.close()
            con.close()
            print(msg)

        return  jsonify({

            'status':True,
            'auth_token':auth_token
        })
    
    except Exception as e:
        return jsonify({
            'status': False,
            'error': e
        })



@app.route("/emotionGraph",methods=['GET', 'POST'])
def emotionGraph():
    data = json.loads(request.data)
    print(data)
    #user_id = data['user_id']
    user_id = 17
    start_date = data['start_date']
    end_date = data['end_date']

    
    # start_date = '2021-01-01'
    # end_date = '2021-01-03'

    con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
    cur = con.cursor()
    cur.execute('select sum(angry), sum(disgusted), sum(fearful), sum(happy), sum(neutral), sum(sad), sum(surprise) from user_emotion where user_id=%s and date >= %s and date <= %s',(user_id,start_date,end_date,))
    x=cur.fetchone()
    print(x)

    response = {'angry':x[0],'disgusted':x[1],'fearful':x[2],'happy':x[3],'neutral':x[4],'sad':x[5],'surprise':x[6]}

    return(response)


if __name__=="__main__":
    app.run(debug=True)