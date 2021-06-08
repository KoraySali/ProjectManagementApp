from flask import *
import math

app = Flask(__name__)
app.debug = True

userList = [                                    #The creating of all the user data to be used in the API
    {
        "id": 1,
        "email": "george.bluth@reqres.in",
        "first_name": "George",
        "last_name": "Bluth",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
    },
    {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
    },
    {
        "id": 3,
        "email": "emma.wong@reqres.in",
        "first_name": "Emma",
        "last_name": "Wong",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
    },
    {
        "id": 4,
        "email": "eve.holt@reqres.in",
        "first_name": "Eve",
        "last_name": "Holt",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
    },
    {
        "id": 5,
        "email": "charles.morris@reqres.in",
        "first_name": "Charles",
        "last_name": "Morris",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
    },
    {
        "id": 6,
        "email": "tracey.ramos@reqres.in",
        "first_name": "Tracey",
        "last_name": "Ramos",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
    },
    {
        "id": 7,
        "email": "michael.lawson@reqres.in",
        "first_name": "Michael",
        "last_name": "Lawson",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"
    },
    {
        "id": 8,
        "email": "lindsay.ferguson@reqres.in",
        "first_name": "Lindsay",
        "last_name": "Ferguson",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"
    },
    {
        "id": 9,
        "email": "tobias.funke@reqres.in",
        "first_name": "Tobias",
        "last_name": "Funke",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"
    },
    {
        "id": 10,
        "email": "byron.fields@reqres.in",
        "first_name": "Byron",
        "last_name": "Fields",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"
    },
    {
        "id": 11,
        "email": "george.edwards@reqres.in",
        "first_name": "George",
        "last_name": "Edwards",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"
    },
    {
        "id": 12,
        "email": "rachel.howell@reqres.in",
        "first_name": "Rachel",
        "last_name": "Howell",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg"
    },
]


@app.route('/js/<file>')
def java_link(file):
    return app.send_static_file('js/' + file)         #Link between the java file and the JavaScript file within it.


@app.route('/')
def home_page():
    return app.send_static_file('users.html')        #Link for the html file to the API.


@app.route('/api/users',methods=["GET"])        #This here assigns the GET method in Flask to the
def getUserList():                              #/api/users to be used in the JavaScript as the link to the API.
    pageNumber = int(request.args.get('page'))
    userSlice = userList[(pageNumber - 1) * 6:pageNumber * 6]     #userSlice is assigned the userLists data with all of the users data from both pages.
    return jsonify({"per_page": 6,                                #Returns back 6 users on each table page
                    "page": pageNumber,
                    "total": len(userList),
                    "total_pages": int(math.ceil(len(userList) / 6)),     #This here is rounding up to the next whole
                    "data": userSlice})                                   #number which would give 2 for the total number of pages.


@app.route('/api/users/<user_id>', methods=["GET"])                     #Sets the API link, as well as user_id being passed as an object
def getUser(user_id):
    user = [userObj for userObj in userList if userObj["id"] == int(user_id)]     #User is assigned userObj's id data if equal to the number of user_id
    if len(user) == 0:                              #If the users length is null then error 404 should be displayed.
        abort(404)
    return jsonify({'user': user[0]})


@app.route('/api/users/create', methods=["POST"])           #POST flask method used to create the new user
def createUser():
    user = {
        'id': userList[-1]['id'] + 1,               #Creates the id, email, names and avatars for the user to
        'email': request.json["email"],             #input their new data into which sends as JSON when given by the user.
        'first_name': request.json["first_name"],
        'last_name': request.json["last_name"],
        'avatar': request.json["avatar"]
    }
    userList.append(user)                       #Adds to the userList
    return jsonify({'user': user}), 201         #Sends the user data as a JSON format alongside the request status


if __name__ == '__main__':
    app.run()
