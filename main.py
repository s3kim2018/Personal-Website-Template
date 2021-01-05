import json
import io
import hashlib 
from flask import Flask, request, render_template, url_for, make_response, jsonify, send_file
from flask_mongoengine import MongoEngine
from constants import mongodb_pass
app = Flask(__name__)
db_name = "API"
DB_URI = "mongodb+srv://s3kim2018:{}@cluster0.xfm8y.mongodb.net/{}?retryWrites=true&w=majority".format(mongodb_pass, db_name)
app.config["MONGODB_HOST"] = DB_URI
db = MongoEngine()
db.init_app(app)

class blogpost(db.Document):
    name = db.StringField()
    date = db.StringField()
    content = db.StringField()
    desc = db.StringField()
    url = db.StringField()
    photo = db.FileField()
    def to_json(self): 
        return {
            "name": self.name,
            "date": self.date, 
            "content": self.content,
            "desc": self.desc,
            "url": self.url,
            "photo": self.photo
        }
class savedpost(db.Document):
    name = db.StringField(required = False)
    date = db.StringField(required = False)
    content = db.StringField(required = False)
    desc = db.StringField(required = False)
    url = db.StringField(required = False)
    photo = db.FileField(required = False)
    def to_json(self): 
        return {
            "name": self.name,
            "date": self.date, 
            "content": self.content,
            "desc": self.desc,
            "url": self.url,
            "photo": self.photo
        }

@app.route("/")
def hello():
    alltheposts = json.loads(blogpost.objects.to_json())
    print(alltheposts)
    return render_template('index.html', posts = alltheposts)

@app.route("/blogpost/<url>")
def loadblogpost(url):
    post_obj = blogpost.objects(url = url).first()
    postjson = post_obj.to_json()
    return render_template('post.html', post = postjson) 


@app.route("/api/db_populate", methods = ['POST'])
def db_populate(): 
    name = "Test Blog Post1"
    post1 = blogpost(name = "Test Blog Post1", date = "December 29, 2020", content = "A:LKSDJL:JDAL:JDAL:JSDAL:JALJHIOjaklfjal;fajl;fj;lfjal;fja;jdflajl;kgjaklghioejgapoijfopadjfaoipjfopajdfiopafjsfkljas;fjaskl;fjaklfjsfls;kjfd;lkfja;ljfdla;fjafl;jdfl;dskajfaksdlfjal;dkfjaslk;fjdalkfj", url = str(hashlib.sha1(name.encode()).hexdigest()))
    post1.save()
    name = "Test Blog Post2"
    post2 = blogpost(name = "Test Blog Post2", date = "December 29, 2020", content = "A:LKSDJL:JDAL:JDAL:JSDAL:JALJHIOjaklfjal;fajl;fj;lfjal;fja;jdflajl;kgjaklghioejgapoijfopadjfaoipjfopajdfiopafjsfkljas;fjaskl;fjaklfjsfls;kjfd;lkfja;ljfdla;fjafl;jdfl;dskajfaksdlfjal;dkfjaslk;fjdalkfj", url = str(hashlib.sha1(name.encode()).hexdigest()))
    post2.save()
    name = "Test Blog Post3"
    post3 = blogpost(name = "Test Blog Post3", date = "December 29, 2020", content = "A:LKSDJL:JDAL:JDAL:JSDAL:JALJHIOjaklfjal;fajl;fj;lfjal;fja;jdflajl;kgjaklghioejgapoijfopadjfaoipjfopajdfiopafjsfkljas;fjaskl;fjaklfjsfls;kjfd;lkfja;ljfdla;fjafl;jdfl;dskajfaksdlfjal;dkfjaslk;fjdalkfj", url = str(hashlib.sha1(name.encode()).hexdigest()))
    post3.save()
    return make_response("", 201)

@app.route("/makepost/<key>", methods = ["GET"])
def loadmakepost(key):
    compkey = str(hashlib.sha1(mongodb_pass.encode()).hexdigest())
    if compkey == key: 
        return render_template('edit.html')
    else: 
        return make_response("", 404) 

@app.route("/getimg/<key>")
def getimg(key): 
    if blogpost.objects(url = key):
        post_obj = blogpost.objects(url = key).first()
        print(post_obj.photo)
        return send_file(io.BytesIO(post_obj.photo.read()),
                     attachment_filename='image.png',
                     mimetype='image/png')
    else:
        return make_response("", 404)
        
@app.route("/savepost/<key>", methods = ['POST'])
def savepost(key): 
    compkey = str(hashlib.sha1(mongodb_pass.encode()).hexdigest())
    if compkey == key:
        print(request.files) 
        file = request.files['filename']
        title = request.form['title']
        thedate = request.form['date']
        description = request.form['desc']
        data = request.form['data']
        print(data)
        if blogpost.objects(name = title):
            return make_response("alreadythere", 404)
        else:
            newpost = blogpost(name = title, date = thedate, content = data, desc = description, url = key, photo = file)
            newpost.save()
        return make_response("success", 201)
    else: 
        return make_response("failure", 404) 

@app.route("/saveeditpost/<key>", methods = ['POST'])
def saveeditpost(key):
    compkey = str(hashlib.sha1(mongodb_pass.encode()).hexdigest())
    file = None 
    if compkey == key:
        if request.files:
            file = request.files['filename']
        title = request.form['title']
        thedate = request.form['date']
        description = request.form['desc']
        data = request.form['data']
        print(file.read())
        print(title)
        print(thedate)
        print(description)
        print(data)
        if savedpost.objects(url = key):
            prevsavedpost = savedpost.objects(url = key)[0]
            prevsavedpost.name = title
            prevsavedpost.date = thedate
            prevsavedpost.content = data
            prevsavedpost.desc = description
            prevsavedpost.url = key
            if request.files:
                prevsavedpost.photo = file
            prevsavedpost.save() 
        else: 
            newsavepost = savedpost(name = title, date = thedate, content = data, desc = description, url = key, photo = file)
            newsavepost.save()
        return make_response("success", 201)
    else:
        return make_response("failure", 404)


if __name__ == '__main__':
    app.run(debug = True)