
from flask import Flask, render_template, request, redirect, url_for, session ,json
import re
import psycopg2
from  werkzeug.security import generate_password_hash, check_password_hash 

app=Flask(__name__)
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
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email): 
            msg = 'Invalid email address !'
        elif not re.match(r'[A-Za-z0-9]+', username): 
            msg = 'Username must contain only characters and numbers !'
        elif not username or not password or not email: 
            msg = 'Please fill out the form !'
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
        print(data)
        if request.method == 'POST' and 'password' in data and 'email' in data : 
            password = data['password']
            email = data['email']
            con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
            cur = con.cursor()
            cur.execute('SELECT * FROM users WHERE email_id = %s', (email,)) 

            usertable = cur.fetchone()


            if not usertable:
                msg = 'Account does not exists Please register'


            elif usertable:
                x=check_password_hash(usertable[3],password)
                print(x)
                if x :
                    msg = 'Login Successful'
                    

                else :
                    msg = 'Please Check password and email'


            con.commit()
            cur.close()
            con.close()
            print(msg)

        return {'message':msg}

    except Exception as e:
        print(e)


@app.route("/emotionGraph",methods=['GET', 'POST'])
def emotionGraph():
    data = request.get_json()
    print(request.get_json())
    # user_id = data['user_id']
    # start_date = data['start_date']
    # end_date = data['end_date']

    user_id = 17
    start_date = '2021-01-01'
    end_date = '2021-01-03'

    con = psycopg2.connect('postgres://pmotbfypffbrrt:1f75e4090383473f9d5fd2614ae03b839cb94c7c1d2d37941be23fa549ba4c44@ec2-50-19-247-157.compute-1.amazonaws.com:5432/d276mkc2k6kji4')
    cur = con.cursor()
    cur.execute('select sum(angry), sum(disgusted), sum(fearful), sum(happy), sum(neutral), sum(sad), sum(surprise) from user_emotion where user_id=%s and date >= %s and date <= %s',(user_id,start_date,end_date,))
    x=cur.fetchone()
    print(x)

    response = {'angry':x[0],'disgusted':x[1],'fearful':x[2],'happy':x[3],'neutral':x[4],'sad':x[5],'surprise':x[6]}

    return jsonify(response)


if __name__=="__main__":
    app.run(debug=True)