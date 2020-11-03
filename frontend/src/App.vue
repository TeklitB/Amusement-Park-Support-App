<template>
  <div id="app" >
    <div id="nav">
      <p style="float:left;
        color: white;
        display:inline;font-size: 200%;
        font-weight: bold; margin:0 auto; padding-right:5%">SupportApp</p>
      <router-link to="/tasks">Tasks</router-link>
      <router-link to="/work-logs">Work Log</router-link>
    </div>
    <div style="width=100%; margin-bottom:-70px;padding-bottom:3%">
      <img src="@/assets/banner_curve_blue.png"/>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;  */
  @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
  font-family:'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:#1994d7;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 100%);

  background-size: cover;
}
#nav {
  text-align: left;
  padding: 1%;
  background: rgb(123,250,231);
  background: linear-gradient(180deg, rgba(123,250,231,1) 0%, rgba(25,148,215,1) 100%);
  -moz-box-shadow: 0px 5px 10px rgba(68, 68, 68, 0.6);
  -webkit-box-shadow: 0px 5px 10px rgba(68, 68, 68, 0.6);
  box-shadow: 0px 5px 10px rgba(68, 68, 68, 0.6);
}
#nav a {
  font-weight: bold;
  font-size: 30px;
  color:#1994d7;
  padding-right:30px;
  text-shadow: #e0e0e0 1px 1px 0, 2px 2px 2px rgba(206,89,55,0);
}
#nav a:hover {
  color:#7bfae7;
}
#nav a.router-link-exact-active {
  color:whitesmoke;
}
</style>
