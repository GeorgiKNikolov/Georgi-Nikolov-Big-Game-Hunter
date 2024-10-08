export const request = async (method ,url, data ) => {
  try {
      const  user = localStorage.getItem("auth");
      const auth = JSON.parse(user || {});


      let headers = {};

       if(auth.accessToken){
        headers["X-Authorization"] = auth.accessToken;
       }



    let requestPromise; 

    if(method === "GET"){
        requestPromise = fetch(url);
    }else{
        requestPromise = fetch(url, {
            method,
            headers: {
              ...headers,
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    };
    
    const response = await requestPromise; 


    const result = await response.json();

   

    return result;

  } catch (error) {
    console.log(error);
  };
  
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const del = request.bind({}, "DELETE");
export const put = request.bind({}, "PUT");
export const patch = request.bind({}, "PATCH");