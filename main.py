import json
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
    def to_json(self): 
        return {
            "name": self.name,
            "date": self.date, 
            "content": self.content
        }


@app.route("/")
def hello():
    alltheposts = json.loads(blogpost.objects.to_json())
    print(alltheposts)
    return render_template('index.html', posts = alltheposts)


@app.route("/api/db_populate", methods = ['POST'])
def db_populate(): 
    post1 = blogpost(name = "Test Blog Post1", date = "December 29, 2020", content = "A:LKSDJL:JDAL:JDAL:JSDAL:JALJHIOjaklfjal;fajl;fj;lfjal;fja;jdflajl;kgjaklghioejgapoijfopadjfaoipjfopajdfiopafjsfkljas;fjaskl;fjaklfjsfls;kjfd;lkfja;ljfdla;fjafl;jdfl;dskajfaksdlfjal;dkfjaslk;fjdalkfj")
    post1.save()
    post2 = blogpost(name = "Test Blog Post2", date = "December 29, 2020", content = "A:LKSDJL:JDAL:JDAL:JSDAL:JALJHIOjaklfjal;fajl;fj;lfjal;fja;jdflajl;kgjaklghioejgapoijfopadjfaoipjfopajdfiopafjsfkljas;fjaskl;fjaklfjsfls;kjfd;lkfja;ljfdla;fjafl;jdfl;dskajfaksdlfjal;dkfjaslk;fjdalkfj")
    post2.save()
    post3 = blogpost(name = "Test Blog Post3", date = "December 29, 2020", content = "A:LKSDJL:JDAL:JDAL:JSDAL:JALJHIOjaklfjal;fajl;fj;lfjal;fja;jdflajl;kgjaklghioejgapoijfopadjfaoipjfopajdfiopafjsfkljas;fjaskl;fjaklfjsfls;kjfd;lkfja;ljfdla;fjafl;jdfl;dskajfaksdlfjal;dkfjaslk;fjdalkfj")
    post3.save()
    return make_response("", 201)

@app.route("/api/db_getall", methods = ['GET'])
def db_getallposts(): 
    posts = []
    for post in blogpost.objects:
        posts.append(post)
    return make_response(jsonify(posts), 201)
if __name__ == '__main__':
    app.run(debug = True)