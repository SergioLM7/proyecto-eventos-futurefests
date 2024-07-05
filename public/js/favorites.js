//Función para extraer el token de las cookies
const getCookie = (name)  => {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    const cookieValue = matches ? decodeURIComponent(matches[1]) : undefined;
    return cookieValue;
  };
  
  //Función para extraer el email del token
  const getEmailFromToken = () => {
    const token = getCookie("access-token");
  
    if (!token) {
      console.log("No token found.");
      return null;
    }
  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload).email;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

const botonesDelete = document.querySelectorAll(".buttonDeleteFavorite");
botonesDelete.forEach(button => {
  button.addEventListener("click", async ({target}) => {

    const token = getCookie('access-token');
    if (!token) {
      console.log("No user is logged in.");
      window.location.href = '/login';
      return;
    }

    const email = getEmailFromToken(token);

    if (target.classList.contains('liked')) {
      target.classList.remove('liked');
    } else {
      target.classList.add('liked');
    }
    console.log(target.id);

    const encodedId = encodeURIComponent(target.id);
    console.log(encodedId);

    let searchResult;
    try {
      const searchResponse = await fetch(`http://localhost:3000/search?input=${encodedId}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!searchResponse.ok) {
        throw new Error('Search request failed');
      }

      searchResult = await searchResponse.json();
      console.log(searchResult);
    } catch (error) {
      console.error('Error during search:', error);
      return;
    }

    const payload = {
      email: email,
      favorite_id: searchResult[0]._id 
    };

    try {
      const response = await fetch('https://proyecto-eventos-futurefests.onrender.com/api/userfavorite', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }

    console.log(target.id);
  });
});