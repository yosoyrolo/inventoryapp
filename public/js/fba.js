window.fba = {};

fba.auth = {};
fba.user = {};
fba.init = function() {
  fba.auth = firebase.auth();
};
fba.error = function(e) {
  fba.onError(e);
};

fba.validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

fba.signIn = function(method, email, password, callback) {
  switch (method) {
    case "email":
      var user = email;
      var pass = password;
      if (user == "" && pass == "") {
        //console.error('Ingresa un correo y una contraseña');
        fba.error({ code: "no email, no password" });
      } else if (user != "" && pass == "") {
        //console.error('Ingresa una contraseña');
        fba.error({ code: "no password" });
      } else if (user == "" && pass != "") {
        //console.error('Ingresa un correo');
        fba.error({ code: "no email" });
      } else if (user != "" && pass != "") {
        if (fba.validateEmail(user)) {
          //el correo y la contraseña estan bien escritas
          const promise = fba.auth.signInWithEmailAndPassword(user, pass);

          promise.catch(e => fba.error(e));
        } else {
          //console.error('Ingresa un correo valido');
          fba.error({ code: "invalid email" });
        }
      }
      break;
    case "facebook":
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      break;
    default:
      break;
  }
};

fba.signUp = function(email, password) {
  var user = firebase.auth().createUserWithEmailAndPassword(email, password);
  console.log(user);

  //user.displayName = name;
  // user.photoUrl = pic;
};

fba.signOut = function() {
  fba.auth.signOut();
};

fba.sesion = function(userIn, userOut) {
  fba.auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      //Inicio sesion
      fba.user = firebaseUser;
      userIn(firebaseUser);
    } else {
      //Cerro sesion
      fba.user = firebaseUser;
      userOut(firebaseUser);
    }
  });
};
