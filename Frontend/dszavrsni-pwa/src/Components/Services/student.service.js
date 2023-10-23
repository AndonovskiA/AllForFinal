import http from '../../http-common';

class studentDataService {
  async get() {
    return await http.get('/Student');
  }

  async getByID(ID) {
    return await http.get('/Student/' + ID);
  }

  async post(student){
    const answer = await http.post('/Student',student)
       .then(response => {
         return {ok:true, message: 'Student added'}; 
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, message: error.response.data}; 
       });
 
       return answer;
  }

  async put(ID,student){
    const answer = await http.put('/student/' + ID,student)
       .then(response => {
         return {ok:true, message: 'Student changed'};
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; 
       });
 
       return answer;
     }


  async delete(ID){
    
    const answer = await http.delete('/Student/' + ID)
       .then(response => {
         return {ok:true, message: 'Succesfully deleted student'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, message: error.response.data};
       });
 
       return answer;
     }


     async searchStudent(condition) {
      console.log('Searching s: ' + condition);
      return await http.get('/student/search/'+condition);
    }
     
 
}

export default new studentDataService();