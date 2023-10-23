import http from '../../http-common';


class categoryDataService{
  async get(){
    return await http.get('/category');
}
    
  async getByID(ID) {
    return await http.get('/category/' + ID);
  }

  async delete(ID){
   const answer = await http.delete('/category/' + ID)
    .then(response => {
         return {ok: true, message: 'Succesfully deleted category'};
        })
        .catch(e=>{
            return {ok: false, message: e.response.data};
        });

        return answer;
    }


  async post(category){

    const answer = await http.post('/category',category)
        .then(response => {
          return {ok:true, message: 'Category added'}; 
           })
           .catch(error => {
            console.log(error.response);
          return {ok:false, message: error.response.data}; 
           });
     
           return answer;
    }

  async put(ID,category){
        const answer = await http.put('/category/' + ID,category)
           .then(response => {
             return {ok:true, message: 'Category changed'}; 
           })
           .catch(error => {
            console.log(error.response);
             return {ok:false, message: error.response.data}; 
           });
     
           return answer;
         }

}

export default new categoryDataService();