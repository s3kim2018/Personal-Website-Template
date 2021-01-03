import json
import hashlib 
from flask import Flask, render_template, url_for, make_response, jsonify
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
    url = db.StringField()
    def to_json(self): 
        return {
            "name": self.name,
            "date": self.date, 
            "content": self.content,
            "url": self.url
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
    print(postjson)
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


@app.route("/api/db_getall", methods = ['GET'])
def db_getallposts(): 
    posts = []
    for post in blogpost.objects:
        posts.append(post)
    return make_response(jsonify(posts), 201)
if __name__ == '__main__':
    app.run(debug = True)