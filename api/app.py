
from flask import Flask, render_template, request, redirect, url_for, session 
import re
import psycopg2
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
    data=request.get_json()
    print(request.get_json())
    if request.method == 'POST' and 'username' in data and 'password' in data and 'email' in data : 
        username = data['username']
        password = data['password']
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
    
    return {'msg':msg}


if __name__=="__main__":
    app.run(debug=True)