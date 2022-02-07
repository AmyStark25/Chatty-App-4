const firebaseConfig = {
    apiKey: "AIzaSyBXyHibyN9Mx8gX4hAEw79Le09AEYXtz1Q",
    authDomain: "sonet-90722.firebaseapp.com",
    databaseURL: "https://sonet-90722-default-rtdb.firebaseio.com",
    projectId: "sonet-90722",
    storageBucket: "sonet-90722.appspot.com",
    messagingSenderId: "828396724175",
    appId: "1:828396724175:web:08523aae721f00eaecfcba"
  };

  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");
  document.getElementById("user_name").innerHTML="Welcome " + user_name + " !"; 
  
  function addRoom(){
        room_name = document.getElementById("room_name").value;
        firebase.database().ref("/").child(room_name).update({
              purpose : "adding room name"
        });
  
        localStorage.setItem("room_name" , room_name);
  
        window.location = "chatty_room_page.html";
  }
  
  function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
         Room_names = childKey;
        console.log("Room Name - " + Room_names);
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
        document.getElementById("output").innerHTML += row;
        });});}
  getData();
  
  function redirectToRoomName(name)
  {
        console.log(name);
        localStorage.setItem("room_name", name);
        window.location = "chatty_room_page.html";
  }

  function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index_copy.html";

}

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
  
      document.getElementById("msg").value = "";
  }