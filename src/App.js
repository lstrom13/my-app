import logo from './logo.svg';
import './App.css';

function Users() {
    const jsonURL = "https://jsonplaceholder.typicode.com/users";
   const pulseURL= "https://dev.app.homecarepulse.com/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api";

  
    const onGetUsersSuccess = (response) => {
      return response.json().then((data) => {
        const users = data.map(mappedUsers);
        console.log(users);
        const authPayload = {
          userid: "laurastromdev@gmail.com",
          password: "286954aec6c64d3896b0528ce1b2af44",
          outputtype: "json",
          users: users,
        };
  
        let getPost= {
          method: "POST",
          body: JSON.stringify(authPayload),
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
          }),
        };
  
        fetch(pulseURL, getPost).then(onGetUsersError);
      });
    };
    
    const mappedUsers = (user) => {
      const number = fixNumber(user.phone)
      const myUsers = {
        first_name: user.name.split(" ")[0],
        last_name: user.name.split(" ")[1],
        company_name: user.company.name,
        company_full_address: 
        user.address.street + " , " +
        user.address.suite + "," +
        user.address.city + "," +
        user.address.zipcode,
        website: user.website,
        phone: number, 
      };

      return myUsers;
    };
    
    const fixNumber = (newPhone) =>{
    let phoneNums = newPhone.split(' ')
    let simpleNums = phoneNums[0].replace(/\W/g, "")
    if (simpleNums.length > 10){
      return simpleNums.substring(1);
    }
    return simpleNums;
    }
    const onGetUsersError = (err) => {
      console.error(err);
    };
    fetch(jsonURL).then(onGetUsersSuccess).catch(onGetUsersError);
return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Laura <code> Strom </code>Users.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Users
        </a>
      </header>
    </div>
  );
}

export default Users;
