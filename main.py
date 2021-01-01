from flask import Flask, render_template, url_for, make_response
from flask_mongoengine import MongoEngine
from constants import mongodb_pass
app = Flask(__name__)
db_name = "API"
DB_URI = "mongodb+srv://s3kim2018:{}@cluster0.xfm8y.mongodb.net/{}?retryWrites=true&w=majority".format(mongodb_pass, db_name)
print(DB_URI)
app.config["MONGODB_HOST"] = DB_URI
db = MongoEngine()
db.init_app(app)


@app.route("/")
def hello():
    return render_template('index.html')

class book(db.Document):
    book_id = db.IntField()
    name = db.StringField()
    author = db.StringField()
    def to_json(self): 
        return {
            "book_id": self.book_id,
            "name": self.name, 
            "author": self.author
        }

@app.route("/api/db_populate", methods = ['POST'])
def db_populate(): 
    book1 = book(book_id = 1, name = "Game of Thrones", author = "George")
    book1.save()
    return make_response("", 201)

if __name__ == '__main__':
    app.run(debug = True)