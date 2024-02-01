import axios from 'axios';

export const verifyExistId = async (id) =>{
    let restResult2='';
    const urlReq2 = `${process.env.FIREBASE_DATABASE_URL}/articles/article.json?orderBy="id"&equalTo=${id}&print=pretty`;
    await axios.get(urlReq2)
    .then((restobjetc) => {
      //console.log(restobjetc.data);
      restResult2 = restobjetc.data;
    });
    let existObject = Object.values(restResult2);

    return (existObject.length > 0)? existObject[0].id : 0;
}